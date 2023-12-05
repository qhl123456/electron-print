import { ipcMain, BrowserWindow } from 'electron'
export class Print {
  constructor(win) {
    /** 系统打印机对应的打印窗体数组 */
    this.browserWindowList = []

    /**主窗体对象 */
    this.win = win
    this.handleTestPrint()
  }

  setBrowserWindowList(printList) {}

  handleTestPrint() {
    ipcMain.on('handle_print', (e, { htmlText, deviceName }) => {
      // 创建一个新的隐藏窗口，用于打印
      let printWindow = new BrowserWindow({ show: false, width: 1920, height: 1080, contextIsolation: false, enableRemoteModule: true, nodeIntegration: true, webSecurity: false })
      printWindow.loadURL('data:text/html,' + encodeURIComponent(htmlText))
      printWindow.webContents.print({ deviceName, silent: true })
    })
  }

  /**
   * @method 延时执行
   * @param {*} ms 毫秒
   */
  async delay(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms))
  }
}
