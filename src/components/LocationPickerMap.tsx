"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div style="background-color: #154212; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function LocationMarker({ position, setPosition }: { position: L.LatLng | null, setPosition: (pos: L.LatLng) => void }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    // Try to get user location on load
    if (!position && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const latlng = new L.LatLng(pos.coords.latitude, pos.coords.longitude);
          setPosition(latlng);
          map.flyTo(latlng, 15);
        },
        () => {
          // Fallback to Aceh
          const latlng = new L.LatLng(4.6951, 96.7494);
          setPosition(latlng);
          map.flyTo(latlng, 8);
        }
      );
    }
  }, [map, position, setPosition]);

  return position === null ? null : (
    <Marker position={position} icon={customIcon}></Marker>
  );
}

function MapEffect() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

interface LocationPickerProps {
  onConfirm: (lat: number, lng: number) => void;
  onCancel: () => void;
}

export default function LocationPickerMap({ onConfirm, onCancel }: LocationPickerProps) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#f9f9f9]">
          <div>
            <h3 className="font-bold text-lg text-[#154212]">Pilih Lokasi TPS</h3>
            <p className="text-xs text-gray-500">Geser atau klik peta untuk menentukan titik akurat lokasi laporan Anda.</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="h-[400px] relative w-full bg-gray-100">
          <MapContainer 
            center={[4.6951, 96.7494]} 
            zoom={8} 
            style={{ height: "100%", width: "100%" }}
          >
            <MapEffect />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>

        <div className="p-5 bg-white border-t border-gray-100 flex justify-between items-center">
          <div className="text-sm font-mono text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            {position ? `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}` : "Mengambil lokasi..."}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={() => position && onConfirm(position.lat, position.lng)}
              disabled={!position}
              className="px-6 py-2.5 bg-[#154212] hover:bg-[#2d5a27] text-white rounded-xl font-bold shadow-lg shadow-[#154212]/20 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">check</span>
              Konfirmasi Lokasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
