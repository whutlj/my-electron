const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: './src/main/index.js',
  output: {
    path: path.resolve(__dirname, './app/dist/main')
  },
  target: 'electron-main',
  externals: (context, request, callback) => {
    console.log(request);
    callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
  },
  plugins: [
    new webpack.DefinePlugin({
      $dirname: '__dirname'
    })
  ]
};
