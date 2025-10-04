import api from "../services/api";

const Dashboard = () => {
  const sendSOS = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        const res = await api.post("/sos/send", {
          latitude,
          longitude,
        });

        alert("🚨 SOS sent successfully to your favorites!");
        console.log("SOS Response:", res.data);
      } catch (err: any) {
        console.error(err.response?.data || err.message);
        alert("Failed to send SOS");
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Map Placeholder */}
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg">Map</div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Nearby Locations</h2>
          <ul className="space-y-2">
            <li className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-md">
              Location 1 
              <button className="ml-4 text-blue-500">⭐ Favorite</button>
            </li>
          </ul>

          {/* Emergency SOS Button */}
          <button
            onClick={sendSOS}
            className="w-full p-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
          >
            🚨 Emergency SOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;