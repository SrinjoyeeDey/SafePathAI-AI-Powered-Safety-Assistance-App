"use client";

import { useState } from "react";

export default function SOSButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSOS = async () => {
    if (!navigator.geolocation) {
      setMessage("❌ Geolocation not supported by this browser.");
      return;
    }

    setLoading(true);
    setMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // ✅ Use the correct API path same as backend and Dashboard
          const res = await fetch("/sos/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: new Date().toISOString(),
            }),
          });

          if (res.ok) {
            setMessage("✅ SOS Alert Sent Successfully!");
          } else {
            const err = await res.json();
            setMessage(`❌ Failed to send SOS: ${err.message || "Unknown error"}`);
          }
        } catch (error) {
          console.error(error);
          setMessage("❌ Network error while sending SOS.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        setMessage("❌ Failed to get location. Please enable GPS.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 space-y-6">
      <button
        onClick={handleSOS}
        disabled={loading}
        className="w-48 h-48 rounded-full bg-red-600 text-white text-3xl font-bold shadow-lg hover:bg-red-700 transition disabled:opacity-50"
        aria-label="Send SOS Alert"
      >
        {loading ? "Sending..." : "SOS"}
      </button>
      {message && (
        <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-200">
          {message}
        </p>
      )}
    </div>
  );
}
