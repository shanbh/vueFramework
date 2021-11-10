## 1、defaultSettings.js
默认配置参数

## router.config.js
系统路由表
### asyncRouterMap
异步路由表，该部分路由为动态注册，需要通过权限表进行过滤。
```js
{
  path: '/home/index',
  name: 'appHome', 
  needAuth: false,
  component: () => import('@v/home/Home.vue'),
  meta: { title: '首页', rightName: '首页', group: 'NO_GROUP', keepAlive: true, icon： ’icon-shujuzhulu‘ }
}
```
参数说明：
1、needAuth: 是否需要通过权限表进行过滤，当设置为 true 或者不设置的时候表示需要通过过滤，设置为 false 的时候表示不需要通过过滤，默认为true
2、meta：
title：页面的名称（用于页签使用）
rightName：对应权限表的名称，需要在权限表中严格匹配
group：页签分组，当设置为 NO_GROUP 或者不设置的时候，表示没有页签
icon: 图标
keepAlive: 页面是否需要缓存，keepAlive = true 或者不设置的时候表示需要缓存

## 2、constantRouterMap
静态路由，进入系统会直接注册



