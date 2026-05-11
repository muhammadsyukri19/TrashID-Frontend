"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      // Simpan token & info user
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // REDIRECT BERDASARKAN ROLE
      if (data.data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
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
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      
      try {
        // useGoogleLogin returns an access token, but our backend expects an ID Token or we can fetch profile on frontend
        // Note: useGoogleLogin by default returns access_token. 
        // For security, usually we send this to backend or use the GoogleLogin component which returns id_token.
        // Let's fetch the info using access_token and send to backend
        const resInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const googleUser = await resInfo.json();

        const response = await fetch(`${API_BASE}/auth/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            credential: tokenResponse.access_token, // Access Token
            // We'll update the backend to handle access_token if needed, 
            // or just send the profile info directly if the backend trusts it (less secure but easier)
            // Ideally backend verifies id_token.
            // Let's send what we have.
            email: googleUser.email,
            fullName: googleUser.name,
            googleId: googleUser.sub,
            profilePicture: googleUser.picture
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Google login failed");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        if (data.data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Gagal masuk dengan Google");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setErrorMsg("Gagal melakukan autentikasi Google"),
  });
  return (
    <>
      {/* 
        Menyisipkan Font Google (Manrope & Inter) beserta Ikon Material ke head menggunakan tag <style> dan @import 
        Ini aman digunakan di dalam komponen server/client next.js sebagai solusi drop-in.
      */}
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
        .hero-gradient {
            background: linear-gradient(135deg, #154212 0%, #2D5A27 100%);
        }
        input:focus {
            outline: none !important;
            border-bottom: 2px solid #154212 !important;
            box-shadow: none !important;
        }
      `,
        }}
      />

      <div className="bg-[#f9f9f9] font-body text-[#1a1c1c] antialiased selection:bg-[#bcf0ae] selection:text-[#002201] min-h-screen">
        <div className="flex min-h-screen">
          {/* Left Section: Eco-Tech Illustration */}
          <section className="hidden lg:flex lg:w-1/2 hero-gradient relative items-center justify-center p-16 overflow-hidden rounded-br-4xl rounded-tr-4xl">
            {/* Decorative Organic Shapes */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#bcf0ae]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-[#91f78e]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-xl text-center lg:text-left">
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="material-symbols-outlined text-[#bcf0ae] text-sm">
                  auto_awesome
                </span>
                <span className="text-[#bcf0ae] text-xs font-semibold tracking-widest uppercase">
                  AI Driven Ecology
                </span>
              </div>

              <h1 className="font-headline font-extrabold text-5xl xl:text-6xl text-white leading-tight mb-6 tracking-tight">
                The Organic Curator for a{" "}
                <span className="text-[#94f990]">Sustainable</span> Future.
              </h1>

              <p className="text-[#bcf0ae]/80 text-lg leading-relaxed mb-12 font-medium">
                TrashID transforms waste management into a premium environmental
                contribution through artificial intelligence and community
                action.
              </p>

              {/* Featured Image with Glass Frame */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#94f990] to-[#bcf0ae] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Digital AI concept merging with lush green forestry and clean technology"
                    className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXHKAH958Olf-_MUQ6bVCYAbqRzAz2sVLiSDctpo2iBIp7ZjGHQmGNGqDNr-vgqYYBM9UffSKy6eiXkrkwME4LVhJeck18IHLw5xSdqXnk4C3aSoYPSFu5GHkidI6FsrNWK454jp6oBanxksygcy6WJdHokzq-8gvlVQrr1hdoynGd0Ymnl1--64JYbm4fgXWW9pEbIlIPjgOLn-J--cImNbfJtj-pLefzyCXJNGr5WxcBYB1S4wjCOoORc655wCmtSjnSK2buVg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Right Section: Login Form */}
          <section className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 bg-[#f9f9f9]">
            {/* Mobile Brand Header */}
            <header className="lg:hidden absolute top-8 left-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#154212] tracking-tight font-headline">
                  TrashID
                </span>
              </div>
            </header>

            <div className="w-full max-w-md">
              {/* Form Header */}
              <div className="mb-10 text-center lg:text-left">
                <div className="hidden lg:block mb-12">
                  <span className="text-3xl font-black text-[#154212] tracking-tight font-headline">
                    TrashID
                  </span>
                </div>
                <h2 className="font-headline font-bold text-3xl text-[#1a1c1c] mb-3 tracking-tight">
                  Selamat Datang Kembali
                </h2>
                <p className="text-[#42493e] font-medium">
                  Kelola kontribusi lingkungan Anda hari ini.
                </p>

                {/* Error Message Display */}
                {errorMsg && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm font-bold rounded-lg border border-red-200">
                    {errorMsg}
                  </div>
                )}
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-[#42493e] block ml-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-5 py-4 bg-[#f3f3f3] border-none rounded-md text-[#1a1c1c] placeholder:text-[#42493e]/40 transition-all font-medium"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      type="email"
                      required
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#42493e]/60">
                      alternate_email
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-[#42493e] block ml-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      key={showPassword ? "text" : "password"}
                      className="w-full pl-5 pr-12 py-4 bg-[#f3f3f3] border-none rounded-md text-[#1a1c1c] placeholder:text-[#42493e]/40 transition-all font-medium focus:ring-2 focus:ring-[#154212] outline-none"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#42493e]/60 cursor-pointer select-none hover:text-[#154212] transition-colors z-10"
                    >
                      {showPassword ? "visibility" : "visibility_off"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <label htmlFor="rememberMe" className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        id="rememberMe"
                        name="rememberMe"
                        className="peer hidden" 
                        type="checkbox" 
                      />
                      <div className="w-5 h-5 border-2 border-[#72796e] rounded-md peer-checked:bg-[#154212] peer-checked:border-[#154212] transition-all flex items-center justify-center bg-white overflow-hidden">
                        <svg 
                          className="w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform duration-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="ml-3 text-sm font-medium text-[#42493e] group-hover:text-[#154212] transition-colors">
                        Ingat saya
                      </span>
                    </div>
                  </label>
                  <Link
                    className="text-sm font-bold text-[#154212] hover:text-[#2d5a27] transition-colors"
                    href="/forgot-password"
                  >
                    Lupa Password?
                  </Link>
                </div>

                <div className="space-y-4 pt-2">
                  <button
                    className="w-full bg-[#154212] text-white font-bold py-4 rounded-md shadow-lg shadow-[#154212]/10 hover:shadow-[#154212]/20 hover:bg-[#2d5a27] transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                  >
                    <span>{loading ? "Memproses..." : "Masuk"}</span>
                    <span className="material-symbols-outlined text-xl">
                      login
                    </span>
                  </button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#c2c9bb]/30"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                      <span className="bg-[#f9f9f9] px-4 text-[#42493e]/40">
                        Atau masuk dengan
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => loginGoogle()}
                    className="w-full bg-white border border-[#c2c9bb]/30 text-[#1a1c1c] font-semibold py-4 rounded-md hover:bg-[#f3f3f3] transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    type="button"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.248 1.248-3.152 2.616-6.6 2.616-5.384 0-9.648-4.368-9.648-9.72s4.264-9.72 9.648-9.72c3.048 0 5.28 1.192 6.936 2.76l2.28-2.28c-2.4-2.304-5.52-3.6-9.216-3.6C5.08 0 0 5.08 0 11.28s5.08 11.28 11.28 11.28c3.312 0 5.832-1.08 7.824-3.144 2.064-2.064 2.712-4.944 2.712-7.296 0-.696-.048-1.368-.144-2.04h-9.216z"
                        fill="#EA4335"
                      ></path>
                    </svg>
                    <span>{loading ? "Menghubungkan..." : "Masuk dengan Google"}</span>
                  </button>
                </div>
              </form>

              {/* Footer */}
              <footer className="mt-12 text-center">
                <p className="text-[#42493e] font-medium">
                  Belum punya akun?
                  <Link
                    className="text-[#154212] font-bold hover:underline underline-offset-4 ml-1 transition-all"
                    href="/register"
                  >
                    Daftar
                  </Link>
                </p>
              </footer>
            </div>
          </section>
        </div>

        {/* Bottom Toast Suggestion (Material Style) - Visible only on md/desktop */}
        <div className="fixed bottom-8 left-1/2 w-max -translate-x-1/2 md:flex items-center gap-4 bg-[#e2e2e2] px-6 py-3 rounded-full shadow-xl border border-[#c2c9bb]/10 z-50 hidden">
          <span
            className="material-symbols-outlined text-[#154212]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shield_with_heart
          </span>
          <span className="text-xs font-semibold text-[#42493e] tracking-wide uppercase">
            Environmental impact starts with authentication.
          </span>
        </div>
      </div>
    </>
  );
}


