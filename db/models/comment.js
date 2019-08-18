  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Commentchema = new Schema({
  userId: { type: String, required: true, ref: 'User' },
  username: { type: String, required: true },
  entity: { type: String, required: true },
  document: { type: String, required: true },
  text: { type: String, required: true },
  parentComment: { type: ObjectId, required: false, ref: 'Comment'  },
  createdAt: { type: Date, default: Date.now }
});
Commentchema.index({ userId: 1})
Commentchema.index({ collection: 1, document: 1 })

const Comment = mongoose.model('Comment', Commentchema);


module.exports = Comment;