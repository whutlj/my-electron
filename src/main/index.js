const { app, BrowserWindow } = require('electron');
const { join } = require('path');

// 全局窗口
let globalWin;
app.on('ready', appReady);
app.on('window-all-closed', () => {
  console.log(process.platform);
  if (process.platform !== 'darwin') {
    // macOS
    app.quit();
  }
});
app.on('activate', () => {
  if (globalWin === null) {
    appReady();
  }
});

function appReady() {
  globalWin = new BrowserWindow({
    width: 960,
    height: 480
  });
  const filePath = join(__dirname, '..', 'renderer');
  // 加载页面
  globalWin.loadFile(`${filePath}/index.html`);
  // 打开开发者工具
  globalWin.webContents.openDevTools();

  globalWin.on('close', () => {
    globalWin = null;
  });
}
