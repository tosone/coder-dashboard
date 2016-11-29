const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = require('./config');

const webpackConfig = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    config.entry
  ],
  devServer: {
    contentBase: config.publicDir,
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost'
  },
  devtool: 'eval',
  output: {
    path: config.buildPath,
    filename: 'app.js'
  },
  postcss: [autoprefixer],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
    modulesDirectories: [config.nodeModulesPath]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('spec.css', { allChunks: true }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: [config.nodeModulesPath]
      }, {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      }
    ]
  }
};

module.exports = webpackConfig;
