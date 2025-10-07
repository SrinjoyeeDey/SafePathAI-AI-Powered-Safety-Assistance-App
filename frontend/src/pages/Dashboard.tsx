"use client";

import { useState } from "react";

import { Link } from "react-router-dom";
import Map from "../components/Map";

import api from "../services/api";
import UserLocation from "../components/Dashboard/UserLocation";
import { motion } from "framer-motion";

interface SafeZone {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: "hospital" | "police" | "pharmacy";
  isFavorite: boolean;
}


const Dashboard = () => {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: "City Park", latitude: 22.5726, longitude: 88.3639, isFavorite: false },
    { id: 2, name: "Community Center", latitude: 22.5740, longitude: 88.3700, isFavorite: false },
  ]);

interface OverpassElement {
  id: number;
  lat: number;
  lon: number;
  tags?: {
    amenity: string;
    name?: string;
  };
}

const TYPE_EMOJI: Record<SafeZone["type"], string> = {
  hospital: "🏥",
  police: "🚓",
  pharmacy: "💊",
};

export default function Dashboard() {
  const [locations, setLocations] = useState<SafeZone[]>([]);
  const [sosLoading, setSosLoading] = useState(false);

  // Called by Map: receives up to 3 selected places (1 hospital, 1 police, 1 pharmacy)
  const handleSafeZones = (zones: OverpassElement[]) => {
    const mapped = zones.map((z: OverpassElement, idx: number) => {
      const amenity = (z.tags?.amenity || "hospital") as SafeZone["type"];
      return {
        id: z.id || idx,
        name: z.tags?.name || `${amenity} ${idx + 1}`,
        latitude: z.lat,
        longitude: z.lon,
        type: amenity,
        isFavorite: false,
      } as SafeZone;
    });

    setLocations(mapped);
  };

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

    setSosLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Get favorite locations for SOS
          const recipients = locations
            .filter((l) => l.isFavorite)
            .map((l) => l.name);

          // TODO: Replace with backend SOS endpoint when ready
          console.log("SOS Data:", {
            latitude,
            longitude,
            recipients,
            timestamp: new Date().toISOString(),
          });

          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          alert(`🚨 SOS sent!\nLocation: (${latitude.toFixed(5)}, ${longitude.toFixed(5)})\nRecipients: ${recipients.length ? recipients.join(", ") : "None selected"}`);
        } catch (err) {
          console.error("SOS error:", err);
          alert("Failed to send SOS");
        } finally {
          setSosLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Failed to get location. Please enable GPS.");
        setSosLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Safety Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Map Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Your Location</h2>
          <Map onSafeZonesFetched={handleSafeZones} />
        </div>

        {/* Nearby Locations & Actions */}
        <div className="space-y-6">
          
      <UserLocation />
          <div>
            <h2 className="text-xl font-semibold mb-3">Nearby Safe Locations</h2>
            {locations.length === 0 ? (
              <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Loading nearby locations...
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {locations.map((loc) => (
                  <li
                    key={loc.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{TYPE_EMOJI[loc.type]}</span>
                      <div>
                        <div className="font-semibold">{loc.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{loc.type}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFavorite(loc.id)}
                      className={`text-lg transition-colors ${
                        loc.isFavorite 
                          ? "text-yellow-400" 
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                      aria-label={
                        loc.isFavorite ? "Remove from favorites" : "Add to favorites"
                      }
                    >
                      {loc.isFavorite ? "★" : "☆"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Emergency Actions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Emergency Actions</h2>
            
            {/* Emergency SOS Button */}
            <button
              onClick={sendSOS}
              disabled={sosLoading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {sosLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending SOS...
                </>
              ) : (
                <>
                  🚨 Emergency SOS
                </>
              )}
            </button>

            {/* Navigate to Emergency Screen */}
            <Link to="/emergency" className="block">
              <button className="w-full py-2 mt-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors">
                Open Detailed Emergency Screen
              </button>
            </Link>
          </div>

          
        </div>
        
      </div>
    </motion.div>
  );
}