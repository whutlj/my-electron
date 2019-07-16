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
        dynamicImport: false,
        title: 'umi-electron'
      }
    ]
  ],
  alias: {
    '@': resolvePath(''),
    '@css': resolvePath('assets/css'),
    '@img': resolvePath('assets/img'),
    '@utils': resolvePath('utils'),

  },
  manifest: {
    basePath: '/'
  }
};
