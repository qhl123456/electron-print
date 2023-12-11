const { app, Menu, Tray } = require('electron')
const path = require('path')
const iconSrc = path.join(__dirname, `../src/assets/tray.png`)
const exeName = '打印组件'

export const TrayInit = (win) => {
  let appIcon = null
  appIcon = new Tray(iconSrc)
  const menu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: async function () {
        app.quit()
      },
    },
  ])
  appIcon.setToolTip(exeName)
  appIcon.setContextMenu(menu)
  appIcon.on('click', (e) => {
    // 单击托盘图标显示窗口
    win.show()
  })
}
