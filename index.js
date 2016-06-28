import fs from 'fs';
import Koa from 'koa';
import path from 'path';
import http from 'http';
import https from 'https';

import Promise from 'bluebird';
import serve from 'koa-static';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';

import models from './models';
import config from './config';

const readFile = Promise.promisify(fs.readFile);

require('./services');
require('./passport');

const app = new Koa();

app.use(bodyParser());
const router = require('./routers');

app.use(require('./logger'));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(convert(serve('./public')));

http.createServer(app.callback()).listen(config.httpPort, () => {
  console.log(`Server running at http://127.0.0.1:${config.httpPort}.`);
});

https.createServer({
  key: readFile('pem/privatekey.pem'),
  cert: readFile('pem/certificate.pem'),
}, app.callback()).listen(config.httpsPort, () => {
  console.log(`Server running at https://127.0.0.1:${config.httpsPort}.`);
});
