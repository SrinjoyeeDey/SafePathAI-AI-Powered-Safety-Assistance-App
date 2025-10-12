
import React from 'react';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';

const UserLocation: React.FC = () => {
  const { user } = useAuth();
  const { location } = useLocation();

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  // Get display address (prefer manual address if set, otherwise use GPS address)
  const displayAddress = location.manualAddress || location.address;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-sm w-full mx-auto border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <span role="img" aria-label="Location pin" className="text-2xl">
          {location.manualAddress ? "✏️" : "📍"}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {location.manualAddress ? "Your Address" : "Your Location"}
          </h3>
          
          {location.isLoading && (
            <p className="text-gray-700 dark:text-gray-300 animate-pulse">
              Fetching location...
            </p>
          )}
          
          {location.error && (
            <p className="text-red-500 dark:text-red-400 text-sm font-medium">
              {location.error}
            </p>
          )}
          
          {displayAddress && (
            <p className="text-gray-900 dark:text-white font-medium truncate" title={displayAddress}>
              {displayAddress}
            </p>
          )}
          
          {!displayAddress && !location.isLoading && !location.error && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Location not set
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLocation;