"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  // State untuk form input
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  // State untuk response/loading
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hit API backend untuk register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mendaftar");
      }

      // Jika sukses
      setSuccessMsg(
        "Registrasi berhasil! Silakan periksa email/OTP (atau langsung login).",
      );

      // Bawa user ke halaman OTP (jika ada alurnya) ATAU ke /login
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0,0,24&display=swap');
        
        .font-headline { font-family: 'Manrope', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-effect {
            background: rgba(249, 249, 249, 0.7);
            backdrop-filter: blur(20px);
        }
      `,
        }}
      />

      <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body selection:bg-[#bcf0ae] selection:text-[#002201] min-h-screen">
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-transparent">
          {/* Ubah warna text emerald-900 ke nilai hex #064e3b atau biarkan saja warna custom yang mendeketai green */}
          <div className="text-2xl font-black text-[#154212] tracking-tight font-headline">
            TrashID
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#154212]">
              help_outline
            </span>
          </div>
        </header>

        <main className="min-h-screen flex flex-col md:flex-row">
          {/* Left Section: Eco-Tech Illustration */}
          <section className="hidden md:flex md:w-1/2 relative bg-[#2d5a27] overflow-hidden items-center justify-center p-12">
            <div
              className="absolute inset-0 opacity-20"
              title="Close-up of a vibrant green leaf with intricate veins and morning dew, representing organic growth and precision tech."
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQCWjAqa2EEenR7GlJ8CLK4vJ7HM6rkqdGg3ETvt2pPQYi8refTDaLnNLWrYYINGtOiznAO5kw3-i3yRLkq79lxL4ybQt7SOzpzHePwEtkl_WvXRXwqbq3Q1u3-p3eg-_OCdjj0wkl6ZG3IeD7fYjeF-BNC6YbZVY37nlBw8hlxtk2PW3HUfNAv27VMmGGRhdYK6vstbmcTGl_DOTG1ijgpv_jRi8G4rLmG9WL98rY73pJqxWc4SsthEEuPdfONBC7GwVntfbQ0A')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="relative z-10 max-w-lg text-left">
              <h1 className="font-headline font-extrabold text-5xl text-white tracking-tight leading-tight mb-6">
                Mulai Langkah <br />
                <span className="text-[#94f990]">Kurasi Organik</span> Anda.
              </h1>
              <p className="text-[#9dd090] text-lg font-medium leading-relaxed mb-12">
                Bergabunglah dengan komunitas TrashID untuk mengelola limbah
                dengan presisi teknologi tinggi dan sentuhan estetika modern.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-[#f9f9f9]/10 backdrop-blur-md rounded-lg border border-white/10">
                  <span className="material-symbols-outlined text-[#94f990] text-4xl mb-3">
                    eco
                  </span>
                  <div className="text-white font-bold">100% Organik</div>
                  <div className="text-white/60 text-sm">
                    Fokus pada keberlanjutan murni.
                  </div>
                </div>
                <div className="p-6 bg-[#f9f9f9]/10 backdrop-blur-md rounded-lg border border-white/10">
                  <span className="material-symbols-outlined text-[#94f990] text-4xl mb-3">
                    speed
                  </span>
                  <div className="text-white font-bold">Laporan Cepat</div>
                  <div className="text-white/60 text-sm">
                    Teknologi identifikasi instan.
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#154212]/60 to-transparent pointer-events-none"></div>
          </section>

          {/* Right Section: Register Form */}
          <section className="flex-1 flex items-center justify-center p-6 md:p-12 bg-[#f9f9f9] lg:rounded-l-xl z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
            <div className="w-full max-w-md mt-16 md:mt-0">
              <div className="mb-10 text-center md:text-left">
                <h2 className="font-headline font-extrabold text-3xl text-[#1a1c1c] mb-2">
                  Buat Akun Baru
                </h2>
                <p className="text-[#42493e] font-medium">
                  Lengkapi detail Anda untuk bergabung.
                </p>

                {/* Menampilkan pesan Error atau Success */}
                {errorMsg && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm font-bold rounded">
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="mt-4 p-3 bg-green-100 text-[#154212] text-sm font-bold rounded">
                    {successMsg}
                  </div>
                )}
              </div>

              <form className="space-y-6" onSubmit={handleRegister}>
                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-semibold text-[#154212] ml-1 uppercase tracking-wider"
                    htmlFor="full_name"
                  >
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#72796e]">
                      person
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-[#f3f3f3] border-none rounded-md focus:ring-2 focus:ring-[#154212] focus:bg-white transition-all placeholder:text-[#c2c9bb] outline-none"
                      id="full_name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                </div>
                {/* Username */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-semibold text-[#154212] ml-1 uppercase tracking-wider"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#72796e]">
                      alternate_email
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-[#f3f3f3] border-none rounded-md focus:ring-2 focus:ring-[#154212] focus:bg-white transition-all placeholder:text-[#c2c9bb] outline-none"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="johndoe24"
                      type="text"
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-semibold text-[#154212] ml-1 uppercase tracking-wider"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#72796e]">
                      mail
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-[#f3f3f3] border-none rounded-md focus:ring-2 focus:ring-[#154212] focus:bg-white transition-all placeholder:text-[#c2c9bb] outline-none"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      type="email"
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-semibold text-[#154212] ml-1 uppercase tracking-wider"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#72796e]">
                      lock
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-[#f3f3f3] border-none rounded-md focus:ring-2 focus:ring-[#154212] focus:bg-white transition-all placeholder:text-[#c2c9bb] outline-none"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </div>
                {/* Checkbox */}
                <div className="flex items-start gap-3 py-2">
                  <input
                    className="mt-1 w-5 h-5 rounded border-[#72796e] text-[#154212] focus:ring-[#154212]"
                    id="policy"
                    type="checkbox"
                  />
                  <label
                    className="text-sm text-[#42493e] font-medium leading-relaxed"
                    htmlFor="policy"
                  >
                    Saya menyetujui{" "}
                    <span className="text-[#154212] font-bold cursor-pointer">
                      Kebijakan Privasi
                    </span>{" "}
                    dan{" "}
                    <span className="text-[#154212] font-bold cursor-pointer">
                      Syarat &amp; Ketentuan
                    </span>{" "}
                    TrashID.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  className="w-full bg-[#154212] text-white py-4 rounded-md font-bold text-lg hover:bg-[#2d5a27] transition-all active:scale-95 shadow-lg shadow-[#154212]/10 disabled:opacity-75 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Daftar"}
                </button>
              </form>

              <div className="mt-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#c2c9bb]/30"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                  <span className="bg-[#f9f9f9] px-4 text-[#72796e]">
                    Atau Daftar Dengan
                  </span>
                </div>
              </div>

              {/* Social Register */}
              <div className="mt-8">
                <button className="w-full flex items-center justify-center gap-3 bg-white border border-[#c2c9bb] py-4 rounded-md font-bold text-[#1a1c1c] hover:bg-[#f3f3f3] transition-all active:scale-95">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                      fill="#EA4335"
                    ></path>
                  </svg>
                  Google
                </button>
              </div>

              <div className="mt-10 text-center">
                <p className="text-[#42493e] font-medium">
                  Sudah punya akun?{" "}
                  <Link
                    className="text-[#154212] font-bold hover:underline underline-offset-4"
                    href="/login"
                  >
                    Masuk
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="fixed bottom-0 w-full z-10 hidden md:flex justify-between items-center px-12 py-6 bg-transparent">
          <div className="font-['Inter'] text-xs font-medium uppercase tracking-widest text-[#006e1c]/50">
            © 2026 TrashID. The Organic Curator.
          </div>
          <div className="flex gap-8">
            <Link
              className="font-['Inter'] text-xs font-medium uppercase tracking-widest text-[#006e1c]/50 hover:text-[#002201] underline-offset-4 hover:underline transition-opacity"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="font-['Inter'] text-xs font-medium uppercase tracking-widest text-[#006e1c]/50 hover:text-[#002201] underline-offset-4 hover:underline transition-opacity"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="font-['Inter'] text-xs font-medium uppercase tracking-widest text-[#006e1c]/50 hover:text-[#002201] underline-offset-4 hover:underline transition-opacity"
              href="#"
            >
              Environmental Impact
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
