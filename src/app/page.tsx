"use client";

import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { useState } from "react";
// Import API service if it exists, otherwise define a placeholder to prevent crashes
// In this case, I'll assume it's in @/services/api as found in directory exploration
import API from "@/services/api";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
      console.error(err);
      alert("Scan gagal. Pastikan backend sudah berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="scroll-smooth bg-[#FDFDFD] font-body">
      <Navbar />
      
      {/* ================= HERO ================= */}
      <section 
        id="platform"
        className="relative min-h-[90vh] md:h-screen w-full flex items-center overflow-hidden bg-green-950 pt-20"
      >
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-400/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center md:text-left space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-800/40 border border-green-700/50 text-green-300 text-sm font-bold tracking-wider backdrop-blur-sm uppercase">
              Halo, Sahabat TrashID!
            </div>

            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-white leading-[1.1] tracking-tight">
              Masih Bingung <br /> Pisahin Sampah?
            </h1>

            <p className="text-lg md:text-xl text-green-100/80 max-w-lg leading-relaxed">
              Ubah cara Anda mengelola limbah dengan AI cerdas. Klasifikasi sampah secara instan dan berkontribusi untuk bumi yang lebih hijau.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={() => document.getElementById('uji')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-green-400 hover:bg-green-300 text-green-950 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
                Coba Scan Sekarang
              </button>
            </div>
          </div>

          <div className="relative flex justify-center items-center animate-in fade-in slide-in-from-right duration-1000 delay-300">
            <div className="absolute inset-0 bg-green-400/20 blur-[80px] rounded-full scale-75 animate-pulse"></div>
            <div className="relative z-10 w-full max-w-[500px] aspect-square transition-transform duration-700 hover:scale-105">
              <Image 
                src="/hero-illustration.png" 
                alt="TrashID Revolution" 
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEMO AI ================= */}
      <section
        id="uji"
        className="py-24 md:py-32 bg-[#F8FAFB] relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-green-900">
              Demo <span className="text-green-600">Teknologi AI</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Cobalah kecanggihan AI kami untuk mengklasifikasi jenis sampah Anda secara instan.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {/* UPLOAD CARD */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-green-900/5 border border-gray-100 flex flex-col group transition-all duration-500 hover:shadow-green-900/10">
              <div className="flex-1 border-2 border-dashed border-green-200 rounded-[32px] flex flex-col items-center justify-center p-8 transition-colors duration-300 group-hover:border-green-400 bg-green-50/30">
                <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <span className="material-symbols-outlined text-green-600 text-4xl">cloud_upload</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Unggah Foto Sampah</h3>
                <p className="text-gray-500 text-center text-sm leading-relaxed max-w-[200px]">
                  Drag & drop gambar atau klik untuk memilih file
                </p>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
              
              <button 
                onClick={handleScan}
                disabled={loading || !file}
                className="mt-8 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 text-white py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  <>
                    Mulai Klasifikasi
                    <span className="material-symbols-outlined transition-transform duration-300 group-hover/btn:translate-x-1">arrow_forward</span>
                  </>
                )}
              </button>
            </div>

            {/* RESULT CARD */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-green-900/5 border border-gray-100 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">Hasil Analisis AI</span>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  98.4% Confidence
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="w-32 h-32 bg-gray-50 rounded-3xl p-4 flex items-center justify-center relative overflow-hidden border border-gray-100 shadow-inner">
                  <Image
                    src={file ? URL.createObjectURL(file) : "/bottle.png"}
                    alt="Scan Result"
                    width={100}
                    height={100}
                    className="object-contain transition-transform duration-500 hover:scale-110"
                  />
                  {!file && <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-headline font-extrabold text-gray-800 mb-2">
                    {result ? (result as any).category : "Plastik PET"}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold">
                    Anorganik • Daur Ulang
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-green-50/50 rounded-[24px] border border-green-100 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 h-full w-1.5 bg-green-500"></div>
                  <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">info</span>
                    Panduan Pengelolaan
                  </h4>
                  <p className="text-sm text-green-800/70 leading-relaxed italic">
                    “Sampah ini sangat bernilai jika didaur ulang. Bersihkan dari sisa cairan, remas untuk menghemat ruang, dan kumpulkan di Bank Sampah terdekat.”
                  </p>
                </div>

                <button
                  disabled
                  className="w-full group py-4 border-2 border-green-100 hover:border-green-600 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300"
                >
                  <span className="text-green-700 font-bold">Buka Laporan Lengkap</span>
                  <span className="material-symbols-outlined text-green-600 transition-transform duration-300 group-hover:translate-x-1">lock</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EDUKASI ================= */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-green-950 leading-tight">
                  Kenali Jenis <br /><span className="text-green-500 text-6xl md:text-7xl">Sampahmu</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Langkah awal menjaga bumi dimulai dari memilah. Pelajari kategori sampah agar tidak salah dalam pengelolaannya.
                </p>
              </div>

              <div className="space-y-4">
                {/* ORGANIK */}
                <div className="p-6 rounded-3xl bg-green-50 border border-green-100 transition-all duration-300 hover:shadow-xl hover:shadow-green-900/5 cursor-pointer">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20 text-white">
                      <span className="material-symbols-outlined text-3xl">compost</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-green-900">Organik</h3>
                      <p className="text-sm text-green-800/60 leading-relaxed">Sisa makhluk hidup yang mudah terurai alami. Sangat baik untuk dijadikan kompos.</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Sisa Makanan', 'Daun', 'Buah'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white rounded-full text-[11px] font-bold text-green-700 border border-green-100">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ANORGANIK */}
                <div className="p-6 rounded-3xl bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 cursor-pointer hover:border-blue-100 group">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 text-white transition-transform duration-300 group-hover:rotate-12">
                      <span className="material-symbols-outlined text-3xl">recycling</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-800">Anorganik</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Sulit terurai namun bernilai ekonomi tinggi jika didaur ulang kembali.</p>
                    </div>
                  </div>
                </div>

                {/* RESIDU */}
                <div className="p-6 rounded-3xl bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/5 cursor-pointer hover:border-gray-200 group">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center shrink-0 shadow-lg shadow-gray-800/20 text-white transition-transform duration-300 group-hover:rotate-12">
                      <span className="material-symbols-outlined text-3xl">delete_sweep</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-800">Residu</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Sisa yang benar-benar tidak dapat diproses lagi dan harus ke TPA.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-green-500/10 blur-[100px] rounded-full"></div>
              <div className="relative bg-green-900 rounded-[50px] overflow-hidden aspect-[4/5] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                <Image 
                  src="/tong-sampah.png" 
                  alt="Waste Education" 
                  fill 
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                  <p className="text-white text-lg font-bold mb-1">Fakta Menarik</p>
                  <p className="text-green-100 text-sm leading-relaxed">Memilah sampah organik dapat mengurangi emisi gas metana di TPA hingga 40%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section 
        id="fitur"
        className="py-24 md:py-32 bg-[#F8FAFB]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-green-950 mb-6">
              Ekosistem <span className="text-green-600">TrashID</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Solusi end-to-end untuk pengelolaan sampah yang lebih cerdas dan berdampak positif bagi lingkungan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/feature-scan.png",
                title: "Scan Sampah AI",
                desc: "Identifikasi jenis material sampah secara instan hanya dengan satu foto. Akurasi tinggi berbasis deep learning.",
                color: "bg-green-500"
              },
              {
                img: "/feature-education.png",
                title: "Edukasi Interaktif",
                desc: "Pelajari cara mengolah sampah organik jadi kompos atau mendaur ulang barang bekas dengan panduan lengkap.",
                color: "bg-blue-500"
              },
              {
                img: "/feature-map.png",
                title: "Peta Bank Sampah",
                desc: "Temukan lokasi Bank Sampah dan TPS terdekat untuk membuang sampah yang sudah Anda pilah dengan benar.",
                color: "bg-orange-500"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-xl shadow-green-900/5 border border-gray-100 flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2">
                <div className="relative mb-8 p-4">
                  <div className={`absolute inset-0 ${item.color} opacity-10 blur-2xl rounded-full scale-150`}></div>
                  <img src={item.img} alt={item.title} className="w-40 h-40 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT & IMPACT ================= */}
      <section 
        id="tentang"
        className="py-24 md:py-32 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* BIG HERO CARD */}
            <div className="lg:col-span-8 relative rounded-[48px] overflow-hidden group min-h-[400px]">
              <Image src="/bg-leaf.jpg" alt="Impact" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/60 to-transparent"></div>
              <div className="absolute inset-0 p-14 flex flex-col justify-center max-w-md space-y-4">
                <div className="inline-block px-4 py-1 bg-green-500 text-white rounded-full text-xs font-bold tracking-wider">MISI KAMI</div>
                <h3 className="text-4xl md:text-5xl font-headline font-bold text-white leading-tight">
                  Membangun Budaya <span className="text-green-400">Zero-Waste</span>
                </h3>
                <p className="text-green-100/80 leading-relaxed">
                  Kami percaya teknologi adalah kunci untuk mempermudah transisi masyarakat menuju gaya hidup yang lebih berkelanjutan.
                </p>
                <button className="w-fit bg-white text-green-950 px-8 py-3 rounded-full font-bold text-sm transition-all hover:bg-green-100 active:scale-95">
                  Baca Cerita Kami
                </button>
              </div>
            </div>

            {/* IMPACT CARD */}
            <div className="lg:col-span-4 bg-green-900 rounded-[48px] p-12 flex flex-col justify-center items-center text-center text-white space-y-6 shadow-2xl shadow-green-900/20">
              <span className="material-symbols-outlined text-6xl text-green-400">eco</span>
              <div className="space-y-2">
                <p className="text-green-300 font-bold tracking-widest text-xs">TOTAL DAMPAK</p>
                <h2 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter">12,450<span className="text-2xl ml-1">kg</span></h2>
                <p className="text-green-100/60 text-sm">Sampah terkelola bulan ini</p>
              </div>
              <div className="w-full h-px bg-white/10 my-4"></div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <p className="text-2xl font-bold">1.2k+</p>
                  <p className="text-[10px] text-green-300 uppercase font-bold tracking-widest">Pengguna</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">850</p>
                  <p className="text-[10px] text-green-300 uppercase font-bold tracking-widest">Laporan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-[56px] bg-green-950 p-12 md:p-24 overflow-hidden text-center shadow-3xl shadow-green-900/40">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/globe.svg')] opacity-5 bg-center bg-no-repeat scale-150"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight">
                Siap Menjadi Pahlawan <br /> <span className="text-green-400">Lingkungan?</span>
              </h2>
              <p className="text-green-100/70 text-lg max-w-xl mx-auto leading-relaxed">
                Bergabunglah dengan ribuan orang lainnya yang telah memulai langkah kecil untuk masa depan planet kita.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-green-500 hover:bg-green-400 text-green-950 px-10 py-5 rounded-[24px] font-extrabold text-lg transition-all shadow-xl hover:shadow-green-400/20 transform hover:-translate-y-1">
                  Mulai Sekarang — Gratis
                </button>
                <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-[24px] font-bold text-lg backdrop-blur-md transition-all border border-white/10">
                  Lihat Demo AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#F8FAFB] pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="TrashID" width={40} height={40} />
                <span className="text-2xl font-bold text-green-900">TrashID</span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                Platform berbasis AI pertama di Indonesia yang berfokus pada edukasi dan optimalisasi pengelolaan sampah rumah tangga.
              </p>
              <div className="flex gap-4">
                {['facebook', 'instagram', 'twitter', 'youtube'].map(social => (
                  <div key={social} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-green-600 cursor-pointer transition-colors border border-gray-50">
                    <span className="material-symbols-outlined text-xl">share</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-bold text-gray-800">Layanan</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-green-600 transition-colors">Scan Sampah AI</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Edukasi Waste</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Peta TPS/TPU</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Laporan Sampah</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-gray-800">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-green-600 transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Kontak</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Syarat & Ketentuan</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-100 gap-6">
            <p className="text-sm text-gray-400">© 2026 TrashID Indonesia. Hak Cipta Dilindungi.</p>
            <div className="flex gap-8 text-sm font-medium text-gray-500">
              <span>English (US)</span>
              <span>Bahasa Indonesia</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}