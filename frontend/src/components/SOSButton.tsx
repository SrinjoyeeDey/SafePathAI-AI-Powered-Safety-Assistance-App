import React from "react";
import api from "../services/api";
import { motion } from "framer-motion";

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
    <motion.button
      onClick={handleSOS}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0 4px 24px 0 rgba(255,0,0,0.12)" }}
      whileTap={{ scale: 0.97 }}
    >
      🚨 Send SOS
    </motion.button>
  );
};

export default SOSButton;
