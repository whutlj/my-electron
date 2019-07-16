const { ipcMain, dialog } = require('electron');
const log = require('electron-log');
const fs = require('fs');

class EventHandle {
  initEvent() {
    ipcMain.on('async-one', (event, arg) => {
      event.reply('async-one', 'main回复async-one');
      log.info('main收到async-one消息', arg);
    });
    ipcMain.on('sync-one', (event, ...arg) => {
      event.returnValue = 'main回复sync-one';
      log.info('main收到sync-one消息', arg);
    });
    ipcMain.on('uploadFile', (event, arg) => {
      const { type } = arg;
      if (type === 'user') {
        dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'TXT', extensions: ['txt'] }] }, filePaths => {
          if (filePaths) {
            fs.readFile(filePaths[0], 'utf-8', (err, content) => {
              log.info(content);
            });
          }
        });
      }
    });
  }
}

module.exports = new EventHandle();
