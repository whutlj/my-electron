import slash from 'slash';
const path = require('path');

function resolvePath(dir) {
  return path.resolve(__dirname, './', dir);
}

export default {
  outputPath: '../../app/dist/renderer',
  publicPath: './',
  history: 'hash',
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: {
          immer: true
        },
        antd: true,
        dynamicImport: false,
        title: '花音直播'
      }
    ]
  ],
  alias: {
    '@': resolvePath(''),
    '@css': resolvePath('assets/css'),
    '@img': resolvePath('assets/img'),
    '@js': resolvePath('assets/js'),
    '@utils': resolvePath('utils'),
    '@api': resolvePath('api')
  },
  externals(context, request, callback) {
    const isDev = process.env.NODE_ENV === 'development';
    let isExternal = false;
    const load = ['electron', 'fs', 'path', 'os', 'child_process'];
    if (load.includes(request)) {
      isExternal = `require('${request}')`;
    }
    const appDeps = Object.keys(require('../../app/package').dependencies);
    if (appDeps.includes(request)) {
      const orininalPath = slash(path.join(__dirname, '../../app/node_modules', request));
      const requireAbsolute = `require('${orininalPath}')`;
      isExternal = isDev ? requireAbsolute : `require('${request}')`;
    }
    // const CDNJs = ['immutable'];
    // const CDNMap = {
    //   immutable: 'Immutable'
    // };
    // if (CDNJs.includes(request)) {
    //   isExternal = CDNMap[request];
    // }
    callback(null, isExternal);
  },
  chainWebpack(config, { webpack }) {
    config.set('target', 'electron-renderer');
  }

  // manifest: {
  //   basePath: '/'
  // }
};
