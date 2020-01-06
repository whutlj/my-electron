import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';


const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/home",
        "component": require('../home/index.js').default,
        "title": "主页33",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "主页33",
        "_title_default": "花音直播"
      },
      {
        "path": "/playlist",
        "component": require('../playlist/index.js').default,
        "title": "播放列表",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "播放列表",
        "_title_default": "花音直播"
      },
      {
        "path": "/drag",
        "component": require('../drag/index.js').default,
        "title": "测试",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "测试",
        "_title_default": "花音直播"
      },
      {
        "component": () => React.createElement(require('/Users/lijie/Documents/workspace/study/my-electron/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: true }),
        "_title": "花音直播",
        "_title_default": "花音直播"
      }
    ],
    "_title": "花音直播",
    "_title_default": "花音直播"
  },
  {
    "component": () => React.createElement(require('/Users/lijie/Documents/workspace/study/my-electron/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: true }),
    "_title": "花音直播",
    "_title_default": "花音直播"
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return (
<Router history={history}>
      { renderRoutes(routes, props) }
    </Router>
  );
}
