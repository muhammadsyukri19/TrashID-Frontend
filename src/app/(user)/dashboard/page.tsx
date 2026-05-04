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

    // Fetch Profile
    fetch("http://localhost:5001/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoadingProfile(false);
      })
      .catch(() => setLoadingProfile(false));

    // Fetch User Reports
    fetch("http://localhost:5001/api/tps/my-reports", {
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
    fetch("http://localhost:5001/api/tps")
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
    <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto bg-[#f9f9f9]">
        {/* Header */}
        {loadingProfile ? <HeaderSkeleton /> : (
          <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12 animate-fade-in">
            <div>
              <h2 className="text-3xl font-extrabold text-[#154212] tracking-tight font-display mb-2">
                Halo, {profile?.fullName?.split(" ")[0] || "Sahabat TrashID"}!
              </h2>
              <p className="text-zinc-500 font-medium">
                Yuk mulai kontribusi kecil hari ini untuk lingkungan yang lebih bersih.
              </p>
            </div>
          </header>
        )}

        {/* Quick Action Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] group p-8 flex flex-col justify-between h-72 border border-zinc-100 hover:shadow-[0_20px_50px_rgba(21,66,18,0.1)] transition-all duration-500">
            <div className="relative z-10 max-w-[70%]">
              <h3 className="font-headline text-2xl font-extrabold text-[#154212] mb-3">
                Scan Sampah
              </h3>
              <p className="text-sm text-zinc-500 mb-8 leading-relaxed font-medium">
                Identifikasi jenis sampah Anda dengan AI untuk pemilahan yang lebih akurat dan reward XP.
              </p>
              <Link href="/dashboard/scan" className="bg-[#154212] hover:bg-[#2d5a27] text-white w-max px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 group-hover:scale-105 active:scale-95 duration-300 shadow-lg shadow-[#154212]/20">
                <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                <span className="font-headline text-sm font-bold">Mulai Scan</span>
              </Link>
            </div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:rotate-12 group-hover:scale-110">
              <img
                alt="AI Scan Illustration"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida/ADBb0uja1dB_Du8ngZmHelyVRaV-j66qqVrIKiFgkyvxP-znuYk77cKToqAsffSs6Q9Z4RB5qKbxeX79JLP5el-zxJVymO4nZPZKzJhxAIO1gIA6cztXFHi3aULrKJXgKtvK-_QMx_XBn4dyuJ99bB2BjXVRaa0G2eD_-bu-homanboF-AYO1g8tTOf_lnr9TMkqT4V_zTCO2B_GpdWxFfj6sxv_XTNp1lHK_JvwQI5tzM4I84-GUlVleqNSUKIDfj6EwvNC4610WDGy"
              />
            </div>
          </div>

          {/* Laporkan TPU Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#154212] to-[#214d20] rounded-2xl shadow-[0_20px_40px_rgba(21,66,18,0.15)] group p-8 flex flex-col justify-between h-72 border border-[#154212] hover:shadow-[0_25px_60px_rgba(21,66,18,0.25)] transition-all duration-500">
            <div className="relative z-10 max-w-[70%] text-white">
              <h3 className="font-headline text-2xl font-extrabold text-[#94f990] mb-3">
                Laporkan Kondisi TPS
              </h3>
              <p className="text-sm text-green-100/80 mb-8 leading-relaxed font-medium">
                Bantu kami memantau titik pembuangan agar kebersihan lingkungan tetap terjaga bersama.
              </p>
              <Link href="/dashboard/lapor" className="bg-[#bcf0ae] text-[#154212] w-max px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 hover:bg-white duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20">
                <span className="material-symbols-outlined text-[20px]">add_location_alt</span>
                <span className="font-headline text-sm font-bold">Buat Laporan</span>
              </Link>
            </div>
            <div className="absolute -right-8 -bottom-8 w-60 h-60 opacity-20 group-hover:opacity-30 transition-all duration-700 group-hover:-rotate-6 group-hover:scale-110">
              <img
                alt="Map Illustration"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida/ADBb0uj-nsINTkAilFM1YQVCZGlmHXeivtV3kphqrgp-1zy4gsrmyb-Mqz8MZXhktRrTgaFTwLUVGSOqebU8RiHazuEVmyyEe5w4HX7mtkZ6sbu67NI8FIq2K4NEfWYZsT3QFYbqc2yNfBLAX1amkXwFZOP55Huali9orFASLeEGSerAeQnaEXobFeetCzn75U2k4y1WZjLGZZ5CZzNIdNVdFCHhBtSE3lnYcFt9celLCOmF5RM8iR6JDfwILc-KazlC5aLL9nwC4OM"
              />
            </div>
          </div>
        </section>

        {/* Riwayat & Peta Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Riwayat (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-headline text-xl font-bold text-[#154212]">
                Laporan Terakhir Anda
              </h3>
              <Link href="/dashboard/riwayat" className="text-sm font-bold text-[#154212] hover:underline">
                Lihat Semua
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-x-auto border border-[#c2c9bb]/10">
              {loadingReports ? <TableSkeleton /> : (
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-[#f3f3f3] border-b border-[#c2c9bb]/10">
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
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#e7f5e9] flex items-center justify-center">
                              <span className="material-symbols-outlined text-[#154212] text-lg">delete</span>
                            </div>
                            <span className="text-sm font-semibold text-[#1a1c1c]">
                              {report.tps_id?.nama_tps || "TPS Terhapus"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-zinc-500">
                          {new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="text-sm font-bold text-red-600">{report.tingkat_kepenuhan * 20}%</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                            report.status_laporan === 'verified' ? 'bg-[#006e1c]/10 text-[#006e1c]' :
                            report.status_laporan === 'rejected' ? 'bg-red-100 text-red-600' :
                            'bg-[#d1e4ff] text-[#001d36]'
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

          {/* Right Column: Peta (1/3 width) - Made it smaller and loading state handled */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-headline text-xl font-bold text-[#154212]">
                Sebaran Lokasi TPS
              </h3>
            </div>
            {/* Reduced height to 300px for "kecil saja" requirement */}
            <div className="bg-white p-2 rounded-xl shadow-[0_20px_40px_rgba(21,66,18,0.06)] h-[300px] flex flex-col border border-[#c2c9bb]/10 relative">
              {loadingTps ? (
                <div className="w-full h-full rounded-lg bg-zinc-100 animate-pulse flex items-center justify-center">
                  <span className="material-symbols-outlined text-zinc-300 text-4xl">map</span>
                </div>
              ) : (
                <div className="flex-1 rounded-lg overflow-hidden relative group z-0">
                  <DashboardMap tpsList={tpsList} />
                  {/* Floating Map Legend Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-[400] bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg flex items-center justify-between pointer-events-none">
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
        <section className="mt-12 bg-gradient-to-br from-[#154212] to-[#2d5a27] text-white p-8 lg:p-12 rounded-3xl relative overflow-hidden shadow-2xl shadow-[#154212]/20 animate-fade-in">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
                <span className="material-symbols-outlined text-[14px] text-[#bcf0ae]">analytics</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#bcf0ae]">Kontribusi Lingkungan</span>
              </div>
              <h3 className="font-headline text-2xl font-bold mb-3">
                Jejak Kebaikan Anda
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-6xl font-black tracking-tighter text-[#94f990]">
                  {((profile?.xp || 0) * 0.5).toFixed(1)}
                </span>
                <span className="text-2xl font-bold opacity-70">KG</span>
              </div>
              <p className="text-sm mt-6 opacity-80 leading-relaxed font-medium">
                Estimasi berat sampah yang berhasil Anda alihkan dari TPA melalui pemilahan dan pelaporan yang bertanggung jawab.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-colors">
                <span className="block text-3xl font-black text-[#94f990] mb-1">{reports.length}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Laporan</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-colors">
                <span className="block text-3xl font-black text-[#94f990] mb-1">{Math.floor((profile?.xp || 0) / 100)}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Lencana</span>
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
