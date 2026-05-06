"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyOTPContent() {
  const router = useRouter();
  const search = useSearchParams();
  const mode = search.get("mode") || "register"; 
  const email = search.get("email") || "";

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (isNaN(Number(value)) && value !== "") return;

    const next = [...digits];
    next[index] = value;
    setDigits(next);
    
    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !digits[index] && inputsRef.current[index - 1]) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const otp = digits.join("");
    if (otp.length !== 6) {
      setError("Mohon isi 6 digit kode OTP");
      return;
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

    setLoading(true);
    try {
      if (mode === "reset") {
        const res = await fetch(`${API_BASE}/auth/verify-reset-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Verifikasi gagal");

        if (typeof window !== "undefined") sessionStorage.setItem("resetOtp", otp);
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        const res = await fetch(`${API_BASE}/auth/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Verifikasi gagal");

        const token = data.data?.token;
        if (token && typeof window !== "undefined") localStorage.setItem("token", token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Kode OTP salah atau sudah kadaluarsa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfa] flex flex-col justify-center items-center p-6 font-body">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#eaf6e0] rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-[#bcf0ae] rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-[#154212] rounded-2xl flex items-center justify-center shadow-xl shadow-[#154212]/20 mb-6">
            <span className="material-symbols-outlined text-white text-3xl">mail_lock</span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold text-[#154212] tracking-tight">Verifikasi Email</h1>
          <p className="text-[#72796e] mt-3 font-medium max-w-[280px] mx-auto leading-relaxed">
            Kami telah mengirimkan 6 digit kode OTP ke <span className="text-[#154212] font-bold">{email}</span>
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(21,66,18,0.08)] border border-[#eaf6e0]/50 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex justify-between gap-2 sm:gap-3">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { inputsRef.current[i] = el; }}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-full h-14 sm:h-16 text-center text-2xl font-black rounded-2xl bg-[#f9fbf8] border-2 border-transparent focus:border-[#154212] focus:bg-white outline-none transition-all text-[#154212] shadow-sm"
                  maxLength={1}
                  inputMode="numeric"
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-shake">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-4 bg-[#154212] text-white rounded-2xl font-bold text-base shadow-xl shadow-[#154212]/20 hover:bg-[#23581e] hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">verified</span>
                    Verifikasi Kode
                  </>
                )}
              </button>

              <button 
                type="button"
                className="w-full py-3 text-sm font-bold text-[#72796e] hover:text-[#154212] transition-colors"
              >
                Belum terima kode? <span className="text-[#154212] underline decoration-2 underline-offset-4">Kirim Ulang</span>
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-[#f0f4ee] text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-sm font-bold text-[#72796e] hover:text-[#154212] transition-colors group"
            >
              <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@20..48,100..700,0..1,-50..200&display=swap');
        .font-headline { font-family: 'Manrope', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}} />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fcfdfa]">
          <div className="w-10 h-10 border-4 border-[#154212] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <VerifyOTPContent />
      </Suspense>
    </>
  );
}


