import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  permissionGranted: boolean;
  permissionDenied: boolean;
  isLoading: boolean;
  error: string | null;
  manualAddress: string | null;
}

interface LocationContextType {
  location: LocationState;
  requestLocation: () => Promise<void>;
  setManualAddress: (address: string) => void;
  clearLocation: () => void;
  showLocationModal: boolean;
  setShowLocationModal: (show: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAuth();
  const [showLocationModal, setShowLocationModal] = useState(false);
  
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    address: null,
    permissionGranted: false,
    permissionDenied: false,
    isLoading: false,
    error: null,
    manualAddress: null,
  });

  // Check if user is authenticated and location permission needed
  useEffect(() => {
    if (user && token && !location.permissionGranted && !location.permissionDenied && !location.manualAddress) {
      setShowLocationModal(true);
    }
  }, [user, token, location.permissionGranted, location.permissionDenied, location.manualAddress]);

  const requestLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: "Geolocation is not supported by your browser.",
        isLoading: false,
        permissionDenied: true,
      }));
      return;
    }

    setLocation(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    };

    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      
      try {
        // Get address using Mapbox API
        const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
        if (!MAPBOX_TOKEN) {
          console.error("Mapbox token is not configured.");
          setLocation(prev => ({
            ...prev,
            latitude,
            longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            permissionGranted: true,
            isLoading: false,
            error: "Service configuration error. Using coordinates without address.",
          }));

          // Save coordinates to backend even without address
          if (token) {
            try {
              await fetch('/api/users/me/location', {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                  lat: latitude,
                  lng: longitude,
                }),
              });
            } catch (error) {
              console.error('Failed to save location to backend:', error);
            }
          }

          setShowLocationModal(false);
          return;
        }

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        const address = data.features?.[0]?.place_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        
        setLocation(prev => ({
          ...prev,
          latitude,
          longitude,
          address,
          permissionGranted: true,
          isLoading: false,
          error: null,
        }));

        // Save coordinates to backend
        if (token) {
          try {
            await fetch('/api/users/me/location', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                lat: latitude,
                lng: longitude,
              }),
            });
          } catch (error) {
            console.error('Failed to save location to backend:', error);
          }
        }

        setShowLocationModal(false);
      } catch (error) {
        setLocation(prev => ({
          ...prev,
          latitude,
          longitude,
          address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          permissionGranted: true,
          isLoading: false,
          error: "Failed to fetch address, but coordinates saved.",
        }));
        setShowLocationModal(false);
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = "An unknown error occurred.";
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied. You can enter your address manually.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out. Please try again.";
          break;
      }
      
      setLocation(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
        permissionDenied: error.code === error.PERMISSION_DENIED,
      }));
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  };

  const setManualAddress = (address: string) => {
    setLocation(prev => ({
      ...prev,
      manualAddress: address,
      permissionDenied: true,
    }));
    setShowLocationModal(false);
  };

  const clearLocation = () => {
    setLocation({
      latitude: null,
      longitude: null,
      address: null,
      permissionGranted: false,
      permissionDenied: false,
      isLoading: false,
      error: null,
      manualAddress: null,
    });
    setShowLocationModal(false);
  };

  return (
    <LocationContext.Provider value={{
      location,
      requestLocation,
      setManualAddress,
      clearLocation,
      showLocationModal,
      setShowLocationModal,
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
};
