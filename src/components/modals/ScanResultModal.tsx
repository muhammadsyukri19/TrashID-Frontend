"use client";

import React, { useState } from "react";

interface ScanResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  image: string | null;
  result: {
    category: string;
    confidence: number;
    instructions: string;
    impact: string;
  } | null;
}

export default function ScanResultModal({ isOpen, onClose, onClaim, image, result }: ScanResultModalProps) {
  const [isClaiming, setIsClaiming] = useState(false);

  if (!isOpen || !result) return null;

  const categoryLower = result.category.toLowerCase();
  
  // Data cara pengolahan berdasarkan kategori
  let processingSteps = [];
  if (categoryLower.includes("organik")) {
    processingSteps = [
      "Pertama, pisahkan sampah organik dari sampah jenis lain (plastik, kaca) agar tidak tercampur.",
      "Kedua, siapkan wadah komposter atau lubang biopori di halaman rumah Anda.",
      "Ketiga, potong sisa makanan atau daun menjadi ukuran lebih kecil agar lebih cepat terurai.",
      "Keempat, masukkan ke dalam komposter dan tambahkan sedikit tanah atau cairan bioaktivator (EM4).",
      "Kelima, tutup rapat dan biarkan proses pembusukan alami selama 2-4 minggu.",
      "Terakhir, panen pupuk kompos yang sudah jadi untuk menyuburkan tanaman Anda."
    ];
  } else if (categoryLower.includes("anorganik")) {
    processingSteps = [
      "Pertama, pisahkan sampah anorganik berdasarkan materialnya (plastik, kertas, kaca, logam).",
      "Kedua, bersihkan sisa makanan atau cairan yang menempel (misalnya dibilas air).",
      "Ketiga, keringkan sampah anorganik agar tidak menimbulkan bau dan lebih mudah didaur ulang.",
      "Keempat, remukkan atau lipat (seperti kardus atau botol plastik) untuk menghemat ruang penyimpanan.",
      "Kelima, kumpulkan dalam wadah atau kantong yang bersih dan kering.",
      "Terakhir, setorkan ke Bank Sampah terdekat atau berikan kepada pengepul barang bekas."
    ];
  } else {
    processingSteps = [
      "Pertama, pastikan sampah residu (seperti popok, puntung rokok, atau sisa medis) dibungkus rapat.",
      "Kedua, pisahkan dari sampah organik dan anorganik yang masih bisa didaur ulang.",
      "Ketiga, hindari membakar sampah residu karena asapnya beracun dan mencemari udara.",
      "Keempat, masukkan ke dalam kantong sampah khusus yang tidak mudah robek.",
      "Kelima, letakkan di tempat sampah utama rumah Anda.",
      "Terakhir, serahkan kepada petugas kebersihan untuk diangkut ke Tempat Pembuangan Akhir (TPA)."
    ];
  }

  const handleClaim = async () => {
    setIsClaiming(true);
    await onClaim();
    setIsClaiming(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-zinc-950/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-[#154212]">Hasil Scan</h2>
            <p className="text-sm text-zinc-500 mt-1">Panduan pengolahan untuk jenis sampah Anda.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center text-red-500 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Top Section: Image & Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Image Preview */}
            <div className="w-full md:w-1/2 aspect-square bg-zinc-100 rounded-2xl overflow-hidden relative shrink-0">
              {image ? (
                <img src={image} alt="Scanned Trash" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                  <span className="material-symbols-outlined text-5xl">image</span>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-5">
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Jenis Sampah:</p>
                <h3 className="text-2xl font-black text-[#1a1c1c]">{result.category}</h3>
              </div>
              
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Tingkat Kepercayaan:</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 font-bold rounded-lg text-sm">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {(result.confidence * 100).toFixed(0)}%
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Keterangan:</p>
                <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                  {result.instructions}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Cara Pengolahan */}
          <div>
            <h4 className="text-lg font-bold text-[#154212] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">recycling</span>
              Cara Pengolahan
            </h4>
            <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
              Gambar yang Anda unggah adalah {result.category.toLowerCase()}. Jenis sampah ini dapat diolah melalui tahapan berikut:
            </p>
            
            <ol className="space-y-3">
              {processingSteps.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                  <span className="font-bold text-[#154212] shrink-0">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            
            <p className="text-sm text-zinc-500 italic mt-6 bg-[#fff2df] p-3 rounded-xl border border-[#ffe4bc]">
              Melalui proses ini, sampah dapat dimanfaatkan kembali atau dibuang dengan aman sehingga membantu menjaga kelestarian lingkungan.
            </p>
          </div>
        </div>

        {/* Footer: Claim Action */}
        <div className="p-6 border-t border-zinc-100 bg-zinc-50 shrink-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase">Reward Anda</p>
            <p className="text-2xl font-black text-[#154212] flex items-center gap-1">
              <span className="material-symbols-outlined text-amber-500">star</span>
              {result.impact}
            </p>
          </div>
          
          <button
            onClick={handleClaim}
            disabled={isClaiming}
            className="bg-[#154212] hover:bg-[#2d5a27] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center gap-2"
          >
            {isClaiming ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span className="material-symbols-outlined text-xl">military_tech</span>
            )}
            {isClaiming ? "Memproses..." : "Klaim XP Sekarang"}
          </button>
        </div>

      </div>
    </div>
  );
}
