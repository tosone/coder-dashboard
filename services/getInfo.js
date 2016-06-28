import request from 'request';
import mongoose from 'mongoose';
import Promise from 'bluebird';

const models = mongoose.models;
const seneca = require(".");


seneca.add({
  role: 'waka',
  cmd: 'getinfo'
}, function (args, callback) {
  request.get({
    url: 'https://wakatime.com/api/v1/users/tosone',
    headers: {
      "Authorization": "Basic OGU5YjYwNjItNTJkZS00ODIxLWJjOTMtYzMzYmQyZmY4MTc0"
    }
  }, (err, res, body) => {
    callback(null, {
      code: 200,
      msg: JSON.parse(body)
    });
  });
});
