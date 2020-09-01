const menu = {
  namespaced: true,
  state: {
    // 顶栏菜单
    header: [],
    // 侧栏菜单
    aside: []
  },
  actions: {},
  mutations: {
    /**
     * @description 设置顶栏菜单
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    headerSet(state: { header: object }, menu: []) {
      // store 赋值
      state.header = menu;
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    asideSet(state: { aside: object }, menu: []) {
      // store 赋值
      state.aside = menu;
    }
  }
};
export default menu;
