"use strict";

var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    filename: path.resolve(__dirname, 'src/main.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 9000,
    compress: true,
    hot: true,
    "static": {
      directory: path.join(__dirname, 'dist')
    }
  }
};