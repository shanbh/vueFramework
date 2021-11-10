import permission from './modules/permission'

const getters = {
  getSidebar: state => state.nav.sidebar,
  multiTab: state => {},
  getHeaderTab: (state) => (group) => state.nav.headerTab ? state.nav.headerTab[group] || [] : [],
  getNavList: state => state.permission.navList,
  addRouters: state => state.permission.addRouters,
  getUserInfo: state => state.user.userInfo,
  getBtnAuth: state => authGroupName => state.permission.authList.filter(item => item.name === authGroupName),
  getUserUnit: state => state.user.userUnit,
  getMenuList: state => state.permission.menuList
}

export default getters
