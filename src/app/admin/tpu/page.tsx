"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../../../components/MapComponent"), { ssr: false });

function StatIcon({ name }: { name: string }) {
  return (
    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
      {name}
    </span>
  );
}

function StatusBadge({ tone, children }: { tone: string; children: React.ReactNode }) {
  const className =
    tone === "green"
      ? "bg-[#e7f5e9] text-[#2f6e2f]"
      : tone === "red"
        ? "bg-[#fde7e6] text-[#b84a4a]"
        : "bg-[#fff2df] text-[#c06a00]";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${className}`}>
      {children}
    </span>
  );
}

export default function AdminTpuPage() {
  const [tpsList, setTpsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: "Total Fasilitas", value: "0", icon: "location_city", tone: "green" },
    { label: "Penuh", value: "0", icon: "error", tone: "red" },
    { label: "Sedang", value: "0", icon: "warning", tone: "amber" },
    { label: "Kosong", value: "0", icon: "check_circle", tone: "emerald" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/tps");
        const json = await response.json();
        if (json.status === "success") {
          setTpsList(json.data);
          
          // Update stats dynamically
          const total = json.data.length;
          const penuh = json.data.filter((t: any) => t.status_terkini === "penuh").length;
          const sedang = json.data.filter((t: any) => t.status_terkini === "sedang").length;
          const kosong = json.data.filter((t: any) => t.status_terkini === "kosong").length;

          setStats([
            { label: "Total Fasilitas", value: total.toString(), icon: "location_city", tone: "green" },
            { label: "Penuh", value: penuh.toString(), icon: "error", tone: "red" },
            { label: "Sedang", value: sedang.toString(), icon: "warning", tone: "amber" },
            { label: "Kosong", value: kosong.toString(), icon: "check_circle", tone: "emerald" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching admin tps data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const mapMarkers = tpsList.map((tps: any) => ({
    lat: tps.location?.coordinates[1],
    lng: tps.location?.coordinates[0],
    status: tps.status_terkini === "penuh" ? "Penuh" : tps.status_terkini === "sedang" ? "Hampir Penuh" : "Kosong",
    name: tps.nama_tps,
    address: tps.deskripsi
  })).filter(m => m.lat !== undefined);

  return (
    <div className="space-y-8 font-body p-6">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0,24&display=swap');
        `,
        }}
      />
      
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212]">
            Kelola TPU
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Pantau kapasitas TPS/TPA, status operasional, dan kondisi fasilitas dalam satu halaman yang rapi.
          </p>
        </div>

        <div className="hidden items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm md:flex border border-gray-100">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=154212&color=fff"
            alt="Admin"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-bold text-[#1a1c1c]">Admin System</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">Dashboard</p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#e4e4de] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  stat.tone === "green" ? "bg-[#ecf7eb] text-[#2f6e2f]" : 
                  stat.tone === "red" ? "bg-[#fde7e6] text-[#b84a4a]" : 
                  "bg-[#fff2df] text-[#c06a00]"
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

      {/* Table Section */}
      <section className="rounded-xl border border-[#e4e4de] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-5 border-b border-[#eee9df] p-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-headline text-lg font-bold text-[#154212]">Daftar TPS/TPA (Database)</h2>
            <p className="mt-1 text-sm text-zinc-500">List fasilitas yang terdaftar di database sistem.</p>
          </div>
          <button className="bg-[#154212] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#23581e] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Tambah TPU Baru
          </button>
        </div>

        <div className="overflow-x-auto p-5 pb-2">
          <table className="min-w-[1000px] w-full text-left">
            <thead className="bg-[#154212] text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              <tr>
                <th className="px-5 py-3">Nama Fasilitas</th>
                <th className="px-5 py-3">Deskripsi / Alamat</th>
                <th className="px-5 py-3">Koordinat (Lng, Lat)</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7efe3]">
              {tpsList.map((tps, index) => (
                <tr key={tps._id} className={`${index % 2 === 0 ? "bg-white" : "bg-[#f0f7ef]"} hover:bg-[#e8f3e8] transition-colors`}>
                  <td className="px-5 py-4 text-sm font-bold text-[#1a1c1c]">{tps.nama_tps}</td>
                  <td className="px-5 py-4 text-sm text-zinc-600">{tps.deskripsi || "-"}</td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-500">
                    {tps.location?.coordinates[0]}, {tps.location?.coordinates[1]}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <StatusBadge tone={tps.status_terkini === 'penuh' ? 'red' : tps.status_terkini === 'sedang' ? 'amber' : 'green'}>
                      {tps.status_terkini.toUpperCase()}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {tpsList.length === 0 && !loading && (
                <tr><td colSpan={5} className="p-10 text-center text-zinc-400">Tidak ada data TPS ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Map Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-headline text-lg font-bold text-[#154212]">Monitoring Visual Map</h2>
        </div>
        <div className="rounded-xl border border-[#e4e4de] bg-white p-2 shadow-[0_10px_28px_rgba(0,0,0,0.04)] h-[500px]">
          {!loading ? (
            <MapComponent markers={mapMarkers} center={[4.6951, 96.7494]} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-zinc-400 animate-pulse font-medium">Menyiapkan Peta...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
