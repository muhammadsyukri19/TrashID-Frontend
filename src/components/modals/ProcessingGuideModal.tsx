"use client";

import { useState } from "react";

interface ProcessingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "organik" | "anorganik" | "residu";
}

export default function ProcessingGuideModal({ isOpen, onClose, initialType = "organik" }: ProcessingGuideModalProps) {
  const [activeTab, setActiveTab] = useState(initialType);

  if (!isOpen) return null;

  const content = {
    organik: {
      title: "Sampah Organik",
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      icon: "forest",
      description: "Sampah yang berasal dari sisa makhluk hidup dan mudah membusuk secara alami.",
      steps: [
        {
          title: "Pengomposan",
          desc: "Metode paling efektif. Gunakan komposter di rumah untuk mengubah sisa makanan menjadi pupuk tanaman.",
          icon: "compost"
        },
        {
          title: "Pakan Ternak",
          desc: "Sisa sayuran dan buah tertentu dapat diberikan ke hewan ternak seperti ayam atau kelinci.",
          icon: "pets"
        },
        {
          title: "Eco-Enzym",
          desc: "Olah kulit buah dan sisa sayur menjadi cairan serbaguna untuk pembersih alami.",
          icon: "science"
        }
      ]
    },
    anorganik: {
      title: "Sampah Anorganik",
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: "recycling",
      description: "Sampah yang tidak mudah membusuk dan membutuhkan waktu ratusan tahun untuk terurai.",
      steps: [
        {
          title: "Pilah & Bersihkan",
          desc: "Pastikan plastik atau kaleng bersih dari sisa cairan/makanan sebelum dikumpulkan.",
          icon: "wash"
        },
        {
          title: "Bank Sampah",
          desc: "Setorkan ke Bank Sampah terdekat untuk ditukar dengan uang atau ditabung.",
          icon: "account_balance"
        },
        {
          title: "Upcycling",
          desc: "Gunakan kreativitas untuk mengubah barang bekas menjadi dekorasi atau alat rumah tangga baru.",
          icon: "palette"
        }
      ]
    },
    residu: {
      title: "Sampah Residu",
      color: "bg-gray-500",
      textColor: "text-gray-600",
      bgColor: "bg-gray-50",
      icon: "delete_forever",
      description: "Sampah sisa yang sulit atau tidak bisa didaur ulang kembali.",
      steps: [
        {
          title: "Wadah Terpisah",
          desc: "Gunakan kantong khusus dan pastikan tertutup rapat agar tidak berceceran.",
          icon: "inventory_2"
        },
        {
          title: "B3 (Berbahaya)",
          desc: "Untuk sampah baterai atau bohlam, kumpulkan di tempat penampungan limbah B3 khusus.",
          icon: "warning"
        },
        {
          title: "Pengangkutan TPA",
          desc: "Pastikan diserahkan ke petugas kebersihan untuk dibuang di TPA yang legal.",
          icon: "local_shipping"
        }
      ]
    }
  };

  const current = content[activeTab];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-green-950/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-3xl rounded-[40px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
        {/* Header Tabs */}
        <div className="flex p-2 bg-gray-100/50 m-6 rounded-2xl">
          {(['organik', 'anorganik', 'residu'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 capitalize flex items-center justify-center gap-2 ${
                activeTab === type 
                ? `${content[type].color} text-white shadow-lg` 
                : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{content[type].icon}</span>
              {type}
            </button>
          ))}
        </div>

        <div className="px-8 pb-10 space-y-8">
          {/* Main Info */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className={`w-24 h-24 rounded-[32px] ${current.color} flex items-center justify-center shrink-0 shadow-xl shadow-current/20`}>
              <span className="material-symbols-outlined text-5xl text-white">{current.icon}</span>
            </div>
            <div className="space-y-3">
              <h2 className={`text-3xl font-headline font-bold ${current.textColor}`}>{current.title}</h2>
              <p className="text-gray-500 leading-relaxed max-w-xl">
                {current.description}
              </p>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {current.steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`${current.bgColor} p-6 rounded-[28px] border border-transparent hover:border-current/20 transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  <span className={`material-symbols-outlined ${current.textColor}`}>{step.icon}</span>
                </div>
                <h5 className={`font-bold ${current.textColor} mb-2`}>{step.title}</h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Button */}
          <div className="pt-4 flex justify-center">
            <button 
              onClick={onClose}
              className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-gray-900/20"
            >
              Mengerti, Terima Kasih
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
