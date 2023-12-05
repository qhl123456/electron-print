import { ipcMain } from "electron";
export const initPrintList = (win) => {
  ipcMain.handle("getPrintList", async (e) => {
    try {
      const list = await win.webContents.getPrintersAsync();
      return list;
    } catch (error) {
      console.log("获取打印机列表-error", error);
    }
  });
};
