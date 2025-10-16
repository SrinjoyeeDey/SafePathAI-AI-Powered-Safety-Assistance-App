import React from 'react';

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  name, 
  avatar, 
  size = 'md',
  className = ''
}: UserAvatarProps) => {
  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getBackgroundColor = (name: string) => {
    // Generate a consistent color based on name
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    const charSum = name
      .split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    return colors[charSum % colors.length];
  };

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${getBackgroundColor(name)}
        rounded-full 
        flex 
        items-center 
        justify-center 
        text-white 
        font-medium
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;