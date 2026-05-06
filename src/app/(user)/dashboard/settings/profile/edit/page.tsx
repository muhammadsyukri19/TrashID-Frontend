"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfileEditPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>({ fullName: "", username: "", email: "", phone: "", address: "", profilePicture: "" });
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [message, setMessage] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api") + "/users/profile", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) setProfile({ ...data, password: "" });
    } catch (e) {
      console.error(e);
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("fullName", profile.fullName);
      formData.append("username", profile.username);
      if (profile.phone) formData.append("phone", profile.phone);
      if (profile.address) formData.append("address", profile.address);
      if (password) formData.append("password", password);
      if (file) formData.append("profilePicture", file);

      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api") + "/users/profile", { method: "PATCH", headers: { Authorization: `Bearer ${token}` }, body: formData });
      if (res.ok) {
        const data = await res.json();
        // Update local storage so sidebar/header reflects the new info
        localStorage.setItem("user", JSON.stringify(data));
        
        setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
        
        // Cek role dari data yang baru diupdate
        const path = data.role === "admin" ? "/admin/settings/profile" : "/dashboard/settings/profile";
        setTimeout(() => router.push(path), 1200);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.message || "Gagal memperbarui profil" });
      }
    } catch {
      setMessage({ type: "error", text: "Terjadi kesalahan pada server" });
    } finally {
      setIsLoading(false);
    }
  };

  const defaultAvatar = "https://ui-avatars.com/api/?name=" + (profile.username || "U") + "&background=ebf5e9&color=154212";
  const displayImage = preview || profile.profilePicture || defaultAvatar;

  return (
    <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col font-body text-[#1a1c1c] p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center gap-2 text-[13px] font-bold text-zinc-500 mb-6 shrink-0">
        <Link href="/dashboard/settings" className="hover:text-[#154212] transition-colors">Setelan</Link>
        <span>/</span>
        <Link href="/dashboard/settings/profile" className="hover:text-[#154212] transition-colors">Profil Saya</Link>
        <span>/</span>
        <span className="text-[#154212]">Edit Profil</span>
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 lg:p-12 w-full flex-1 flex flex-col shadow-sm">
        {isPageLoading ? (
           <div className="flex-1 flex justify-center items-center">
             <span className="w-10 h-10 border-4 border-zinc-200 border-t-[#154212] rounded-full animate-spin"></span>
           </div>
        ) : (
           <form onSubmit={handleUpdate} className="w-full flex-1 flex flex-col">
             {message && (
                <div className={`shrink-0 p-4 mb-8 rounded-xl text-[14px] font-bold border flex items-center gap-3 ${message.type === 'success' ? 'bg-[#ebf5e9] text-[#154212] border-[#a1d494]' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    <span className="material-symbols-outlined text-[20px]">{message.type === "success" ? "check_circle" : "error"}</span>
                    {message.text}
                </div>
             )}

             <div className="flex flex-col items-center justify-center mb-10 w-full">
                <div className="w-32 h-32 rounded-full overflow-hidden border border-zinc-200 shadow-sm mb-6">
                    <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-4">
                    <input type="file" ref={fileInputRef} onChange={(e) => {
                        if (e.target.files?.[0]) { setFile(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); }
                    }} accept="image/*" className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-5 py-2 border border-zinc-300 hover:border-[#154212] hover:text-[#154212] text-zinc-700 text-[13px] font-bold rounded-lg transition-all shadow-sm">
                        Unggah Photo
                    </button>
                    <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="px-5 py-2 border border-zinc-300 hover:border-red-500 hover:text-red-600 text-zinc-700 bg-white text-[13px] font-bold rounded-lg transition-all shadow-sm">
                        Hapus Photo
                    </button>
                </div>
             </div>

             <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto flex-1">
                <div>
                    <label className="block text-[14px] font-bold text-[#1a1c1c] mb-2">Nama Lengkap</label>
                    <input type="text" value={profile.fullName || ""} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} className="w-full px-4 py-4 bg-white border border-zinc-300 focus:border-[#154212] rounded-xl outline-none text-[15px] font-medium transition-all" required placeholder="Nama Lengkap" />
                </div>
                <div>
                    <label className="block text-[14px] font-bold text-[#1a1c1c] mb-2">Username</label>
                    <input type="text" value={profile.username || ""} onChange={(e) => setProfile({ ...profile, username: e.target.value })} className="w-full px-4 py-4 bg-white border border-zinc-300 focus:border-[#154212] rounded-xl outline-none text-[15px] font-medium transition-all" required placeholder="Username" />
                </div>
                <div>
                    <label className="block text-[14px] font-bold text-[#1a1c1c] mb-2">Email</label>
                    <input type="email" value={profile.email || ""} className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-[15px] font-medium text-zinc-500 cursor-not-allowed" readOnly placeholder="Email" />
                </div>
                <div>
                    <label className="block text-[14px] font-bold text-[#1a1c1c] mb-2">Nomor Telepon</label>
                    <input type="text" value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full px-4 py-4 bg-white border border-zinc-300 focus:border-[#154212] rounded-xl outline-none text-[15px] font-medium transition-all" placeholder="Nomor Telepon" />
                </div>
                <div>
                    <label className="block text-[14px] font-bold text-[#1a1c1c] mb-2">Alamat</label>
                    <input type="text" value={profile.address || ""} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="w-full px-4 py-4 bg-white border border-zinc-300 focus:border-[#154212] rounded-xl outline-none text-[15px] font-medium transition-all" placeholder="Alamat" />
                </div>
                <div className="pt-2">
                    <label className="block text-[14px] font-bold text-[#1a1c1c] mb-2">Kata Sandi Baru (Opsional)</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kosongkan jika tidak ingin mengubah sandi" className="w-full px-4 py-4 bg-white border border-zinc-300 focus:border-[#154212] rounded-xl outline-none text-[15px] font-medium transition-all" />
                </div>
             </div>

             <div className="mt-12 pt-8 border-t border-zinc-100 flex justify-between items-center w-full max-w-4xl mx-auto">
                 <Link href="/dashboard/settings/profile" className="px-10 py-3.5 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-xl text-[14px] font-bold shadow-md transition-colors text-center w-full sm:w-auto">
                     Batal
                 </Link>
                 <button type="submit" disabled={isLoading} className="px-10 py-3.5 bg-[#154212] hover:bg-[#10360d] text-white rounded-xl text-[14px] font-bold shadow-md disabled:opacity-70 transition-colors w-full sm:w-auto">
                     {isLoading ? "Menyimpan..." : "Simpan Profil"}
                 </button>
             </div>
           </form>
        )}
      </div>
    </div>
  );
}


