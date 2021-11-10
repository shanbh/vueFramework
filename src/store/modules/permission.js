import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { getNavigators } from '../../api/user'
import _store from 'store2'
import _ from 'lodash'

const allRoutes = [].concat(asyncRouterMap, constantRouterMap)

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
// function hasPermission (permission, route) {
//   if (route.path === '/') return true
//   if (route.meta && route.meta.rightName) {
//     let flag = false
//     const rightName = route.meta.rightName
//     for (let i = 0, len = permission.length; i < len; i++) {
//       if (permission[i].name === rightName) {
//         flag = true
//         break
//       }
//       if (permission[i].children) {
//         const temp = [...permission[i].children].filter(item => {
//           if (item.name === rightName) {
//             return true
//           }
//           if (item.children) {
//             const temp1 = [...item.children].filter(itemB => itemB.name === rightName)
//             if (temp1.length) {
//               return true
//             }
//           }
//           return false
//         })
//         if (temp.length) {
//           flag = true
//         }
//       }
//     }
//     return flag
//   }
//   return true
// }

function hasPermission (permission, route) {
  if (route.path === '/') return true
  if (route.meta && route.meta.rightName) {
    const rightName = route.meta.rightName
    const permissionList = permission.filter(item => item.name === rightName)
    return permissionList.length > 0
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter (routerMap, permissionList) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissionList)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 生成目录,生成规则如下
 * 1、第一层（path='/'）为根目录
 * 2、根据第二层，生成顶部导航栏
 * 3、根据第二层的children生成左侧导航
 *
 * @param routerMap
 */

function createMenuList (routerMap) {
  const routers = routerMap[0].children
  const navList = []
  for (const item of routers) {
    if (!item.isMenu || item.isMenu !== 'NO_MENU') {
      const temp = {
        name: item.meta.title,
        routerName: item.name,
        icon: item.meta.icon,
        redirect: item.redirect,
        group: item.meta.group
      }
      const subMenu = []
      if (item.children && item.children.length && !item.hideChildrenInMenu) {
        createSubMenu(item.children, subMenu)
        temp.children = subMenu
      }
      navList.push(temp)
    }
  }
  return navList
}

/**
 * 生成左侧导航
 * @param routerMap
 * @param subMenu
 */

function createSubMenu (routerMap, subMenu) {
  for (const item of routerMap) {
    if (!item.isMenu) {
      const temp = {
        name: item.meta.title,
        routerName: item.name,
        icon: item.meta.icon,
        path: item.path
      }
      const thirdMenu = []
      if (item.children) {
        createSubMenu(item.children, thirdMenu)
      }
      if (thirdMenu.length) temp.children = thirdMenu
      subMenu.push(temp)
    }
  }
}

/**
 * 检查路由是否为正确路由
 * @param routes
 * @param path
 */
function findRouteByPath (routes, path) {
  for (const item of routes) {
    if (item.path === path) {
      return item
    }
    if (item.children && item.children.length > 0) {
      const res = findRouteByPath(item.children, path)
      if (res) {
        return res
      }
    }
  }
}

function flatten (arr) {
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur.children)) {
      const c = _.cloneDeep(cur)
      delete c.children
      pre.push(c)
      return pre.concat(flatten(cur.children))
    } else {
      return pre.concat(cur)
    }
  }, [])
}

/**
 * 根据权限，过滤出有权限的路由
 * @param routerMap
 * @param permissionList
 * @param map
 * @returns {*}
 */

function generate (routerMap, permissionList, map) {
  const accessedRouter = routerMap.filter(route => {
    if (checkRouterAuth(route, permissionList, map) || route.children) {
      if (route.children) {
        route.children = generate(route.children, permissionList, map)
      } else {
        return true
      }
      return checkParentRouteAuth(route)
    }
    return false
  })
  return accessedRouter
}

/**
 * 自由路由
 * 当父级路由配置权限，但是配置了子路由的权限时，
 * 检查父路由的 children.length 是否大于 0；
 * 大于 0 的时候可能是包含不需要控制权限的路由表，
 * 如果过滤出来的 children 全部是不需要控制权限的路由表的时候，该路由不应该有权限注册
 * 反之注册该路由
 * @param route
 */
