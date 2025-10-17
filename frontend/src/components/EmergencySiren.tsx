import { useState } from 'react';
import { useEmergencySiren } from '../hooks/useEmergencySiren';
import api from '../services/api';

// Custom SVG icons to replace lucide-react
const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
);

const StopCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
  </svg>
);

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

interface EmergencySirenProps {
  /**
   * If true, also triggers SOS notification when siren is activated
   */
  integrateWithSOS?: boolean;
  
  /**
   * Custom callback when siren starts
   */
  onSirenStart?: () => void;
  
  /**
   * Custom callback when siren stops
   */
  onSirenStop?: () => void;
  
  /**
   * Button size variant
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Show as floating action button
   */
  floating?: boolean;
}

export default function EmergencySiren({
  integrateWithSOS = true,
  onSirenStart,
  onSirenStop,
  size = 'large',
  floating = false
}: EmergencySirenProps) {
  const [isSendingSOS, setIsSendingSOS] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sosSuccess, setSOSSuccess] = useState(false);

  const {
    isPlaying,
    isLoading,
    playSiren,
    stopSiren
  } = useEmergencySiren({
    volume: 1.0,
    onPlay: () => {
      onSirenStart?.();
      if (integrateWithSOS) {
        handleSOSIntegration();
      }
    },
    onStop: () => {
      onSirenStop?.();
    },
    onError: (error) => {
      console.error('Siren error:', error);
      alert('Failed to play siren. Please check your device permissions.');
    }
  });

  // Handle SOS integration
  const handleSOSIntegration = async () => {
    if (!integrateWithSOS) return;

    setIsSendingSOS(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        })
      );

      const { latitude, longitude } = position.coords;
      
      const res = await api.post("/sos/send", {
        message: "🚨 EMERGENCY SIREN ACTIVATED! Immediate assistance needed!",
        location: { type: "Point", coordinates: [longitude, latitude] },
      });

      console.log("SOS Response:", res.data);
      setSOSSuccess(true);
      
      // Show success message
      setTimeout(() => setSOSSuccess(false), 5000);
      
    } catch (error: any) {
      console.error("❌ Failed to send SOS:", error.response?.data || error.message);
      // Don't block siren if SOS fails
      alert("Siren activated, but failed to send SOS notification. Please contact emergency services directly.");
    } finally {
      setIsSendingSOS(false);
    }
  };

  // Confirmation dialog for first-time use
  const handleSirenClick = () => {
    if (!isPlaying && !showConfirmation) {
      setShowConfirmation(true);
    } else if (isPlaying) {
      stopSiren();
    }
  };

  const confirmAndActivate = () => {
    setShowConfirmation(false);
    playSiren();
  };

  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-16 text-2xl';
      case 'medium':
        return 'w-24 h-24 text-4xl';
      case 'large':
        return 'w-32 h-32 text-5xl';
      default:
        return 'w-32 h-32 text-5xl';
    }
  };

  // Floating button classes
  const getFloatingClasses = () => {
    if (!floating) return '';
    return 'fixed bottom-6 right-6 z-50 shadow-2xl';
  };

  return (
    <>
      {/* Main Siren Button */}
      <div className={`relative ${getFloatingClasses()}`}>
        <button
          onClick={handleSirenClick}
          disabled={isLoading}
          className={`
            ${getSizeClasses()}
            rounded-full font-bold shadow-lg
            transition-all duration-300 transform
            ${isPlaying 
              ? 'bg-red-600 hover:bg-red-700 animate-pulse scale-110' 
              : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            text-white flex flex-col items-center justify-center
            border-4 border-white dark:border-gray-800
            ${isPlaying ? 'ring-4 ring-red-300 dark:ring-red-700' : ''}
          `}
          aria-label={isPlaying ? 'Stop Emergency Siren' : 'Activate Emergency Siren'}
        >
          {isLoading ? (
            <div className="animate-spin text-3xl">⏳</div>
          ) : isPlaying ? (
            <>
              <StopCircleIcon className="w-12 h-12 mb-1" />
              <span className="text-xs font-semibold">STOP</span>
            </>
          ) : (
            <>
              <BellIcon className="w-12 h-12 mb-1 animate-bounce" />
              <span className="text-xs font-semibold">SIREN</span>
            </>
          )}
        </button>

        {/* Status Indicators */}
        {isPlaying && (
          <div className="absolute -top-2 -right-2">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                ON
              </div>
            </div>
          </div>
        )}

        {/* SOS Integration Indicator */}
        {integrateWithSOS && isPlaying && (
          <div className="absolute -bottom-2 -left-2">
            {isSendingSOS ? (
              <div className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs font-semibold animate-pulse">
                Sending SOS...
              </div>
            ) : sosSuccess ? (
              <div className="bg-green-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                ✓ SOS Sent
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full border-4 border-red-500 animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Activate Emergency Siren?
              </h3>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                This will:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Play a <strong>loud emergency siren</strong> continuously</li>
                <li>Activate <strong>phone vibration</strong> (if supported)</li>
                {integrateWithSOS && (
                  <li>Send <strong>SOS notification</strong> to your emergency contacts with your location</li>
                )}
                <li>Continue until you manually stop it</li>
              </ul>
              <p className="text-sm text-red-600 dark:text-red-400 font-semibold mt-3">
                ⚠️ Only use in genuine emergency situations
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmAndActivate}
                className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
              >
                🚨 ACTIVATE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visual Alert Overlay when Siren is Active */}
      {isPlaying && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-red-500 animate-flash opacity-20"></div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-flash {
          animation: flash 1s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}