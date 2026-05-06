"use client";

import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icons in Next.js
const customIcon = (color: string) =>
  new L.DivIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

const userIcon = new L.DivIcon({
  className: "user-marker",
  html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(59,130,246,0.8); animation: pulse 2s infinite;"></div>
         <style>@keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); } }</style>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface MapProps {
  markers: Array<{ lat: number; lng: number; status: string; name?: string; address?: string }>;
  center: [number, number];
  zoom?: number;
  userLocation?: [number, number] | null;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5
    });
  }, [center, zoom, map]);
  return null;
}

function MapEffect() {
  const map = useMap();
  useEffect(() => {
    // Force map to recalculate size after mount to fix broken tile layouts
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function MapComponent({ markers, center, zoom = 8, userLocation }: MapProps) {
  return (
    <div className="w-full h-full relative" style={{ minHeight: "500px" }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, borderRadius: "12px", zIndex: 1 }}
      >
        <MapEffect />
        <ChangeView center={center} zoom={userLocation ? 13 : zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      
      {/* User Location Marker */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <strong>Lokasi Anda</strong>
          </Popup>
        </Marker>
      )}

      {/* TPS Markers */}
      {markers.filter(m => m.lat !== undefined && m.lng !== undefined).map((marker, index) => {
        let color = "green";
        if (marker.status === "Penuh") color = "red";
        else if (marker.status === "Hampir Penuh") color = "#eab308"; // yellow-500

        return (
          <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon(color)}>
            <Popup>
              <strong>{marker.name || "TPS Location"}</strong>
              <br />
              Status: {marker.status}
              <br />
              {marker.address && <span>{marker.address}</span>}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
    </div>
  );
}
