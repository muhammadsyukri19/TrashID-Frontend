"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyOTPContent() {
  const router = useRouter();
  const search = useSearchParams();
  const mode = search.get("mode") || "register"; // 'register' or 'reset'
  const email = search.get("email") || "";

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // focus first input on mount
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
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
        // Verify OTP for reset flow
        const res = await fetch(`${API_BASE}/auth/verify-reset-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Verifikasi gagal");

        // store otp temporarily (session) and navigate to reset page
        if (typeof window !== "undefined") {
          sessionStorage.setItem("resetOtp", otp);
        }
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        // registration verification
        const res = await fetch(`${API_BASE}/auth/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Verifikasi gagal");

        // on success receive token -> store and redirect
        const token = data.data?.token;
        if (token && typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#f9f9f9] font-body text-[#1a1c1c]">
      <section className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-[#2d5a27] p-12">
        <div className="text-center max-w-lg text-white">
          <h1 className="font-headline text-4xl font-extrabold text-[#9dd090] mb-4">Verifikasi Kode</h1>
          <p className="opacity-80">Masukkan kode 6 digit yang kami kirimkan ke email Anda.</p>
        </div>
      </section>

      <section className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Masukkan Kode OTP</h2>
            <p className="text-sm text-zinc-600">Kode dikirim ke: <strong>{email}</strong></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-14 text-center text-2xl rounded-md bg-[#f3f3f3]"
                  maxLength={1}
                  inputMode="numeric"
                />
              ))}
            </div>

            {error && <div className="text-red-600">{error}</div>}

            <button type="submit" disabled={loading} className="w-full py-3 bg-[#154212] text-white rounded-md">
              {loading ? "Memverifikasi..." : "Verifikasi"}
            </button>
          </form>

          <div className="mt-6 text-sm">
            <Link href="/login" className="text-zinc-600 hover:text-[#154212]">Kembali ke login</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function VerifyOTPPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0,0,24&display=swap');
        .font-headline { font-family: 'Manrope', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `,
        }}
      />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat...</div>}>
        <VerifyOTPContent />
      </Suspense>
    </>
  );
}


