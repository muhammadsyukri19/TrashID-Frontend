"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";

const LocationPickerMap = dynamic(() => import("../../../../components/LocationPickerMap"), { ssr: false });

export default function LaporTPUPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [lokasi, setLokasi] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);
  
  const [tpsList, setTpsList] = useState<any[]>([]);
  const [selectedTpsId, setSelectedTpsId] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{lat: number, lng: number} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch TPS data for dropdown
  React.useEffect(() => {
    const fetchTps = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/tps");
        const json = await res.json();
        if (json.status === "success") {
          setTpsList(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch TPS list", err);
      }
    };
    fetchTps();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      // Show map immediately after selecting photo
      setShowMap(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!file) {
      setMessage({ type: "error", text: "Silakan pilih foto kondisi TPU." });
      return;
    }
    if (!selectedTpsId || !kondisi) {
      setMessage({ type: "error", text: "Pilih TPS dan isi Kondisi terlebih dahulu." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    // Use confirmed coordinates if available, otherwise try to get them or use fallback
    if (locationCoords) {
      sendData(locationCoords.lat, locationCoords.lng);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendData(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            sendData(4.6951, 96.7494);
          }
        );
      } else {
        sendData(4.6951, 96.7494);
      }
    }
  };

  const sendData = async (lat: number, lng: number) => {
    try {
      // Get token from localStorage (assuming user is logged in)
      const token = localStorage.getItem("token") || "";

      const formData = new FormData();
      formData.append("foto", file as Blob);
      formData.append("tps_id", selectedTpsId); 
      
      // Map kondisi (0-100) to backend scale (1-5)
      let kepenuhan = 3; // default medium
      const inputVal = kondisi.toLowerCase();
      
      if (inputVal === "penuh") {
        kepenuhan = 5;
      } else if (inputVal === "hampir penuh" || inputVal === "sedang") {
        kepenuhan = 3;
      } else if (inputVal === "kosong") {
        kepenuhan = 1;
      } else {
        const numVal = parseInt(kondisi);
        if (!isNaN(numVal)) {
          // Linear mapping: 0-20 -> 1, 21-40 -> 2, 41-60 -> 3, 61-80 -> 4, 81-100 -> 5
          kepenuhan = Math.min(5, Math.max(1, Math.ceil(numVal / 20)));
        }
      }
      
      formData.append("tingkat_kepenuhan", kepenuhan.toString());
      formData.append("lat", lat.toString());
      formData.append("lng", lng.toString());
      // API currently doesn't take deskripsi according to controller, but we can append it
      formData.append("deskripsi", deskripsi);

      const response = await fetch("http://localhost:5001/api/tps/report", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setMessage({ type: "success", text: "Laporan berhasil dikirim!" });
        // Reset form
        setFile(null);
        setPreview(null);
        setSelectedTpsId("");
        setKondisi("");
        setDeskripsi("");
        setLocationCoords(null);
      } else {
        setMessage({ type: "error", text: data.message || "Gagal mengirim laporan." });
      }
    } catch (error) {
      console.error("Submit report error:", error);
      setMessage({ type: "error", text: "Terjadi kesalahan pada server." });
    } finally {
      setIsLoading(false);
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
            Laporkan Kondisi TPU
          </h2>
          <p className="text-[#42493e] font-medium text-lg">
            Ambil atau unggah foto kondisi TPU untuk dilaporkan.
          </p>
        </header>

        {/* Content Card */}
        <section className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(21,66,18,0.04)] border border-[#e2e2e2]/50 p-8 md:p-12">
          {message && (
            <div className={`p-4 mb-6 rounded-xl font-medium ${message.type === 'success' ? 'bg-[#ebf5e9] text-[#154212] border border-[#a1d494]' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.text}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Upload/Camera Area */}
            <div 
              className="border-2 border-dashed border-[#a1d494] bg-[#f9f9f9]/80 hover:bg-[#ebf5e9] transition-colors rounded-2xl py-12 px-6 flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/jpeg, image/jpg, image/png" 
                className="hidden" 
              />
              
              {preview ? (
                <div className="w-full max-w-sm overflow-hidden rounded-xl mb-6">
                  <img src={preview} alt="Preview" className="w-full h-auto object-cover" />
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 mb-6 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[40px] text-[#154212]">
                      add_photo_alternate
                    </span>
                  </div>

                  <h3 className="font-headline text-xl font-bold text-[#154212] text-center mb-2">
                    Klik untuk Ambil atau Unggah Lokasi TPU
                  </h3>
                  <p className="text-sm text-[#72796e] mb-8 font-medium">
                    dengan format .jpg atau .jpeg
                  </p>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-[#154212]/10 hover:bg-[#154212]/20 text-[#154212] py-3 px-4 rounded-xl font-bold font-headline transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    photo_camera
                  </span>
                  Ambil Foto
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-[#154212]/10 hover:bg-[#154212]/20 text-[#154212] py-3 px-4 rounded-xl font-bold font-headline transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    upload_file
                  </span>
                  Upload Foto
                </button>
              </div>
            </div>

            {/* Input Fields Container */}
            <div className="space-y-6 pt-4">
              {/* Pilih TPS Dropdown */}
              <div className="space-y-2">
                <label
                  className="block font-headline text-sm font-bold text-[#1a1c1c]"
                  htmlFor="tps_select"
                >
                  Pilih TPS yang Dilaporkan
                </label>
                <select
                  id="tps_select"
                  value={selectedTpsId}
                  onChange={(e) => setSelectedTpsId(e.target.value)}
                  className="w-full px-5 py-4 bg-[#f3f3f3] border-2 border-transparent focus:border-[#154212] focus:bg-white rounded-xl outline-none transition-all text-[#1a1c1c] font-medium"
                >
                  <option value="">-- Pilih Lokasi TPS --</option>
                  {tpsList.map((tps) => (
                    <option key={tps._id} value={tps._id}>
                      {tps.nama_tps}
                    </option>
                  ))}
                </select>
              </div>

              {/* Koordinat Terpilih */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-headline text-sm font-bold text-[#1a1c1c]">
                    Koordinat Laporan (Otomatis/Peta)
                  </label>
                  {locationCoords && (
                    <button 
                      type="button" 
                      onClick={() => setShowMap(true)} 
                      className="text-xs font-bold text-[#154212] hover:underline"
                    >
                      Ubah Koordinat
                    </button>
                  )}
                </div>
                <div 
                  className={`w-full px-5 py-4 rounded-xl font-mono text-sm border-2 ${locationCoords ? 'bg-[#ebf5e9] text-[#154212] border-[#a1d494]' : 'bg-[#f3f3f3] text-gray-500 border-transparent'}`}
                >
                  {locationCoords 
                    ? `${locationCoords.lat.toFixed(6)}, ${locationCoords.lng.toFixed(6)}` 
                    : "Koordinat belum ditentukan (akan otomatis diambil jika kosong)"}
                </div>
              </div>

              {/* Kondisi TPU */}
              <div className="space-y-2">
                <label
                  className="block font-headline text-sm font-bold text-[#1a1c1c]"
                  htmlFor="kondisi"
                >
                  Kondisi TPU (0-100)
                </label>
                <input
                  type="text"
                  id="kondisi"
                  value={kondisi}
                  onChange={(e) => setKondisi(e.target.value)}
                  placeholder="Cth: 80 atau Penuh"
                  className="w-full px-5 py-4 bg-[#f3f3f3] border-2 border-transparent focus:border-[#154212] focus:bg-white rounded-xl outline-none transition-all text-[#1a1c1c] font-medium placeholder:text-[#72796e]"
                />
              </div>

              {/* Deskripsi */}
              <div className="space-y-2">
                <label
                  className="block font-headline text-sm font-bold text-[#1a1c1c]"
                  htmlFor="deskripsi"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="(opsional)"
                  rows={4}
                  className="w-full px-5 py-4 bg-[#f3f3f3] border-2 border-transparent focus:border-[#154212] focus:bg-white rounded-xl outline-none transition-all text-[#1a1c1c] font-medium placeholder:text-[#72796e] resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#154212] hover:bg-[#2d5a27] text-white py-5 rounded-xl font-headline font-bold text-lg shadow-[0_10px_30px_rgba(21,66,18,0.15)] hover:shadow-[0_15px_40px_rgba(21,66,18,0.25)] transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Mengirim Laporan..." : "Laporkan"}
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Map Modal */}
      {showMap && (
        <LocationPickerMap 
          onConfirm={(lat, lng) => {
            setLocationCoords({ lat, lng });
            setShowMap(false);
          }}
          onCancel={() => setShowMap(false)}
        />
      )}
    </>
  );
}
