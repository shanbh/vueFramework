<template>
  <div class="dist-header-tab" ref="tabsTopCtrl">
    <div class="dist-tab">
      <a-tabs
        v-model="activeKey"
        :tab-bar-style="{height: '32px', lineHeight: '32px'}"
        @prevClick="callback"
        @nextClick="callback"
        @edit="onEdit"
        @tabClick="tabClick"
        type="editable-card"
        hide-add
        size="small"
        v-show="!showTabs"
      >
        <a-tab-pane
          v-for="pane in tabList"
          :key="pane.key"
          :tab="pane.title"
          :closable="pane.closable">

        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="dist-content" >
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
      </keep-alive>

      <!--// 非缓存组件跳转页面-->
      <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>

      <component
        v-for="item in iframeTabList"
        :key="item.key"
        :is="item.name"
        v-show="$route.fullPath === item.path"
      ></component>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Vue from 'vue'
import { asyncRouterMap } from '@/config/router.config'

export default {
  name: 'DistHeaderTab',
  data () {
    return {
      mode: 'top',
      activeKey: '',
      componentsArr: [],
      iframeTabList: [], // 所有的iframeTab
      showTabs: false,
      isTopTabs: true
    }
  },
  props: {
    hideTab: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  created () {
    // 设置iframe页的数组对象
    const componentsArr = this.getComponentsArr()

    componentsArr.forEach((item) => {
      Vue.component(item.name, item.component)
    })
    this.componentsArr = componentsArr
    // 判断当前路由是否iframe页
    this.isOpenIframePage()
  },
  mounted () {

  },
  computed: {
    ...mapState({
      headerTab: state => state.nav.headerTab
    }),
    tabList () {
      const group = this.$route.meta.group
      this.activeKey = this.$route.fullPath
      return this.headerTab[group]
    },
    hasOpenComponentsArr () {
      return this.componentsArr.filter(item => item.hasOpen)
    }
  },
  methods: {
    callback (val) {
      console.log(val)
    },
    tabClick (targetKey) {
      this.$router.push({ path: targetKey })
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    /**
     *移除tab
     * 1、清除state里面的记录
     * 2、清除虚拟dom中的缓存
     * 3、如关闭的是当前页面，则默认打开所有tab的最后一个
     */
    remove (targetKey) {
      if (this.tabList.length > 1) {
        const panes = this.tabList.filter(pane => pane.key !== targetKey)
        const currentTab = this.tabList.find(pane => pane.key === targetKey)
        const nextTab = panes[panes.length - 1]
        this.$store.commit('REMOVE_HEADER_TAB', currentTab)
        if (currentTab.key === this.$route.fullPath) {
          this.$router.push({ path: nextTab.path })
        }
        if (currentTab.pageType === 'iframeForm') {
          // 移除iframe缓存
          this.iframeTabList = this.iframeTabList.filter(item => item.path !== currentTab.path)
          return
        }
        if (currentTab.isKeepAlive) {
          // 移除keep-alive缓存
          for (const item of this.$children) {
            if (item.$vnode && item.$vnode.key && item.$vnode.key === currentTab.key) {
              this.clearCache(item, currentTab)
              break
            }
          }
        }
      } else {
        this.$error({
          // title: 'This is an error message',
          content: '只有一个页签时，不允许关闭'
        })
      }
    },
    /**
     * 清除缓存
     */
    clearCache (component, tab) {
      let cache; let keys; let componentInstance; const vnode = component.$vnode
      if (vnode && vnode.parent && vnode.parent.componentInstance && vnode.parent.componentInstance.cache) {
        cache = vnode.parent.componentInstance.cache
        keys = vnode.parent.componentInstance.keys
      }
      if (cache[tab.key]) {
        if (keys.length) {
          const index = keys.indexOf(tab.key)
          if (index > -1) {
            keys.splice(index, 1)
          }
        }
        componentInstance = cache[tab.key]
        delete cache[tab.key]
        componentInstance.componentInstance.$destroy()
      }
    },

    isOpenIframePage () {
      const target = this.componentsArr.find(item => {
        return item.name === this.$route.name
      })
      if (!target) return
      const currentRoute = this.$route
      const temp = {
        group: currentRoute.meta && currentRoute.meta.group ? currentRoute.meta.group : '_NO_GROUP_',
        name: target.name,
        path: currentRoute.fullPath,
        key: currentRoute.fullPath,
        // key: target.name + '/' + currentRoute.fullPath,
        isActive: true,
        component: target.component
      }; let flag = false
      for (const item of this.iframeTabList) {
        if (item.path === temp.path) {
          item.isActive = true
          flag = true
        } else {
          item.isActive = false
        }
      }
      if (!flag) this.iframeTabList.push(temp)
    },
    // 遍历路由的所有页面，把含有iframeComponent标识的收集起来
    getComponentsArr () {
      // const router = this.$router
      const router = asyncRouterMap
      const routes = asyncRouterMap
      const iframeArr = []
      this.getIframeComponentArr(routes, iframeArr)
      return iframeArr.map((item) => {
        const name = item.name || item.path.replace('/', '')
        return {
          name: name,
          path: item.path,
          component: item.iframeComponent, // 组件文件的引用
          meta: item.meta
        }
      })
    },
    /**
     * 获取所有的iframeComponent的路由
     */
    getIframeComponentArr (routes, iframeArr) {
      routes.forEach(item => {
        if (item.iframeComponent) {
          iframeArr.push(item)
        }
        if (item.children) {
          this.getIframeComponentArr(item.children, iframeArr)
        }
      })
    },
    /**
     * 根据key选择tab
     * @param tabKey
     */
    findTab (tabKey) {
      // let key = tabKey.split('//')[1],tab = ''
      // key = `/${key}`
      // const key = tabKey
      let tab = ''
      for (const item of this.tabList) {
        if (item.key === tabKey) {
          tab = item
          break
        }
      }
      return tab
    },
    /**
     * 移除tab，自动移除
     * @param tab
     */
    removeTab (tab) {
      this.remove(tab.key)
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.meta.pageType && to.meta.pageType === 'iframeForm') {
        this.isOpenIframePage()
      }
      if (!to.meta.group || to.meta.group === 'NO_GROUP') {
        this.showTabs = true
      } else {
        this.showTabs = false
      }
    },
    'hideTab' (val) {
      this.showTabs = this.hideTab
    }
  }
}
</script>

<style scoped  lang="less">
.dist-header-tab{
  height: 100%;
  display: flex;
  flex-direction: column;
  .dist-content{
    height: calc(100% - 32px);
    flex: 1;
  }
}
.dist-tab{
  height: 32px;
  /deep/ .ant-tabs{
    height: 32px;
    .ant-tabs-bar{
      margin-bottom: 0;
    }
  }
  /deep/.ant-tabs-card .ant-tabs-card-bar {
    .ant-tabs-tab{
      height: 32px;
      line-height: 32px;
    }
    .ant-tabs-nav-container{
      height: 32px;
    }
    .ant-tabs-tab-active{
      height: 32px;
    }
  }
}
/deep/ .ant-tabs-bar{
  margin: 0;
}

</style>
