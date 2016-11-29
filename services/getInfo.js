import request from 'request';
import mongoose from 'mongoose';
import Promise from 'bluebird';

const models = mongoose.models;
const seneca = require('.');

seneca.add({ role: 'waka', cmd: 'getinfo' }, (args, callback) => {
  request.get({
    url: 'https://wakatime.com/api/v1/users/tosone',
    headers: {
      'Authorization': 'Basic OGU5YjYwNjItNTJkZS00ODIxLWJjOTMtYzMzYmQyZmY4MTc0'
    }
  }, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, { code: 200, msg: JSON.parse(body) });
    }
  });
});
