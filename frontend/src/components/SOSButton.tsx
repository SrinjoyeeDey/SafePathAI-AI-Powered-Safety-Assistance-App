import api from "../services/api";

const SOSButton = () => {
  const handleSOS = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const { latitude, longitude } = position.coords;
      const res = await api.post("/sos/send", {
        message: "Emergency! Please help me.",
        location: { type: "Point", coordinates: [longitude, latitude] },
      });

      alert("✅ SOS sent successfully!");
      console.log("SOS Response:", res.data);
    } catch (error: any) {
      console.error("❌ Failed to send SOS:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to send SOS");
    }
  };

  return (
    <button
      onClick={handleSOS}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
    >
      🚨 Send SOS
    </button>
  );
};

export default SOSButton;
