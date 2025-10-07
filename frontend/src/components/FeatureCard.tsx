import React from 'react';
import type { IconType } from 'react-icons';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <Icon className="text-4xl text-primary mx-auto mb-5" />
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;