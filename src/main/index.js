const { app, BrowserWindow } = require('electron');
const { join } = require('path');
const is = require('electron-is');
const log = require('electron-log');
const eventInstance = require('./event/index.js');
const trayInstance = require('./tray/index.js');
// 全局窗口
let globalWin;
eventInstance.initEvent();
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
  trayInstance.initTary();
  globalWin = new BrowserWindow({
    width: 1400,
    height: 960,
    useContentSize: true,
    webPreferences: {
      preload: app.getAppPath('exe') + '/preload/index.js',
      nodeIntegration: false
    }
    // backgroundColor: '#2e2c29'
    // frame: false
    // titleBarStyle: 'hidden'
    // titleBarStyle: 'hiddenInset'
  });
  // 加载页面
  if (is.dev()) {
    globalWin.loadURL('http://localhost:8000');
    // globalWin.loadURL('file://' + app.getAppPath('exe') + '/index.html')
    log.info('本地加载', 'http://localhost:8000');
    // log.info('本地加载', 'file://' + app.getAppPath('exe') + '/index.html');
    // globalWin.setProgressBar(0.5)
  } else {
    const filePath = join($dirname, '..', 'renderer');
    log.info(`file://${filePath}/index.html`);
    globalWin.loadURL(`file://${filePath}/index.html`);
  }
  // 无边框窗口可拖拽在开发者工具打开时会失效
  globalWin.webContents.openDevTools();

}

function showWin() {
  if (globalWin) {
    globalWin.show();
  } else {
    appReady();
  }
}
module.exports.showWin = showWin;
