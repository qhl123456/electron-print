const { defineConfig } = require("@vue/cli-service");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      mainProcessWatch: ["src/electron-service/*/*"], //手动配置监听文件
      nodeIntegration: true,
      chainWebpackMainProcess: (config) => {
        config.output.filename("background.js");
      },
      builderOptions: {
        productName: "打印组件",
        appId: "com.qhys",
        copyright: "QHYS",
        win: {
          icon: "public/favicon.png", //图标路径
          artifactName: "print.${ext}",
          target: [
            {
              target: "nsis", //利用nsis制作安装程序
              // target: 'portable', //单文件免安装版
              arch: [
                "x64", //64位
                // "ia32" //32位
              ],
            },
          ],
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowToChangeInstallationDirectory: true, // 是否允许修改安装目录
          allowElevation: true, // 允许请求提升。 如果为false， 则用户必须使用提升的权限重新启动安装程序。
        },
        publish: [
          {
            provider: "generic",
            url: `${process.env.VUE_APP_FEED_URL}/printComponents/`,
          },
        ],
      },
    },
  },
  lintOnSave: false,
});
