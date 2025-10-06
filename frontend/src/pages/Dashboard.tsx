import { useState } from "react";
import api from "../services/api";
import UserLocation from "../components/Dashboard/UserLocation";
import { motion } from "framer-motion";

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  isFavorite: boolean;
}

const Dashboard = () => {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: "City Park", latitude: 22.5726, longitude: 88.3639, isFavorite: false },
    { id: 2, name: "Community Center", latitude: 22.5740, longitude: 88.3700, isFavorite: false },
  ]);

  const toggleFavorite = (id: number) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, isFavorite: !loc.isFavorite } : loc
      )
    );
  };

  const sendSOS = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      try {
        const res = await api.post("/sos/send", { latitude, longitude });
        alert("🚨 SOS sent successfully to your favorites!");
        console.log("SOS Response:", res.data);
      } catch (err: any) {
        console.error(err.response?.data || err.message);
        alert("Failed to send SOS");
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-3xl font-bold mb-6"
      >
        Dashboard
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Map Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-gray-500 dark:text-gray-300 text-lg"
          >
            🗺 Map will appear here
          </motion.p>
        </motion.div>
        {/* Nearby Locations & Actions */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-6"
        >
          <UserLocation />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-3">Nearby Safe Locations</h2>
            <ul className="space-y-3">
              {locations.map((loc, index) => (
                <motion.li
                  key={loc.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md hover:shadow-lg flex justify-between items-center transition-all duration-200 cursor-pointer"
                >
                  <span className="font-medium">{loc.name}</span>
                  <motion.button
                    onClick={() => toggleFavorite(loc.id)}
                    whileTap={{ scale: 0.95, transition: { duration: 0.05, ease: "easeOut" } }}
                    className={`text-lg transition-colors duration-200 ${loc.isFavorite ? "text-yellow-400" : "text-gray-400 hover:text-yellow-300"}`}
                  >
                    ⭐
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          {/* Emergency SOS Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.1 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(220, 38, 38, 0.25)",
              transition: { duration: 0.2, ease: "easeInOut" } 
            }}
            onClick={sendSOS}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 relative overflow-hidden group"
          >
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="relative z-10"
            >
              🚨 Emergency SOS
            </motion.span>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              initial={{ x: "-100%" }}
              whileHover={{
                x: "0%",
                transition: { duration: 0.25, ease: "easeInOut" } // smooth in and out
              }}
            />
          </motion.button>


        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
