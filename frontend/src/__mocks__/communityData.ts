import type { Discussion, User, Category } from '../types/Community';
import { DEFAULT_CATEGORIES } from '../constants/community';

// Mock users for discussions
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    joinDate: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    joinDate: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    joinDate: new Date('2023-03-10')
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    joinDate: new Date('2023-04-05')
  },
  {
    id: '5',
    name: 'Eva Brown',
    email: 'eva@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eva',
    joinDate: new Date('2023-05-12')
  }
];

// Mock discussions data
export const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'How to integrate real-time location tracking?',
    content: 'I\'m working on implementing real-time location tracking for the safety features. What\'s the best approach for accuracy and battery optimization?',
    author: mockUsers[0],
    category: DEFAULT_CATEGORIES.find(cat => cat.id === 'safety') as Category,
    upvotes: 15,
    downvotes: 2,
    replyCount: 8,
    views: 127,
    isPinned: true,
    isClosed: false,
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-16T14:20:00'),
    tags: ['location', 'real-time', 'battery-optimization']
  },
  {
    id: '2',
    title: 'React component architecture best practices',
    content: 'What are the recommended patterns for organizing React components in a safety-focused application? Looking for scalability and maintainability insights.',
    author: mockUsers[1],
    category: DEFAULT_CATEGORIES.find(cat => cat.id === 'frontend') as Category,
    upvotes: 23,
    downvotes: 1,
    replyCount: 12,
    views: 89,
    isPinned: false,
    isClosed: false,
    createdAt: new Date('2024-01-14T16:45:00'),
    updatedAt: new Date('2024-01-15T09:15:00'),
    tags: ['react', 'architecture', 'components']
  },
  {
    id: '3',
    title: 'AI model performance optimization',
    content: 'Our AI safety detection model is taking too long to process. Any suggestions for optimization techniques or model architecture improvements?',
    author: mockUsers[2],
    category: DEFAULT_CATEGORIES.find(cat => cat.id === 'ai') as Category,
    upvotes: 18,
    downvotes: 0,
    replyCount: 6,
    views: 156,
    isPinned: false,
    isClosed: false,
    createdAt: new Date('2024-01-13T11:20:00'),
    updatedAt: new Date('2024-01-14T08:30:00'),
    tags: ['ai', 'performance', 'optimization']
  },
  {
    id: '4',
    title: 'Database schema for user safety profiles',
    content: 'Need advice on designing the database schema for storing user safety preferences and emergency contacts. MongoDB vs PostgreSQL considerations?',
    author: mockUsers[3],
    category: DEFAULT_CATEGORIES.find(cat => cat.id === 'backend') as Category,
    upvotes: 11,
    downvotes: 3,
    replyCount: 15,
    views: 203,
    isPinned: false,
    isClosed: false,
    createdAt: new Date('2024-01-12T09:15:00'),
    updatedAt: new Date('2024-01-13T17:45:00'),
    tags: ['database', 'schema', 'mongodb', 'postgresql']
  },
  {
    id: '5',
    title: 'Bug: SOS button not responding on mobile',
    content: 'The SOS button becomes unresponsive after the app has been in background for more than 5 minutes. This is a critical issue that needs immediate attention.',
    author: mockUsers[4],
    category: DEFAULT_CATEGORIES.find(cat => cat.id === 'bugs') as Category,
    upvotes: 32,
    downvotes: 0,
    replyCount: 9,
    views: 87,
    isPinned: true,
    isClosed: false,
    createdAt: new Date('2024-01-11T14:30:00'),
    updatedAt: new Date('2024-01-12T10:20:00'),
    tags: ['critical', 'mobile', 'sos', 'background']
  },
  {
    id: '6',
    title: 'Welcome to SafePathAI Community!',
    content: 'This is our community hub where developers, safety experts, and users can collaborate on making SafePathAI better. Feel free to ask questions, share ideas, and help others!',
    author: mockUsers[0],
    category: DEFAULT_CATEGORIES.find(cat => cat.id === 'general') as Category,
    upvotes: 45,
    downvotes: 0,
    replyCount: 23,
    views: 456,
    isPinned: true,
    isClosed: false,
    createdAt: new Date('2024-01-01T12:00:00'),
    updatedAt: new Date('2024-01-15T16:30:00'),
    tags: ['welcome', 'community', 'introduction']
  }
];

export { mockUsers };