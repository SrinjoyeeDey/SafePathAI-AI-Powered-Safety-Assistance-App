import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 dark:bg-[#111111]/40 border-b border-white/20 dark:border-gray-700/20 transition-all duration-300 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-lg md:text-xl font-bold text-[#32CD32] tracking-tight"
        >
          SafeWalk
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {["Dashboard", "Favorites", "Login", "Emergency", "Sign-Up"].map(
            (item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className="text-base text-black dark:text-white hover:text-[#1E90FF] dark:hover:text-[#32CD32] transition-colors"
              >
                {item}
              </Link>
            )
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-[#32CD32]/30 dark:bg-[#1E90FF]/30 border border-white/20 dark:border-gray-600/20 hover:scale-105 transition"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-black dark:text-white"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/70 dark:bg-[#111111]/70 backdrop-blur-md border-t border-gray-300 dark:border-gray-700 flex flex-col items-center space-y-4 py-4 md:hidden text-base text-black dark:text-white">
          {["Dashboard", "Favorites", "Login", "Emergency", "Sign-Up"].map(
            (item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "")}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#1E90FF] dark:hover:text-[#32CD32] transition-colors"
              >
                {item}
              </Link>
            )
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-[#32CD32]/30 dark:bg-[#1E90FF]/30 border border-white/20 dark:border-gray-600/20"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
