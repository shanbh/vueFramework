import { common } from './paths'
import request from '@/utils/request'

export default {
  getDictionaryData (params) {
    return request({
      url: common.dictionaryNamepath,
      method: 'get',
      params: params
    })
  },
  getAllOrgTree (params) {
    return request({
      url: common.getAllOrgTree,
      method: 'get',
      params: params
    })
  },
  getTableList (params, data) {
    return request({
      url: common.searchPage,
      method: 'post',
      params: params,
      data: data
    })
  },
  projectFormList (params) {
    return request({
      url: common.projectFormList.replace(/\{projectId\}/, params.projectId),
      method: 'get',
      params: params
    })
  },
  saveFormData (params, data) {
    return request({
      url: common.saveForm.replace(/\{projectId\}/, params.projectId),
      method: 'post',
      params: params,
      data: data
    })
  },
  getProjectResourceList (params) {
    return request({
      url: common.getProjectResourceList.replace(/\{projectId\}/, params.projectId),
      method: 'get',
      params: params
    })
  },
  getMaterialList (params) {
    return request({
      url: common.getMaterialList.replace(/\{projectId\}/, params.projectId),
      method: 'get',
      params: params
    })
  },
  upload (params, data, callback) {
    return request({
      url: common.upload.replace(/\{projectId\}/, params.projectId),
      method: 'post',
      params: params,
      data: data,
      onUploadProgress (progressEvent) {
        if (progressEvent.lengthComputable) {
          const val = Number((progressEvent.loaded / progressEvent.total * 100).toFixed(2))
          callback(parseInt(val))
        }
      }
    })
  },
  deleteMaterial (params, data) {
    return request({
      url: common.deleteMaterial.replace(/\{projectId\}/, params.projectId).replace(/\{materialId\}/, params.materialId),
      method: 'post',
      params: params,
      data
    })
  },
  deleteMaterialDir (params, data) {
    return request({
      url: common.deleteMaterialDir.replace(/\{projectId\}/, params.projectId).replace(/\{dirInstId\}/, params.materialId),
      method: 'post',
      params: params,
      data
    })
  },
  // 材料添加目录
  addDirectory (params, data) {
    return request({
      url: common.addDirectory.replace(/\{projectId\}/, params.projectId),
      method: 'post',
      params: params,
      data
    })
  },
  // 编辑文件名称
  editFileName (params, data) {
    return request({
      url: common.editFileName.replace(/\{projectId\}/, params.projectId).replace(/\{materialId\}/, params.materialId),
      method: 'post',
      params: params,
      data
    })
  },
  // 编辑目录名称
  editDirName (params, data) {
    return request({
      url: common.editDirName.replace(/\{projectId\}/, params.projectId).replace(/\{dirInstId\}/, params.dirInstId),
      method: 'post',
      params: params,
      data
    })
  },
  downloadMaterial (params) {
    return request({
      url: common.downloadMaterial.replace(/\{projectId\}/, params.projectId).replace(/\{materialId\}/, params.materialId),
      method: 'get',
      params: params
    })
  },
  collectResource (params, data) {
    return request({
      url: common.collectResource,
      method: 'post',
      params: params,
      data: data
    })
  },
  deleteCollect (params, data) {
    return request({
      url: common.deleteCollect,
      method: 'post',
      params: params,
      data: data
    })
  },
  changePassword (params) {
    return request({
      url: common.changePassword,
      method: 'get',
      params: params
    })
  },
  listPractice (params) {
    return request({
      url: common.listPractice,
      method: 'get',
      params: params
    })
  },
  savePractice (data) {
    return request({
      url: common.savePractice,
      method: 'post',
      data: data
    })
  },
  deletePractice (params) {
    return request({
      url: common.deletePractice.replace(/\{practiceId\}/, params.practiceId),
      method: 'post',
      params: params
    })
  }
}

export function getSubmitList (params) {
  return request({
    url: common.getSubmitList,
    method: 'get',
    params: params
  })
}
