const is = require('electron-is');
const { Tray, Menu } = require('electron');
const App = require('../index.js');
const { join } = require('path');
class TaryHandle {
  constructors(props) {
    this.trayIcon = '';
    this.tray = null;
  }
  initTary() {
    if (this.tray) return;
    if (is.dev()) {
      this.trayIcon = '/Users/lijie/Documents/workspace/study/my-electron/src/main/static/img/tray-icon.png';
    } else {
      this.trayIcon = join($dirname, './img/tray-icon.png');
    }
    this.tray = new Tray(this.trayIcon);
    this.tray.setToolTip('花音直播');
    // const contextMenu = Menu.buildFromTemplate([{ label: 'Item1', type: 'radio' }, { label: 'Item2', type: 'radio' }]);
    // Make a change to the context menu
    // contextMenu.items[1].checked = false;

    // Call this again for Linux because we modified the context menu
    // this.tray.setContextMenu(contextMenu);
    this.initEvent();
  }
  initEvent() {
    this.tray.on('click', () => {
      App.showWin();
    });
  }

  setHighlightMode(val) {
    if (this.tray) {
      this.tray.setHighlightMode(val)
    }
  }
}

module.exports = new TaryHandle();
