"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const search = useSearchParams();
  const email = search.get("email") || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("resetOtp") || "";
      setOtp(stored);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!password || password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak cocok");
      return;
    }
    if (!email) {
      setError("Email tidak tersedia");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mereset password");
      setMessage(data.message || "Password berhasil diubah");
      // clear stored otp
      if (typeof window !== "undefined") sessionStorage.removeItem("resetOtp");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#f9f9f9]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
        <p className="text-sm text-zinc-600 mb-4">Untuk: <strong>{email}</strong></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Kode OTP</label>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm">Password Baru</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm">Konfirmasi Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>

          {error && <div className="text-red-600">{error}</div>}
          {message && <div className="text-green-600">{message}</div>}

          <button disabled={loading} className="w-full py-2 bg-[#154212] text-white rounded">
            {loading ? "Memproses..." : "Atur Ulang Password"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link href="/login" className="text-zinc-600 hover:text-[#154212]">Kembali ke login</Link>
        </div>
      </div>
    </div>
  );
}
