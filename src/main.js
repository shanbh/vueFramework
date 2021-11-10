import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './core/lazy_use'
import './permission'
import './global.less' // global style
import mixin from './mixin.js'

Vue.config.productionTip = false
Vue.mixin(mixin)
function renderApp () {
  new Vue({
    router,
    store,
    data: {
      eventHub: new Vue()
    },
    render: h => h(App),
    created () {}
  }).$mount('#app')
}

renderApp()
