"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordContent() {
  const router = useRouter();
  const search = useSearchParams();
  const email = search.get("email") || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("resetOtp") || "";
      setOtp(stored);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    if (!password || password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak cocok");
      return;
    }
    if (!email) {
      setError("Data email tidak ditemukan");
      return;
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mereset password");
      
      setMessage("Password Anda berhasil diperbarui! Silakan login kembali.");
      if (typeof window !== "undefined") sessionStorage.removeItem("resetOtp");
      setTimeout(() => router.push("/login"), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfa] flex flex-col justify-center items-center p-6 font-body selection:bg-[#bcf0ae] selection:text-[#154212]">
      {/* Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@20..48,100..700,0..1,-50..200&display=swap');
        .font-headline { font-family: 'Manrope', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}} />

      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#eaf6e0] rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-[#bcf0ae] rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="w-14 h-14 bg-[#154212] rounded-2xl flex items-center justify-center shadow-xl shadow-[#154212]/20 mb-5">
            <span className="material-symbols-outlined text-white text-3xl">lock_reset</span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold text-[#154212] tracking-tight">Atur Ulang Sandi</h1>
          <p className="text-[#72796e] mt-2 font-medium">Buat password baru untuk akun Anda</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(21,66,18,0.08)] border border-[#eaf6e0]/50 p-8 md:p-10">
          <div className="mb-8 p-4 bg-[#f6fbf2] rounded-2xl border border-[#eaf6e0] flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#154212] shadow-sm">
                <span className="material-symbols-outlined text-xl">alternate_email</span>
             </div>
             <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#72796e] leading-none mb-1">Email Anda</p>
                <p className="text-sm font-bold text-[#154212] truncate max-w-[220px]">{email}</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Display (Read only or auto-filled) */}
            <div>
              <label className="block text-sm font-bold text-[#154212] mb-2 px-1">Kode Verifikasi (OTP)</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#9aaa96] group-focus-within:text-[#154212] transition-colors">verified_user</span>
                <input 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="Masukkan 6 digit kode"
                  className="w-full pl-12 pr-4 py-4 bg-[#f9fbf8] border-2 border-transparent rounded-2xl outline-none focus:border-[#154212] focus:bg-white transition-all text-[#1a1c1c] font-semibold placeholder:text-[#9aaa96]/60 shadow-sm"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-bold text-[#154212] mb-2 px-1">Password Baru</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#9aaa96] group-focus-within:text-[#154212] transition-colors">lock</span>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-12 pr-14 py-4 bg-[#f9fbf8] border-2 border-transparent rounded-2xl outline-none focus:border-[#154212] focus:bg-white transition-all text-[#1a1c1c] font-semibold placeholder:text-[#9aaa96]/60 shadow-sm"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9aaa96] hover:text-[#154212]"
                >
                  <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-[#154212] mb-2 px-1">Konfirmasi Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#9aaa96] group-focus-within:text-[#154212] transition-colors">check_circle</span>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={confirm} 
                  onChange={(e) => setConfirm(e.target.value)} 
                  placeholder="Ulangi password baru"
                  className="w-full pl-12 pr-4 py-4 bg-[#f9fbf8] border-2 border-transparent rounded-2xl outline-none focus:border-[#154212] focus:bg-white transition-all text-[#1a1c1c] font-semibold placeholder:text-[#9aaa96]/60 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-shake">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="bg-[#e7f5e9] border border-[#bcf0ae] text-[#154212] px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {message}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading} 
              className="w-full py-4 bg-[#154212] text-white rounded-2xl font-bold text-base shadow-xl shadow-[#154212]/20 hover:bg-[#23581e] hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">update</span>
                  Perbarui Password
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-sm font-bold text-[#72796e] hover:text-[#154212] transition-colors group"
            >
              <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Kembali ke Halaman Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#fcfdfa]">
        <div className="w-10 h-10 border-4 border-[#154212] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}


