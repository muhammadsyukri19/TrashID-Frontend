"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import the map so it only loads on client side
const DashboardMap = dynamic(() => import("../../../components/DashboardMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-100 flex items-center justify-center animate-pulse">
      <span className="material-symbols-outlined text-zinc-300 text-4xl">map</span>
    </div>
  )
});

// Loading Skeleton Components
const HeaderSkeleton = () => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12 animate-pulse">
    <div>
      <div className="h-8 bg-zinc-200 rounded-md w-64 mb-3"></div>
      <div className="h-4 bg-zinc-200 rounded-md w-96"></div>
    </div>
    <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full w-max border border-zinc-100">
      <div className="w-10 h-10 rounded-full bg-zinc-200"></div>
      <div className="flex flex-col gap-1">
        <div className="h-3 bg-zinc-200 rounded-md w-24"></div>
        <div className="h-2 bg-zinc-200 rounded-md w-16"></div>
      </div>
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="animate-pulse space-y-4 p-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-200"></div>
          <div className="h-4 bg-zinc-200 rounded w-24"></div>
        </div>
        <div className="h-4 bg-zinc-200 rounded w-20"></div>
        <div className="h-6 bg-zinc-200 rounded-full w-16"></div>
      </div>
    ))}
  </div>
);

export default function UserDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [tpsList, setTpsList] = useState<any[]>([]);
  
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingTps, setLoadingTps] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

    // Fetch Profile
    fetch(`${API_BASE}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoadingProfile(false);
      })
      .catch(() => setLoadingProfile(false));

    // Fetch User Reports
    fetch(`${API_BASE}/tps/my-reports`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          setReports(json.data.slice(0, 5)); // Ambil 5 terbaru
        }
        setLoadingReports(false);
      })
      .catch(() => setLoadingReports(false));

    // Fetch TPS
    fetch(`${API_BASE}/tps`)
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          setTpsList(json.data);
        }
        setLoadingTps(false);
      })
      .catch(() => setLoadingTps(false));
  }, [router]);

  return (
    <main className="p-6 lg:p-15 w-full max-w-[1400px] mx-auto bg-[#f5f6f5]">

      {/* Header */}
      {loadingProfile ? <HeaderSkeleton /> : (
        <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10 animate-fade-in">
          <div>
            <h2 className="text-4xl font-bold text-[#154212] mb-2">
              Halo, {profile?.fullName?.split(" ")[0] || "Sahabat TrashID"}!
            </h2>
            <p className="text-2sm text-zinc-500 font-medium">
              Yuk mulai kontribusi kecil hari ini untuk lingkungan yang lebih bersih.
            </p>
          </div>
        </header>
      )}

      {/* Quick Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 ">

        {/* Scan Sampah Card */}
        <div className="relative overflow-hidden bg-[#1e4a1e] rounded-2xl group p-7 flex flex-col justify-between h-52 shadow-lg">
          <div className="relative z-10 max-w-[55%]">
            <h3 className="text-xl font-bold text-white mb-2">
              Scan Sampah
            </h3>
            <p className="text-xs text-green-100/70 mb-5 leading-relaxed font-medium">
              Identifikasi jenis sampah Anda dengan AI untuk pemilahan yang lebih akurat dan reward XP.
            </p>
            <Link href="/dashboard/scan" className="inline-flex items-center gap-2 bg-[#4caf50] hover:bg-[#43a047] text-white px-5 py-2.5 rounded-xl transition-all text-sm font-bold shadow-md group-hover:scale-105 active:scale-95 duration-300">
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              Mulai Scan
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 h-full flex items-end pointer-events-none">
            <img
              alt="AI Scan Illustration"
              className="h-[92%] w-auto object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
              src="/tong-sampah.png"
            />
          </div>
        </div>

        {/* Laporkan TPU Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#154212] to-[#214d20] rounded-2xl group p-7 flex flex-col justify-between h-52 shadow-lg border border-[#154212]">
          <div className="relative z-10 max-w-[55%] text-white">
            <h3 className="text-xl font-bold text-[#94f990] mb-2">
              Laporkan Kondisi TPS
            </h3>
            <p className="text-xs text-green-100/70 mb-5 leading-relaxed font-medium">
              Bantu kami memantau titik pembuangan agar kebersihan lingkungan tetap terjaga bersama.
            </p>
            <Link href="/dashboard/lapor" className="inline-flex items-center gap-2 bg-[#bcf0ae] text-[#154212] px-5 py-2.5 rounded-xl transition-all text-sm font-bold hover:bg-white duration-300 group-hover:scale-105 active:scale-95 shadow-md">
              <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
              Buat Laporan
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 h-full flex items-end pointer-events-none">
            <img
              alt="Map Illustration"
              className="h-[92%] w-auto object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
              src="/tong-sampah.png"
            />
          </div>
        </div>
      </section>

      {/* Riwayat & Peta Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Riwayat (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-bold text-[#1a1a1a]">
              Laporan Terakhir Anda
            </h3>
            <Link href="/dashboard/riwayat" className="text-sm font-bold text-[#154212] hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-x-auto border border-zinc-100">
            {loadingReports ? <TableSkeleton /> : (
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-zinc-50 border-b border-zinc-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Lokasi TPS</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Tanggal</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400 text-center">Kondisi</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {reports.length > 0 ? reports.map((report) => (
                    <tr key={report._id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#e7f5e9] flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-[#154212] text-lg">delete</span>
                          </div>
                          <span className="text-sm font-semibold text-[#1a1c1c]">
                            {report.tps_id?.nama_tps || "TPS Terhapus"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500">
                        {new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-red-500">{report.tingkat_kepenuhan * 20}%</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                          report.status_laporan === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                          report.status_laporan === 'rejected' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {report.status_laporan}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-zinc-400 text-sm">
                        Anda belum memiliki riwayat laporan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column: Peta (1/3 width) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-bold text-[#1a1a1a]">
              Sebaran Lokasi TPS
            </h3>
          </div>
          <div className="bg-white p-2 rounded-2xl shadow-sm h-[300px] flex flex-col border border-zinc-100 relative">
            {loadingTps ? (
              <div className="w-full h-full rounded-xl bg-zinc-100 animate-pulse flex items-center justify-center">
                <span className="material-symbols-outlined text-zinc-300 text-4xl">map</span>
              </div>
            ) : (
              <div className="flex-1 rounded-xl overflow-hidden relative group z-0">
                <DashboardMap tpsList={tpsList} />
                {/* Floating Map Legend Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-[400] bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center justify-between pointer-events-none">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                      Total Titik Tersedia
                    </span>
                    <span className="text-sm font-bold text-[#154212]">
                      {tpsList.length} TPS Terdaftar
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#bcf0ae] flex items-center justify-center text-[#154212]">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contextual Impact Meter - Beautiful Stats Section */}
      <section className="mt-8 bg-gradient-to-br from-[#154212] to-[#2d5a27] text-white px-6 py-5 rounded-2xl relative overflow-hidden shadow-xl shadow-[#154212]/20 animate-fade-in">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bcf0ae]"></span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#bcf0ae]">Kontribusi Lingkungan</span>
              </div>
              <h3 className="text-base font-bold mb-0.5">Jejak Kebaikan Anda</h3>
              <p className="text-xs opacity-60 leading-relaxed max-w-xs">
                Estimasi berat sampah yang berhasil Anda alihkan dari TPA.
              </p>
            </div>
            <div className="flex items-baseline gap-1 flex-shrink-0">
              <span className="text-4xl font-black tracking-tighter text-[#94f990] leading-none">
                {((profile?.xp || 0) * 0.5).toFixed(1)}
              </span>
              <span className="text-base font-bold opacity-60">KG</span>
            </div>
          </div>

          <div className="hidden md:block w-px self-stretch bg-white/10"></div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-white/8 border border-white/10 rounded-xl px-5 py-3 flex items-center gap-3 hover:bg-white/12 transition-colors">
              <span className="material-symbols-outlined text-[#94f990] text-lg">description</span>
              <div>
                <span className="block text-2xl font-black text-[#94f990] leading-none">{reports.length}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Laporan</span>
              </div>
            </div>
            <div className="bg-white/8 border border-white/10 rounded-xl px-5 py-3 flex items-center gap-3 hover:bg-white/12 transition-colors">
              <span className="material-symbols-outlined text-[#94f990] text-lg">military_tech</span>
              <div>
                <span className="block text-2xl font-black text-[#94f990] leading-none">{Math.floor((profile?.xp || 0) / 100)}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Lencana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-[#94f990]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Floating Action Button (FAB) */}
      <Link href="/dashboard/lapor" className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#154212] to-[#2d5a27] text-white shadow-[0_20px_40px_rgba(21,66,18,0.3)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 group border-2 border-white/20">
        <span className="material-symbols-outlined text-3xl">add</span>
        <span className="absolute right-20 bg-[#154212] px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none">
          Lapor Sekarang
        </span>
      </Link>
    </main>
  );
}

