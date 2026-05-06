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

  React.useEffect(() => {
    const fetchTps = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
        const res = await fetch(`${API_BASE}/tps`);
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
      setShowMap(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if (locationCoords) {
      sendData(locationCoords.lat, locationCoords.lng);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => { sendData(position.coords.latitude, position.coords.longitude); },
          (error) => { console.error("Error getting location:", error); sendData(4.6951, 96.7494); }
        );
      } else {
        sendData(4.6951, 96.7494);
      }
    }
  };

  const sendData = async (lat: number, lng: number) => {
    try {
      const token = localStorage.getItem("token") || "";
      const formData = new FormData();
      formData.append("foto", file as Blob);
      formData.append("tps_id", selectedTpsId);
      
      let kepenuhan = 3;
      const inputVal = kondisi.toLowerCase();
      if (inputVal === "penuh") kepenuhan = 5;
      else if (inputVal === "hampir penuh" || inputVal === "sedang") kepenuhan = 3;
      else if (inputVal === "kosong") kepenuhan = 1;
      else {
        const numVal = parseInt(kondisi);
        if (!isNaN(numVal)) kepenuhan = Math.min(5, Math.max(1, Math.ceil(numVal / 20)));
      }
      
      formData.append("tingkat_kepenuhan", kepenuhan.toString());
      formData.append("lat", lat.toString());
      formData.append("lng", lng.toString());
      formData.append("deskripsi", deskripsi);

      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const response = await fetch(`${API_BASE}/tps/report`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response received:", text.substring(0, 200));
        throw new Error(`Server tidak merespon dengan format yang benar (Status: ${response.status}). Pastikan Backend sudah berjalan di port 5001.`);
      }

      const data = await response.json();
      if (response.ok && data.status === "success") {
        setMessage({ type: "success", text: "Laporan berhasil dikirim!" });
        setFile(null);
        setPreview(null);
        setSelectedTpsId("");
        setKondisi("");
        setDeskripsi("");
        setLocationCoords(null);
      } else {
        setMessage({ type: "error", text: data.message || "Gagal mengirim laporan." });
      }
    } catch (error: any) {
      console.error("Submit report error:", error);
      setMessage({ type: "error", text: error.message || "Terjadi kesalahan pada server." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0,24&display=swap');
        .font-headline, .font-display { font-family: 'Manrope', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .field-base {
          width: 100%; padding: 12px 16px;
          background: #f3f6f2;
          border: 1.5px solid transparent;
          border-radius: 12px; outline: none;
          transition: all 0.2s;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500;
          color: #1a1c1a;
        }
        .field-base:focus { border-color: #154212; background: #fff; }
        .field-base::placeholder { color: #9aaa96; }
      `}} />

      <main className="p-10 lg:p-15 w-full max-w-[1400px] mx-auto bg-[#f5f7f4] min-h-screen font-body">
        {/* Header */}
        <header className="mb-10">
          <h2 className="text-4xl font-bold text-[#154212] tracking-tight font-display mb-2">
            Lapor Kondisi TPS
          </h2>
          <p className="text-2sm text-zinc-500 font-medium">
            Bantu kami memantau titik sampah secara real-time.
          </p>
        </header>

        {/* Content Card */}
        <section className="bg-white rounded-2xl border border-[#e0ead9] overflow-hidden mx-3 lg:mx-30">
          {message && (
            <div className={`mx-6 mt-6 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              message.type === "success"
                ? "bg-[#eaf6e0] text-[#154212] border border-[#a1d494]"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              <span className="material-symbols-outlined text-[18px]">
                {message.type === "success" ? "check_circle" : "error"}
              </span>
              {message.text}
            </div>
          )}

          <form className="p-6 md:p-10 space-y-7" onSubmit={handleSubmit}>
            {/* Upload/Camera Area */}
            <div
              className="border-2 border-dashed border-[#b4d9aa] bg-[#fafef8] hover:bg-[#f0fae8] hover:border-[#5ccf3c] transition-all duration-200 rounded-2xl py-10 px-6 flex flex-col items-center justify-center cursor-pointer group"
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
                <div className="w-full max-w-sm overflow-hidden rounded-xl mb-5">
                  <img src={preview} alt="Preview" className="w-full h-auto object-cover" />
                </div>
              ) : (
                <>
                  <div className="w-[72px] h-[72px] mb-5 bg-[#eaf6e0] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[36px] text-[#154212]">
                      add_photo_alternate
                    </span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-[#154212] text-center mb-1">
                    Klik untuk Ambil atau Unggah Foto TPS
                  </h3>
                  <p className="text-sm text-[#9aaa96] mb-7 font-medium">
                    Format .jpg, .jpeg, atau .png
                  </p>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-xs" onClick={(e) => e.stopPropagation()}>
                {[
                  { icon: "photo_camera", label: "Ambil Foto" },
                  { icon: "upload_file", label: "Upload Foto" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 bg-[#eaf6e0] hover:bg-[#d4efbf] text-[#154212] py-2.5 px-4 rounded-xl font-bold font-headline text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pilih TPS */}
            <div className="space-y-1.5">
              <label className="block font-headline text-sm font-bold text-[#2a2c2a]" htmlFor="tps_select">
                Pilih TPS yang Dilaporkan
              </label>
              <select
                id="tps_select"
                value={selectedTpsId}
                onChange={(e) => setSelectedTpsId(e.target.value)}
                className="field-base appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%23154212' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "40px" }}
              >
                <option value="">-- Pilih Lokasi TPS --</option>
                {tpsList.map((tps) => (
                  <option key={tps._id} value={tps._id}>{tps.nama_tps}</option>
                ))}
              </select>
            </div>

            {/* Koordinat */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block font-headline text-sm font-bold text-[#2a2c2a]">
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
              <div className={`w-full px-4 py-3 rounded-xl font-mono text-sm border-[1.5px] transition-all ${
                locationCoords
                  ? "bg-[#eaf6e0] text-[#154212] border-[#a1d494]"
                  : "bg-[#f3f6f2] text-[#9aaa96] border-transparent"
              }`}>
                {locationCoords
                  ? `${locationCoords.lat.toFixed(6)}, ${locationCoords.lng.toFixed(6)}`
                  : "Koordinat belum ditentukan (akan otomatis diambil jika kosong)"}
              </div>
            </div>

            {/* Kondisi */}
            <div className="space-y-1.5">
              <label className="block font-headline text-sm font-bold text-[#2a2c2a]" htmlFor="kondisi">
                Kondisi TPU (0-100)
              </label>
              <input
                type="text"
                id="kondisi"
                value={kondisi}
                onChange={(e) => setKondisi(e.target.value)}
                placeholder="Cth: 80 atau Penuh"
                className="field-base"
              />
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5">
              <label className="block font-headline text-sm font-bold text-[#2a2c2a]" htmlFor="deskripsi">
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="(opsional)"
                rows={4}
                className="field-base resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#154212] hover:bg-[#1e5c1a] text-white py-4 rounded-xl font-headline font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                {isLoading ? "Mengirim Laporan..." : "Laporkan"}
              </button>
            </div>
          </form>
        </section>
      </main>

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

