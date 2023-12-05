import * as constance from '@/constance'

const { ipcRenderer } = require('electron')
export default {
  state: {
    /**系统打印机列表 */
    systemPrintList: [],
  },
  getters: {},
  mutations: {
    /**
     * @method 设置系统打印机列表
     */
    [constance.SET_SYSTEM_PRINT_LIST](state, printList) {
      state.systemPrintList = printList
      console.log('printList', printList)
    },
  },
  actions: {
    /**
     * @method 获取系统打印机
     */
    async getPrintList({ commit }, data) {
      const printList = await ipcRenderer.invoke('getPrintList')
      printList.forEach((item) => {
        // isDefault为true的话就代表当前打印机是默认打印机
        item.isActive = item.isDefault
      })
      commit(constance.SET_SYSTEM_PRINT_LIST, printList)
    },
  },
}
