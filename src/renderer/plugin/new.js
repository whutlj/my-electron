const path = require('path');

export default (api, opts = {}) => {
  // 监听配置变化
  const { watchDir } = opts;
  api.onOptionChange(newOpts => {
    opts = newOpts;
    api.rebuildTmpFiles('自定义插件参数改变');
    console.log('参数改变');
    api.refreshBrowser();
  });
  // dev server启动之前
  api.beforeDevServer(() => {
    api.log.debug('before dev server');
  });
  // dev server启动之后
  api.afterDevServer(({ serve, devServerPort }) => {
    api.log.debug('after dev server', devServerPort);
  });
  // umi dev / umi build 开始
  api.onStart(() => {
    console.log('开始');
  });

  api.onDevCompileDone(({ isFirstCompile, stats }) => {
    api.log.debug('dev compile 完成', isFirstCompile);
  });
  // html 重新构建时触发
  api.onHTMLRebuild(() => {
    api.log.debug('html重新构建');
  });

  api.addHTMLMeta({
    name: 'keywords',
    content: '李杰，umijs，plugin'
  });
  if (watchDir) {
    console.log(watchDir);
    if (Array.isArray(watchDir)) {
      api.addPageWatcher(watchDir);
    } else {
      api.addPageWatcher([watchDir]);
    }
  }
  api.addEntryCodeAhead(`
    console.log('THIS IS UMI PLUGIN RENDER AHEAD');
  `);
  api.addEntryCode(`
    console.log('THIS IS UMI PLUGIN RENDER')
  `);
  // api.modifyHTMLChunks(() => {
  //   return 'wyy';
  // });
  // api.onPatchRoute(route => {
  //   console.log('获取单个路由的配置时触发', route);
  // });
};
