import request from '../../utils/request'

function isJSON (str) {
  if (typeof str == 'string') {
    try {
      var obj=JSON.parse(str)
      if (typeof obj == 'object' && obj ) {
        return true
      }else{
        return false
      }
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

/**
 *获取表单js
 */

export function getForm (_params) {
  const url = 'form/revision/content'
  return request({
    url: url,
    method: 'get',
    params: _params
  })
}

/**
 * 获取表单数据
 *
 */

export function getFormData (params) {
  const url = 'pcc/approve/v1/project/{projectId}/data'
  return request({
    url: url.replace(/\{projectId\}/, params.projectId),
    method: 'get',
    params: params
  })
}

/**
 * 获取mis表单数据
 */

export function getMisFormData (params) {
  const url = 'pcc/approve/v1/customdata/getData'
  return request({
    url: url,
    method: 'post',
    params: params
  })
}

/**
 * 监听
 *
 */
export function onMessage(name, callback) {
  function handleMessage($event) {
    const flag = isJSON($event.data);
    if(flag){
      let _temp = $event.data.replace('undefined', '""');
      // var data = eval("(" + _temp + ")");
      let data = JSON.parse(_temp);
      if (data.type === name || data.name === name) {
        window.removeEventListener('message', handleMessage,  { passive: false});
        callback($event.data);
      }
    }
  }
  window.addEventListener('message', handleMessage, { passive: false});
}
