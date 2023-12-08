import { ipcMain, dialog } from 'electron'
import { initMenuList } from '../mainMenu/index'

export const initPrintList = (win, print) => {
  /**
   * @method 获取打印机列表的主进程函数
   * @param isShowMessage 控制是否需要显示刷新打印机成功
   */
  ipcMain.handle('getPrintList', async (e, isShowMessage) => {
    try {
      const list = await win.webContents.getPrintersAsync()
      // 把所有打印机存储到print类里
      print.setBrowserWindowList(list)
      // 初始化顶部菜单
      initMenuList(win, list)
      isShowMessage && dialog.showMessageBox(win, { title: '打印组件', message: '刷新打印列表成功!' })
      return list
    } catch (error) {
      console.log('获取打印机列表-error', error)
    }
  })
}
