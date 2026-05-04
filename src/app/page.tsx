"use client";

import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);

  const handleScan = async () => {
    if (!file) return alert("Upload gambar dulu");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await API.post("/scan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      alert("Scan gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="scroll-smooth">
      <Navbar />
      {/* ================= HERO ================= */}
      <section 
        id="platform"
        className="w-full h-screen bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-2 gap-10 items-center w-full">

          <div>
            <h2 className="text-lg mb-4">Halo, Sahabat TrashID!</h2>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Masih Bingung <br /> Pisahin Sampah?
            </h1>

            <p className="text-green-200 mb-8 max-w-md">
              Ubah cara Anda mengelola limbah dengan AI cerdas.
            </p>

            <a
              href="#demo"
              className="bg-green-400 text-green-900 px-6 py-3 rounded-md inline-block"
            >
              📷 Coba Scan Sekarang
            </a>
          </div>

          <div className="flex justify-center">
            <Image src="/hero-illustration.png" alt="Trash Illustration" width={500} height={500} className=" object-contain rounded-4xl border-[3px] border-white/10 shadow-xl" />
          </div>

        </div>
      </section>

      {/* ================= DEMO ================= */}
      <section
        id="uji"
        className="w-full h-screen bg-[#f3f5f4] flex items-center"
      >
        <div className="max-w-5xl mx-auto px-6 w-full">

          {/* TITLE */}
          <div className="text-center mb-14">
            <h2 className="text-[28px] font-semibold text-[#1f4d2e]">
              Demo AI
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Unggah foto sampah Anda dan biarkan AI kami melakukan tugasnya.
            </p>
          </div>

          {/* CONTENT */}
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* ================= UPLOAD ================= */}
            <div className="relative bg-white border border-dashed border-gray-300 rounded-[28px] h-[320px] flex flex-col items-center justify-center text-center cursor-pointer">

              {/* ICON */}
              <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-green-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                  />
                </svg>
              </div>

              <p className="text-gray-700 text-sm font-medium">
                Drag & Drop Image
              </p>
              <p className="text-gray-400 text-xs mt-1">
                atau klik untuk memilih file
              </p>

              {/* DISABLED INPUT (UI ONLY) */}
              <input
                type="file"
                disabled
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

            </div>

            {/* ================= RESULT ================= */}
            <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-5">
                <p className="text-[10px] tracking-widest text-gray-400">
                  HASIL KLASIFIKASI
                </p>

                <span className="text-[11px] bg-green-200 text-green-800 px-3 py-[3px] rounded-full">
                  98% Akurat
                </span>
              </div>

              {/* CONTENT */}
              <div className="flex items-center gap-4 mb-8">

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image
                    src="/bottle.png"
                    alt="Plastik"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Plastik
                  </h3>
                  <p className="text-xs text-gray-500">
                    Jenis: PET (Polyethylene Terephthalate)
                  </p>
                </div>

              </div>

              {/* EDUKASI */}
              <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600 mb-5 relative">

                <div className="absolute left-0 top-0 h-full w-[4px] bg-green-700 rounded-l-lg"></div>

                <p className="italic pl-3">
                  “Sampah ini dapat didaur ulang. Masukkan ke wadah Anorganik.”
                </p>
              </div>

              {/* BUTTON */}
              <button
                disabled
                className="w-full bg-[#244d2b] text-white py-3 rounded-lg text-sm flex items-center justify-center gap-2 opacity-90"
              >
                Login untuk hasil lengkap
                <span>→</span>
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* ================= EDUKASI ================= */}
      <section className="w-full h-screen bg-[#f3f5f4] flex items-center">
        <div className="max-w-5xl mx-auto px-6 w-full">

          {/* TITLE */}
          <div className="text-center mb-14">
            <h2 className="text-[28px] font-semibold text-[#1f4d2e]">
              Kenali Jenis Sampahmu
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Klik pada kategori untuk melihat contoh sampah yang dapat dipilah.
            </p>
          </div>

          {/* ================= ORGANIK (ACTIVE) ================= */}
          <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-5">

            {/* HEADER */}
            <div className="flex justify-between items-start">

              <div className="flex gap-4">

                {/* ICON */}
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-green-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21c4-4 6-7 6-10a6 6 0 10-12 0c0 3 2 6 6 10z"
                    />
                  </svg>
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Organik
                  </h3>
                  <p className="text-sm text-gray-500">
                    Sisa makhluk hidup yang mudah terurai alami.
                  </p>
                </div>

              </div>

              {/* ARROW */}
              <span className="text-gray-400 text-sm">⌃</span>

            </div>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Sampah yang berasal dari sisa makhluk hidup dan mudah terurai secara alami oleh mikroorganisme.
              Cocok untuk dijadikan kompos.
            </p>

            {/* ITEMS */}
            <div className="grid grid-cols-3 gap-3 mt-4">

              <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Sisa makanan
              </div>

              <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Daun kering
              </div>

              <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Sisa sayuran & buah
              </div>

            </div>
          </div>

          {/* ================= ANORGANIK ================= */}
          <div className="bg-white/70 rounded-[28px] p-6 mb-5">

            <div className="flex justify-between items-center">

              <div className="flex gap-4">

                {/* ICON */}
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 12l2-2m0 0l2 2m-2-2v6m6-6l2-2m0 0l2 2m-2-2v6m-6 0l-2 2m0 0l-2-2m2 2v-6"
                    />
                  </svg>
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Anorganik
                  </h3>
                  <p className="text-sm text-gray-500">
                    Sulit terurai alami dan dapat didaur ulang.
                  </p>
                </div>

              </div>

              <span className="text-gray-400 text-sm">⌄</span>

            </div>
          </div>

          {/* ================= RESIDU ================= */}
          <div className="bg-white/70 rounded-[28px] p-6">

            <div className="flex justify-between items-center">

              <div className="flex gap-4">

                {/* ICON */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 7h12M9 7v10m6-10v10M10 4h4"
                    />
                  </svg>
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Residu
                  </h3>
                  <p className="text-sm text-gray-500">
                    Sisa yang sulit didaur ulang, dibuang ke TPA.
                  </p>
                </div>

              </div>

              <span className="text-gray-400 text-sm">⌄</span>

            </div>
          </div>

        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section 
        id="fitur"
        className="w-full h-screen bg-[#f3f5f4] flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full text-center">

          {/* TITLE */}
          <h2 className="text-[28px] font-semibold text-[#1f4d2e] mb-3">
            Fitur TrashID
          </h2>
          <p className="text-gray-500 text-sm mb-16">
            Inovasi daur ulang TrashID untuk seluruh masyarakat Indonesia.
          </p>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-16 items-start">

            {/* ================= ITEM 1 ================= */}
            <div className="flex flex-col items-center text-center max-w-xs mx-auto">

              {/* IMAGE */}
              <img
                src="/feature-scan.png"
                alt="Scan AI"
                className="w-36 h-36 object-contain mb-6"
              />

              {/* TITLE */}
              <h3 className="font-semibold text-gray-800 mb-2">
                Scan Sampah (AI)
              </h3>

              {/* DESC */}
              <p className="text-sm text-gray-500 leading-relaxed">
                Unggah foto sampah dan sistem akan mengidentifikasi jenisnya secara otomatis menggunakan AI, sehingga lebih mudah dikenali.
              </p>

            </div>

            {/* ================= ITEM 2 ================= */}
            <div className="flex flex-col items-center text-center max-w-xs mx-auto">

              <img
                src="/feature-education.png"
                alt="Edukasi"
                className="w-36 h-36 object-contain mb-6"
              />

              <h3 className="font-semibold text-gray-800 mb-2">
                Edukasi Pengelolaan Sampah
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                Dapatkan tips dan panduan lengkap tentang cara mengolah sampah organik dan anorganik secara mandiri di rumah.
              </p>

            </div>

            {/* ================= ITEM 3 ================= */}
            <div className="flex flex-col items-center text-center max-w-xs mx-auto">

              <img
                src="/feature-map.png"
                alt="TPU"
                className="w-36 h-36 object-contain mb-6"
              />

              <h3 className="font-semibold text-gray-800 mb-2">
                Peta & Laporan TPU
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                Lihat kondisi TPU di sekitarmu dan kirim laporan secara langsung untuk membantu penanganan yang lebih cepat.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ================= About ================= */}
      <section 
        id="tentang"
        className="w-full h-screen bg-[#f3f5f4] flex items-center">
        <div className="max-w-6xl mx-auto px-6">

          {/* TITLE */}
          <div className="mb-10">
            <h2 className="text-[32px] font-semibold text-[#1f4d2e] mb-3">
              Solusi Cerdas untuk Bumi
            </h2>
            <p className="text-gray-500 text-sm max-w-md">
              Fitur unggulan yang dirancang untuk mempermudah gaya hidup berkelanjutan Anda.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* ================= SCAN AI (BIG) ================= */}
            <div className="md:col-span-2 bg-[#2d5f2e] text-white rounded-[32px] p-8 flex flex-col justify-between min-h-[220px]">

              <div>
                <span className="text-[10px] bg-green-700 px-3 py-1 rounded-full inline-block mb-4">
                  UTAMA
                </span>

                <h3 className="text-2xl font-semibold mb-3">
                  Scan AI Sampah
                </h3>

                <p className="text-green-100 text-sm max-w-md">
                  Kamera pintar yang mengenali lebih dari 500 kategori material sampah secara real-time.
                </p>
              </div>

            </div>

            {/* ================= EDUKASI ================= */}
            <div className="bg-white rounded-[32px] p-6 flex flex-col justify-between min-h-[220px] shadow-sm">

              <div>
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mb-4">
                  🎓
                </div>

                <h3 className="font-semibold text-gray-800 mb-2">
                  Edukasi Pengelolaan
                </h3>

                <p className="text-sm text-gray-500">
                  Modul pembelajaran interaktif tentang komposting, zero-waste living, dan ekonomi sirkular.
                </p>
              </div>

              <span className="text-sm text-green-700 mt-4">
                Pelajari Selengkapnya →
              </span>

            </div>

            {/* ================= MAP ================= */}
            <div className="bg-white rounded-[32px] p-6 flex flex-col justify-between min-h-[180px] shadow-sm">

              <div>
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mb-4">
                  🗺️
                </div>

                <h3 className="font-semibold text-gray-800 mb-2">
                  Peta & Laporan TPS
                </h3>

                <p className="text-sm text-gray-500">
                  Temukan lokasi bank sampah terdekat dan laporkan tumpukan sampah liar di sekitar Anda.
                </p>
              </div>

              <span className="text-sm text-green-700 mt-4">
                Lihat Peta →
              </span>

            </div>

            {/* ================= IMPACT ================= */}
            <div className="md:col-span-2 bg-gradient-to-r from-[#1f4d2e] to-[#163d22] text-white rounded-[32px] p-8 flex flex-col justify-center items-center text-center min-h-[180px]">

              <h3 className="text-lg mb-2">
                Impact Meter
              </h3>

              <h1 className="text-5xl font-bold mb-2">
                12,450 kg
              </h1>

              <p className="text-green-200 text-sm">
                Sampah berhasil teralihkan dari TPA bulan ini
              </p>

            </div>

          </div>

        </div>
      </section>

      <section className="w-full h-screen bg-[#f3f5f4] flex items-center">
        <div className="w-full max-w-4xl mx-auto px-6">

          {/* CARD */}
          <div className="relative rounded-[36px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)]">

            {/* BACKGROUND IMAGE */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/bg-leaf.jpg')", // ganti sesuai asset kamu
              }}
            ></div>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1f4d2e]/90 to-[#163d22]/90"></div>

            {/* CONTENT */}
            <div className="relative z-10 text-center text-white py-20 px-6">

              <h2 className="text-3xl md:text-4xl font-semibold mb-4 leading-snug">
                Siap Untuk Membuat <br /> Perubahan?
              </h2>

              <p className="text-green-200 text-sm max-w-xl mx-auto mb-8">
                Bergabunglah dengan ribuan orang lainnya yang telah memulai langkah kecil
                untuk masa depan planet kita.
              </p>

              <button className="bg-green-400 hover:bg-green-300 text-green-900 font-medium px-8 py-3 rounded-lg transition">
                Gabung Sekarang
              </button>

            </div>

          </div>

        </div>
      </section>

      <footer className="w-full bg-[#e6efe9] py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* LEFT */}
          <div className="text-center md:text-left">
            <h3 className="text-[#1f4d2e] font-medium text-sm mb-1">
              TrashID
            </h3>
            <p className="text-[11px] text-gray-500">
              © 2024 TrashID. Curating a cleaner ecosystem.
            </p>
          </div>

          {/* RIGHT MENU */}
          <div className="flex gap-6 text-[11px] text-gray-500">
            <a href="#" className="hover:text-[#1f4d2e] transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#1f4d2e] transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#1f4d2e] transition">
              Carbon Report
            </a>
            <a href="#" className="hover:text-[#1f4d2e] transition">
              Contact
            </a>
          </div>

        </div>
      </footer>
      
    </main>
  );
}