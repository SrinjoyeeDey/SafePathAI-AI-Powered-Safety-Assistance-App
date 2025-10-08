
import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface LocationState {
  address: string | null;
  error: string | null;
  loading: boolean;
}

const UserLocation: React.FC = () => {
  const [location, setLocation] = useState<LocationState>({
    address: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    
    const abortController = new AbortController();

    const fetchLocation = async () => {
      // Check browser support
      if (!navigator.geolocation) {
        setLocation({
          address: null,
          loading: false,
          error: "Geolocation is not supported by your browser.",
        });
        return;
      }

      
      const handleSuccess = async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        
        const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
        if (!MAPBOX_TOKEN) {
          console.error("Mapbox token is not configured. Add VITE_MAPBOX_TOKEN to .env.local");
          setLocation({
            address: null,
            loading: false,
            error: "Service configuration error. Please contact support.",
          });
          return;
        }

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`;

        try {
          const response = await axios.get(url, {
            signal: abortController.signal,
            timeout: 10000, 
          });
          
          const address = response.data.features?.[0]?.place_name;
          
          if (address) {
            setLocation({ address, loading: false, error: null });
          } else {
            setLocation({ 
              address: null, 
              loading: false, 
              error: "Could not find address for your location." 
            });
          }
        } catch (err) {
          
          if (axios.isCancel(err)) return;
          
          console.error("Mapbox API error:", err);
          setLocation({ 
            address: null, 
            loading: false, 
            error: "Failed to fetch address. Please try again." 
          });
        }
      };

      
      const handleError = (error: GeolocationPositionError) => {
        let errorMessage = "An unknown error occurred.";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }
        
        setLocation({
          address: null,
          loading: false,
          error: errorMessage,
        });
      };

      
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: false, 
        timeout: 10000, 
        maximumAge: 300000, 
      });
    };

    fetchLocation();

    
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-sm w-full mx-auto border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <span role="img" aria-label="Location pin" className="text-2xl">
          📍
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Your Location
          </h3>
          
          {location.loading && (
            <p className="text-gray-700 dark:text-gray-300 animate-pulse">
              Fetching location...
            </p>
          )}
          
          {location.error && (
            <p className="text-red-500 dark:text-red-400 text-sm font-medium">
              {location.error}
            </p>
          )}
          
          {location.address && (
            <p className="text-gray-900 dark:text-white font-medium truncate" title={location.address}>
              {location.address}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLocation;