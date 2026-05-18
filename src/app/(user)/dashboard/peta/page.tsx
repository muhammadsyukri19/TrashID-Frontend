"use client"; // Menandakan ini adalah Client Component

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import MapComponent to prevent SSR issues with Leaflet
const MapComponent = dynamic(() => import("../../../../components/MapComponent"), { ssr: false });

// Data Kab/Kota di Aceh dengan koordinat tengah perkiraan
const ACEH_CITIES = [
  { name: "Banda Aceh", lat: 5.5483, lng: 95.3238 },
  { name: "Sabang", lat: 5.8906, lng: 95.3195 },
  { name: "Lhokseumawe", lat: 5.1805, lng: 97.1406 },
  { name: "Langsa", lat: 4.4682, lng: 97.9683 },
  { name: "Subulussalam", lat: 2.6398, lng: 98.0054 },
  { name: "Aceh Besar", lat: 5.3788, lng: 95.5133 },
  { name: "Pidie", lat: 5.0805, lng: 95.9575 },
  { name: "Bireuen", lat: 5.1054, lng: 96.7029 },
  { name: "Aceh Utara", lat: 4.9754, lng: 97.2307 },
  { name: "Aceh Timur", lat: 4.6293, lng: 97.7715 },
  { name: "Aceh Tamiang", lat: 4.2694, lng: 98.0069 },
  { name: "Aceh Tengah", lat: 4.4965, lng: 96.8181 },
  { name: "Bener Meriah", lat: 4.7431, lng: 96.8407 },
  { name: "Gayo Lues", lat: 3.9515, lng: 97.3541 },
  { name: "Aceh Tenggara", lat: 3.3765, lng: 97.8080 },
  { name: "Aceh Jaya", lat: 4.7337, lng: 95.5976 },
  { name: "Aceh Barat", lat: 4.2721, lng: 96.1152 },
  { name: "Nagan Raya", lat: 4.1685, lng: 96.4419 },
  { name: "Simeulue", lat: 2.6075, lng: 96.0827 },
  { name: "Aceh Barat Daya", lat: 3.8184, lng: 96.8443 },
  { name: "Aceh Selatan", lat: 3.1492, lng: 97.2917 },
  { name: "Aceh Singkil", lat: 2.3685, lng: 97.8860 },
];

// Koordinat default Provinsi Aceh
const DEFAULT_CENTER: [number, number] = [4.6951, 96.7494];

export default function PetaTPUPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("Aceh");
  const [selectedCity, setSelectedCity] = useState("");
  const [allMarkers, setAllMarkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Fetch data dari API Backend
  useEffect(() => {
    const fetchTPSData = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
        const response = await fetch(`${API_BASE}/tps`);
        const json = await response.json();
        if (json.status === "success") {
          const tpsData = json.data.map((tps: any) => {
            let status = "Kosong";
            const currentStatus = tps.status_terkini || "kosong";
            
            if (currentStatus === "penuh") status = "Penuh";
            else if (currentStatus === "sedang") status = "Hampir Penuh";
            
            return {
              lat: tps.location?.coordinates[1],
              lng: tps.location?.coordinates[0],
              status: status,
              name: tps.nama_tps || "TPS Location",
              address: tps.deskripsi || ""
            };
          });
          // Filter out invalid markers to avoid Leaflet crash
          const validMarkers = tpsData.filter((m: any) => m.lat !== undefined && m.lng !== undefined);
          setAllMarkers(validMarkers);
        }
      } catch (error) {
        console.error("Error fetching TPS data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTPSData();
  }, []);

  // State for Map Zoom
  const [mapZoom, setMapZoom] = useState(8);

  // Sync Map Center & Zoom based on search query or selected city
  useEffect(() => {
    const queryLower = searchQuery.toLowerCase().trim();
    
    if (queryLower === "") {
      if (selectedCity === "") {
        setMapCenter(DEFAULT_CENTER);
        setMapZoom(8);
      } else {
        const foundCity = ACEH_CITIES.find(c => c.name === selectedCity);
        if (foundCity) {
          setMapCenter([foundCity.lat, foundCity.lng]);
          setMapZoom(13);
        }
      }
      return;
    }

    // 1. Check if search query matches a city/city name in Aceh
    const foundCity = ACEH_CITIES.find(
      (c) => c.name.toLowerCase().includes(queryLower) || queryLower.includes(c.name.toLowerCase())
    );

    if (foundCity) {
      setMapCenter([foundCity.lat, foundCity.lng]);
      setMapZoom(13);
      return;
    }

    // 2. Check if search query matches any specific marker (TPS)
    const matchedMarkers = allMarkers.filter((marker) => {
      const nameLower = marker.name.toLowerCase();
      const addressLower = marker.address.toLowerCase();
      return nameLower.includes(queryLower) || addressLower.includes(queryLower);
    });

    if (matchedMarkers.length > 0) {
      setMapCenter([matchedMarkers[0].lat, matchedMarkers[0].lng]);
      setMapZoom(14); // Zoom in closer to the found marker
    }
  }, [searchQuery, selectedCity, allMarkers]);

  // Filter markers based on selected city and search query
  const displayedMarkers = allMarkers.filter((marker) => {
    const cityLower = selectedCity.toLowerCase();
    const nameLower = marker.name.toLowerCase();
    const addressLower = marker.address.toLowerCase();
    
    // Match city if it's in the name OR address
    const matchCity = selectedCity === "" || 
                     nameLower.includes(cityLower) || 
                     addressLower.includes(cityLower);
                     
    const matchSearch = searchQuery === "" || 
                        nameLower.includes(searchQuery.toLowerCase()) || 
                        addressLower.includes(searchQuery.toLowerCase());
                        
    return matchCity && matchSearch;
  });

  // Handle City Change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    setUserLocation(null); 
  };

  // Get Geolocation
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          setSelectedCity(""); // Reset city filter so it shows nearby or all
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Gagal mendapatkan lokasi. Memastikan izin lokasi browser aktif.");
          setMapCenter(DEFAULT_CENTER);
        }
      );
    } else {
      alert("Browser Anda tidak mendukung fitur lokasi.");
    }
  };

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
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1000px] mx-auto bg-[#f9f9f9] min-h-screen">
        {/* Header */}
        <header className="mb-10">
          <h2 className="text-3xl font-extrabold text-[#154212] tracking-tight font-display mb-2">
            Peta TPU Provinsi Aceh
          </h2>
          <p className="text-[#42493e] font-medium text-lg">
            Pantau ketersediaan dan lokasi TPU di seluruh wilayah Aceh.
          </p>
        </header>

        {/* Search and Dropdown Filters */}
        <section className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="w-full md:max-w-md">
            <input
              type="text"
              placeholder="Cari nama TPU atau alamat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 bg-[#f3f3f3] border-2 border-transparent focus:border-[#154212] focus:bg-white rounded-xl outline-none transition-all text-[#1a1c1c] font-medium placeholder:text-[#72796e]"
            />
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
            <button
              onClick={handleGetLocation}
              className="px-4 py-3 bg-[#e8f5e9] text-[#154212] border-2 border-[#154212]/20 hover:border-[#154212] hover:bg-[#d5ecd8] transition-colors rounded-xl font-body font-bold flex items-center gap-2 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-xl">my_location</span>
              Lokasi Saya
            </button>
            <select
              value={selectedProvince}
              disabled
              className="px-4 py-3 border-2 border-[#e2e2e2] rounded-xl font-body bg-gray-100 cursor-not-allowed"
            >
              <option value="Aceh">Aceh</option>
            </select>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="px-4 py-3 border-2 border-[#e2e2e2] focus:border-[#154212] rounded-xl font-body outline-none"
            >
              <option value="">Semua Kabupaten/Kota</option>
              {ACEH_CITIES.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-white rounded-3xl shadow-[0_20px_40px_rgba(21,66,18,0.04)] border border-[#e2e2e2]/50 p-4">
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
            {loading ? (
              <div className="w-full h-full bg-[#f3f3f3] flex flex-col items-center justify-center gap-4 animate-pulse">
                <div className="w-16 h-16 border-4 border-[#154212] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#154212] font-bold tracking-tight animate-bounce">Menyinkronkan Lokasi TPS...</p>
              </div>
            ) : (
              <MapComponent markers={displayedMarkers} center={mapCenter} zoom={mapZoom} userLocation={userLocation} />
            )}
          </div>
        </section>

        {/* Map Legend */}
        <section className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-[#e2e2e2]/50">
          <h4 className="font-bold text-[#154212] mb-4">Keterangan Kapasitas:</h4>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-500 rounded-full mr-3 border-2 border-white shadow-sm"></div>
              <p className="text-sm font-medium text-[#42493e]">Penuh (&gt; 80%)</p>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 border-2 border-white shadow-sm"></div>
              <p className="text-sm font-medium text-[#42493e]">Hampir Penuh (51% - 80%)</p>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-500 rounded-full mr-3 border-2 border-white shadow-sm"></div>
              <p className="text-sm font-medium text-[#42493e]">Kosong (0% - 50%)</p>
            </div>
            {userLocation && (
              <div className="flex items-center">
                <div className="w-5 h-5 bg-blue-500 rounded-full mr-3 border-2 border-white shadow-sm"></div>
                <p className="text-sm font-medium text-[#42493e]">Lokasi Anda</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

