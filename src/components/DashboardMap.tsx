"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div style="background-color: #154212; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function MapEffect() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function DashboardMap({ tpsList }: { tpsList: any[] }) {
  // Gunakan lokasi default jika tidak ada data TPS (Banda Aceh)
  // Fix: Gunakan field 'location' sesuai model backend
  const firstTpsWithLoc = tpsList.find(t => t.location?.coordinates);
  
  const defaultCenter: [number, number] = firstTpsWithLoc
    ? [firstTpsWithLoc.location.coordinates[1], firstTpsWithLoc.location.coordinates[0]] 
    : [5.5483, 95.3238];

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={12} 
      style={{ height: "100%", width: "100%", zIndex: 10 }}
      scrollWheelZoom={false}
    >
      <MapEffect />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {tpsList.map((tps) => {
        if (!tps.location?.coordinates) return null;
        return (
          <Marker 
            key={tps._id} 
            position={[tps.location.coordinates[1], tps.location.coordinates[0]]} 
            icon={customIcon}
          >
            <Popup>
              <div className="font-body">
                <p className="font-bold text-[#154212] mb-1">{tps.nama_tps}</p>
                <p className="text-xs text-zinc-600 mb-2">{tps.deskripsi}</p>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded">
                  Status: {tps.status_terkini}
                </span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
