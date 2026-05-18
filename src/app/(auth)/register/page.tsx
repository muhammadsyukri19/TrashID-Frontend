"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const router = useRouter();

  // State untuk form input
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  // State untuk response/loading
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Gagal melakukan pendaftaran. Silakan coba lagi.",
        );
      }

      setSuccessMsg("Pendaftaran berhasil! Mengalihkan ke halaman login...");

      // Tunggu 2 detik kemudian pindah ke halaman login
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      
      try {
        const resInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const googleUser = await resInfo.json();

        const response = await fetch(`${API_BASE}/auth/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            credential: tokenResponse.access_token,
            email: googleUser.email,
            fullName: googleUser.name,
            googleId: googleUser.sub,
            profilePicture: googleUser.picture
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Google registration failed");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("lastActivity", Date.now().toString());

        setSuccessMsg("Pendaftaran dengan Google berhasil! Mengalihkan...");
        
        setTimeout(() => {
          if (data.data.user.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/dashboard");
          }
        }, 1500);
      } catch (err: any) {
        setErrorMsg(err.message || "Gagal mendaftar dengan Google");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setErrorMsg("Gagal melakukan autentikasi Google"),
  });

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
                {/* Phone */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-semibold text-[#154212] ml-1 uppercase tracking-wider"
                    htmlFor="phone"
                  >
                    Nomor WhatsApp / HP
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#72796e]">
                      call
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-[#f3f3f3] border-none rounded-md focus:ring-2 focus:ring-[#154212] focus:bg-white transition-all placeholder:text-[#c2c9bb] outline-none"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="081234567890"
                      type="tel"
                    />
                  </div>
                </div>
                {/* Address */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-semibold text-[#154212] ml-1 uppercase tracking-wider"
                    htmlFor="address"
                  >
                    Alamat Lengkap
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#72796e]">
                      location_on
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-[#f3f3f3] border-none rounded-md focus:ring-2 focus:ring-[#154212] focus:bg-white transition-all placeholder:text-[#c2c9bb] outline-none"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Jl. Mawar No. 1, Kota Anda"
                      type="text"
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
                      key={showPassword ? "text" : "password"}
                      className="w-full pl-12 pr-12 py-4 bg-[#f3f3f3] border-none rounded-md focus:ring-2 focus:ring-[#154212] focus:bg-white transition-all placeholder:text-[#c2c9bb] outline-none font-medium"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#72796e] cursor-pointer select-none hover:text-[#154212] transition-colors z-10"
                    >
                      {showPassword ? "visibility" : "visibility_off"}
                    </button>
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
                <button
                  type="button"
                  onClick={() => loginGoogle()}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-[#c2c9bb]/30 py-4 rounded-md font-bold text-[#1a1c1c] hover:bg-[#f3f3f3] transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.248 1.248-3.152 2.616-6.6 2.616-5.384 0-9.648-4.368-9.648-9.72s4.264-9.72 9.648-9.72c3.048 0 5.28 1.192 6.936 2.76l2.28-2.28c-2.4-2.304-5.52-3.6-9.216-3.6C5.08 0 0 5.08 0 11.28s5.08 11.28 11.28 11.28c3.312 0 5.832-1.08 7.824-3.144 2.064-2.064 2.712-4.944 2.712-7.296 0-.696-.048-1.368-.144-2.04h-9.216z"
                      fill="#EA4335"
                    ></path>
                  </svg>
                  <span>{loading ? "Menghubungkan..." : "Daftar dengan Google"}</span>
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


