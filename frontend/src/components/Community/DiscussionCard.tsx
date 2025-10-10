import React, { useState } from 'react';
import type { Discussion } from '../../types/Community';
import UserAvatar from './UserAvatar';

interface DiscussionCardProps {
  discussion: Discussion;
  onClick?: (discussion: Discussion) => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ 
  discussion, 
  onClick 
}: DiscussionCardProps) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

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

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownvoted) setIsDownvoted(false);
    setIsUpvoted(!isUpvoted);
    // TODO: API call to update vote
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUpvoted) setIsUpvoted(false);
    setIsDownvoted(!isDownvoted);
    // TODO: API call to update vote
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(discussion);
    }
  };

  const netScore = discussion.upvotes - discussion.downvotes + (isUpvoted ? 1 : 0) - (isDownvoted ? 1 : 0);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-soft hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6">
        {/* Header with pinned indicator */}
        {discussion.isPinned && (
          <div className="flex items-center mb-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              📌 Pinned
            </span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex items-start space-x-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-1 min-w-[3rem]">
            <button
              onClick={handleUpvote}
              className={`p-1 rounded-md transition-colors ${
                isUpvoted
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3l7 7h-4v7H7v-7H3l7-7z" clipRule="evenodd" />
              </svg>
            </button>
            
            <span className={`text-sm font-medium ${netScore > 0 ? 'text-primary' : netScore < 0 ? 'text-red-500' : 'text-gray-500'}`}>
              {netScore}
            </span>
            
            <button
              onClick={handleDownvote}
              className={`p-1 rounded-md transition-colors ${
                isDownvoted
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 17l-7-7h4V3h6v7h4l-7 7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Author and Meta Info */}
            <div className="flex items-center space-x-3 mb-3">
              <UserAvatar 
                name={discussion.author.name} 
                avatar={discussion.author.avatar}
                size="sm"
              />
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">
                  {discussion.author.name}
                </span>
                <span>•</span>
                <time dateTime={discussion.createdAt.toISOString()}>
                  {formatTimeAgo(discussion.createdAt)}
                </time>
                <span>•</span>
                <span className="flex items-center">
                  👁️ {discussion.views} views
                </span>
              </div>
            </div>

            {/* Title and Category */}
            <div className="mb-3">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 pr-4">
                  {discussion.title}
                </h3>
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                  style={{ 
                    backgroundColor: `${discussion.category.color}20`,
                    color: discussion.category.color 
                  }}
                >
                  {discussion.category.icon} {discussion.category.name}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {discussion.content}
              </p>
            </div>

            {/* Tags */}
            {discussion.tags && discussion.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {discussion.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
                {discussion.tags.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    +{discussion.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Footer Stats */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{discussion.replyCount} {discussion.replyCount === 1 ? 'reply' : 'replies'}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Last activity {formatTimeAgo(discussion.updatedAt)}</span>
              </div>

              {discussion.isClosed && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  🔒 Closed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;