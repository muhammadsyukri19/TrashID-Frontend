"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function UbahKataSandiPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (newPassword === confirmNewPassword) {
      alert("Kata sandi berhasil diubah!");
    } else {
      alert("Kata sandi baru dan konfirmasi kata sandi tidak cocok.");
    }
  };

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
        <Link
          href="/dashboard/settings/privacy"
          className="hover:text-[#154212] transition-colors"
        >
          Privasi
        </Link>
        <span>/</span>
        <span className="text-[#154212]">Ubah Kata Sandi</span>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 lg:p-12 w-full flex-1 flex flex-col shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h1 className="font-extrabold text-3xl tracking-tight text-[#154212] mb-2">
              Ubah Kata Sandi
            </h1>
            <p className="text-[14px] text-zinc-500">
              Amankan akun Anda dengan mengganti kata sandi secara berkala.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            {/* Kata Sandi Saat Ini */}
            <div className="flex flex-col">
              <label className="text-[14px] font-extrabold text-[#1A1C1C] mb-2">
                Kata Sandi Saat Ini
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Masukkan kata sandi saat ini"
                  className="w-full h-12 px-4 pr-12 text-[14px] font-medium text-zinc-700 border border-zinc-200 rounded-xl outline-none focus:border-[#154212] focus:ring-2 focus:ring-[#154212]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#154212] transition-colors"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {showCurrentPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Kata Sandi Baru */}
            <div className="flex flex-col">
              <label className="text-[14px] font-extrabold text-[#1A1C1C] mb-2">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Buat kata sandi baru"
                  className="w-full h-12 px-4 pr-12 text-[14px] font-medium text-zinc-700 border border-zinc-200 rounded-xl outline-none focus:border-[#154212] focus:ring-2 focus:ring-[#154212]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#154212] transition-colors"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {showNewPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Konfirmasi Kata Sandi Baru */}
            <div className="flex flex-col">
              <label className="text-[14px] font-extrabold text-[#1A1C1C] mb-2">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full h-12 px-4 pr-12 text-[14px] font-medium text-zinc-700 border border-zinc-200 rounded-xl outline-none focus:border-[#154212] focus:ring-2 focus:ring-[#154212]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#154212] transition-colors"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => alert("Perubahan dibatalkan")}
                className="px-6 py-3 border border-zinc-300 text-zinc-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 font-bold text-[13px] rounded-lg transition-all shadow-sm"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-[#154212] text-white font-bold text-[13px] rounded-lg hover:bg-[#0f330d] transition-all shadow-sm"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>

          {/* Security Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#154212] text-white rounded-3xl p-6 shadow-sm">
              <h4 className="text-[18px] font-extrabold mb-3">
                Keamanan Kata Sandi
              </h4>
              <p className="text-[14px] text-white/80 leading-relaxed mb-5">
                Pastikan kata sandi baru Anda memenuhi kriteria berikut untuk
                menjaga keamanan akun TrashID Anda.
              </p>

              <ul className="space-y-3 text-[14px] text-white/90">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px]">
                    check_circle
                  </span>
                  <span>Minimal 8 karakter unik</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px]">
                    check_circle
                  </span>
                  <span>Komposisi huruf besar dan kecil</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px]">
                    check_circle
                  </span>
                  <span>Setidaknya ada satu angka (0-9)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px]">
                    check_circle
                  </span>
                  <span>Karakter spesial, misalnya @, #, $, atau !</span>
                </li>
              </ul>
            </div>

            {/* Help Section */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-sm">
              <h4 className="text-[18px] font-extrabold text-[#1A1C1C] mb-3">
                Butuh bantuan?
              </h4>
              <p className="text-[14px] text-zinc-500 leading-relaxed mb-6">
                Lupa kata sandi lama? Hubungi pusat bantuan kami untuk mendapat
                arahan lebih lanjut.
              </p>
              <button className="px-6 py-2 bg-[#154212] text-white font-bold text-[13px] rounded-lg hover:bg-[#0f330d] transition-all shadow-sm">
                Hubungi Bantuan
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}