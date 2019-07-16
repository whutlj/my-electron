const { app, BrowserWindow } = require('electron');
const { join } = require('path');
const is = require('electron-is');
const log = require('electron-log');

// 全局窗口
let globalWin;
app.on('ready', appReady);
app.on('window-all-closed', () => {
  log.info('用户平台', process.platform);
  if (process.platform !== 'darwin') {
    // macOS
    app.quit();
  }
});
app.on('activate', () => {
  if (globalWin === null) {
    log.info('mac从程序坞激活');
    appReady();
  }
});

function appReady() {
  globalWin = new BrowserWindow({
    width: 960,
    height: 480
  });
  // 加载页面
  if (is.dev()) {
    const promise = globalWin.loadURL('http://localhost:8000');
    log.info('本地加载', 'http://localhost:8000');
    // globalWin.setProgressBar(0.5)
  } else {
    const filePath = join($dirname, '..', 'renderer');
    log.info(`file://${filePath}/index.html`);
    globalWin.loadURL(`file://${filePath}/index.html`);
  }
  globalWin.webContents.openDevTools();

  globalWin.on('close', () => {
    globalWin = null;
  });
}
