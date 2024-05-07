import * as constance from '@/constance'

const { ipcRenderer } = require('electron')
export default {
  state: {
    /**系统打印机列表 */
    systemPrintList: [],
    fileList: [],
    fileInfo: {},
  },
  getters: {},
  mutations: {
    /**
     * @method 设置系统打印机列表
     */
    [constance.SET_SYSTEM_PRINT_LIST](state, printList) {
      state.systemPrintList = printList
    },

    SET_FILE_LIST(state, fileList) {
      state.fileList = fileList
    },
    SET_FILE_INFO(state, fileInfo) {
      state.fileInfo = fileInfo
    },
  },
  actions: {
    /**
     * @method 获取系统打印机
     * @param isShowMessage 是否需要提示语句
     */
    async getPrintList({ commit }, isShowMessage = false) {
      const printList = await ipcRenderer.invoke('getPrintList', isShowMessage)
      printList.forEach((item) => {
        // isDefault为true的话就代表当前打印机是默认打印机
        item.isActive = item.isDefault
      })
      commit(constance.SET_SYSTEM_PRINT_LIST, printList)
    },

    async getFileList({ commit }, path = '') {
      const fileList = await ipcRenderer.invoke('getPathFiles', path)
      commit('SET_FILE_LIST', fileList)
    },

    async getFileInfo({ commit }, path = '') {
      const fileInfo = await ipcRenderer.invoke('getFileInfo', path)
      commit('SET_FILE_INFO', fileInfo)
    },
  },
}
