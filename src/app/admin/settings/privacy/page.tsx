"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminPrivacyPage() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [activityLogs, setActivityLogs] = useState(true);

  return (
    <div className="p-8 max-w-4xl mx-auto font-body text-[#1a1c1c]">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#6f7b64] mb-2">
          <Link href="/admin/settings" className="hover:text-[#154212]">Setelan</Link>
          <span>&gt;</span>
          <span>Privacy</span>
        </div>
        <h1 className="text-4xl font-black text-[#154212] font-display">Privasi & Keamanan</h1>
        <p className="text-zinc-500 mt-2">Kelola keamanan akun dan visibilitas data administrasi Anda.</p>
      </div>

      <div className="space-y-6">
        {/* Keamanan Akun */}
        <section className="bg-white rounded-[32px] border border-zinc-200 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-zinc-100 flex items-center justify-between hover:bg-zinc-50 transition-colors">
            <div className="max-w-[70%]">
              <h3 className="font-bold text-lg mb-1 text-[#154212]">Autentikasi Dua Faktor (2FA)</h3>
              <p className="text-sm text-zinc-500">Mewajibkan kode verifikasi tambahan saat login untuk keamanan maksimal.</p>
            </div>
            <button 
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${twoFactor ? 'bg-[#154212]' : 'bg-zinc-300'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="p-8 flex items-center justify-between hover:bg-zinc-50 transition-colors">
            <div className="max-w-[70%]">
              <h3 className="font-bold text-lg mb-1 text-[#154212]">Log Aktivitas Admin</h3>
              <p className="text-sm text-zinc-500">Simpan riwayat perubahan data (edit/delete) yang Anda lakukan untuk keperluan audit.</p>
            </div>
            <button 
              onClick={() => setActivityLogs(!activityLogs)}
              className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${activityLogs ? 'bg-[#154212]' : 'bg-zinc-300'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${activityLogs ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </section>

        {/* Change Password Button */}
        <Link href="/admin/settings/privacy/change-password">
          <div className="bg-white rounded-[32px] border border-zinc-200 p-8 flex items-center justify-between hover:border-[#154212] transition-all cursor-pointer group shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-[#ebf5e9] text-[#154212] flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">key</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1a1c1c] mb-1">Ganti Kata Sandi</h3>
                <p className="text-[13px] text-zinc-500">Perbarui kata sandi akun administrasi Anda secara berkala.</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-zinc-400 group-hover:text-[#154212] transition-colors text-2xl">chevron_right</span>
          </div>
        </Link>
      </div>

      <div className="mt-10 p-8 bg-red-50 rounded-[32px] border border-red-100">
        <h4 className="font-bold text-red-800 mb-2">Zona Bahaya</h4>
        <p className="text-sm text-red-600 mb-6">Penghapusan akun admin akan mengakibatkan Anda kehilangan akses ke seluruh panel kontrol. Tindakan ini tidak dapat dibatalkan.</p>
        <button className="bg-red-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
          Hapus Akun Admin
        </button>
      </div>
    </div>
  );
}
