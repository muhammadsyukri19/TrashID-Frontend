"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminNotificationsPage() {
  const [notifSystem, setNotifSystem] = useState(true);
  const [notifReports, setNotifReports] = useState(true);
  const [notifUsers, setNotifUsers] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto font-body text-[#1a1c1c]">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#6f7b64] mb-2">
          <Link href="/admin/settings" className="hover:text-[#154212]">Setelan</Link>
          <span>&gt;</span>
          <span>Notifikasi</span>
        </div>
        <h1 className="text-4xl font-black text-[#154212] font-display">Notifikasi Admin</h1>
        <p className="text-zinc-500 mt-2">Kelola bagaimana Anda menerima pembaruan sistem dan laporan pengguna.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-zinc-200 overflow-hidden shadow-sm">
        {/* Toggle 1 */}
        <div className="p-8 border-b border-zinc-100 flex items-center justify-between hover:bg-zinc-50 transition-colors">
          <div className="max-w-[70%]">
            <h3 className="font-bold text-lg mb-1 text-[#154212]">Laporan Sampah Baru</h3>
            <p className="text-sm text-zinc-500">Terima notifikasi instan setiap kali ada pengguna yang mengirimkan laporan tumpukan sampah baru.</p>
          </div>
          <button 
            onClick={() => setNotifReports(!notifReports)}
            className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${notifReports ? 'bg-[#154212]' : 'bg-zinc-300'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${notifReports ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Toggle 2 */}
        <div className="p-8 border-b border-zinc-100 flex items-center justify-between hover:bg-zinc-50 transition-colors">
          <div className="max-w-[70%]">
            <h3 className="font-bold text-lg mb-1 text-[#154212]">Pendaftaran User Baru</h3>
            <p className="text-sm text-zinc-500">Dapatkan pemberitahuan saat ada pengguna baru yang mendaftar ke platform TrashID.</p>
          </div>
          <button 
            onClick={() => setNotifUsers(!notifUsers)}
            className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${notifUsers ? 'bg-[#154212]' : 'bg-zinc-300'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${notifUsers ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Toggle 3 */}
        <div className="p-8 flex items-center justify-between hover:bg-zinc-50 transition-colors">
          <div className="max-w-[70%]">
            <h3 className="font-bold text-lg mb-1 text-[#154212]">Peringatan Sistem</h3>
            <p className="text-sm text-zinc-500">Notifikasi terkait pemeliharaan server, pembaruan aplikasi, dan isu keamanan.</p>
          </div>
          <button 
            onClick={() => setNotifSystem(!notifSystem)}
            className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${notifSystem ? 'bg-[#154212]' : 'bg-zinc-300'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${notifSystem ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      <div className="mt-10 p-8 bg-[#f0f7ef] rounded-[32px] flex items-center gap-6">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#154212] shrink-0">
          <span className="material-symbols-outlined text-3xl">info</span>
        </div>
        <p className="text-sm leading-relaxed text-[#2c4a2a]">
          Pengaturan ini hanya berlaku untuk akun Admin Anda. Notifikasi akan dikirimkan melalui panel dashboard dan email resmi Anda.
        </p>
      </div>
    </div>
  );
}
