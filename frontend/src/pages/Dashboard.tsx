"use client";

import { useState } from "react";
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
    </div>
  );
}