import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRouterMap } from '@/config/router.config'
import { stringifyQuery, parseQuery } from '@/utils/query'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  stringifyQuery: stringifyQuery, // 序列化query参数
  parseQuery: parseQuery, // 反序列化query参数
  routes: constantRouterMap
})

export default router
