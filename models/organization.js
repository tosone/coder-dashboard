import mongoose from '.';

const Schema = mongoose.Schema;

mongoose.model('organization', new Schema({
  name: String,
  website: String,
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}));
