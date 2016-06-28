import mongoose from 'mongoose';

const models = mongoose.models;
const seneca = require(".");

seneca.add({
  role: 'user',
  cmd: 'signup'
}, function (args, callback) {
  let User = models.user;
  User.register(new User({
    name: args.name
  }), args.pwd, err => {
    if (err) {
      callback(null, {
        code: 500,
        msg: err
      });
    } else {
      callback(null, {
        code: 200
      });
    }
  });
});
