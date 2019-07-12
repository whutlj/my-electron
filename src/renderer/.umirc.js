export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: {
          immer: true
        },
        library: 'react',
        dynamicImport: false,
        title: 'umi-electron'
      }
    ]
  ],
  manifest: {
    basePath: '/'
  }
};
