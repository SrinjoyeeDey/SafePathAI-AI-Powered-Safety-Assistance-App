import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaHome,
  FaHeart,
  FaExclamationTriangle,
  FaTachometerAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaShieldAlt,
  FaChartLine,
  FaEnvelope,
  FaInfoCircle,
  FaUser,
  FaUsers
} from "react-icons/fa";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "🏠 Home", icon: FaHome },
    { path: "/dashboard", label: "📊 Dashboard", icon: FaTachometerAlt },
    { path: "/analytics", label: "📈 Analytics", icon: FaChartLine },
    { path: "/community", label: "💬 Community", icon: FaUsers },
    { path: "/favorites", label: "⭐ Favorites", icon: FaHeart },
    { path: "/emergency", label: "🚨 Emergency", icon: FaExclamationTriangle },
    { path: "/contact-owner", label: "✉️ Contact", icon: FaEnvelope },
    { path: "/about-us", label: "ℹ️ About Us", icon: FaInfoCircle },
    { path: "/login", label: "🔐 Login", icon: FaSignInAlt }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-gray-100 dark:bg-gray-800 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200 dark:border-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              onClick={closeSidebar}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
                  <FaShieldAlt className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                SafePathAI
              </span>
            </Link>

           {/* Desktop Navigation Links - ALL SECTIONS VISIBLE */}
<div className="hidden lg:flex items-center space-x-1 flex-1 justify-center px-4">
  {navLinks.map((link) => {
    const Icon = link.icon;
    const active = isActive(link.path);
    
    return (
      <Link
        key={link.path}
        to={link.path}
        className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 group"
      >
        <span className={`transition-all duration-300 whitespace-nowrap ${
          active
            ? "text-green-600 dark:text-green-400"
            : "text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400"
        }`}>
          {link.label}
        </span>
        
        {/* Animated underline */}
        <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 ${
          active 
            ? "w-full" 
            : "w-0 group-hover:w-full"
        }`}></span>
        
        {/* Hover background */}
        <span className="absolute inset-0 rounded-lg bg-green-50 dark:bg-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Link>
    );
  })}
</div>

            {/* Right Side - Profile Icon, Theme Toggle & Hamburger Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Profile Icon */}
              <Link
                to="/profile"
                className="p-2 sm:p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 shadow-sm"
                aria-label="Profile"
              >
                <FaUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
              </Link>

              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 sm:p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 shadow-sm"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FaSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                ) : (
                  <FaMoon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                )}
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleSidebar}
                className="p-2 sm:p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-sm"
                aria-label="Toggle menu"
              >
                {isSidebarOpen ? (
                  <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <FaBars className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
              <FaShieldAlt className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              SafePathAI
            </h2>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Close sidebar"
          >
            <FaTimes className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="p-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeSidebar}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  active
                    ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 shadow-sm border-l-4 border-green-500"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${
                  active ? "text-green-500" : "text-gray-500 dark:text-gray-400"
                }`} />
                <span className="text-base">{link.label}</span>
                
                {active && (
                  <span className="ml-auto">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2025 SafePathAI. Stay Safe.
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
