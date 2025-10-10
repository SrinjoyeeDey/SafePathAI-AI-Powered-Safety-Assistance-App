import React from 'react';
import type { CommunityFilter, Category } from '../../types/Community';

interface SearchFilterBarProps {
  filter: CommunityFilter;
  onFilterChange: (filter: CommunityFilter) => void;
  categories: Category[];
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filter,
  onFilterChange,
  categories
}: SearchFilterBarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      searchQuery: e.target.value
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filter,
      category: e.target.value || undefined
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filter,
      sortBy: e.target.value as CommunityFilter['sortBy']
    });
  };

  const clearFilters = () => {
    onFilterChange({
      sortBy: 'latest',
      timeRange: 'all'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-soft">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            🔍 Search Discussions
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by title, content, or tags..."
            value={filter.searchQuery || ''}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            🏷️ Category
          </label>
          <select
            id="category"
            value={filter.category || ''}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            📊 Sort By
          </label>
          <select
            id="sort"
            value={filter.sortBy || 'latest'}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          >
            <option value="latest">Latest Activity</option>
            <option value="popular">Most Popular</option>
            <option value="most-replies">Most Replies</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filter.searchQuery || filter.category) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Filters:</span>
          
          {filter.searchQuery && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Search: "{filter.searchQuery}"
              <button
                onClick={() => onFilterChange({ ...filter, searchQuery: undefined })}
                className="ml-2 hover:text-primary/80"
              >
                ×
              </button>
            </span>
          )}
          
          {filter.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
              {categories.find(c => c.id === filter.category)?.icon}{' '}
              {categories.find(c => c.id === filter.category)?.name}
              <button
                onClick={() => onFilterChange({ ...filter, category: undefined })}
                className="ml-2 hover:text-secondary/80"
              >
                ×
              </button>
            </span>
          )}
          
          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;