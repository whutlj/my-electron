const pluginName = 'CopyStaticPlugin';
const { exec } = require('child_process');
const webpackLog = require('webpack-log');
const log = webpackLog({ name: 'copy-static-plugin' });
const colors = require('colors');
class CopyStaticPlugin {
  constructor(arr) {
    this.arr = arr;
  }
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, compilation => {
      this.arr.forEach(item => {
        exec(`cp -r ${item.from} ${item.to}`, (error, stdout, stderr) => {
          if (error) {
            log.error(`静态文件拷贝失败: ${error}`.red);
            return;
          }
          log.info('静态文件拷贝成功'.green.bold);
          log.info('源文件目录 %s'.green.bold, item.from);
          log.info('目标文件目录 %s'.green.bold, item.to);
        });
      });
    });
  }
}

module.exports = CopyStaticPlugin;
