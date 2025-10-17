import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { Contributor } from './types';

// Custom SVG icon to replace lucide-react
const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 10-2 0v1H5V7h1a1 1 0 000-2H5z" />
  </svg>
);

// Define the type for the component's props
type ContributorCardProps = {
  contributor: Contributor;
};

const ContributorCard: React.FC<ContributorCardProps> = ({ contributor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="w-12 h-12 rounded-full border-2 border-gray-200"
            />
            <div>
              <a
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center gap-1 group"
              >
                {contributor.name || contributor.login}
                <ExternalLinkIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-600 mt-0.5">
                <span>{contributor.contributions} commits</span>
                <span className="text-green-600">{contributor.additions?.toLocaleString()} ++</span>
                <span className="text-red-600">{contributor.deletions?.toLocaleString()} --</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
            #{contributor.rank}
          </div>
        </div>
      </div>

      {/* Commit Timeline Chart */}
      <div className="p-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-1">Weekly commits</h4>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={contributor.commitData || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} width={30} />
            <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => [`${value} commits`, 'Commits']}
            />
            <Bar dataKey="commits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ContributorCard;