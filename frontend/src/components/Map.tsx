"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ICONS = {
  user: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  }),
  hospital: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
  }),
  police: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2332/2332902.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
  }),
  pharmacy: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966313.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
  }),
};

interface SafeZone {
  id: number;
  lat: number;
  lon: number;
  tags?: {
    amenity: string;
    name?: string;
  };
}

interface RecenterMapProps {
  coords: [number, number];
}

function RecenterMap({ coords }: RecenterMapProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 14);
  }, [coords, map]);
  return null;
}

interface MapProps {
  onSafeZonesFetched?: (zones: SafeZone[]) => void;
}

export default function Map({ onSafeZonesFetched }: MapProps) {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setUserPos([lat, lon]);
          setLoading(false);

          // Overpass query: hospitals, police, pharmacies within 3km
          const query = `
            [out:json][timeout:25];
            (
              node["amenity"="hospital"](around:3000,${lat},${lon});
              node["amenity"="police"](around:3000,${lat},${lon});
              node["amenity"="pharmacy"](around:3000,${lat},${lon});
            );
            out body;
          `;

          const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: `data=${encodeURIComponent(query)}`,
          });

          if (!response.ok) {
            throw new Error(`Overpass request failed: ${response.status}`);
          }

          const data = await response.json();
          const elements: SafeZone[] = data.elements || [];
          setSafeZones(elements);

          // Choose 1 hospital, 1 police station, 1 pharmacy (if available)
          const hospital = elements.find((e: SafeZone) => e.tags?.amenity === "hospital");
          const police = elements.find((e: SafeZone) => e.tags?.amenity === "police");
          const pharmacy = elements.find((e: SafeZone) => e.tags?.amenity === "pharmacy");

          const selected: SafeZone[] = [];
          if (hospital) selected.push(hospital);
          if (police) selected.push(police);
          if (pharmacy) selected.push(pharmacy);

          if (onSafeZonesFetched) onSafeZonesFetched(selected);
        } catch (err) {
          console.error("Failed to fetch nearby places:", err);
          setError("Failed to load nearby locations. Please check your connection.");
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Unable to get your location. Please enable location services.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [onSafeZonesFetched]);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!userPos) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-red-600">Unable to determine your location</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={userPos}
      zoom={13}
      className="w-full h-96 rounded-lg z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <RecenterMap coords={userPos} />

      <Marker position={userPos} icon={ICONS.user}>
        <Popup>You are here 📍</Popup>
      </Marker>

      {safeZones.map((zone, idx) => {
        const amenity = zone.tags?.amenity || "place";
        let icon = ICONS.hospital;
        if (amenity === "police") icon = ICONS.police;
        if (amenity === "pharmacy") icon = ICONS.pharmacy;

        const title = zone.tags?.name || amenity;
        const position: [number, number] = [zone.lat, zone.lon];

        return (
          <Marker key={zone.id || `zone-${idx}`} position={position} icon={icon}>
            <Popup>
              <strong>{title}</strong>
              <div className="text-sm capitalize">{amenity}</div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}