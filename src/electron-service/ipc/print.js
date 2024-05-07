import { ipcMain, BrowserWindow } from 'electron'
const { exec } = require('child_process')
export class Print {
  constructor(win) {
    /** 系统打印机对应的打印窗体数组 */
    this.browserWindowList = []

    /**主窗体对象 */
    this.win = win
    /**打印队列 */
    this.queue = {}
    this.handleTestPrint()
  }

  /**
   * @method 设置打印机窗口
   * @param {*} printList 打印机数组
   */
  setBrowserWindowList(printList) {
    printList.forEach((item) => {
      this.queue[item.name] = this.queue[item.name] || []
      if (!this.browserWindowList.find((browser) => browser.name === item.name)) {
        // 初始化为每个打印机对应自己的BrowserWindow,后续可以直接调用自身的browserWindow来进行打印
        this.browserWindowList.push({
          ...item,
          browserWindow: new BrowserWindow({
            width: 1920,
            height: 1080,
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true,
            webSecurity: false,
            show: false,
          }),
        })
      }
    })
  }

  /**
   * @method 添加打印任务
   * @param {*} name 打印机名称
   * @param {*} task 打印任务
   */
  addQueue(name, task) {
    if (!this.queue[name]) this.queue[name] = []
    this.queue[name].push(task)
  }

  handleTestPrint() {
    ipcMain.on('handle_print', (e, { htmlText, deviceName }) => {
      // 创建一个新的隐藏窗口，用于打印
      let printWindow = new BrowserWindow({ show: false, width: 1920, height: 1080, contextIsolation: false, enableRemoteModule: true, nodeIntegration: true, webSecurity: false })
      printWindow.loadURL('data:text/html,' + encodeURIComponent(htmlText))
      printWindow.webContents.print({ deviceName, silent: true })
    })

    ipcMain.on('delete_print_task', () => {
      // 获取当前正在打印的任务列表
      exec('lpstat -o', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error},${stdout}, ${stderr} `)
          return
        }
        // 取消打印队列中的每个任务
        stdout.split('\n').forEach((job) => {
          if (job.trim() !== '') {
            const jobId = job.split(' ')[0]
            exec(`cancel ${jobId}`, (cancelError, cancelStdout, cancelStderr) => {
              if (cancelError) {
                console.error(`cancel error: ${cancelError}`)
                return
              }
              console.log(`Cancelled print job: ${jobId}`)
            })
          }
        })
      })
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
