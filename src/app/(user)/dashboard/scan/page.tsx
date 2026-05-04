"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

export default function ScanTrashPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulasi Delay Analisis AI (Sambil menunggu model temanmu siap)
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        category: "Plastik (Anorganik)",
        confidence: 0.98,
        instructions: "Bersihkan sisa makanan, keringkan, dan buang ke tempat sampah warna kuning.",
        impact: "+5 XP"
      });
    }, 2500);
  };

  const resetScan = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto space-y-8 font-body animate-fade-in">
      <header className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 hover:bg-zinc-200 rounded-full transition-colors text-zinc-400 bg-white shadow-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212]">
            AI Trash Scanner
          </h1>
          <p className="text-sm text-zinc-500">Pindai sampah Anda untuk instruksi pemilahan yang tepat.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Scanner Area */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-zinc-200 p-4 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group">
          {image ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <img src={image} alt="Uploaded" className="max-h-[360px] w-full object-contain rounded-xl" />
              <button 
                onClick={resetScan}
                className="mt-4 flex items-center gap-2 text-red-600 font-bold text-sm hover:underline"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Hapus & Ulangi
              </button>
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-[#154212]/10 backdrop-blur-[2px] flex flex-col items-center justify-center">
                   <div className="w-16 h-16 border-4 border-[#154212] border-t-transparent rounded-full animate-spin"></div>
                   <p className="mt-4 font-bold text-[#154212] animate-pulse">Menganalisis Sampah...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#154212]">
                <span className="material-symbols-outlined text-4xl">photo_camera</span>
              </div>
              <h3 className="text-lg font-bold text-[#1a1c1c] mb-2">Ambil atau Unggah Foto</h3>
              <p className="text-sm text-zinc-500 mb-8 max-w-xs mx-auto">
                Pastikan pencahayaan cukup dan objek sampah terlihat jelas di dalam frame.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#154212] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#154212]/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-3 mx-auto"
              >
                <span className="material-symbols-outlined">upload_file</span>
                Pilih File Foto
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          )}
        </div>

        {/* Right: AI Analysis Result */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
            <h3 className="font-headline text-lg font-bold text-[#154212] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">auto_awesome</span>
              Hasil Analisis AI
            </h3>

            {result ? (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Kategori Terdeteksi</label>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-2xl font-extrabold text-[#1a1c1c]">{result.category}</span>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {(result.confidence * 100).toFixed(0)}% Match
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-green-700">Panduan Pembuangan</label>
                  <p className="text-sm text-green-900 mt-2 leading-relaxed">
                    {result.instructions}
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                  <span className="text-sm font-medium text-zinc-600">Estimasi Reward</span>
                  <span className="text-lg font-black text-[#154212]">{result.impact}</span>
                </div>

                <button className="w-full bg-[#154212] text-white py-4 rounded-xl font-bold hover:bg-[#2d5a27] transition-all">
                  Konfirmasi & Klaim XP
                </button>
              </div>
            ) : (
              <div className="py-20 text-center">
                <span className="material-symbols-outlined text-zinc-200 text-6xl">analytics</span>
                <p className="text-zinc-400 text-sm mt-4">Belum ada data untuk dianalisis.</p>
              </div>
            )}
          </div>

          <div className="bg-[#fff2df] rounded-2xl p-6 border border-[#ffe4bc]">
            <h4 className="text-[#c06a00] font-bold text-sm mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              Tips Pemilahan
            </h4>
            <p className="text-[#8e5200] text-xs leading-relaxed">
              Memilah sampah dari sumbernya membantu mengurangi beban TPA hingga 60% dan mempercepat proses daur ulang.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}