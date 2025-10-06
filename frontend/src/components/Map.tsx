"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ICONS = {
  user: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
    iconSize: [30, 30],
  }),
  hospital: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    iconSize: [25, 25],
  }),
  police: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2332/2332902.png",
    iconSize: [25, 25],
  }),
  pharmacy: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966313.png",
    iconSize: [25, 25],
  }),
};

function RecenterMap({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

export default function Map({ onSafeZonesFetched }: { onSafeZonesFetched?: (zones: any[]) => void }) {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [safeZones, setSafeZones] = useState<any[]>([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setUserPos([lat, lon]);

      // Fetch nearby safe zones via Overpass API
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:3000,${lat},${lon});
          node["amenity"="police"](around:3000,${lat},${lon});
          node["amenity"="pharmacy"](around:3000,${lat},${lon});
        );
        out;
      `;

      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
        });
        const data = await response.json();
        const zones = data.elements || [];
        setSafeZones(zones);

        if (onSafeZonesFetched) {
          // Pass to Dashboard: only top 3 hospitals
          const hospitals = zones.filter((z: any) => z.tags.amenity === "hospital").slice(0, 3);
          onSafeZonesFetched(hospitals);
        }
      } catch (err) {
        console.error("Failed to fetch nearby places:", err);
      }
    });
  }, [onSafeZonesFetched]);

  if (!userPos) return <p>Loading map...</p>;

  return (
    <MapContainer center={userPos} zoom={13} className="w-full h-96 rounded-lg z-0" scrollWheelZoom>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <RecenterMap coords={userPos} />

      <Marker position={userPos} icon={ICONS.user}>
        <Popup>You are here 📍</Popup>
      </Marker>

      {safeZones.map((zone, idx) => {
        let icon = ICONS.hospital;
        if (zone.tags.amenity === "police") icon = ICONS.police;
        if (zone.tags.amenity === "pharmacy") icon = ICONS.pharmacy;

        return (
          <Marker key={idx} position={[zone.lat, zone.lon]} icon={icon}>
            <Popup>
              <strong>{zone.tags.name || zone.tags.amenity}</strong>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
