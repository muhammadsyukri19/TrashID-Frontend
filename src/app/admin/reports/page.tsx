"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

function StatIcon({ name }: { name: string }) {
  return (
    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
      {name}
    </span>
  );
}

function StatusBadge({ tone, children }: { tone: string; children: React.ReactNode }) {
  const className =
    tone === "green" || tone === "verified"
      ? "bg-[#e7f5e9] text-[#2f6e2f]"
      : tone === "red" || tone === "rejected"
        ? "bg-[#fde7e6] text-[#b84a4a]"
        : "bg-[#fff2df] text-[#c06a00]";

  const label = children === "verified" ? "Terverifikasi" : children === "pending" ? "Menunggu" : children === "rejected" ? "Ditolak" : children;

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${className} capitalize`}>
      {label}
    </span>
  );
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [tpsFilter, setTpsFilter] = useState("Semua TPS");
  const [dateFilter, setDateFilter] = useState("Semua Waktu");
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [confirmData, setConfirmData] = useState<{id: string, status: string} | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const [stats, setStats] = useState([
    { label: "Total Laporan", value: "0", tone: "green", icon: "description" },
    { label: "Menunggu Verifikasi", value: "0", tone: "amber", icon: "schedule" },
    { label: "Terverifikasi", value: "0", tone: "emerald", icon: "check_circle" },
    { label: "Ditolak", value: "0", tone: "red", icon: "cancel" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      if (statusFilter !== "Semua Status") queryParams.append("status", statusFilter === "Terverifikasi" ? "verified" : statusFilter === "Menunggu" ? "pending" : "rejected");
      if (tpsFilter !== "Semua TPS") queryParams.append("tpu", tpsFilter);
      if (dateFilter !== "Semua Waktu") queryParams.append("dateRange", "7days");

      const res = await fetch(`${API_BASE}/admin/reports?${queryParams.toString()}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const json = await res.json();
      
      if (json.status === "success") {
        setReports(json.data);
        
        const total = json.data.length;
        const pending = json.data.filter((r: any) => r.status_laporan === "pending").length;
        const verified = json.data.filter((r: any) => r.status_laporan === "verified").length;
        const rejected = json.data.filter((r: any) => r.status_laporan === "rejected").length;
        
        setStats([
          { label: "Hasil Filter", value: total.toString(), tone: "green", icon: "description" },
          { label: "Menunggu", value: pending.toString(), tone: "amber", icon: "schedule" },
          { label: "Terverifikasi", value: verified.toString(), tone: "emerald", icon: "check_circle" },
          { label: "Ditolak", value: rejected.toString(), tone: "red", icon: "cancel" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, tpsFilter, dateFilter]);

  const handleUpdateStatus = async () => {
    if (!confirmData) return;
    
    const { id, status } = confirmData;
    setConfirmData(null);

    try {
      const token = localStorage.getItem("token");
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${API_BASE}/tps/reports/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        showToast(`Laporan berhasil di-${status === 'verified' ? 'verifikasi' : 'tolak'}`);
        fetchReports();
      } else {
        showToast("Gagal memperbarui status laporan", "error");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Terjadi kesalahan jaringan", "error");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchReports();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchReports]);

  const handleExportCSV = () => {
    if (reports.length === 0) return alert("Tidak ada data untuk diekspor");
    const headers = ["ID Laporan", "TPS", "Pelapor", "Status", "Waktu Lapor", "Deskripsi"];
    const csvData = reports.map(r => [
      r._id,
      r.tps_id?.nama_tps || "N/A",
      r.user_id?.fullName || "Anonim",
      r.status_laporan,
      new Date(r.createdAt).toLocaleString('id-ID'),
      `"${(r.deskripsi || "").replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `laporan_trashid_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  return (
    <div className="space-y-8 font-body animate-fade-in relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[1001] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce-in ${
          toast.type === 'success' ? 'bg-[#154212] text-white' : 'bg-red-600 text-white'
        }`}>
          <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
          <span className="text-sm font-bold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmData && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 animate-fade-in">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${
              confirmData.status === 'verified' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              <span className="material-symbols-outlined text-3xl">
                {confirmData.status === 'verified' ? 'help' : 'warning'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#1a1c1c] text-center mb-2">Konfirmasi Tindakan</h3>
            <p className="text-zinc-500 text-center text-sm leading-relaxed mb-8">
              Apakah Anda yakin ingin <span className="font-bold text-[#154212]">{confirmData.status === 'verified' ? 'Memverifikasi' : 'Menolak'}</span> laporan ini?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmData(null)} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Batal</button>
              <button onClick={handleUpdateStatus} className={`flex-1 py-3 rounded-xl font-bold text-white transition-all active:scale-95 ${
                confirmData.status === 'verified' ? 'bg-[#154212] hover:bg-[#235d1f]' : 'bg-red-600 hover:bg-red-700'
              }`}>Ya, Lanjutkan</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.startsWith('http') ? selectedImage : `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace("/api", "")}${selectedImage}`} alt="Bukti" className="w-full h-auto max-h-[80vh] object-contain bg-zinc-900" />
            <div className="p-4 flex justify-between bg-white border-t border-gray-100">
               <p className="text-sm font-bold text-[#154212]">Bukti Foto Laporan</p>
               <button onClick={() => setSelectedImage(null)} className="text-sm font-bold text-red-600">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <section>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212]">Manajemen Laporan</h1>
        <p className="mt-2 text-sm text-zinc-500">Pantau dan verifikasi laporan sampah masyarakat secara real-time.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#e4e4de] bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl mb-4 ${
              stat.tone === "green" ? "bg-[#ecf7eb] text-[#2f6e2f]" :
              stat.tone === "amber" ? "bg-[#fff2df] text-[#c06a00]" :
              stat.tone === "red" ? "bg-[#fde7e6] text-[#b84a4a]" : "bg-[#e7f5e9] text-[#3d7b3d]"
            }`}>
              <StatIcon name={stat.icon} />
            </div>
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="text-3xl font-extrabold text-[#154212]">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-[#e4e4de] bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#eee9df] flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="Cari ID atau deskripsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-12 pr-4 rounded-full border border-zinc-200 bg-zinc-50 outline-none focus:border-[#154212] transition-all text-sm shadow-inner"
            />
            <span className="material-symbols-outlined absolute left-4 top-3 text-zinc-400">search</span>
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-11 px-4 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-bold text-[#154212] outline-none cursor-pointer hover:bg-zinc-100 transition-colors">
              <option>Semua Status</option>
              <option>Menunggu</option>
              <option>Terverifikasi</option>
              <option>Ditolak</option>
            </select>
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="h-11 px-4 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-bold text-[#154212] outline-none cursor-pointer hover:bg-zinc-100 transition-colors">
              <option>Semua Waktu</option>
              <option>7 Hari Terakhir</option>
            </select>
            <button onClick={handleExportCSV} className="h-11 px-6 rounded-full bg-[#154212] text-white text-xs font-bold hover:bg-[#214d20] transition-all shadow-lg shadow-[#154212]/20 flex items-center gap-2 active:scale-95">
              <span className="material-symbols-outlined text-sm">download</span> Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px] relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#154212] border-t-transparent"></div>
            </div>
          )}
          
          <table className="w-full text-left">
            <thead className="bg-[#f9fbf8] text-[10px] font-bold uppercase tracking-widest text-[#7b9270] border-b border-[#eee9df]">
              <tr>
                <th className="px-6 py-4">Laporan</th>
                <th className="px-6 py-4">TPS</th>
                <th className="px-6 py-4">Pelapor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {reports.slice((currentPage - 1) * 10, currentPage * 10).map((report) => (
                <tr key={report._id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm font-bold text-[#1a1c1c] line-clamp-1">{report.deskripsi || "Tanpa Deskripsi"}</p>
                      <p className="text-[10px] text-zinc-400 font-mono">#{report._id.slice(-6).toUpperCase()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-[#154212]">{report.tps_id?.nama_tps || "N/A"}</p>
                  </td>
                  <td className="px-6 py-5 text-sm text-zinc-600">{report.user_id?.fullName || "Anonim"}</td>
                  <td className="px-6 py-5">
                    <StatusBadge tone={report.status_laporan}>{report.status_laporan}</StatusBadge>
                  </td>
                  <td className="px-6 py-5 text-[11px] text-zinc-500">{new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-1 rounded-full border border-zinc-100 bg-white p-1 shadow-sm w-fit mx-auto">
                      <Link href={`/admin/reports/${report._id}`} className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-[#154212] transition-all">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </Link>
                      <button 
                        onClick={() => setConfirmData({ id: report._id, status: 'verified' })} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${report.status_laporan === 'verified' ? 'bg-[#e7f5e9] text-[#2f6e2f]' : 'text-zinc-400 hover:bg-[#e7f5e9] hover:text-[#2f6e2f]'}`}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: report.status_laporan === 'verified' ? "'FILL' 1" : "" }}>check_circle</span>
                      </button>
                      <button 
                        onClick={() => setConfirmData({ id: report._id, status: 'rejected' })} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${report.status_laporan === 'rejected' ? 'bg-[#fde7e6] text-[#b84a4a]' : 'text-zinc-400 hover:bg-[#fde7e6] hover:text-[#b84a4a]'}`}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: report.status_laporan === 'rejected' ? "'FILL' 1" : "" }}>cancel</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && reports.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-zinc-400 italic">Data tidak ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {reports.length > 10 && (
          <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 border-t border-zinc-100">
            <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">
              Halaman <span className="text-[#154212]">{currentPage}</span> dari <span className="text-[#154212]">{Math.ceil(reports.length / 10)}</span>
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 hover:text-[#154212] disabled:opacity-30 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(Math.ceil(reports.length / 10))].map((_, i) => (
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
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(reports.length / 10), prev + 1))}
                disabled={currentPage === Math.ceil(reports.length / 10)}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 hover:text-[#154212] disabled:opacity-30 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
