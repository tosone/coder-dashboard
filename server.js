import fs from 'fs';
import Koa from 'koa';
import http from 'http';
import path from 'path';
import https from 'https';

import webpack from 'webpack';
import Promise from 'bluebird';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const readFile = Promise.promisify(fs.readFile);

import config from './config';

const webpackConfig = require('./webpack.config');

const app = new Koa();

const compile = webpack(webpackConfig);
app.use(webpackDevMiddleware(compile, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compile));

app.use(async(ctx, next) => {
  ctx.body = {
    code: 200,
  };
});

http.createServer(app.callback()).listen(config.clientHttpPort, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running at http://127.0.0.1:${config.clientHttpPort}.`);
  }
});

https.createServer({
  key: readFile('pem/privatekey.pem'),
  cert: readFile('pem/certificate.pem'),
}, app.callback()).listen(config.clientHttpsPort, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running at http://127.0.0.1:${config.clientHttpsPort}.`);
  }
});
