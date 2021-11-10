<template>
  <a-layout class="text-align-left h-full">
    <a-layout-header class="header bg">
      <div class="logo" >
        <img src="../../assets/logo.png" alt="." class="logo">
      </div>
      <a href="javascript:void (0)" class="title" >{{ systemConfig.title }}</a>
      <personal-setting :setting="systemConfig" class="personal-setting"></personal-setting>
      <a-menu
        v-if="systemConfig.layout === 'topmenu'"
        theme="light"
        mode="horizontal"
        v-model="current"
        @click="onMenuClick"
      >
        <a-menu-item
          :key="menu.name"
          v-for="menu in mainMenu">
          <div class="display-flex-column">
            <i :class="menu.icon" class="iconfont f20" style="height: 23px"></i>
            <span class="f16">{{ menu.name }}</span>
          </div>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="160"
        style="background: #fff"
        v-model="collapsed"
        collapsible
        v-show="!hideSide">
        <a-menu
          mode="inline"
          @click="handleSideMenuClick"
          :default-open-keys="defaultOpenSideKeys"
          :selected-keys="selectedKeys"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <template v-for="item in sideMenu" >
            <a-menu-item :key="item.routerName" v-if="!item.children">
              <span class="anticon">
                <i :class="item.icon" class=" iconfont m-r-xs"></i>
              </span>
              <span>{{ item.name }}</span>
            </a-menu-item>
            <sub-menu v-else :menu-info="item" />
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding-left: 3px">
        <dist-header-tab :hide-tab="hideTabs"></dist-header-tab>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import config from '@/config/defaultSettings'
