import mongoose  from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  author: String,
  type: String,
  privateLink: String,
  publicLink: String,
  tags: [String],
  format: String,
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;