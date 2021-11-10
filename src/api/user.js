import request from '@/utils/request'
import axios from 'axios'

const userApi = {
  currentUser: 'dcc/orup/v1/user/currentUser',
  getUserUnit: 'dcc/orup/v1/getUserUnit', // 获取用户的单位信息
  getNavigators: 'json/nav.json'
}

/**
 * 获取用户基本信息
 */
export function getUserInfo () {
  return request({
    url: userApi.currentUser,
    method: 'get'
  })
}

/**
 * 获取用户导航权限
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getNavigators () {
  // return request({
  //   url: userApi.getNavigators,
  //   method: 'get'
  // })
  return new Promise(resolve => {
    axios.get(userApi.getNavigators).then(resp => {
      resolve(resp.data.data)
    })
  })
}

export function getUserUnit (params) {
  return request({
    url: userApi.getUserUnit,
    method: 'get',
    params: params
  })
}
