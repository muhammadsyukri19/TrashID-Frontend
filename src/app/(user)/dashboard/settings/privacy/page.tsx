"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PrivasiPage() {
  const [isTwoFactorActive, setIsTwoFactorActive] = useState(true);
  const [isLocationTracking, setIsLocationTracking] = useState(false);
  const [isProfilePublic, setIsProfilePublic] = useState(true);

  return (
    <main className="flex flex-col font-body text-[#1a1c1c] p-6 lg:p-15 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] font-bold text-zinc-500 mb-6 shrink-0">
        <Link
          href="/dashboard/settings"
          className="hover:text-[#154212] transition-colors"
        >
          Setelan
        </Link>
        <span>/</span>
        <span className="text-[#154212]">Privasi</span>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 lg:p-12 w-full flex-1 flex flex-col shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h1 className="font-extrabold text-3xl tracking-tight text-[#154212] mb-2">
              Privasi
            </h1>
            <p className="text-[14px] text-zinc-500">
              Kelola keamanan akun, privasi data, dan pengaturan visibilitas
              profil Anda.
            </p>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="grid grid-cols-1 gap-6">
          {/* Ubah Kata Sandi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-zinc-200 rounded-2xl p-6 hover:border-[#154212]/30 transition-all">
            <div>
              <h3 className="text-[15px] font-extrabold text-[#1A1C1C] mb-1">
                Ubah Kata Sandi
              </h3>
              <p className="text-[14px] text-zinc-500">
                Terakhir diubah 3 bulan yang lalu.
              </p>
            </div>

            <Link
              href="/dashboard/settings/privacy/change-password"
              className="inline-flex items-center justify-center px-6 py-2 bg-[#154212] text-white font-bold text-[13px] rounded-lg hover:bg-[#0f330d] transition-all shadow-sm"
            >
              Perbarui Sekarang
            </Link>
          </div>

          {/* Autentikasi Dua Faktor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-zinc-200 rounded-2xl p-6 hover:border-[#154212]/30 transition-all">
            <div>
              <h3 className="text-[15px] font-extrabold text-[#1A1C1C] mb-1">
                Autentikasi Dua Faktor
              </h3>
              <p className="text-[14px] text-zinc-500">
                Tingkatkan keamanan akun melalui SMS atau aplikasi autentikasi.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="two-factor"
                checked={isTwoFactorActive}
                onChange={() => setIsTwoFactorActive(!isTwoFactorActive)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-[#154212] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          {/* Keamanan Akun */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-zinc-200 rounded-2xl p-6 hover:border-[#154212]/30 transition-all">
            <div>
              <h3 className="text-[15px] font-extrabold text-[#1A1C1C] mb-1">
                Keamanan Akun
              </h3>
              <p className="text-[14px] text-zinc-500">
                Izinkan pelacakan lokasi untuk mendukung keamanan dan aktivitas
                akun.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="location-tracking"
                checked={isLocationTracking}
                onChange={() => setIsLocationTracking(!isLocationTracking)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-[#154212] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          {/* Visibilitas Data */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-zinc-200 rounded-2xl p-6 hover:border-[#154212]/30 transition-all">
            <div>
              <h3 className="text-[15px] font-extrabold text-[#1A1C1C] mb-1">
                Visibilitas Data
              </h3>
              <p className="text-[14px] text-zinc-500">
                Atur apakah profil Anda dapat ditampilkan kepada publik.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="public-profile"
                checked={isProfilePublic}
                onChange={() => setIsProfilePublic(!isProfilePublic)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-[#154212] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 pt-10 border-t border-zinc-100">
          {/* Komitmen Privasi */}
          <div className="bg-[#154212] text-white rounded-3xl p-6 shadow-sm">
            <h4 className="text-[18px] font-extrabold mb-3">
              Komitmen Privasi
            </h4>
            <p className="text-[14px] text-white/80 leading-relaxed">
              Di TrashID, kami percaya bahwa data Anda adalah milik Anda. Kami
              menggunakan informasi yang dikumpulkan semata-mata untuk
              meningkatkan efisiensi logistik sampah komunitas.
            </p>
          </div>

          {/* Zona Berbahaya */}
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 shadow-sm">
            <h4 className="text-[18px] font-extrabold text-red-700 mb-3">
              Zona Berbahaya
            </h4>
            <p className="text-[14px] text-red-500 leading-relaxed mb-6">
              Penghapusan akun bersifat permanen. Semua riwayat akun,
              kebijakan, dan data pengolahan sampah akan hilang.
            </p>
            <button className="px-6 py-2 bg-red-600 text-white font-bold text-[13px] rounded-lg hover:bg-red-700 transition-all shadow-sm">
              Minta Penghapusan Akun
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}