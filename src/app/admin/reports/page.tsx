"use client";

import React, { useState, useEffect } from "react";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [confirmData, setConfirmData] = useState<{id: string, status: string} | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const [stats, setStats] = useState([
    { label: "Total Laporan", value: "0", tone: "green", icon: "description" },
    { label: "Menunggu Verifikasi", value: "0", tone: "amber", icon: "schedule" },
    { label: "Terverifikasi", value: "0", tone: "emerald", icon: "check_circle" },
    { label: "Ditolak", value: "0", tone: "red", icon: "cancel" },
  ]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api") + "/tps/reports", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const json = await res.json();
      if (json.status === "success") {
        setReports(json.data);
        
        // Update stats
        const total = json.data.length;
        const pending = json.data.filter((r: any) => r.status_laporan === "pending").length;
        const verified = json.data.filter((r: any) => r.status_laporan === "verified").length;
        const rejected = json.data.filter((r: any) => r.status_laporan === "rejected").length;
        
        setStats([
          { label: "Total Laporan", value: total.toString(), tone: "green", icon: "description" },
          { label: "Menunggu Verifikasi", value: pending.toString(), tone: "amber", icon: "schedule" },
          { label: "Terverifikasi", value: verified.toString(), tone: "emerald", icon: "check_circle" },
          { label: "Ditolak", value: rejected.toString(), tone: "red", icon: "cancel" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!confirmData) return;
    
    const { id, status } = confirmData;
    setConfirmData(null); // Tutup modal konfirmasi

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/tps/reports/${id}/status`, {
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
    fetchReports();
  }, []);

  return (
    <div className="space-y-8 font-body">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[1001] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce-in ${
          toast.type === 'success' ? 'bg-[#154212] text-white' : 'bg-red-600 text-white'
        }`}>
          <span className="material-symbols-outlined text-xl">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
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
              Apakah Anda yakin ingin <span className="font-bold text-[#154212]">{confirmData.status === 'verified' ? 'Memverifikasi' : 'Menolak'}</span> laporan ini? Tindakan ini dapat diubah kembali nanti.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmData(null)}
                className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleUpdateStatus}
                className={`flex-1 py-3 rounded-xl font-bold text-white transition-all active:scale-95 ${
                  confirmData.status === 'verified' ? 'bg-[#154212] hover:bg-[#235d1f]' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Image Modal Popup */}
      {selectedImage && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setSelectedImage(null)}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <img 
              src={selectedImage.startsWith('http') ? selectedImage : `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace("/api", "")}${selectedImage}`} 
              alt="Bukti Laporan" 
              className="w-full h-auto max-h-[85vh] object-contain bg-zinc-900" 
            />
            <div className="p-4 bg-white flex justify-between items-center border-t border-gray-100">
              <p className="text-sm font-bold text-[#154212]">Bukti Foto Laporan</p>
              <a 
                href={selectedImage.startsWith('http') ? selectedImage : `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace("/api", "")}${selectedImage}`} 
                target="_blank" 
                className="text-xs font-bold text-[#2d6fb1] hover:underline"
              >
                Buka di Tab Baru
              </a>
            </div>
          </div>
        </div>
      )}
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212]">
            Manajemen Laporan
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Pantau laporan masuk, verifikasi, dan tindak lanjut dalam tampilan yang ringkas dan mudah dibaca.
          </p>
        </div>

        <div className="hidden items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm md:flex">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=154212&color=fff"
            alt="Admin"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-bold text-[#1a1c1c]">Admin</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">Dashboard</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#e4e4de] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  stat.tone === "green"
                    ? "bg-[#ecf7eb] text-[#2f6e2f]"
                    : stat.tone === "emerald"
                      ? "bg-[#e7f5e9] text-[#3d7b3d]"
                      : stat.tone === "red"
                        ? "bg-[#fde7e6] text-[#b84a4a]"
                        : "bg-[#fff2df] text-[#c06a00]"
                }`}
              >
                <StatIcon name={stat.icon} />
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#154212]">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-[#e4e4de] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-4 border-b border-[#eee9df] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-headline text-lg font-bold text-[#154212]">Daftar Laporan Masuk</h2>
            <p className="mt-1 text-sm text-zinc-500">Gunakan pencarian dan filter untuk memeriksa laporan dengan cepat.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari ID, TPU, atau pelapor..."
                className="h-9 w-[220px] rounded-full border border-[#d9e4d3] bg-[#f7fbf5] pl-10 pr-4 text-xs text-[#1a1c1c] outline-none placeholder:text-zinc-400 focus:border-[#154212]"
              />
              <span className="material-symbols-outlined absolute left-3 top-2 text-[18px] text-zinc-400">
                search
              </span>
            </div>

            {[
              "Semua Status",
              "Semua TPU",
              "7 Hari Terakhir",
            ].map((item) => (
              <button
                key={item}
                className="h-9 rounded-full border border-[#d9e4d3] bg-[#f7fbf5] px-4 text-xs font-semibold text-[#39533a] transition-colors hover:bg-[#eef8ea]"
              >
                {item}
              </button>
            ))}

            <button className="h-9 rounded-full bg-[#154212] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#214d20]">
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-left">
            <thead className="bg-[#f3f7ef] text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b9270]">
              <tr>
                <th className="px-5 py-3">ID Laporan</th>
                <th className="px-5 py-3">Nama TPU</th>
                <th className="px-5 py-3">Pelapor</th>
                <th className="px-5 py-3">Deskripsi Kondisi</th>
                <th className="px-5 py-3">Lokasi GPS</th>
                <th className="px-5 py-3">Waktu Lapor</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eee9df]">
              {reports.map((report) => (
                <tr key={report._id} className="align-top transition-colors hover:bg-[#fafcf8]">
                  <td className="px-5 py-4">
                    <div className="text-sm font-bold text-[#5d8057]">#{report._id.substring(report._id.length - 5).toUpperCase()}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="min-w-[180px]">
                      <p className="text-sm font-bold text-[#1a1c1c]">{report.tps_id?.nama_tps || "TPS Terhapus"}</p>
                      <p className="text-xs text-zinc-500">Kondisi: {report.tingkat_kepenuhan * 20}%</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f5e9] text-[10px] font-bold text-[#2f6e2f]">
                        {report.user_id?.fullName?.charAt(0) || "U"}
                      </div>
                      <span className="text-sm font-semibold text-[#1a1c1c]">{report.user_id?.fullName || "User"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="w-20 h-12 rounded bg-gray-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-gray-200" onClick={() => setSelectedImage(report.foto_url)}>
                         <img 
                           src={report.foto_url.startsWith('http') ? report.foto_url : `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace("/api", "")}${report.foto_url}`} 
                           alt="Bukti" 
                           className="w-full h-full object-cover" 
                         />
                      </div>
                      <p className="max-w-[360px] text-[11px] leading-relaxed text-zinc-600 line-clamp-2">{report.deskripsi || "Tidak ada deskripsi"}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-[#eef3ff] px-3 py-1 text-[10px] font-semibold text-[#2d6fb1]">
                      {report.user_location?.coordinates[1].toFixed(4)}, {report.user_location?.coordinates[0].toFixed(4)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[11px] text-zinc-500">
                    {new Date(report.createdAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <StatusBadge tone={report.status_laporan}>{report.status_laporan}</StatusBadge>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex items-center gap-1 rounded-full border border-[#e4e4de] bg-white p-1 shadow-sm">
                      <button 
                        onClick={() => setSelectedImage(report.foto_url)}
                        className="rounded-full p-1.5 text-[#7b8b76] transition-colors hover:bg-[#f1f6ef] hover:text-[#154212]" 
                        aria-label="Lihat detail"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      
                      <button 
                        onClick={() => setConfirmData({ id: report._id, status: 'verified' })}
                        className={`rounded-full p-1.5 transition-all ${
                          report.status_laporan === 'verified' 
                            ? "bg-[#eef8ea] text-[#2f6e2f]" 
                            : "text-[#7b8b76] hover:bg-[#eef8ea] hover:text-[#2f6e2f]"
                        }`}
                        aria-label="Verifikasi"
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: report.status_laporan === 'verified' ? "'FILL' 1" : "" }}>
                          check_circle
                        </span>
                      </button>

                      <button 
                        onClick={() => setConfirmData({ id: report._id, status: 'rejected' })}
                        className={`rounded-full p-1.5 transition-all ${
                          report.status_laporan === 'rejected' 
                            ? "bg-[#fde7e6] text-[#b84a4a]" 
                            : "text-[#7b8b76] hover:bg-[#fde7e6] hover:text-[#b84a4a]"
                        }`}
                        aria-label="Tolak"
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: report.status_laporan === 'rejected' ? "'FILL' 1" : "" }}>
                          cancel
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-zinc-400">Belum ada laporan masuk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#eee9df] px-5 py-4 text-sm text-zinc-500 lg:flex-row lg:items-center lg:justify-between">
          <p>
            Menampilkan <span className="font-semibold text-[#1a1c1c]">{reports.length}</span> laporan
          </p>
        </div>
      </section>
    </div>
  );
}



