import BasicLayout from '../components/Layout/BasicLayout'
import UserLayout from '@c/Layout/UserLayout'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/home/index',
    children: [
      {
        path: '/home/index',
        name: 'appHome',
        component: () => import('@v/home/Home.vue'),
        meta: { title: '首页', rightName: '首页', group: 'NO_GROUP', keepAlive: true }
      },
      {
        path: '/approve',
        name: 'approve',
        component: RouteView,
        meta: { title: '业务审批', rightName: '业务审批', group: 'approve', keepAlive: true },
        redirect: '/approval/boxToDo',
        children: []
      },
      {
        path: '/approval/boxToDo',
        name: 'boxToDo',
        component: () => import('@/views/approve/BoxToDo'),
        meta: {
          title: '在办箱',
          icon: 'icon-shujuzhulu',
          group: 'approve',
          keepAlive: true,
          authGroupName: '',
          rightName: '业务审批-在办箱'
        }
      },
      {
        path: '/approval/boxDone',
        name: 'boxDone',
        component: () => import('@/views/approve/BoxToDo'),
        meta: {
          title: '已办箱',
          icon: 'icon-shujuzhulu',
          group: 'approve',
          keepAlive: true,
          rightName: '业务审批-已办箱'
        }
      },
      {
        path: '/approval/boxEnd',
        name: 'boxEnd',
        component: () => import('@/views/approve/BoxEnd'),
        meta: {
          title: '办结箱',
          icon: 'icon-shujuzhulu',
          group: 'approve',
          rightName: '业务审批-办结箱'
        }
      },
      {
        path: '/multiMenu',
        name: 'multiMenu',
        component: RouteView,
        meta: { title: '多级目录', rightName: '多级目录', group: 'approve', icon: 'icon-jieyueguanli' },
        children: [
          {
            path: '/multiMenu/index',
            name: 'multi',
            component: () => import('@/views/approve/BoxEnd'),
            meta: { title: '子目录', rightName: '子目录', group: 'approve', icon: 'icon-jieyueguanli' }
          }
        ]
      },
      {
        path: '/formDetail/:projectId',
        name: 'formDetail',
        needAuth: false,
        iframeComponent: () => import('@/views/defaultPage/DefaultPage'),
        meta: {
          title: '案件详情',
          group: 'HAS_GROUP',
          pageType: 'iframeForm',
          authGroupName: {
            readonly: '只读表单',
            normApply: '指标申请-在办表单',
            levyTodo: '土地征收-在办表单'
          }
        }
      }
    ]
  }
  // {
  //   path: '*', redirect: '/404', hidden: true
  // }
]
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/defaultPage',
    name: 'defaultPage',
    component: () => import('@/views/defaultPage/DefaultPage')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  // {
  //   path: '/',
  //   name: 'test',
  //   component: UserLayout,
  //   redirect: '/index',
  //   children: [
  //     {
  //       path: '/index',
  //       name: 'page',
  //       component: () => import('@v/home/Home.vue'),
  //       meta: { title: '首页', rightName: '首页', group: 'NO_GROUP', keepAlive: true }
  //     },
  //     {
  //       path: '/detail',
  //       name: 'detail',
  //       component: () => import('@v/home/Detail.vue'),
  //       meta: { title: '首页', rightName: '首页', group: 'NO_GROUP', keepAlive: true }
  //     }
  //   ]
  // }
]
