"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icons = {
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

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

export default function Map() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [safeZones, setSafeZones] = useState<any[]>([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setPosition([lat, lon]);

      // Fetch nearby safe zones (hospitals, police, pharmacies)
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:3000,${lat},${lon});
          node["amenity"="police"](around:3000,${lat},${lon});
          node["amenity"="pharmacy"](around:3000,${lat},${lon});
        );
        out;
      `;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      const data = await response.json();
      setSafeZones(data.elements || []);
    });
  }, []);

  if (!position) return <p>Loading map...</p>;

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="w-full h-96 rounded-lg z-0"
      scrollWheelZoom
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <ChangeView center={position} />

      <Marker position={position} icon={icons.user}>
        <Popup>You are here 📍</Popup>
      </Marker>

      {safeZones.map((zone, i) => {
        let icon = icons.hospital;
        if (zone.tags.amenity === "police") icon = icons.police;
        if (zone.tags.amenity === "pharmacy") icon = icons.pharmacy;

        return (
          <Marker
            key={i}
            position={[zone.lat, zone.lon]}
            icon={icon}
          >
            <Popup>
              <strong>{zone.tags.name || zone.tags.amenity}</strong>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
