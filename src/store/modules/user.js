import { getUserInfo, getUserUnit } from '../../api/user'
import _store from 'store2'

const initState = {
  userInfo: {},
  userUnit: {},
  loginState: false
}

_store({ userInitState: initState })

const state = {
  ...initState,
  initState () {
    return _store('userInitState')
  }
}

const user = {
  state,
  mutations: {
    SET_INFO: (state, info) => {
      state.userInfo = info
    },
    SET_UNIT: (state, info) => {
      state.userUnit = info
    },
    SET_LOGIN_STATE: (state, status) => {
      state.loginState = status
    }
  },

  actions: {
    getInfo ({ commit }) {
      return new Promise(async resolve => {
        try {
          const userInfo = await getUserInfo()
          const params = {
            loginName: userInfo.loginName,
            qtype: 2
          }
          const userUnit = await getUserUnit(params)
          commit('SET_INFO', userInfo)
          commit('SET_UNIT', userUnit[0])
          resolve()
        } catch (e) {
          console.log(e)
        }
      })
    }
  }
}

export default user
