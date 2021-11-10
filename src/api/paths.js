/**
 * @Author:
 * @Description:后台服务地址
 * @Date: Created in 14:11 2019/1/4
 * @Modified by:
 */
export const common = {

  getNavigators: 'json/nav.json',
  getButtons: 'json/btnAuth.json', // 获取按钮权限
  // getNavigators: "/api/navigator",
  searchPage: 'pcc/query/v1/searchPage', // 通用查询
  projectFormList: 'pcc/approve/v1/project/{projectId}/form/projectFormList', // 表单list
  dictionaryNamepath: 'dcc/dictionary/v1/namepath', // 数据字典,名称
  dictionaryValuepath: 'dcc/dictionary/v1/valuepath', // 数据字典,值
  process: 'dap/business/v1/exposed/process',
  saveForm: 'pcc/approve/v1/project/{projectId}/save',
  getProjectByPid: 'pdt/planning/v1/project/getProjectInfoById', // 根据pid获取项目详情
  getProjectResourceList: 'pcc/approve/v1/project/{projectId}/projectResourceList',
  addDirectory: 'pcc/approve/v1/project/{projectId}/material/directory/create', // 材料添加目录
  upload: 'pcc/approve/v1/project/{projectId}/material/upload',
  download: 'pcc/approve/v1/project/{projectId}/material/{materialId}',
  deleteMaterial: 'pcc/approve/v1/project/{projectId}/material/{materialId}/delete',
  deleteMaterialDir: 'pcc/approve/v1/project/{projectId}/material/directory/{dirInstId}/delete', // 删除目录
  getHtmlFormData: 'pcc/approve/v1/project/html/form/content', // 获取表单锚点
  deleteProject: 'pcc/approve/v1/project/{projectId}/delete',
  getReportUrl: 'pcc/approve/v1/project/{projectId}/report/runqian/url', // 报表
  importFile: 'pcc/approve/v1/projectbuild/excel/import', // 文件导入
  exportExcel: 'pcc/query/v1/export/excel', // 导出
  getSubmitList: 'pcc/approve/v1/process/submit-activities',
  getMaterialList: 'pcc/approve/v1/project/{projectId}/materialList',
  getAllOrgTree: 'dcc/orup/v1/getAllOrgTree',
  editFileName: 'pcc/approve/v1/project/{projectId}/material/{materialId}/save', // 编辑文件名称
  editDirName: 'pcc/approve/v1/project/{projectId}/material/directory/{dirInstId}/update', // 编辑目录名称
  downloadMaterial: 'pcc/approve/v1/project/{projectId}/material/{materialId}',
  changePassword: 'dcc/orup/v1/user/password/update', // 修改密码
  // 常用语
  listPractice: 'pcc/approve/v1/practice/person',
  savePractice: 'pcc/approve/v1/practice/person/save',
  deletePractice: 'pcc/approve/v1/practice/{practiceId}/person/delete'
}
