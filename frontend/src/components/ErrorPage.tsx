import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaShieldAlt, FaExclamationTriangle, FaSearch, FaRobot } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

interface ErrorPageProps {
  errorCode?: number;
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode = 404,
  title,
  message,
  showBackButton = true
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Default content based on error code
  const getErrorContent = () => {
    if (errorCode === 404) {
      return {
        title: title || 'Page Not Found',
        message: message || 'The page you are looking for seems to have taken a different path. Don\'t worry, our AI safety assistant is here to help you find your way back.',
        icon: FaSearch,
        gradient: 'from-blue-500 to-indigo-600',
        bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
      };
    } else if (errorCode === 500) {
      return {
        title: title || 'Server Error',
        message: message || 'Something went wrong on our end. Our AI safety system is analyzing the issue and working to resolve it quickly.',
        icon: FaExclamationTriangle,
        gradient: 'from-red-500 to-rose-600',
        bgGradient: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20'
      };
    } else {
      return {
        title: title || 'Oops! Something went wrong',
        message: message || 'An unexpected error occurred. Please try again or contact support if the problem persists.',
        icon: FaExclamationTriangle,
        gradient: 'from-yellow-500 to-orange-600',
        bgGradient: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
      };
    }
  };

  const { title: errorTitle, message: errorMessage, icon: Icon, gradient, bgGradient } = getErrorContent();

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 ${bgGradient}`}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 animate-pulse ${gradient}`} style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 animate-pulse ${gradient}`} style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header Section */}
          <div className={`px-6 py-8 sm:px-8 sm:py-10 bg-gradient-to-br ${gradient} relative`}>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative text-center">
              <div className="mb-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm shadow-lg animate-bounce`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
                {errorCode}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {errorTitle}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="text-center space-y-6">
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {errorMessage}
              </p>

              {/* AI Assistant Animation */}
              <div className="flex items-center justify-center space-x-3 text-green-600 dark:text-green-400 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="relative">
                  <FaRobot className="w-8 h-8 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm font-medium">AI Safety Assistant</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                {showBackButton && (
                  <button
                    onClick={() => navigate(-1)}
                    className="group relative px-6 py-3 w-full sm:w-auto bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <FaArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>Go Back</span>
                  </button>
                )}

                <Link
                  to="/"
                  className={`group relative px-6 py-3 w-full sm:w-auto bg-gradient-to-r ${gradient} hover:shadow-lg text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <FaHome className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Back to Home</span>
                  <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>

              {/* Additional Help */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-700 animate-fade-in" style={{ animationDelay: '1s' }}>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <FaShieldAlt className="w-4 h-4 text-green-500" />
                  <span>SafePathAI - Your Safety Assistant</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  If you continue to experience issues, please contact our support team or try refreshing the page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-4 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-3/4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '2s' }}></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
