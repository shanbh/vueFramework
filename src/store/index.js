import Vue from 'vue'
import Vuex from 'vuex'
import nav from './modules/nav'
import permission from './modules/permission'
import user from './modules/user'
import getters from './getters'
import { RESET_STATE } from './mutation-types'
import mutations from './mutations'
import actions from './actions'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    nav,
    permission,
    user
  },
  state,
  mutations,
  actions,
  getters
})
