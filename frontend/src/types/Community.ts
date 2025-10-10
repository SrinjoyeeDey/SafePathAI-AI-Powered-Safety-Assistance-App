export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Vote {
  id: string;
  userId: string;
  discussionId?: string;
  replyId?: string;
  type: 'upvote' | 'downvote';
  createdAt: Date;
}

export interface Reply {
  id: string;
  content: string;
  author: User;
  discussionId: string;
  parentReplyId?: string; // For nested replies
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
  votes?: Vote[];
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: User;
  category: Category;
  upvotes: number;
  downvotes: number;
  replyCount: number;
  views: number;
  isPinned: boolean;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
  replies?: Reply[];
  votes?: Vote[];
  tags?: string[];
}

export interface CommunityFilter {
  category?: string;
  searchQuery?: string;
  sortBy?: 'latest' | 'popular' | 'most-replies' | 'oldest';
  timeRange?: 'all' | 'today' | 'week' | 'month';
}

export interface CreateDiscussionData {
  title: string;
  content: string;
  categoryId: string;
  tags?: string[];
}

export interface CreateReplyData {
  content: string;
  discussionId: string;
  parentReplyId?: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#32CD32', // Primary green
    icon: '🎨'
  },
  {
    id: 'backend',
    name: 'Backend', 
    color: '#1E90FF', // Secondary blue
    icon: '⚙️'
  },
  {
    id: 'ai',
    name: 'AI & ML',
    color: '#9333EA', // Purple
    icon: '🤖'
  },
  {
    id: 'safety',
    name: 'Safety',
    color: '#DC2626', // Red
    icon: '🛡️'
  },
  {
    id: 'general',
    name: 'General',
    color: '#6B7280', // Gray
    icon: '💭'
  },
  {
    id: 'bugs',
    name: 'Bug Reports',
    color: '#F59E0B', // Amber
    icon: '🐛'
  }
];