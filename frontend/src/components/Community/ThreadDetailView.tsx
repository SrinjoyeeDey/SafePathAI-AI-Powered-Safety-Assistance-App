import React, { useState, useEffect } from 'react';
import type { Discussion, Reply, CreateReplyData } from '../../types/Community';
import UserAvatar from './UserAvatar';

interface ThreadDetailViewProps {
  discussion: Discussion;
  onClose: () => void;
  onReply: (data: CreateReplyData) => void;
  onVote: (type: 'upvote' | 'downvote', targetId: string, targetType: 'discussion' | 'reply') => void;
}

const ThreadDetailView: React.FC<ThreadDetailViewProps> = ({
  discussion,
  onClose,
  onReply,
  onVote
}: ThreadDetailViewProps) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReplyContent, setNewReplyContent] = useState('');
  const [replyToId, setReplyToId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [userVotes, setUserVotes] = useState<{[key: string]: 'upvote' | 'downvote'}>({});

  // Mock data for development
  useEffect(() => {
    const mockReplies: Reply[] = [
      {
        id: 'reply-1',
        content: 'You can use the Geolocation API with React hooks. Here\'s a simple implementation:\n\n```javascript\nconst useGeolocation = () => {\n  const [position, setPosition] = useState(null);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const watchId = navigator.geolocation.watchPosition(\n      (pos) => setPosition(pos),\n      (err) => setError(err),\n      { enableHighAccuracy: true }\n    );\n    \n    return () => navigator.geolocation.clearWatch(watchId);\n  }, []);\n\n  return { position, error };\n};\n```',
        author: {
          id: 'user-2',
          name: 'Alex Thompson',
          email: 'alex@example.com',
          joinDate: new Date('2024-02-15')
        },
        discussionId: discussion.id,
        upvotes: 5,
        downvotes: 0,
        createdAt: new Date('2024-10-08T11:15:00'),
        updatedAt: new Date('2024-10-08T11:15:00')
      },
      {
        id: 'reply-2',
        content: 'Great solution! Just make sure to handle permissions properly. You might also want to add a fallback for when geolocation is not available.',
        author: {
          id: 'user-3',
          name: 'Maria Garcia',
          email: 'maria@example.com',
          joinDate: new Date('2024-01-20')
        },
        discussionId: discussion.id,
        parentReplyId: 'reply-1',
        upvotes: 2,
        downvotes: 0,
        createdAt: new Date('2024-10-08T12:30:00'),
        updatedAt: new Date('2024-10-08T12:30:00')
      },
      {
        id: 'reply-3',
        content: 'Consider using a library like react-geolocated for better error handling and more features. It abstracts away a lot of the complexity.',
        author: {
          id: 'user-4',
          name: 'David Kim',
          email: 'david@example.com',
          joinDate: new Date('2024-03-05')
        },
        discussionId: discussion.id,
        upvotes: 3,
        downvotes: 1,
        createdAt: new Date('2024-10-08T13:45:00'),
        updatedAt: new Date('2024-10-08T13:45:00')
      }
    ];

    setTimeout(() => {
      setReplies(mockReplies);
      setLoading(false);
    }, 500);
  }, [discussion.id]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const handleVote = (type: 'upvote' | 'downvote', targetId: string, targetType: 'discussion' | 'reply') => {
    const currentVote = userVotes[targetId];
    
    if (currentVote === type) {
      // Remove vote if clicking the same button
      const { [targetId]: removed, ...rest } = userVotes;
      setUserVotes(rest);
    } else {
      // Add or change vote
      setUserVotes((prev: {[key: string]: 'upvote' | 'downvote'}) => ({
        ...prev,
        [targetId]: type
      }));
    }
    
    onVote(type, targetId, targetType);
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReplyContent.trim()) return;
    
    const replyData: CreateReplyData = {
      content: newReplyContent,
      discussionId: discussion.id,
      parentReplyId: replyToId
    };
    
    onReply(replyData);
    setNewReplyContent('');
    setReplyToId(undefined);
  };

  const getNetScore = (upvotes: number, downvotes: number, targetId: string) => {
    const userVote = userVotes[targetId];
    let adjustment = 0;
    
    if (userVote === 'upvote') adjustment = 1;
    else if (userVote === 'downvote') adjustment = -1;
    
    return (upvotes - downvotes) + adjustment;
  };

  const renderReply = (reply: Reply, isNested = false) => {
    const netScore = getNetScore(reply.upvotes, reply.downvotes, reply.id);
    const userVote = userVotes[reply.id];

    return (
      <div key={reply.id} className={`${isNested ? 'ml-12 mt-4' : 'mt-6'} bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4`}>
        <div className="flex items-start space-x-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-1 min-w-[2.5rem]">
            <button
              onClick={() => handleVote('upvote', reply.id, 'reply')}
              className={`p-1 rounded-md transition-colors text-xs ${
                userVote === 'upvote'
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
            >
              ▲
            </button>
            
            <span className={`text-xs font-medium ${
              netScore > 0 ? 'text-primary' : netScore < 0 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {netScore}
            </span>
            
            <button
              onClick={() => handleVote('downvote', reply.id, 'reply')}
              className={`p-1 rounded-md transition-colors text-xs ${
                userVote === 'downvote'
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              ▼
            </button>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Author Info */}
            <div className="flex items-center space-x-3 mb-2">
              <UserAvatar 
                name={reply.author.name} 
                avatar={reply.author.avatar}
                size="sm"
              />
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">
                  {reply.author.name}
                </span>
                <span>•</span>
                <time dateTime={reply.createdAt.toISOString()}>
                  {formatTimeAgo(reply.createdAt)}
                </time>
                {reply.parentReplyId && (
                  <>
                    <span>•</span>
                    <span className="text-xs text-primary">Reply</span>
                  </>
                )}
              </div>
            </div>

            {/* Reply Content */}
            <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap mb-3">
              {reply.content}
            </div>

            {/* Reply Actions */}
            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={() => setReplyToId(reply.id)}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Reply
              </button>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                {reply.upvotes} {reply.upvotes === 1 ? 'upvote' : 'upvotes'}
              </span>
            </div>
          </div>
        </div>

        {/* Nested Replies */}
        {replies
          .filter(r => r.parentReplyId === reply.id)
          .map(nestedReply => renderReply(nestedReply, true))
        }
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="min-h-full flex items-start justify-center p-4 pt-16">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Discussion Thread
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
            <div className="p-6">
              {/* Original Post */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-primary/20 p-6 mb-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <UserAvatar 
                      name={discussion.author.name} 
                      avatar={discussion.author.avatar}
                      size="md"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {discussion.author.name}
                        </span>
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${discussion.category.color}20`,
                            color: discussion.category.color 
                          }}
                        >
                          {discussion.category.icon} {discussion.category.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatTimeAgo(discussion.createdAt)} • {discussion.views} views
                      </div>
                    </div>
                  </div>

                  {/* Vote Section for Original Post */}
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => handleVote('upvote', discussion.id, 'discussion')}
                      className={`p-2 rounded-md transition-colors ${
                        userVotes[discussion.id] === 'upvote'
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-400 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3l7 7h-4v7H7v-7H3l7-7z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <span className={`text-sm font-bold ${
                      getNetScore(discussion.upvotes, discussion.downvotes, discussion.id) > 0 
                        ? 'text-primary' 
                        : getNetScore(discussion.upvotes, discussion.downvotes, discussion.id) < 0 
                          ? 'text-red-500' 
                          : 'text-gray-500'
                    }`}>
                      {getNetScore(discussion.upvotes, discussion.downvotes, discussion.id)}
                    </span>
                    
                    <button
                      onClick={() => handleVote('downvote', discussion.id, 'discussion')}
                      className={`p-2 rounded-md transition-colors ${
                        userVotes[discussion.id] === 'downvote'
                          ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 17l-7-7h4V3h6v7h4l-7 7z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Post Title */}
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {discussion.title}
                </h1>

                {/* Post Content */}
                <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap mb-4">
                  {discussion.content}
                </div>

                {/* Tags */}
                {discussion.tags && discussion.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {discussion.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Replies Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  💬 Replies ({replies.length})
                </h3>

                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 animate-pulse">
                        <div className="flex space-x-4">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : replies.length > 0 ? (
                  <div className="space-y-1">
                    {replies
                      .filter(reply => !reply.parentReplyId)
                      .map(reply => renderReply(reply))
                    }
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-2">💭</div>
                    <p>No replies yet. Be the first to join the discussion!</p>
                  </div>
                )}
              </div>

              {/* Reply Form */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                {replyToId && (
                  <div className="mb-3 p-2 bg-primary/10 rounded text-sm text-primary">
                    Replying to a comment
                    <button
                      onClick={() => setReplyToId(undefined)}
                      className="ml-2 text-primary/70 hover:text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                
                <form onSubmit={handleSubmitReply}>
                  <div className="mb-3">
                    <textarea
                      value={newReplyContent}
                      onChange={(e) => setNewReplyContent(e.target.value)}
                      placeholder={replyToId ? "Write your reply..." : "Join the discussion..."}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               placeholder-gray-500 dark:placeholder-gray-400
                               focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {newReplyContent.length} characters
                    </span>
                    <button
                      type="submit"
                      disabled={!newReplyContent.trim()}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 
                               disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      {replyToId ? 'Reply' : 'Post Reply'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetailView;