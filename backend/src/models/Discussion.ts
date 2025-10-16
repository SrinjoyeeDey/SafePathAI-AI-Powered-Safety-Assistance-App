import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
    maxlength: 5000
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'ai', 'safety', 'general', 'bugs'],
    default: 'general'
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
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
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  replyCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isClosed: {
    type: Boolean,
    default: false
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
discussionSchema.index({ category: 1, createdAt: -1 });
discussionSchema.index({ author: 1, createdAt: -1 });
discussionSchema.index({ tags: 1 });
discussionSchema.index({ isPinned: -1, lastActivity: -1 });
discussionSchema.index({ 
  title: 'text', 
  content: 'text', 
  tags: 'text' 
}, {
  name: 'search_index',
  weights: {
    title: 10,
    content: 5,
    tags: 3
  }
});

// Virtual for net score (upvotes - downvotes)
discussionSchema.virtual('netScore').get(function() {
  return this.upvotes - this.downvotes;
});

// Middleware to update lastActivity when discussion is modified
discussionSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.lastActivity = new Date();
  }
  next();
});

// Static methods
discussionSchema.statics.findByCategory = function(category: string, options = {}) {
  const query = category === 'all' ? {} : { category };
  return this.find(query, null, options)
    .populate('author', 'name email avatar joinDate')
    .sort({ isPinned: -1, lastActivity: -1 });
};

discussionSchema.statics.searchDiscussions = function(searchQuery: string, filters = {}) {
  const query: any = {
    $text: { $search: searchQuery },
    ...filters
  };
  
  return this.find(query, { score: { $meta: 'textScore' } })
    .populate('author', 'name email avatar joinDate')
    .sort({ score: { $meta: 'textScore' }, isPinned: -1 });
};

// Instance methods
discussionSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

discussionSchema.methods.updateReplyCount = async function() {
  const Reply = mongoose.model('Reply');
  this.replyCount = await Reply.countDocuments({ discussionId: this._id });
  this.lastActivity = new Date();
  return this.save();
};

export default mongoose.model('Discussion', discussionSchema);