import mongoose from '.';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  salt: String,
  hash: String,
  apiKey: String,
  wakaName: String,
  scope: Number,
  avatar: String,
  organization: [{
    type: Schema.Types.ObjectId,
    ref: 'organization'
  }]
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'name',
  saltField: 'salt',
  hashField: 'hash'
});

const User = mongoose.model('user', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
