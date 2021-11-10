import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import storage from 'store'
import { TAB_GROUP, LOGIN_STATE } from './store/mutation-types'
import { setItemToSession, getItemFromSession } from './utils/util'

const allowList = ['defaultPage', 'login', 'repairManage', '404', 'compensateManage']

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  setDocumentTitle(`${domTitle}`)

  const group = storage.get(TAB_GROUP)

  // 为表单tab设置一个分组
  if (to.meta && to.meta.pageType && to.meta.pageType === 'iframeForm') {
    to.meta.group = group
  }
  const routers = store.getters.addRouters
  if (routers.length === 0) {
    store.dispatch('GenerateRoutes').then(() => {
      // 动态添加可访问路由表
      router.addRoutes(store.getters.addRouters)
      // 请求带有 redirect 重定向时，登录自动重定向到该地址
      const redirect = decodeURIComponent(from.query.redirect || to.path)
      if (to.path === redirect) {
        // set the replace: true so the navigation will not leave a history record
        next({ ...to, replace: true })
      } else {
        // 跳转到目的路由
        next({ path: redirect })
      }
    })
  } else {
    if (to.matched.length === 0) {
      next('/404')
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

function setRouteInfo (route) {
  const currentRouteInfo = {
    name: route.name,
    path: route.path,
    fullPath: route.fullPath
  }
  setItemToSession('ROUTE', currentRouteInfo)
  storage.set('ROUTE', currentRouteInfo)
}

/**
 * 检查路由是否存在
 * 路由改变时，将当前路由存储至session
 * 页面刷新，页面正常显示，但是route的name丢失，此时从session中获取（主要针对表单页面）
 * 当前要跳转的路由和系统的整个路由表进行匹配，如果匹配成功则继续往下，否则跳转到404页面（主要针对首次进入）
 * @param route
 * @returns {boolean}
 */
async function checkRoute (route) {
  if (route.path === '/' || route.name || route.path === '/404') {
    return true
  }

  const oldRoute = getItemFromSession('ROUTE')
  if (oldRoute && decodeURI(oldRoute.path) === decodeURI(route.path)) {
    return true
  }
  return await store.dispatch('CheckRoute', route.path).then((res) => {
    return !!res
  })
}

/**
 * 获取首次进入系统应该进入的页面
 * '/' 默认重定向至一个空白页面，
 */
function getFirstEntryPage () {
  const menuList = store.getters.getMenuList
  console.log(menuList)
  if (menuList.length === 0) return false
  const firstEntryGroup = menuList[0]
  if (firstEntryGroup.children && firstEntryGroup.children.length > 0) {
    if (firstEntryGroup.redirect) {
      const targetEntryPage = firstEntryGroup.children.filter(item => item.path === firstEntryGroup.redirect)
      return targetEntryPage.length > 0 ? targetEntryPage[0] : firstEntryGroup.children[0]
    } else {
      return firstEntryGroup.children[0]
    }
  } else {
    return firstEntryGroup
  }
}
