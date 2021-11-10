import axios from 'axios'
import qs from 'qs'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import defaultSettings from '@/config/defaultSettings'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    let type = false
      let message = ''
    switch (error.response.status) {
      case 400:
        message = `错误请求:${error.response.config.url}`
        break
      case 401:
        message = '未授权，请重新登录'
        type = true
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = `请求错误,未找到该资源:${error.response.config.url}`
        break
      case 405:
        message = '请求方法未允许'
        break
      case 408:
        message = '请求超时'
        break
      case 500:
        message = '服务器端出错'
        break
      case 501:
        message = '网络未实现'
        break
      case 502:
        message = '网络错误'
        break
      case 503:
        message = '服务不可用'
        break
      case 504:
        message = '网络超时'
        break
      case 505:
        message = 'http版本不支持该请求'
        break
      default:
        message = `连接错误${error.response.status}`
    }
    notificationMsg(message, type)
  }
  return Promise.reject(error)
}

function notificationMsg (data, type) {
  if (type) {
    window.location.href = defaultSettings.logConfig.login
  } else {
    notification.error({
      message: data
    })
  }
}

// request interceptor
request.interceptors.request.use(config => {
  config.withCredentials = true
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
  config.headers = Object.assign({}, headers, config.headers)
  if (config.headers['Content-Type'].includes('application/x-www-form-urlencoded')) {
    config.data = qs.stringify(config.data)
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data.data || response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
