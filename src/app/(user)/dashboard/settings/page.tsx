"use client";

import React, { useState, useEffect, useRef } from "react";

export default function UserSettingsPage() {
  const [profile, setProfile] = useState<any>({
    fullName: "",
    username: "",
    email: "",
    profilePicture: "",
  });
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("fullName", profile.fullName);
      formData.append("username", profile.username);
      formData.append("email", profile.email);
      if (password) {
        formData.append("password", password);
      }
      if (file) {
        formData.append("profilePicture", file);
      }

      const res = await fetch("http://localhost:5001/api/users/profile", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
        setProfile((prev: any) => ({ ...prev, profilePicture: data.profilePicture }));
        setPassword("");
        setFile(null);
      } else {
        setMessage({ type: "error", text: data.message || "Gagal memperbarui profil" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Terjadi kesalahan pada server" });
    } finally {
      setIsLoading(false);
    }
  };

  const displayImage = preview || (profile.profilePicture 
    ? (profile.profilePicture.startsWith('http') ? profile.profilePicture : `http://localhost:5001${profile.profilePicture}`)
    : "https://ui-avatars.com/api/?name=" + (profile.fullName || "User") + "&background=154212&color=fff");

  return (
    <main className="p-8 lg:p-15 w-full max-w-[1400px] mx-auto space-y-8 font-body animate-fade-in">
      <section>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212]">
          Pengaturan Profil
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Kelola informasi pribadi, ganti kata sandi, dan perbarui foto profil Anda.
        </p>
      </section>

      {message && (
        <div className={`p-4 rounded-xl font-medium shadow-sm border ${
          message.type === 'success' 
            ? 'bg-[#ebf5e9] text-[#154212] border-[#a1d494]' 
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">
              {message.type === 'success' ? 'check_circle' : 'error'}
            </span>
            {message.text}
          </div>
        </div>
      )}

      <form onSubmit={handleUpdate} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 p-8 lg:p-10 transition-all">
        <div className="flex flex-col items-center mb-10">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#f0f7ef] shadow-xl transition-all group-hover:scale-105 group-hover:shadow-2xl">
              <img 
                src={displayImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]">
              <span className="material-symbols-outlined text-white text-4xl">photo_camera</span>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          <div className="mt-4 text-center">
             <p className="text-sm font-bold text-[#154212]">Ubah Foto Profil</p>
             <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Klik gambar untuk mengunggah</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">Informasi Dasar</h3>
            
            <div>
              <label className="block text-xs font-bold text-[#1a1c1c] uppercase tracking-wider mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                value={profile.fullName || ""} 
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-[#154212] focus:bg-white focus:ring-4 focus:ring-[#154212]/5 outline-none transition-all font-medium"
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1c1c] uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                value={profile.username || ""} 
                onChange={(e) => setProfile({...profile, username: e.target.value})}
                className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-[#154212] focus:bg-white focus:ring-4 focus:ring-[#154212]/5 outline-none transition-all font-medium"
                required 
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">Keamanan & Kontak</h3>
            
            <div>
              <label className="block text-xs font-bold text-[#1a1c1c] uppercase tracking-wider mb-2">Alamat Email</label>
              <input 
                type="email" 
                value={profile.email || ""} 
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-[#154212] focus:bg-white focus:ring-4 focus:ring-[#154212]/5 outline-none transition-all font-medium text-zinc-500"
                required 
                readOnly
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1c1c] uppercase tracking-wider mb-2">Kata Sandi Baru</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-[#154212] focus:bg-white focus:ring-4 focus:ring-[#154212]/5 outline-none transition-all font-medium"
              />
              <p className="text-[10px] text-zinc-400 mt-2">Kosongkan jika tidak ingin mengubah kata sandi.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 flex justify-end items-center gap-4">
          <button 
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            Batalkan
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-10 py-4 bg-gradient-to-r from-[#154212] to-[#2d5a27] text-white rounded-2xl font-bold shadow-xl shadow-[#154212]/20 hover:scale-105 active:scale-95 disabled:opacity-70 transition-all flex items-center gap-3"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span className="material-symbols-outlined text-[20px]">save</span>
            )}
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </main>
  );
}