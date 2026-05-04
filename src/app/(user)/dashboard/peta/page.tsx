"use client"; // Menandakan ini adalah Client Component

import React, { useState } from "react";

export default function PetaTPUPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("D.I. Yogyakarta");
  const [selectedCity, setSelectedCity] = useState("");
  const [markers, setMarkers] = useState([
    { lat: -7.7801, lng: 110.3695, status: "Kosong" },
    { lat: -7.7742, lng: 110.3671, status: "Hampir Penuh" },
    { lat: -7.7690, lng: 110.3620, status: "Penuh" },
  ]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0,24&display=swap');

          .font-headline, .font-display { font-family: 'Manrope', sans-serif; }
          .font-body { font-family: 'Inter', sans-serif; }

          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }

          /* Styling untuk peta dummy */
          .dummy-map {
            width: 100%;
            height: 500px;
            background-color: #e2e2e2;
            position: relative;
            border-radius: 12px;
          }

          /* Styling untuk marker pada dummy map */
          .marker {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: green; /* Default untuk "Kosong" */
          }

          .marker.hampir-penuh {
            background-color: yellow;
          }

          .marker.penuh {
            background-color: red;
          }
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1000px] mx-auto bg-[#f9f9f9] min-h-screen">
        {/* Header */}
        <header className="mb-10">
          <h2 className="text-3xl font-extrabold text-[#154212] tracking-tight font-display mb-2">
            Peta TPU
          </h2>
          <p className="text-[#42493e] font-medium text-lg">
            Cari lokasi TPU berdasarkan provinsi dan kabupaten/kota.
          </p>
        </header>

        {/* Search and Dropdown Filters */}
        <section className="flex justify-between mb-8">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 bg-[#f3f3f3] border-2 border-transparent focus:border-[#154212] focus:bg-white rounded-xl outline-none transition-all text-[#1a1c1c] font-medium placeholder:text-[#72796e]"
            />
          </div>
          <div className="flex gap-6">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-4 py-3 border-2 border-[#e2e2e2] rounded-xl font-body"
            >
              <option value="D.I. Yogyakarta">D.I. Yogyakarta</option>
              {/* Add more provinces as options */}
            </select>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 border-2 border-[#e2e2e2] rounded-xl font-body"
            >
              <option value="">Pilih Kabupaten/Kota</option>
              <option value="Kota Yogyakarta">Kota Yogyakarta</option>
              {/* Add more cities as options */}
            </select>
          </div>
        </section>

        {/* Dummy Map Section */}
        <section className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(21,66,18,0.04)] border border-[#e2e2e2]/50 p-8">
          <div className="relative dummy-map">
            {markers.map((marker, index) => (
              <div
                key={index}
                className={`marker ${
                  marker.status === "Kosong"
                    ? ""
                    : marker.status === "Hampir Penuh"
                    ? "hampir-penuh"
                    : "penuh"
                }`}
                style={{
                  top: `${(marker.lat + 7.78) * 10}px`,
                  left: `${(marker.lng - 110.36) * 10}px`,
                }}
              />
            ))}
          </div>
        </section>

        {/* Map Legend */}
        <section className="mt-8">
          <div className="flex gap-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <p className="text-sm">Penuh</p>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <p className="text-sm">Hampir Penuh</p>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <p className="text-sm">Kosong</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}