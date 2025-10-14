import type { Category } from '../types/Community';

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