import React, { useState } from 'react';
import type { StoryData } from '../types/Story';


interface StoryCardProps {
  story: StoryData;
}

/**
 * A card component to display a user's story or testimonial.
 * It shows a snippet of the story initially and can be expanded to show the full story.
 *
 * @param {StoryCardProps} props - The props for the component.
 * @param {StoryData} props.story - The story data object containing name, image, snippet, and full story.
 * @returns {React.ReactElement} The rendered StoryCard component.
 */
const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg border border-transparent hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-primary/20">
      <div className="flex items-start gap-4">
        <img src={story.imageUrl} alt={story.name} className="w-16 h-16 rounded-full object-cover border-2 border-secondary/50" />
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{story.name}</h4>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm leading-relaxed">
            {isExpanded ? story.fullStory : `"${story.snippet}"`}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-semibold text-primary dark:text-secondary hover:underline mt-3"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;