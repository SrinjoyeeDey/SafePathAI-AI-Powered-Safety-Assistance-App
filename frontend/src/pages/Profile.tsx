import React, { useState } from "react";
import { motion } from "framer-motion";
import EditProfileModal from "../components/EditProfileModal";
import EmergencySiren from "../components/EmergencySiren";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Dummy user data (temporary until useAuth is re-enabled)
  const auth = useAuth()
  const navigate = useNavigate();
  const user = auth?.user || {
    name: "Guest User",
    email: "guest@example.com",
    bio: "Welcome to SafePathAI — personalize your experience soon!",
    location: "Unknown",
    profilePic: "https://avatars.githubusercontent.com/u/9919?s=280&v=4",
  };

  const [showModal, setShowModal] = useState(false);
  const logout = () => {
    auth?.logout();
    alert("Logged out (stub)")
    navigate("/home");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 
                 text-gray-900 dark:text-gray-100 flex items-center justify-center px-4 py-10"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border 
                   border-gray-200 dark:border-gray-700 p-8 sm:p-10 relative overflow-hidden"
      >
        {/* Banner */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-t-2xl" />

        <div className="relative flex flex-col items-center mt-16">
          <motion.img
            src={"https://avatars.githubusercontent.com/u/9919?s=280&v=4"} // TODO: Replace with {user.profilePic} when profile image upload is implemented
            alt="Profile"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
            className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
          />

          <h1 className="mt-4 text-2xl font-semibold">{user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
          <p className="text-center mt-3 text-sm opacity-90">{user.bio}</p>
          <p className="text-xs opacity-70 mt-1">📍 {user.location}</p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex gap-4 flex-wrap justify-center"
          >
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => alert('Settings coming soon')}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 
                         dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Settings
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal Component */}
      <EditProfileModal isOpen={showModal} onClose={() => setShowModal(false)} />
        {/* Floating Emergency Siren Button */}
      <EmergencySiren 
        integrateWithSOS={true}
        size="medium"
        floating={true}
      />
    </motion.div>
  );
};

export default Profile;