import SubMenu from './SubMenu'
import DistHeaderTab from '@c/DistHeaderTab/DistHeaderTab'
import { TAB_GROUP } from '@/store/mutation-types'
import storage from 'store'
import PersonalSetting from './PersonalSetting'
export default {
  name: 'BasicLayout',
  data () {
    return {
      collapsed: false,
      systemConfig: config,
      current: [],
      currentMenu: {},
      sideMenu: [],
      hideSide: false,
      hideTabs: false,
      selectedKeys: [],
      defaultOpenSideKeys: [],
      openKeys: []
    }
  },
  props: {},
  components: {
    SubMenu,
    DistHeaderTab,
    PersonalSetting
  },
  created () {
  },
  mounted () {
    this.getDefaultMenuKey()
    this.addTabToState(this.$route)// 刷新
    if (this.systemConfig.layout === 'sidemenu') {
      this.sideMenu = this.mainMenu
      this.hideSide = false
    }
    if (!this.hideSide) {
      const route = this.$route
      if (route.query.fromRouter) {
        this.selectedKeys = [route.query.fromRouter]
      } else {
        this.selectedKeys = [route.name]
      }
    }
  },
  computed: {
    ...mapState({
      mainMenu: state => state.permission.menuList,
      headerTab: state => state.nav.headerTab
    })
  },
  methods: {
    ...mapMutations(['UPDATE_HEADER_TAB', 'UPDATE_SIDEBAR']),
    /**
     * 获取默认选择 menu
     */
    getDefaultMenuKey () {
      const route = this.$route
      const temp = {
        name: route.meta.title,
        routerName: route.name
      }
      let activeMenu = null
      if (route.meta && route.meta.group && route.meta.group !== 'NO_GROUP') {
        activeMenu = this.mainMenu.filter(item => item.group === route.meta.group)
      } else {
        console.log(this.mainMenu)
        console.log(temp)
        activeMenu = this.mainMenu.filter(item => {
          if (item.name === temp.name && item.routerName === temp.routerName) {
            return true
          }
          if (item.children) {
            return this.checkChildrenMenuList(item.children, temp)
          }
          return false
        })
      }

      // 路由进行模块跳转时
      if (activeMenu != null && activeMenu.length > 0 && this.activeNav) {
        if (activeMenu[0].routerName === this.activeNav.routerName) {
          return
        }
      }

      this.currentMenu = activeMenu[0]
      this.current.push(this.currentMenu.name)
      this.setSideMenu()
    },
    /**
     * 当设置 NO_GROUP 并且存在 左侧导航栏的时候
     * 刷新页面会找不到对应 activeMenu
     */
    checkChildrenMenuList (menuList, target) {
      for (const item of menuList) {
        if (item.name === target.name && item.routerName === target.routerName) {
          return true
        }
      }
      return false
    },
    /**
     * 顶部导航栏的点击
     * @param item
     * @param key
     * @param keyPath
     */
    onMenuClick ({ item, key, keyPath }) {
      this.currentMenu = this.mainMenu.find(menu => menu.name === key)
      this.setSideMenu()
      this.toTarget()
    },
    /**
     *判断是否存在左侧导航栏
     */
    setSideMenu () {
      if (this.currentMenu.children === undefined) {
        this.hideSide = true
        this.sideMenu = []
      } else {
        this.hideSide = false
        this.sideMenu = this.currentMenu.children
      }
      this.hideTabs = !(this.currentMenu.group && this.currentMenu.group !== 'NO_GROUP')
    },
    /**
     *this.hideSide 为 true 的时候表示没有二级tab，此时直接跳转路由，
     * 否则，如果已经存在已经打开的 tab，则直接跳转到已经打开的页面
     * 如果不存在已经打开的 tab，则进入模块首个页面
     */
    toTarget () {
      if (this.hideSide) {
        this.$router.push({ name: this.currentMenu.routerName })
      } else {
        if (this.headerTab[this.currentMenu.group]) {
          const activeTab = this.headerTab[this.currentMenu.group].find(item => item.isActive)
          this.$router.push({ path: activeTab.path })
        } else {
          const firstEntry = this.getFirstEntry(this.currentMenu.children)
          this.$router.push({ name: firstEntry.routerName })
        }
      }
    },
    /**
     * 获取第一个模块
     * @param navList
     */
    getFirstEntry (navList) {
      const firstEntry = navList[0]
      if (Array.isArray(firstEntry.children)) {
        return this.getFirstEntry(firstEntry.children)
      } else {
        return firstEntry
      }
    },
    /**
     * 左侧导航栏点击
     * @param item
     * @param key
     * @param keyPath
     */
    handleSideMenuClick ({ item, key, keyPath }) {
      const sideMenu = this.getSideMenuByKey(this.sideMenu, key)
      this.$router.push({ name: key, params: sideMenu })
    },
    /**
     * 通过key获取所点击的目录详情
     * @param key
     */
    getSideMenuByKey (menus, key) {
      for (const item of menus) {
        if (item.routerName === key) {
          return item
        }
        if (item.children) {
          return this.getSideMenuByKey(item.children, key)
        }
      }
    },
    onOpenChange (openKeys) {
      console.log(openKeys)
    },
    addTabToState (route) {
      if (!route.meta || route.meta.group === 'NO_GROUP') return
      const group = storage.get(TAB_GROUP)
      if (route.meta.group !== 'HAS_GROUP' && (!group || group !== route.meta.group)) {
        storage.set(TAB_GROUP, route.meta.group)
      }
      const temp = {
        path: route.fullPath,
        key: route.fullPath,
        name: route.name,
        title: (route.query && route.query.title) || route.meta.title || '未命名',
        group: route.meta.group,
        params: route.params,
        isKeepAlive: route.meta.keepAlive !== false,
        pageType: route.meta.pageType || 'routerView'
      }
      this.UPDATE_HEADER_TAB(temp)
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.meta && to.meta.group && to.meta.group !== 'NO_GROUP') {
        this.addTabToState(to)
      }
      if (to.query.fromRouter) {
        this.selectedKeys = [to.query.fromRouter]
      } else {
        this.selectedKeys = [to.name]
      }
    }
  }
}
</script>

<style scoped lang="less">
.bg{
  background-image: url('../../assets/head/header.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.header{
  padding: 0;
  text-align: left;
  /deep/.ant-menu{
    background-image: url('../../assets/head/header.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .ant-menu-horizontal {
    color: white;
    line-height: 42px;
    .ant-menu-item{
      top:0;
      border-bottom: none;
      text-align: center;
      padding: 0 10px;
      &:hover{
        color: white;
        background-color: rgba(255,255,255,.2);
        border-bottom: none;
      }
    }
    .ant-menu-item-selected{
      color: white;
      background-color: rgba(255,255,255,.2);
      border-bottom: none;
    }
  }
  .title {
    color: white;
    font-size: 25px;
    float: left;
    line-height: 64px;
    margin-right: 10px;
  }
  .logo{
    padding: 6px 5px;
    float: left;
  }
  a{
    text-decoration: none;
  }
  .personal-setting{
    float: right;
    margin-right: 10px;
  }
}
/deep/ .ant-layout-sider-trigger{
  background: white;
  color: #1890ff;
}
</style>
