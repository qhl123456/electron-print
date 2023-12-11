'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import path from 'path'
import WinState from 'electron-win-state'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import electronService from './electron-service'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

// 通过检查第二个实例启动时的事件来避免多个实例运行
const gotTheLock = app.requestSingleInstanceLock()
const winState = new WinState({
  defaultWidth: 1000,
  defaultHeight: 800,
})

let win

async function createWindow() {
  // Create the browser window.

  const config = {
    ...winState.winOptions,
    minWidth: 400, // 设置最小宽度
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      webSecurity: false, //允许跨域访问本地图片
      webviewTag: true,
    },
  }
  win = new BrowserWindow(config)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  winState.manage(win)
}

// Quit when all windows are closed.
// 当所有的窗口都被关闭时触发。
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 当应用被激活时发出
// 各种操作都可以触发此事件, 例如首次启动应用程序、尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它。
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (!gotTheLock) {
    // 如果运行了第二个实例，就关闭
    app.quit()
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      if (win) {
        if (win.isMinimized()) {
          win.restore()
        }
        win.focus()
      }
    })
    createWindow()
    electronInit()
    win.on('closed', () => {
      win = null
    })
  }
})

/**
 * @method 初始化electron事件
 */
function electronInit() {
  process.env.WEBPACK_DEV_SERVER_URL && win.setIcon(path.join(__dirname, `../public/favicon.png`))
  const print = new electronService.Print(win)
  electronService.initPrintList(win, print)
}
