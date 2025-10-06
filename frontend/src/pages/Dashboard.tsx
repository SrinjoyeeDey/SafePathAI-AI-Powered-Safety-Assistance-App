"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map from "../components/Map";
import api from "../services/api";
import UserLocation from "../components/Dashboard/UserLocation";

interface SafeZone {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: "hospital" | "police" | "pharmacy";
  isFavorite: boolean;
}

export default function Dashboard() {
  const [locations, setLocations] = useState<SafeZone[]>([]);

  // Callback to receive safe zones from Map component
  const handleSafeZones = (zones: any[]) => {
    // Only take hospitals for the dashboard list (top 3)
    const hospitals = zones
      .filter((z: any) => z.tags.amenity === "hospital")
      .slice(0, 3)
      .map((z: any, idx: number) => ({
        id: z.id || idx,
        name: z.tags.name || "Unnamed Hospital",
        latitude: z.lat,
        longitude: z.lon,
        type: "hospital" as const,
        isFavorite: false,
      }));
    setLocations(hospitals);
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
        // Replace with your backend SOS API if needed
        alert(
          `🚨 SOS sent to favorites! (Lat: ${latitude}, Lon: ${longitude})`
        );
      } catch (err: any) {
        console.error(err);
        alert("Failed to send SOS");
      }
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Map Section */}
        <Map onSafeZonesFetched={handleSafeZones} />

        {/* Nearby Locations & Actions */}
        <div className="space-y-6">
          
      <UserLocation />
          <div>
            <h2 className="text-xl font-semibold mb-3">Nearby Hospitals</h2>
            {locations.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            ) : (
              <ul className="space-y-3">
                {locations.map((loc) => (
                  <li
                    key={loc.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md flex justify-between items-center"
                  >
                    <span>{loc.name}</span>
                    <button
                      onClick={() => toggleFavorite(loc.id)}
                      className={`text-lg ${
                        loc.isFavorite ? "text-yellow-400" : "text-gray-400"
                      }`}
                    >
                      ⭐
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigate to Emergency Screen */}
          <Link to="/Emergency">
            <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all">
              🚨 Open Emergency Screen
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
