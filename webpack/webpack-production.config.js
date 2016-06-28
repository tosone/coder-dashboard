'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = require('./config');

const webpackConfig = {
  entry: config.entry,
  devtool: 'source-map',
  output: {
    path: config.buildPath,
    filename: 'app.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    new ExtractTextPlugin('spec.css', { allChunks: true }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: config.publicDir }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: [config.nodeModulesPath],
      }, {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'),
      }
    ]
  }
};

module.exports = webpackConfig;
