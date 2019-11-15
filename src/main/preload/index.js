const { ipcRenderer, clipboard } = require('electron');

process.on('loaded', () => {
  global.ipcRenderer = ipcRenderer;
  global.clipboard = clipboard;

});
