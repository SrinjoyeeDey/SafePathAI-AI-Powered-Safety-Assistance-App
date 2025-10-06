import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/favorites", label: "Favorites" },
    { to: "/login", label: "Login" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-md backdrop-blur-sm"
    >
      <motion.div
        whileHover={{ scale: 1.03, transition: { duration: 0.08, ease: "easeOut" } }}
        whileTap={{ scale: 0.97, transition: { duration: 0.05, ease: "easeOut" } }}
      >
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
          SafeWalk
        </Link>
      </motion.div>
      <div className="flex gap-4 items-center">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.to}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.08, ease: "easeOut" } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.05, ease: "easeOut" } }}
          >
            <Link 
              to={link.to} 
              className="relative px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium group"
            >
              {link.label}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.1 }}
              />
            </Link>
          </motion.div>
        ))}
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileTap={{ scale: 0.95, transition: { duration: 0.05, ease: "easeOut" } }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
        >
          <motion.span
            animate={{ rotate: theme === "dark" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </motion.span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;