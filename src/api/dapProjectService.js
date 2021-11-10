import { common } from './paths'
import request from '@/utils/request'
export default {

  getArchiveInfoById (params, data) {
    const queryParams = {
      pageIndex: 1,
      pageSize: 10,
      configFile: 'dynamicsql/archive.xml',
      configName: 'getArchiveDetail'
    }
    Object.assign(queryParams, data)

    return request({
      url: common.searchPage,
      method: 'post',
      params: params,
      data: queryParams
    })
  }

}
