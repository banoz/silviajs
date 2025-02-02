var webpack = require('webpack');
var path = require('path')
var TerserPlugin = require("terser-webpack-plugin");
var NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
var env = 'dev';
var WebpackDevServer = require('webpack-dev-server');

var appName = 'main';
var host = '0.0.0.0';
var port = '5000';

var plugins = [new NodePolyfillPlugin()], outputFile;

if (env === 'build') {
  plugins.push(new TerserPlugin());
  outputFile = appName + '.min.js';
} else {
  outputFile = appName + '.js';
}

console.log('outputFile:', outputFile);
console.log('dist:', path.join(__dirname, 'dist'));

var config = {
  entry: './src/index.js',
  //devtool: 'source-map',
  /*output: {
    path: path.join(__dirname, 'dist'),
    filename: outputFile,
    publicPath: path.join(__dirname, 'public')
  },*/
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  mode: 'development',
  plugins: plugins,
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 5000,
    /*devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      publicPath: path.join(__dirname, 'public'),
      serverSideRender: true,
      writeToDisk: true,
    },*/
  }
};

module.exports = config;
