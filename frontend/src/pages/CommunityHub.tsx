import React, { useState, useEffect } from 'react';
import type { Discussion, CommunityFilter } from '../types/Community';
import { DEFAULT_CATEGORIES } from '../types/Community';
import SearchFilterBar from '../components/Community/SearchFilterBar';
import DiscussionCard from '../components/Community/DiscussionCard';
import CreateThreadModal from '../components/Community/CreateThreadModal';

const CommunityHub: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [filter, setFilter] = useState<CommunityFilter>({
    sortBy: 'latest',
    timeRange: 'all'
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for development - replace with API call
  useEffect(() => {
    const mockDiscussions: Discussion[] = [
      {
        id: '1',
        title: 'How to implement real-time location tracking in React?',
        content: 'I am trying to integrate GPS tracking functionality in our SafePathAI frontend. What is the best approach for accurate real-time location updates?',
        author: {
          id: '1',
          name: 'Sarah Chen',
          email: 'sarah@example.com',
          joinDate: new Date('2024-01-15')
        },
        category: DEFAULT_CATEGORIES[0], // Frontend
        upvotes: 12,
        downvotes: 1,
        replyCount: 8,
        views: 45,
        isPinned: false,
        isClosed: false,
        createdAt: new Date('2024-10-08T10:30:00'),
        updatedAt: new Date('2024-10-08T14:20:00'),
        tags: ['react', 'geolocation', 'real-time']
      },
      {
        id: '2',
        title: 'Best practices for AI safety recommendations',
        content: 'What algorithms and data sources should we consider when providing safety recommendations to users?',
        author: {
          id: '2',
          name: 'Mike Rodriguez',
          email: 'mike@example.com',
          joinDate: new Date('2024-02-20')
        },
        category: DEFAULT_CATEGORIES[2], // AI & ML
        upvotes: 18,
        downvotes: 0,
        replyCount: 15,
        views: 78,
        isPinned: true,
        isClosed: false,
        createdAt: new Date('2024-10-07T15:45:00'),
        updatedAt: new Date('2024-10-08T09:15:00'),
        tags: ['ai', 'safety', 'algorithms']
      },
      {
        id: '3',
        title: 'Express.js middleware for emergency alerts',
        content: 'Looking for guidance on structuring middleware for handling SOS alerts and emergency notifications.',
        author: {
          id: '3',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          joinDate: new Date('2024-03-10')
        },
        category: DEFAULT_CATEGORIES[1], // Backend
        upvotes: 7,
        downvotes: 0,
        replyCount: 5,
        views: 32,
        isPinned: false,
        isClosed: false,
        createdAt: new Date('2024-10-06T11:20:00'),
        updatedAt: new Date('2024-10-07T16:30:00'),
        tags: ['express', 'middleware', 'emergency']
      }
    ];
    
    // Simulate API delay
    setTimeout(() => {
      setDiscussions(mockDiscussions);
      setLoading(false);
    }, 800);
  }, []);

  const filteredDiscussions = discussions.filter((discussion: Discussion) => {
    if (filter.category && discussion.category.id !== filter.category) {
      return false;
    }
    
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      return discussion.title.toLowerCase().includes(query) ||
             discussion.content.toLowerCase().includes(query) ||
             discussion.tags?.some((tag: string) => tag.toLowerCase().includes(query));
    }
    
    return true;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    // Pinned posts always come first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    switch (filter.sortBy) {
      case 'popular':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      case 'most-replies':
        return b.replyCount - a.replyCount;
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'latest':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  const handleCreateThread = (threadData: any) => {
    // TODO: Implement API call to create new thread
    console.log('Creating thread:', threadData);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg text-text dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Community Hub 💭
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Connect, discuss, and help each other build better safety solutions
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 self-start md:self-center"
            >
              <span className="text-lg">➕</span>
              New Discussion
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <SearchFilterBar
            filter={filter}
            onFilterChange={setFilter}
            categories={DEFAULT_CATEGORIES}
          />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-soft">
            <div className="text-2xl font-bold text-primary">{discussions.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Discussions</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-soft">
            <div className="text-2xl font-bold text-secondary">
              {discussions.reduce((sum: number, d: Discussion) => sum + d.replyCount, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Replies</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-soft">
            <div className="text-2xl font-bold text-green-600">
              {discussions.reduce((sum: number, d: Discussion) => sum + d.upvotes, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Upvotes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-soft">
            <div className="text-2xl font-bold text-purple-600">
              {DEFAULT_CATEGORIES.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Categories</div>
          </div>
        </div>

        {/* Discussion List */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-soft animate-pulse">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="flex space-x-4">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedDiscussions.length > 0 ? (
            sortedDiscussions.map((discussion) => (
              <DiscussionCard 
                key={discussion.id} 
                discussion={discussion}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-12 shadow-soft text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No discussions found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {filter.searchQuery || filter.category 
                  ? "Try adjusting your search or filter criteria" 
                  : "Be the first to start a discussion!"
                }
              </p>
              {!filter.searchQuery && !filter.category && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Start a Discussion
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination (for future implementation) */}
        {sortedDiscussions.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {sortedDiscussions.length} of {discussions.length} discussions
            </div>
          </div>
        )}
      </div>

      {/* Create Thread Modal */}
      <CreateThreadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateThread}
        categories={DEFAULT_CATEGORIES}
      />
    </div>
  );
};

export default CommunityHub;