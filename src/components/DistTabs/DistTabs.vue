<template>
  <div class="dist-tabs">
    <a-tabs
      v-model="activeKey"
      hide-add
      type="editable-card"
      @edit="onEdit"
      @change="tabChange">
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :tab="pane.title"
        :closable="tabCloseable">

      </a-tab-pane>
    </a-tabs>

    <component
      class="flex-1"
      v-for="item in tabComponents1"
      :is="item.component"
      :params="pageParams"
      v-show="item.key===currentTab.key"
      :tab-params="item.tabParams"
      :key="item.id">

    </component>
  </div>
</template>

<script>
import DistTabsPanel from './DistTabsPanel'

export default {
  name: 'DistTabs',
  data () {
    return {
      activeKey: '',
      panes: [],
      newTabIndex: 0,
      key: Math.round(Math.random() * 1000),
      currentTab: {},
      tabComponents1: [],
      inActivePanes: [] // panes 激活顺序
    }
  },
  props: {
    pageParams: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    DistTabsPanel
  },
  created () {
  },
  mounted () {
  },
  computed: {
    tabCloseable () {
      const closeable = this.panes.length > 1
      return closeable
    }
  },
  methods: {
    addTabs (tabs) {
      this.activeKey = tabs.key
      this.currentTab = tabs
      const currentTabs = this.panes.find(item => item.key === tabs.key)
      if (!currentTabs) {
        this.panes.push(tabs)
        this.inActivePanes.push(tabs)
        const temp = {
          key: tabs.key,
          tabParams: tabs.tabParams,
          component: tabs.tabComponent,
          id: tabs.id
        }
        this.tabComponents1.push(temp)
      }
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    /**
     * 类 LRU 算法
     * 当前激活的 tab 永远处于队列的最尾端
     * @param activeKey
     */
    tabChange (activeKey) {
      let i = 0
      let currentTab
      for (i; i < this.inActivePanes.length; i++) {
        if (this.inActivePanes[i].key === activeKey) {
          currentTab = this.inActivePanes[i]
          break
        }
      }
      const oldTab = this._.cloneDeep(this.currentTab)
      this.currentTab = currentTab
      this.inActivePanes.splice(i, 1)
      this.inActivePanes.push(currentTab)
      this.$emit('tabClick', {
        type: 'tabChange',
        oldTab,
        currentTab: this.currentTab
      })
    },
    /**
     * 移除 panes 队列中的要关闭的 tab
     * 移除 inActivePanes 队尾的 tab
     * 从新 inActivePanes 队列中获取队尾 tab
     * tab 为当前激活的 tab
     * @param targetKey
     */
    remove (targetKey) {
      this.panes = this.panes.filter(pane => pane.key !== targetKey)
      const removeTab = this.inActivePanes.pop()
      this.currentTab = this.inActivePanes[this.inActivePanes.length - 1]
      this.$emit('tabClick', {
        type: 'tabRemove',
        removeTab,
        currentTab: this.currentTab
      })
      this.activeKey = this.currentTab.key
      this.tabComponents1 = this.tabComponents1.filter(item => item.key !== targetKey)
    }
  }
}
</script>

<style  lang="less">
.dist-tabs{
  height: 100%;
  display: flex;
  flex-direction: column;
  &-content{

  }
  /*.ant-tabs{*/
  /*  height: 100%;*/
  /*}*/
  /*.ant-tabs-content{*/
  /*  height: calc(100% - 40px);*/
  /*  .ant-tabs-tabpane{*/
  /*    height: 100%;*/
  /*  }*/
  /*}*/

}
</style>
