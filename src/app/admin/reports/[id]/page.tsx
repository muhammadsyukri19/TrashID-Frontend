"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

export default function AdminReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusInput, setStatusInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (id) fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/tps/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok) {
        setReport(json.data);
        setStatusInput(json.data.status_laporan);
        setNoteInput(json.data.catatan_admin || "");
      } else {
        alert("Gagal memuat detail laporan");
        router.push("/admin/reports");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (type: 'status' | 'note' | 'both', verifyStatus?: string) => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const payload: any = {};
      
      if (type === 'status' || type === 'both') {
         payload.status = verifyStatus || statusInput;
      }
      if (type === 'note' || type === 'both') {
         payload.catatan_admin = noteInput;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/tps/reports/${id}/status`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Pembaruan berhasil disimpan.");
        fetchReport();
      } else {
        alert("Gagal memperbarui");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-zinc-500 font-bold">Memuat Detail Laporan...</div>;
  if (!report) return <div className="p-8 text-center text-zinc-500 font-bold">Data tidak ditemukan.</div>;

  const getStatusBadge = (status: string) => {
    if (status === 'verified') return <span className="bg-[#e7f5e9] text-[#2f6e2f] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">VERIFIED</span>;
    if (status === 'rejected') return <span className="bg-[#fde7e6] text-[#b84a4a] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">REJECTED</span>;
    return <span className="bg-[#fff2df] text-[#c06a00] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">WAITING</span>;
  };

  return (
    <div className="space-y-8 font-body pb-12 animate-fade-in max-w-6xl mx-auto">
       <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-2">
         <Link href="/admin/reports" className="hover:text-[#154212] transition-colors">Manajemen Laporan</Link>
         <span>›</span>
         <span className="text-[#154212]">Detail Laporan</span>
       </div>
       
       <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
             {/* Header */}
             <div>
                <h1 className="font-headline text-4xl font-extrabold text-[#154212] mb-3">Laporan Sampah</h1>
                <div className="flex items-center gap-3 text-sm text-zinc-500">
                   {getStatusBadge(report.status_laporan)}
                   <span>Dilaporkan {new Date(report.createdAt).toLocaleString('id-ID', {day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'})}</span>
                </div>
             </div>

             {/* Main Image */}
             <div className="w-full h-80 rounded-2xl overflow-hidden border-2 border-dashed border-blue-500 relative group bg-zinc-100">
                <img src={report.foto_url.startsWith('http') ? report.foto_url : `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace("/api", "")}${report.foto_url}`} alt="Bukti Laporan" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
             </div>

             {/* Description */}
             <div className="border border-zinc-200 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-[#1a1c1c] mb-3">Deskripsi</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{report.deskripsi || "Tidak ada deskripsi tambahan yang diberikan oleh pelapor."}</p>
             </div>

             {/* GPS Location */}
             <div className="border border-zinc-200 rounded-2xl p-6 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#1a1c1c]">Lokasi GPS</h3>
                  <div className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {report.user_location?.coordinates[1] || "-"}, {report.user_location?.coordinates[0] || "-"}
                  </div>
                </div>
                <div className="w-full h-64 rounded-xl overflow-hidden bg-zinc-100 relative shadow-inner">
                  {report.user_location?.coordinates ? (
                     <MapComponent 
                       center={[report.user_location.coordinates[1], report.user_location.coordinates[0]]} 
                       markers={[]} 
                       userLocation={[report.user_location.coordinates[1], report.user_location.coordinates[0]]}
                       zoom={15}
                     />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">Lokasi tidak tersedia</div>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                  <span className="material-symbols-outlined text-[16px]">near_me</span>
                  TPS Terdekat: <span className="font-bold text-[#154212]">{report.tps_id?.nama_tps || "-"}</span>
                </div>
             </div>
          </div>

          {/* Sidebar / Actions */}
          <div className="w-full lg:w-[350px] space-y-6">
             <div className="flex gap-3">
               <button 
                 onClick={() => handleUpdate('status', 'rejected')}
                 disabled={isUpdating}
                 className="flex-1 py-3 px-4 bg-[#fde7e6] hover:bg-[#f8d0d0] text-[#b84a4a] font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors active:scale-95 disabled:opacity-50"
               >
                 <span className="material-symbols-outlined text-[18px]">delete</span> Tolak Laporan
               </button>
               <button 
                 onClick={() => handleUpdate('status', 'verified')}
                 disabled={isUpdating}
                 className="flex-1 py-3 px-4 bg-[#154212] hover:bg-[#0f2e0d] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-900/20 active:scale-95 disabled:opacity-50"
               >
                 <span className="material-symbols-outlined text-[18px]">check_circle</span> Verifikasi
               </button>
             </div>

             <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
               <h4 className="text-sm font-bold text-[#1a1c1c] mb-4">Ubah Status Laporan</h4>
               <p className="text-[10px] font-bold text-zinc-400 tracking-wider mb-3 uppercase">Status Saat Ini</p>
               <div className="space-y-2">
                 <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${statusInput === 'pending' ? 'bg-[#f0f7ef] border-[#154212]' : 'border-zinc-100 hover:bg-zinc-50'}`}>
                   <input type="radio" name="status" value="pending" checked={statusInput === 'pending'} onChange={(e) => setStatusInput(e.target.value)} className="hidden" />
                   <span className={`material-symbols-outlined text-[20px] ${statusInput === 'pending' ? 'text-[#154212]' : 'text-zinc-400'}`}>schedule</span>
                   <div className="flex-1">
                     <p className={`text-sm font-bold ${statusInput === 'pending' ? 'text-[#154212]' : 'text-zinc-700'}`}>Menunggu</p>
                     <p className="text-[10px] text-zinc-500">(Waiting)</p>
                   </div>
                   {statusInput === 'pending' && <span className="w-4 h-4 rounded-full border-4 border-[#154212]"></span>}
                   {statusInput !== 'pending' && <span className="w-4 h-4 rounded-full border-2 border-zinc-300"></span>}
                 </label>
                 
                 <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${statusInput === 'verified' ? 'bg-[#f0f7ef] border-[#154212]' : 'border-zinc-100 hover:bg-zinc-50'}`}>
                   <input type="radio" name="status" value="verified" checked={statusInput === 'verified'} onChange={(e) => setStatusInput(e.target.value)} className="hidden" />
                   <span className={`material-symbols-outlined text-[20px] ${statusInput === 'verified' ? 'text-[#154212]' : 'text-zinc-400'}`}>check_circle</span>
                   <div className="flex-1">
                     <p className={`text-sm font-bold ${statusInput === 'verified' ? 'text-[#154212]' : 'text-zinc-700'}`}>Selesai</p>
                     <p className="text-[10px] text-zinc-500">(Verified)</p>
                   </div>
                   {statusInput === 'verified' && <span className="w-4 h-4 rounded-full border-4 border-[#154212]"></span>}
                   {statusInput !== 'verified' && <span className="w-4 h-4 rounded-full border-2 border-zinc-300"></span>}
                 </label>
                 
                 <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${statusInput === 'rejected' ? 'bg-[#fde7e6] border-[#b84a4a]' : 'border-zinc-100 hover:bg-zinc-50'}`}>
                   <input type="radio" name="status" value="rejected" checked={statusInput === 'rejected'} onChange={(e) => setStatusInput(e.target.value)} className="hidden" />
                   <span className={`material-symbols-outlined text-[20px] ${statusInput === 'rejected' ? 'text-[#b84a4a]' : 'text-zinc-400'}`}>cancel</span>
                   <div className="flex-1">
                     <p className={`text-sm font-bold ${statusInput === 'rejected' ? 'text-[#b84a4a]' : 'text-zinc-700'}`}>Ditolak</p>
                     <p className="text-[10px] text-zinc-500">(Rejected)</p>
                   </div>
                   {statusInput === 'rejected' && <span className="w-4 h-4 rounded-full border-4 border-[#b84a4a]"></span>}
                   {statusInput !== 'rejected' && <span className="w-4 h-4 rounded-full border-2 border-zinc-300"></span>}
                 </label>
               </div>
               {statusInput !== report.status_laporan && (
                 <button onClick={() => handleUpdate('status')} disabled={isUpdating} className="mt-4 w-full py-2.5 bg-zinc-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors disabled:opacity-50">
                   Simpan Status Baru
                 </button>
               )}
             </div>

             <div className="bg-zinc-100/70 rounded-2xl p-6 border border-zinc-200/50">
               <h4 className="text-sm font-bold text-[#1a1c1c] mb-4">Informasi Pelapor</h4>
               <div className="flex items-center gap-3 mb-5">
                 <img src={report.user_id?.profilePicture?.startsWith('http') ? report.user_id.profilePicture : report.user_id?.profilePicture ? `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace("/api", "")}${report.user_id.profilePicture}` : `https://ui-avatars.com/api/?name=${report.user_id?.fullName || 'A'}&background=154212&color=fff`} alt="Pelapor" className="w-12 h-12 rounded-full object-cover border border-zinc-200" />
                 <div>
                   <p className="text-sm font-bold text-[#1a1c1c]">{report.user_id?.fullName || "Anonim"}</p>
                   <p className="text-xs text-zinc-500">@{report.user_id?.username || "user"}</p>
                 </div>
               </div>
               
               <div className="space-y-3 pt-2 border-t border-zinc-200">
                 <div className="flex justify-between items-center text-xs">
                   <span className="text-zinc-500 font-medium">Kontak</span>
                   <span className="font-bold text-[#1a1c1c]">{report.user_id?.phone || report.user_id?.email || "-"}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                   <span className="text-zinc-500 font-medium">Total Laporan</span>
                   <span className="font-bold text-[#1a1c1c]">{report.user_id?.processed_reports || 0} diverifikasi / {report.user_id?.total_reports || 0} total</span>
                 </div>
               </div>
             </div>

             <div className="bg-white rounded-2xl p-0">
               <h4 className="text-sm font-bold text-[#1a1c1c] mb-3">Catatan Admin</h4>
               <textarea 
                 value={noteInput}
                 onChange={(e) => setNoteInput(e.target.value)}
                 placeholder="Tambahkan catatan disini untuk dokumentasi internal..."
                 className="w-full h-32 bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:border-[#154212] focus:bg-white transition-all resize-none mb-3 shadow-inner"
               ></textarea>
               <button 
                 onClick={() => handleUpdate('note')}
                 disabled={isUpdating || noteInput === (report.catatan_admin || "")}
                 className="w-full py-3 bg-zinc-200 text-zinc-700 font-bold text-xs rounded-xl hover:bg-zinc-300 transition-colors disabled:opacity-50"
               >
                 {isUpdating ? "Menyimpan..." : "Simpan Catatan"}
               </button>
             </div>
          </div>
       </div>
    </div>
  );
}
