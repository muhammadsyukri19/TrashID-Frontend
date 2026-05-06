"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserRiwayatPage() {
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

    fetch(`${API_BASE}/tps/my-reports`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          setReports(json.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  // Skeleton Loading Component
  const TableSkeleton = () => (
    <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden animate-pulse">
      <div className="h-16 bg-zinc-50 border-b border-zinc-100"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="px-8 py-6 flex items-center justify-between border-b border-zinc-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-100"></div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-100 rounded w-32"></div>
              <div className="h-2 bg-zinc-100 rounded w-16"></div>
            </div>
          </div>
          <div className="h-4 bg-zinc-100 rounded w-24"></div>
          <div className="h-8 bg-zinc-100 rounded-full w-20"></div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="p-6 lg:p-15 w-full max-w-[1200px] mx-auto animate-fade-in">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard" className="inline-flex items-center text-[#154212] font-bold text-sm mb-4 hover:gap-2 transition-all gap-1">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Kembali ke Beranda
          </Link>
          <h2 className="text-3xl font-extrabold text-[#154212] tracking-tight">Riwayat Laporan Anda</h2>
          <p className="text-zinc-500 text-sm mt-1">Daftar seluruh kontribusi laporan kebersihan Anda.</p>
        </div>
        <div className="bg-[#154212] text-white px-6 py-3 rounded-2xl flex items-center gap-4 shadow-lg shadow-[#154212]/20">
          <span className="material-symbols-outlined text-2xl">description</span>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 leading-none">Total Laporan</p>
            <p className="text-xl font-black leading-tight">{loading ? "..." : reports.length}</p>
          </div>
        </div>
      </header>

      {loading ? <TableSkeleton /> : (
        <section className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Lokasi TPS</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Tanggal & Waktu</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 text-center">Kondisi</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {displayedReports.length > 0 ? displayedReports.map((report) => (
                <tr key={report._id} className="hover:bg-zinc-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#e7f5e9] flex items-center justify-center text-[#154212]">
                        <span className="material-symbols-outlined">delete_sweep</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1a1c1c]">{report.tps_id?.nama_tps || "TPS Terhapus"}</p>
                        <p className="text-[10px] text-zinc-400 font-mono mt-0.5">#{report._id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-zinc-500 font-medium">
                    {new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    <span className="block text-[10px] opacity-60">{new Date(report.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex flex-col items-center">
                       <span className={`text-base font-black ${
                         report.tingkat_kepenuhan >= 4 ? 'text-red-500' : 
                         report.tingkat_kepenuhan >= 3 ? 'text-amber-500' : 'text-emerald-500'
                       }`}>
                         {report.tingkat_kepenuhan * 20}%
                       </span>
                       <div className="w-16 h-1.5 bg-zinc-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              report.tingkat_kepenuhan >= 4 ? 'bg-red-500' : 
                              report.tingkat_kepenuhan >= 3 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} 
                            style={{ width: `${report.tingkat_kepenuhan * 20}%` }}
                          />
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      report.status_laporan === 'verified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      report.status_laporan === 'rejected' ? 'bg-red-50 text-red-600 border border-red-100' :
                      'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {report.status_laporan === 'verified' ? 'Terverifikasi' : 
                       report.status_laporan === 'rejected' ? 'Ditolak' : 'Menunggu'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-zinc-400 italic">
                    <span className="material-symbols-outlined text-4xl mb-2 block opacity-20">history</span>
                    Anda belum memiliki riwayat laporan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {reports.length > itemsPerPage && (
          <div className="bg-zinc-50/50 px-8 py-5 border-t border-zinc-100 flex items-center justify-between">
             <p className="text-xs text-zinc-400 font-medium">
               Menampilkan <span className="font-bold text-[#154212]">{displayedReports.length}</span> dari <span className="font-bold text-[#154212]">{reports.length}</span> total laporan
             </p>
             <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 hover:text-[#154212] disabled:opacity-30 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                        currentPage === i + 1 
                          ? "bg-[#154212] text-white shadow-lg shadow-[#154212]/20 scale-105" 
                          : "bg-white border border-zinc-200 text-zinc-400 hover:border-[#154212] hover:text-[#154212]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 hover:text-[#154212] disabled:opacity-30 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
             </div>
          </div>
        )}
      )}
    </main>
  );
}
