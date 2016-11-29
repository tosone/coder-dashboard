import mongoose from 'mongoose';

const models = mongoose.models;
const seneca = require('.');

const User = models.user;

seneca.add({ role: 'user', cmd: 'signup' }, (args, callback) => {
  User.register(new User({ name: args.name }), args.pwd, err => {
    if (err) {
      callback(null, { code: 500, msg: err });
    } else {
      callback(null, { code: 200 });
    }
  });
});
