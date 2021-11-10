
import { mapMutations } from 'vuex'
import store from './store'

function typev (obj) {
  return Object.prototype.toString.call(obj).split(/^\[object ([a-zA-Z]*)\]$/)[1].toLowerCase()
}
/**
 * 数慧事件总线
 * @param {Vue} eventBus 事件总线，一个全局的Vue实例
 */
function DistEvent (eventBus) {
  // 事件总线
  this.eventBus = eventBus
  // 事件存储, key: 事件名称String，value: 响应函数Function
  this.__events = {}

  /**
   * 注册事件，即接收消息
   * @param {String | String[]} name 事件名称
   * @param {Function} fn 回调函数
   */
  this.$on = function (name, fn) {
    if (!this.eventBus) {
      console.info('eventBus not exists!')
      return
    }

    if (typev(name) === 'array') {
      for (let i = 0; i < name.length; i++) {
        this.$on(name[i], fn)
      }
    } else {
      this.__events[name] = this.__events[name] || []
      const fns = this.__events[name]
      if (fns.indexOf(fn) === -1) fns.push(fn)
    }
    this.eventBus.$on(name, fn)
  }

  /**
   * 触发事件，即发送消息
   * @param {String} name 事件名称
   * @param {Any[]} params 参数列表
   */
  this.$emit = function (name, params) {
    if (!this.eventBus) {
      console.info('eventBus not exists!')
      return
    }
    var args = Array.prototype.slice.call(arguments)
    this.eventBus.$emit.apply(this.eventBus, args)
  }

  /**
   * 注销事件
   * @param {String | String[]} name 事件名称
   * @param {Function} fn 注册的回调函数，为空则注销同名的所有注册
   */
  this.$off = function (name, fn) {
    if (!this.eventBus) {
      console.info('eventBus not exists!')
      return
    }
    if (typev(name) == 'array') {
      for (let i = 0; i < name.length; i++) {
        this.$off(name[i], fn)
      }
    } else {
      const fns = this.__events[name]
      if (fn) {
        this.eventBus.$emit(name, fn)
        if (fn && fns && fns.indexOf(fn)) {
          fns.splice(fns.indexOf(fn), 1)
        }
      } else {
        this.eventBus.$emit(name)
        if (fns) delete this.__events[name]
      }
    }
  }

  /**
   * 销毁所有注册的事件
   */
  this.$destroy = function () {
    if (!this.eventBus) {
      return
    }
    for (const n in this.__events) {
      const fns = this.__events[n]
      for (let i = 0; i < fns.length; i++) {
        this.eventBus.$off(n, fns[i])
      }
      fns.splice(0, fns.length)
    }
  }
}

const mixin = {
  data () {
    return {
      __tabsCtrl: null,
      permission: [],
      Event: new DistEvent(this.$root.eventHub),
      treeDialogVisible: false,
      // componentName: '',
      dialogTitle: '',
      userInfo: {},
      userUnit: {}
    }
  },
  mounted () {
    this.userInfo = store.getters.getUserInfo
    this.userUnit = store.getters.getUserUnit
  },
  methods: {
    ...mapMutations({
      resetTabName: 'UPDATE_TAB_NAME'
    }),
    // 更新tabName
    updateTabName (title) {
      setTimeout(() => {
        const tab = this.getTopTab()
        if (tab && title) {
          tab.title = title || '（未命名）'
          this.resetTabName(tab)
        }
      })
    },
    // 关闭tab
    closeTab () {
      const tab = this.getTopTab()
      this.__tabsCtrl.removeTab(tab)
    },
    // 获取TopTab
    getTopTab () {
      const tabs = this.getTopTabs()
        let tab = null
        let focus = this
        const arr = []
      while (tabs && focus) {
        if (focus == tabs) {
          break
        }
        if (focus.$vnode && focus.$vnode.key) {
          arr.push(focus)
        }
        focus = focus.$parent
      }
      if (tabs && tabs.findTab && arr.length > 0) {
        for (let i = arr.length - 1; i >= 0; i--) {
          const key = arr[i].$vnode.key
          tab = tabs.findTab(key)
          if (tab) break
        }
      }
      return tab
    },
    // 获取所有的TopTab
    getTopTabs () {
      let ctrl = this
      while (ctrl && ctrl != this.$root) {
        if (ctrl.isTopTabs) {
          this.__tabsCtrl = ctrl
          break
        } else if (ctrl.$refs.tabsTopCtrl) { // 增加--jyb
          this.__tabsCtrl = ctrl.$refs.tabsTopCtrl
          break
        } else {
          ctrl = ctrl.$parent
        }
      }
      return this.__tabsCtrl
    },
    /**
     * 格式化日期
     */
    dateFormat (fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    }
  },
  destroyed () {
    this.Event.$destroy()
  }
}

export default mixin
