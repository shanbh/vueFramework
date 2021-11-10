/**
 * 合并环境变量配置项与config.json中的配置项
 */

import _store from 'store2'
// import { REMOVE_HEADER_TAB, UPDATE_HEADER_TAB, UPDATE_SIDEBAR, UPDATE_TAB_NAME } from '@/store/mutation-types'

const initState = {
  serverRest: '',
  serverSso: '',
  systemName: '',
  serverFile: ''
}
_store({ settingInitState: initState })

const state = {
  ...initState,
  initState () {
    return _store('settingInitState')
  }
}

const setting = {
  state,
  mutations: {

  },
  actions: {
    /**
     * 默认从环境变量里获取地址，
     * 默认只要有baseUrl，则其余url也存在
     * @param commit
     * @returns {Promise<unknown>}
     */
    getDefaultSetting ({ commit }) {
      return new Promise((resolve, reject) => {
        const appBaseUrl = process.env.VUE_APP_BASE_URL
      })
    }
  }
}

export default setting
