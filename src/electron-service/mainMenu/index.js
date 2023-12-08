import { Menu, app } from 'electron'
const { exec } = require('child_process')

/**
 * @method 生成菜单列表
 * @param {*} win 全局窗口对象
 * @param {*} printList
 * @returns Electron.Menu
 */
function generateMenu(win, printList) {
  const menu = [
    {
      label: '工具',
      submenu: [
        {
          label: '退出',
          click: () => {
            app.quit()
          },
        },
        {
          label: '重启',
          click: () => {
            app.relaunch()
            app.quit()
          },
        },
      ],
    },
    {
      label: '打印机',
      submenu: [
        {
          label: '打印首选项',
          submenu: printList.map((item) => {
            return {
              label: item.name,
              // 为每一个打印机增加点击事件,保证通过name取执行windows打开打印机设置指令
              click: () => {
                const platform = process.platform
                if (platform === 'win32') {
                  exec(`RUNDLL32 PRINTUI.DLL,PrintUIEntry /e /n "${item.name}"`)
                } else {
                  console.error('Opening printer preferences is not supported on this platform.')
                }
              },
            }
          }),
        },
        {
          label: '刷新打印机列表',
          click: () => {
            // 向渲染进程发射刷新打印机事件
            win.webContents.send('refreshPrintList', true)
          },
        },
      ],
    },
  ]
  //开发环境下开启调试
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    menu.push({
      label: '帮助',
      submenu: [
        {
          label: '调试',
          role: 'toggleDevTools',
          accelerator: 'F12',
        },
      ],
    })
  }
  return Menu.buildFromTemplate(menu)
}

/**
 * @method 初始化菜单
 * @param {*} win 全局窗口对象
 * @param {*} printList 打印机列表
 */
export const initMenuList = (win, printList) => {
  try {
    const menuList = generateMenu(win, printList)
    Menu.setApplicationMenu(menuList)
  } catch (error) {
    console.log('error-初始化顶部菜单', error)
  }
}
