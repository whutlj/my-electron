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
  manifest: {
    basePath: '/'
  }
};
