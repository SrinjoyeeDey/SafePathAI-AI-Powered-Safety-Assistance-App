import { useState } from "react";
import api from "../services/api";
import UserLocation from "../components/Dashboard/UserLocation";

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
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Map Section */}
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-300">🗺 Map will appear here</p>
        </div>

        {/* Nearby Locations & Actions */}
        <div className="space-y-6">
          
      <UserLocation />
          <div>
            <h2 className="text-xl font-semibold mb-3">Nearby Safe Locations</h2>
            <ul className="space-y-3">
              {locations.map((loc) => (
                <li
                  key={loc.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md flex justify-between items-center"
                >
                  <span>{loc.name}</span>
                  <button
                    onClick={() => toggleFavorite(loc.id)}
                    className={`text-lg ${loc.isFavorite ? "text-yellow-400" : "text-gray-400"}`}
                  >
                    ⭐
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency SOS Button */}
          <button
            onClick={sendSOS}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all"
          >
            🚨 Emergency SOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;