const path = require('path');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyStaticPlugin = require('./webpckPlugin/copyStaticPlugin');

module.exports = {
  mode: 'production',
  entry: './src/main/index.js',
  output: {
    path: path.resolve(__dirname, './app/dist/main')
  },
  target: 'electron-main',
  externals: (context, request, callback) => {
    callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './img/',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyStaticPlugin([
      {
        from: path.resolve(__dirname, './src/main/static'),
        to: path.resolve(__dirname, './app/dist/main/static')
      },
      {
        from: path.resolve(__dirname, './src/main/preload'),
        to: path.resolve(__dirname, './app/dist/main/preload')
      }
    ]),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      $dirname: '__dirname'
    })
  ]
};
