"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AdminSettingsPage() {
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
    : "https://ui-avatars.com/api/?name=" + (profile.fullName || "Admin") + "&background=154212&color=fff");

  return (
    <div className="space-y-8 font-body max-w-4xl">
      <section>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212]">
          Pengaturan Admin
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Kelola informasi profil admin, kredensial, dan foto profil Anda.
        </p>
      </section>

      {message && (
        <div className={`p-4 rounded-xl font-medium ${message.type === 'success' ? 'bg-[#ebf5e9] text-[#154212] border border-[#a1d494]' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpdate} className="bg-white rounded-2xl shadow-[0_10px_28px_rgba(0,0,0,0.04)] border border-[#e4e4de] p-8">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Avatar Section */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <img 
                src={displayImage} 
                alt="Profile" 
                className="w-40 h-40 rounded-full object-cover border-4 border-[#f0f7ef] shadow-md transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            <p className="text-sm font-semibold text-[#154212] mt-4">Klik untuk ubah foto</p>
          </div>

          {/* Form Fields Section */}
          <div className="w-full space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Nama Lengkap (Admin)</label>
              <input 
                type="text" 
                value={profile.fullName || ""} 
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:border-[#154212] focus:bg-white outline-none transition-colors"
                required 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Username</label>
                <input 
                  type="text" 
                  value={profile.username || ""} 
                  onChange={(e) => setProfile({...profile, username: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:border-[#154212] focus:bg-white outline-none transition-colors"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Email Admin</label>
                <input 
                  type="email" 
                  value={profile.email || ""} 
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:border-[#154212] focus:bg-white outline-none transition-colors"
                  required 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Ganti Kata Sandi Keamanan</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kosongkan jika tidak ingin mengubah sandi"
                className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:border-[#154212] focus:bg-white outline-none transition-colors"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-8 py-3 bg-[#154212] hover:bg-[#2d5a27] text-white rounded-xl font-bold shadow-lg shadow-[#154212]/20 disabled:opacity-70 transition-all flex items-center gap-2"
              >
                {isLoading ? "Menyimpan..." : "Simpan Perubahan Profil"}
                {!isLoading && <span className="material-symbols-outlined text-sm">save</span>}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}