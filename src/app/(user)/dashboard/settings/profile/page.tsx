"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfileViewPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api") + "/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const defaultAvatar = "https://ui-avatars.com/api/?name=" + (profile?.username || "U") + "&background=ebf5e9&color=154212";
  const displayImage = profile?.profilePicture || defaultAvatar;

  return (
    <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col font-body text-[#1a1c1c] p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center gap-2 text-[13px] font-bold text-zinc-500 mb-6 shrink-0">
        <Link href="/dashboard/settings" className="hover:text-[#154212] transition-colors">Setelan</Link>
        <span>/</span>
        <span className="text-[#154212]">Profil Saya</span>
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 lg:p-12 w-full flex-1 flex flex-col shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h1 className="font-extrabold text-3xl tracking-tight text-[#154212] mb-2">Profil Saya</h1>
            <p className="text-[14px] text-zinc-500">Amati atau unggah detail profil untuk disesuaikan.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <span className="w-10 h-10 border-4 border-zinc-200 border-t-[#154212] rounded-full animate-spin"></span>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full">
            {/* Avatar centered at top */}
            <div className="flex flex-col items-center justify-center mb-12">
               <div className="relative w-36 h-36 rounded-full overflow-hidden border border-zinc-200 shadow-md mb-6">
                 <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
               </div>
               <h2 className="text-2xl font-extrabold text-[#1a1c1c] mb-1">{profile?.fullName || profile?.username || "Pengguna"}</h2>
               <p className="text-[14px] text-zinc-500 font-medium mb-4">{profile?.email || "-"}</p>
               <Link href="/dashboard/settings/profile/edit" className="px-6 py-2 border border-zinc-300 text-zinc-700 hover:border-[#154212] hover:text-[#154212] hover:bg-zinc-50 font-bold text-[13px] rounded-lg transition-all shadow-sm">
                 Edit Profil
               </Link>
            </div>

            {/* Profile Details in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 w-full px-4 border-t border-zinc-100 pt-12">
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold text-[#1A1C1C] mb-2">Nama Lengkap</span>
                <span className="text-[15px] font-medium text-zinc-600 pb-2 border-b border-zinc-100">{profile?.fullName || "-"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold text-[#1A1C1C] mb-2">Nomor Telepon</span>
                <span className="text-[15px] font-medium text-zinc-600 pb-2 border-b border-zinc-100">{profile?.phone || "-"}</span>
              </div>
              <div className="md:col-span-2 flex flex-col">
                <span className="text-[14px] font-extrabold text-[#1A1C1C] mb-2">Alamat</span>
                <span className="text-[15px] font-medium text-zinc-600 pb-2 border-b border-zinc-100 min-h-[40px]">{profile?.address || "-"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



