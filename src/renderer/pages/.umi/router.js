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
        "path": "/drag",
        "exact": true,
        "component": require('../drag/index.js').default,
        "_title": "花音直播",
        "_title_default": "花音直播"
      },
      {
        "path": "/home",
        "exact": true,
        "component": require('../home/index.js').default,
        "_title": "花音直播",
        "_title_default": "花音直播"
      },
      {
        "path": "/home/recommend/songList",
        "exact": true,
        "component": require('../home/recommend/songList.js').default,
        "_title": "花音直播",
        "_title_default": "花音直播"
      },
      {
        "path": "/home/recommend/topAlbum",
        "exact": true,
        "component": require('../home/recommend/topAlbum.js').default,
        "_title": "花音直播",
        "_title_default": "花音直播"
      },
      {
        "path": "/home/recommend/topList",
        "exact": true,
        "component": require('../home/recommend/topList.js').default,
        "_title": "花音直播",
        "_title_default": "花音直播"
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default,
        "_title": "花音直播",
        "_title_default": "花音直播"
      },
      {
        "path": "/playlist",
        "exact": true,
        "component": require('../playlist/index.js').default,
        "_title": "花音直播",
        "_title_default": "花音直播"
      },
      {
        "component": () => React.createElement(require('/Users/lijie/Documents/workspace/study/my-electron/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false }),
        "_title": "花音直播",
        "_title_default": "花音直播"
      }
    ],
    "_title": "花音直播",
    "_title_default": "花音直播"
  },
  {
    "component": () => React.createElement(require('/Users/lijie/Documents/workspace/study/my-electron/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false }),
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
