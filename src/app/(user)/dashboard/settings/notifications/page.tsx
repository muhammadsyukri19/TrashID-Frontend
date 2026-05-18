"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function NotifikasiPage() {
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] =
    useState(true);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] =
    useState(false);
  const [isActivityTrackingEnabled, setIsActivityTrackingEnabled] =
    useState(true);

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
        <span className="text-[#154212]">Notifikasi</span>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 lg:p-12 w-full flex-1 flex flex-col shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h1 className="font-extrabold text-3xl tracking-tight text-[#154212] mb-2">
              Notifikasi
            </h1>
            <p className="text-[14px] text-zinc-500">
              Kelola bagaimana Anda menerima pemberitahuan dari TrashID.
            </p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="grid grid-cols-1 gap-6">
          {/* Push Notification */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-zinc-200 rounded-2xl p-6 hover:border-[#154212]/30 transition-all">
            <div>
              <h3 className="text-[15px] font-extrabold text-[#1A1C1C] mb-1">
                Push Notification
              </h3>
              <p className="text-[14px] text-zinc-500">
                Terima pemberitahuan instan di perangkat Anda.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="push-notification"
                checked={isPushNotificationEnabled}
                onChange={() =>
                  setIsPushNotificationEnabled(!isPushNotificationEnabled)
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-[#154212] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          {/* Email Notification */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-zinc-200 rounded-2xl p-6 hover:border-[#154212]/30 transition-all">
            <div>
              <h3 className="text-[15px] font-extrabold text-[#1A1C1C] mb-1">
                Email
              </h3>
              <p className="text-[14px] text-zinc-500">
                Terima laporan mingguan dan update penting melalui email.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="email-notification"
                checked={isEmailNotificationEnabled}
                onChange={() =>
                  setIsEmailNotificationEnabled(!isEmailNotificationEnabled)
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-[#154212] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          {/* Activity Tracking */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-zinc-200 rounded-2xl p-6 hover:border-[#154212]/30 transition-all">
            <div>
              <h3 className="text-[15px] font-extrabold text-[#1A1C1C] mb-1">
                Pembaruan Aktivitas
              </h3>
              <p className="text-[14px] text-zinc-500">
                Pantau status pengumpulan sampah secara real-time.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="activity-tracking"
                checked={isActivityTrackingEnabled}
                onChange={() =>
                  setIsActivityTrackingEnabled(!isActivityTrackingEnabled)
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-[#154212] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 pt-10 border-t border-zinc-100">
          {/* Keamanan Data */}
          <div className="bg-[#154212] text-white rounded-3xl p-6 shadow-sm">
            <h4 className="text-[18px] font-extrabold mb-3">
              Keamanan Data
            </h4>
            <p className="text-[14px] text-white/80 leading-relaxed mb-6">
              TrashID bertanggung jawab melindungi informasi pribadi Anda.
              Semua notifikasi diatur untuk memastikan privasi aktivitas
              pengolahan lingkungan Anda tetap terjaga.
            </p>
            <button className="px-6 py-2 bg-white text-[#154212] font-bold text-[13px] rounded-lg hover:bg-zinc-100 transition-all shadow-sm">
              Baca Kebijakan
            </button>
          </div>

          {/* Layanan Terpercaya */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <h4 className="text-[18px] font-extrabold text-[#1A1C1C] mb-3">
              Layanan Terpercaya
            </h4>
            <p className="text-[14px] text-zinc-500 leading-relaxed mb-6">
              Privasi tanpa kompromi. Kami mengutamakan keamanan data sebagai
              pilar utama dalam membangun komunitas lingkungan yang
              berkelanjutan.
            </p>
            <button className="px-6 py-2 bg-[#154212] text-white font-bold text-[13px] rounded-lg hover:bg-[#0f330d] transition-all shadow-sm">
              Hubungi Tim Keamanan
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 