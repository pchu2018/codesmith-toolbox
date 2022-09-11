const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [path.resolve(__dirname, 'src', 'index.js'),
  'webpack-hot-middleware/client?reload=true'],
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/bundle'
  },
  devServer: {
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname)
    },
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
              "targets": "defaults"
            }],
            '@babel/preset-react'
            ]
          }
        }]
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}