import {
  UPDATE_SIDEBAR,
  UPDATE_HEADER_TAB,
  REMOVE_HEADER_TAB,
  UPDATE_TAB_NAME
} from '@/store/mutation-types'
import _store from 'store2'

const initState = {
  navList: [],
  sideList: [],
  sidebar: [],
  headerTab: {}
}
_store({ navInitState: initState })

const state = {
  ...initState,
  initState () {
    return _store('navInitState')
  }
}

const nav = {
  state,
  mutations: {
    [UPDATE_SIDEBAR]: (state, nav) => {
      state.sidebar = nav.children
    },
    [UPDATE_HEADER_TAB] (state, tab) {
      if (state.headerTab[tab.group]) {
        const tabList = state.headerTab[tab.group]
        for (const item of tabList) {
          if (item.key === tab.key) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        }
        const targetTab = tabList.filter(item => item.key === tab.key)
        if (targetTab.length === 0) {
          tab.isActive = true
          tabList.push(tab)
        }
        state.headerTab[tab.group] = tabList
      } else {
        tab.isActive = true
        state.headerTab[tab.group] = [tab]
      }
      state.headerTab = Object.assign({}, state.headerTab)
    },
    [REMOVE_HEADER_TAB] (state, tab) {
      const tabList = state.headerTab[tab.group]
      state.headerTab[tab.group] = tabList.filter(item => item.key !== tab.key)
      state.headerTab = Object.assign({}, state.headerTab)
    },
    [UPDATE_TAB_NAME] (state, tab) {
      const tabList = state.headerTab[tab.group]
      for (let item of tabList) {
        if (item.key === tab.key) {
          item = tab
          break
        }
      }
      state.headerTab[tab.group] = tabList
    }
  }
}

export default nav
