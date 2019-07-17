const { ipcMain, dialog } = require('electron');
const log = require('electron-log');
const fs = require('fs');
const path = require('path');

class EventHandle {
  constructor() {
    this.fileContent = '';
    this.fileExtension = '';
  }
  initEvent() {
    ipcMain.on('async-one', (event, arg) => {
      event.reply('async-one', 'main回复async-one');
      log.info('main收到async-one消息', arg);
    });
    ipcMain.on('sync-one', (event, ...arg) => {
      event.returnValue = 'main回复sync-one';
      log.info('main收到sync-one消息', arg);
    });
    ipcMain.on('showDialog', (event, arg) => {
      try {
        const { type } = arg;
        if (type === 'open') {
          dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'TXT', extensions: ['txt', 'docx', 'doc'] }] }, filePaths => {
            if (filePaths) {
              fs.stat(filePaths[0], (err, stats) => {
                if (err) {
                  log.error(err);
                  return event.reply('notice', { type: 'error', description: err.message });
                }
                fs.readFile(filePaths[0], (err, content) => {
                  if (err) {
                    return event.reply('notice', { type: 'error', description: err.message });
                  }
                  const extname = path.extname(filePaths[0]);
                  if (extname.includes('.')) {
                    this.fileExtension = extname.substr(1);
                  }
                  this.fileContent = content;
                  log.info(content);
                });
              });
            }
          });
        }
        if (type === 'save') {
          if (!this.fileContent) {
            return event.reply('notice', { type: 'warn', description: '还未选择要保存的文件' });
          }
          dialog.showSaveDialog({ properties: ['openFile'], filters: [{ name: this.fileExtension.toUpperCase(), extensions: [this.fileExtension] }] }, filename => {
            if (filename) {
              fs.writeFile(filename, this.fileContent, err => {
                if (err) {
                  event.reply('notice', { type: 'error', description: '保存文件失败' });
                  throw new err();
                }
                log.info('写入文件成功：', filename);
                this.fileContent = '';
                this.fileExtension = '';
                event.reply('notice', { type: 'success', description: '保存文件成功' });
              });
            }
          });
        }
      } catch (err) {
        log.error(err);
      }
    });
  }
}

module.exports = new EventHandle();
