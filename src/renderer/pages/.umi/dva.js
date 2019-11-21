import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  app.use(require('/Users/lijie/Documents/workspace/study/my-electron/node_modules/dva-immer/dist/index.js')());
  app.model({ namespace: 'g', ...(require('/Users/lijie/Documents/workspace/study/my-electron/src/renderer/models/g.js').default) });
app.model({ namespace: 'index', ...(require('/Users/lijie/Documents/workspace/study/my-electron/src/renderer/models/index.js').default) });
app.model({ namespace: 'play', ...(require('/Users/lijie/Documents/workspace/study/my-electron/src/renderer/models/play.js').default) });
app.model({ namespace: 'playlist', ...(require('/Users/lijie/Documents/workspace/study/my-electron/src/renderer/models/playlist.js').default) });
app.model({ namespace: 'user', ...(require('/Users/lijie/Documents/workspace/study/my-electron/src/renderer/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