function checkParentRouteAuth (route) {
  for (const item of route.children) {
    if (item.needAuth !== false) return true
  }
  return false
}

/**
 * 1、根路由默认有权限
 * 2、当路由中没有 needAuth，或者 needAuth = true 的时候，认为需要进行权限判断
 * 反之，如果 needAuth = false 的时候，认为该路由是有权限访问
 * 3、将有权限的路由信息添加至map中，便于后续生成导航栏信息
 * @param route
 * @param permissionList
 * @returns {boolean}
 */
function checkRouterAuth (route, permissionList, map) {
  if (route.path === '/') return true
  if (!route.needAuth && route.needAuth === false) return true
  if (route.meta && route.meta.rightName) {
    const flag = checkPermission(route, permissionList)
    if (flag) {
      map.set(route.meta.rightName, {
        name: route.meta.title,
        routerName: route.name,
        icon: route.meta.icon,
        redirect: route.redirect,
        group: route.meta.group
      })
    }
    return flag
  }
  return false
}

/**
 * 遍历检查当前路由是否有权限
 * 权限表已扁平化
 */
function checkPermission (route, permissionList) {
  for (const item of permissionList) {
    if (item.name === route.meta.rightName) {
      return true
    }
  }
  return false
}

/**
 * 生成导航栏信息
 * 1、遍历权限列表
 * 2、通过前面生成的 map，将 map 的信息添加至合并进导航栏中去
 * @param menuList
 * @param map
 */
function generateMenu (menuList, map) {
  for (const menu of menuList) {
    if (menu.children && menu.children.length === 0) Reflect.deleteProperty(menu, 'children')
    if (menu.children) {
      generateMenu(menu.children, map)
    }
    if (map.has(menu.name)) {
      Object.assign(menu, map.get(menu.name))
    }
  }
}

/**
 * 过滤出根节点
 * 根节点需要在构建端设置备注为 root 节点
 * @param menuList
 */
function filtrationMenuList (menuList) {
  const list = menuList.reduce((pre, cur) => {
    if (cur.remark && cur.remark === 'root') {
      return pre.concat(cur.children)
    } else {
      return pre.concat(cur)
    }
  }, [])
  return filtrationChildrenMenuList(list)
}

/**
 * 过滤掉备注为权限分组的数据
 * 权限分组  需在构建端备注为权限分组
 * @param menuList
 * @returns {*}
 */
function filtrationChildrenMenuList (menuList) {
  const list = menuList.filter(item => {
    if (item.remark && item.remark === '权限分组') {
      return false
    }
    if (item.children) {
      item.children = filtrationChildrenMenuList(item.children)
    }
    return true
  })
  return list
}

const initState = {
  routers: constantRouterMap,
  addRouters: [],
  navList: [],
  menuList: [],
  authList: []
}
_store({ permissionInitState: initState })

const state = {
  ...initState,
  initState () {
    return _store('permissionInitState')
  }
}

const permission = {
  state,
  mutations: {
    SET_NAV: (state, navList) => {
      state.navList = navList
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_MENU: (state, menuList) => {
      state.menuList = menuList
    },
    SET_AUTH: (state, authList) => {
      state.authList = authList
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        getNavigators().then(resp => {
          const menuList = filtrationMenuList(resp.menuList)
          commit('SET_NAV', menuList)
          commit('SET_AUTH', resp.buttonList)
          const map = new Map()
          const accessedRouter = generate(asyncRouterMap, flatten(menuList), map)
          const authList = menuList
          generateMenu(authList, map)
          // const accessedRouters = filterAsyncRouter(asyncRouterMap, flatten(resp.menuList))
          // const menuList = createMenuList(accessedRouters)
          commit('SET_MENU', authList)
          commit('SET_ROUTERS', accessedRouter)
          resolve()
        })
      })
    },
    CheckRoute ({ commit }, data) {
      return new Promise(resolve => {
        const res = findRouteByPath(allRoutes, data)
        resolve(res)
      })
    }
  }
}

export default permission
