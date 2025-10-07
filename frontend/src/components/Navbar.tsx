import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-md">
      <Link
        to="/"
        className="text-xl font-bold text-blue-600 dark:text-blue-400"
      >
        SafeWalk
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/contact-owner">Contact</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/login">Login</Link>
        <Link to="/emergency">Emergency</Link>
        <Link to="/about-us">About Us</Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
