import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface OwnerCardProps {
  name: string;
  role: string;
  bio: string;
  photoSrc?: string;
  portfolio?: string;
  badges?: string[];
}

const OwnerCard: React.FC<OwnerCardProps> = ({ name, role, bio, photoSrc, portfolio, badges = [] }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-start gap-4">
      <div className="flex items-center gap-4 w-full">
        <img src={photoSrc || '/vite.svg'} alt={name} className="w-20 h-20 rounded-full object-cover" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
        </div>
        {portfolio && (
          <a href={portfolio} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2">
            Portfolio <FaExternalLinkAlt />
          </a>
        )}
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-200">{bio}</p>

      <div className="flex flex-wrap gap-2">
        {badges.map((b) => (
          <span key={b} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{b}</span>
        ))}
      </div>
    </div>
  );
};

export default OwnerCard;
