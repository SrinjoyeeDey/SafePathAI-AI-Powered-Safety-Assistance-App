import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 2000
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  discussionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion',
    required: true
  },
  parentReplyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply',
    default: null
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  downvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
replySchema.index({ discussionId: 1, createdAt: 1 });
replySchema.index({ author: 1, createdAt: -1 });
replySchema.index({ parentReplyId: 1 });

// Virtual for net score
replySchema.virtual('netScore').get(function() {
  return this.upvotes - this.downvotes;
});

// Virtual for nested replies
replySchema.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'parentReplyId'
});

// Middleware to update discussion reply count and last activity
replySchema.post('save', async function() {
  const Discussion = mongoose.model('Discussion');
  await Discussion.findByIdAndUpdate(this.discussionId, {
    $inc: { replyCount: 1 },
    lastActivity: new Date()
  });
});

replySchema.post('remove', async function() {
  const Discussion = mongoose.model('Discussion');
  await Discussion.findByIdAndUpdate(this.discussionId, {
    $inc: { replyCount: -1 }
  });
});

// Static methods
replySchema.statics.findByDiscussion = function(discussionId: string, options = {}) {
  return this.find({ discussionId }, null, options)
    .populate('author', 'name email avatar joinDate')
    .sort({ createdAt: 1 });
};

replySchema.statics.findNestedReplies = function(parentReplyId: string) {
  return this.find({ parentReplyId })
    .populate('author', 'name email avatar joinDate')
    .sort({ createdAt: 1 });
};

// Instance methods
replySchema.methods.markAsEdited = function() {
  this.isEdited = true;
  this.editedAt = new Date();
  return this.save();
};

export default mongoose.model('Reply', replySchema);