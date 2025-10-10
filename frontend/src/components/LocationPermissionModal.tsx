import React, { useState } from 'react';
import { useLocation } from '../context/LocationContext';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({ isOpen, onClose }) => {
  const { requestLocation, setManualAddress, location } = useLocation();
  const [manualAddress, setManualAddressInput] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  if (!isOpen) return null;

  const handleAllowLocation = async () => {
    await requestLocation();
  };

  const handleManualAddress = () => {
    setShowManualInput(true);
  };

  const handleSubmitManualAddress = () => {
    if (manualAddress.trim()) {
      setManualAddress(manualAddress.trim());
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        {/* Modal Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-4xl">📍</span>
                <span className="text-4xl">🚨</span>
                <span className="text-4xl">🌍</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Location Access Required
            </h2>
            <p className="text-blue-100 text-sm">
              Enable location services for enhanced safety features
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {!showManualInput ? (
              <>
                {/* Benefits */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                        Emergency Response
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        Quick access to emergency services and contacts
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">🗺️</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                        Safe Routes
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        AI-powered route recommendations and safety alerts
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                        Nearby Help
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        Find hospitals, police stations, and safe zones nearby
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAllowLocation}
                    disabled={location.isLoading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed touch-manipulation min-h-[48px]"
                  >
                    {location.isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Getting Location...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>📍</span>
                        <span>Allow Location</span>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={handleManualAddress}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] touch-manipulation min-h-[48px]"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>✏️</span>
                      <span>Enter Address Manually</span>
                    </div>
                  </button>

                  <button
                    onClick={handleSkip}
                    className="w-full py-2 px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium rounded-lg transition-colors duration-200"
                  >
                    Skip for Now
                  </button>
                </div>

                {/* Privacy Note */}
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    🔒 Your location data is encrypted and stored securely. 
                    You can change this setting anytime in your profile.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Manual Address Input */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Enter Your Address
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Provide your current location for safety features
                  </p>
                  
                  <textarea
                    value={manualAddress}
                    onChange={(e) => setManualAddressInput(e.target.value)}
                    placeholder="Enter your full address (e.g., 123 Main St, City, State, Country)"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                    rows={3}
                  />
                </div>

                {/* Manual Address Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleSubmitManualAddress}
                    disabled={!manualAddress.trim()}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed touch-manipulation min-h-[48px]"
                  >
                    Save Address
                  </button>

                  <button
                    onClick={() => setShowManualInput(false)}
                    className="w-full py-2 px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium rounded-lg transition-colors duration-200"
                  >
                    Back to Location Options
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {location.error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm text-center">
              {location.error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPermissionModal;
