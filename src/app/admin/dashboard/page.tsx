"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    clock: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 7.2v5.1l3.5 2.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="m7.5 12 3 3L17 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    done: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="m8.2 12.4 2.4 2.4 5.2-5.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M4.5 19.5h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 16v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 16V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 16v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    bin: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M5.5 7.5h13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9 7.5V6.4A1.4 1.4 0 0 1 10.4 5h3.2A1.4 1.4 0 0 1 15 6.4v1.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M7.5 7.5 8.2 19h7.6l.7-11.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    )
  };
  return icons[name] || null;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
        
        const response = await fetch(`${API_BASE}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = await response.json();
        if (data.status === "success") {
          setStats(data.data.counts);
          setRecentReports(data.data.recentReports);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#154212] border-t-transparent shadow-sm"></div>
        <p className="font-body text-sm font-bold text-[#154212] animate-pulse">Menyiapkan data dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center p-8 text-center bg-red-50 rounded-3xl border border-red-100">
        <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
        <h2 className="text-xl font-bold text-red-800 mb-2">Oops! Ada masalah</h2>
        <p className="text-red-600 max-w-xs">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full font-bold">Coba Lagi</button>
      </div>
    );
  }

  const summaryCards = [
    { label: "Total Laporan", value: stats?.total || 0, trend: "Live", tone: "green", icon: "chart" },
    { label: "Menunggu", value: stats?.waiting || 0, trend: "Priority", tone: "blue", icon: "clock" },
    { label: "Terverifikasi", value: stats?.verified || 0, trend: "Active", tone: "emerald", icon: "check" },
    { label: "Ditolak", value: stats?.rejected || 0, trend: "Done", tone: "olive", icon: "done" },
  ];

  return (
    <div className="space-y-8 pb-8 font-body animate-fade-in">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212] sm:text-4xl">
            Halo, Admin!
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Ringkasan operasional harian untuk memantau laporan, TPU, dan tindak lanjut dengan cepat.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-[#e4e4de] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  card.tone === "green"
                    ? "bg-[#ecf7eb] text-[#2f6e2f]"
                    : card.tone === "blue"
                      ? "bg-[#eaf2ff] text-[#2d6fb1]"
                      : card.tone === "emerald"
                        ? "bg-[#e7f5e9] text-[#3d7b3d]"
                        : "bg-[#eef6e7] text-[#50703f]"
                }`}
              >
                <Icon name={card.icon} />
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  card.tone === "blue" ? "bg-[#fff2df] text-[#c06a00]" : "bg-[#eef8ea] text-[#2e7a2e]"
                }`}
              >
                {card.trend}
              </span>
            </div>
            <p className="mt-4 text-sm text-zinc-500">{card.label}</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#154212]">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <div className="rounded-xl border border-[#e4e4de] bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="font-headline text-lg font-bold text-[#154212]">Laporan Terkini</h2>
              <p className="mt-1 text-sm text-zinc-500">Pantau laporan yang baru masuk.</p>
            </div>
            <Link href="/admin/reports" className="text-sm font-semibold text-[#154212] hover:underline">
              Selengkapnya
            </Link>
          </div>

          <div className="divide-y divide-[#eee9df]">
            {recentReports.length > 0 ? (
              recentReports.map((report) => (
                <div key={report._id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f7ef] text-[#56704c]">
                    <Icon name="bin" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#1a1c1c]">{report.tps_id?.nama_tps || "TPS"}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} • Oleh {report.user_id?.fullName || "Anonim"}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-tight ${
                    report.status_laporan === 'pending' ? 'bg-[#fff2df] text-[#c06a00]' :
                    report.status_laporan === 'verified' ? 'bg-[#e7f5e9] text-[#2f6e2f]' :
                    'bg-[#fde7e6] text-[#b84a4a]'
                  }`}>
                    {report.status_laporan}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-zinc-400 italic">Belum ada laporan masuk.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-[#e4e4de] bg-[#154212] p-6 text-white shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <p className="text-sm font-semibold text-white/80">Statistik User</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold">{stats?.users || 0}</span>
              <span className="text-sm text-white/60">Total Pengguna</span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/60 italic">
              Pertumbuhan pengguna meningkat seiring dengan perluasan cakupan TPU di wilayah Anda.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
