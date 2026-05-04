"use client";

import React from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ isOpen, onConfirm, onCancel }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
          <span className="material-symbols-outlined text-4xl">logout</span>
        </div>
        
        <h3 className="text-2xl font-extrabold text-[#1a1c1c] text-center mb-3">Yakin ingin keluar?</h3>
        <p className="text-zinc-500 text-center text-sm leading-relaxed mb-8">
          Anda harus login kembali untuk dapat mengakses dashboard dan fitur TrashID lainnya.
        </p>

        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all active:scale-95"
          >
            Batal
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-4 rounded-2xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
