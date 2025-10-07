import React from 'react';
import type { TeamMemberData } from '../types/Team';


interface TeamMemberCardProps {
  member: TeamMemberData;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <img
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-110"
        src={member.imageUrl}
        alt={member.name}
      />
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white">{member.name}</h4>
        <p className="text-sm text-primary dark:text-secondary">{member.role}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;