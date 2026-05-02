"use client";

import React from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0,0,24&display=swap');
        
        .font-headline { font-family: 'Manrope', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
        }
        .organic-gradient {
            background: linear-gradient(135deg, #154212 0%, #2D5A27 100%);
        }
      `,
        }}
      />

      <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#f9f9f9] text-[#1a1c1c] font-body selection:bg-[#2d5a27] selection:text-[#9dd090]">
        {/* Left Side: Illustration Panel */}
        <section className="w-full md:w-1/2 organic-gradient relative flex flex-col justify-center p-12 overflow-hidden md:rounded-r-[3rem] z-10">
          {/* Background Decorative Texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-[#a1d494] blur-[120px]"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 rounded-full bg-[#94f990] blur-[100px]"></div>
          </div>

          <div className="relative z-20 max-w-lg mx-auto text-center md:text-left">
            <div className="mb-12 flex items-center justify-center md:justify-start gap-3">
              <span className="p-3 bg-white/10 backdrop-blur-md rounded-lg">
                <span className="material-symbols-outlined text-white text-3xl">
                  eco
                </span>
              </span>
              <span className="font-headline text-2xl font-black tracking-tight text-white uppercase tracking-widest">
                TrashID
              </span>
            </div>

            <div className="relative mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Environmental tech illustration"
                className="w-full h-auto rounded-xl shadow-[0_20px_40px_rgba(21,66,18,0.3)] border border-white/10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJEo9AlrV85qYCTQeCXmTm09bAxx3yDxBQBX2BuWJjZ33_IuonKSNDDVV8iMNvWbKrfDHYVokIWqXe-N3JUuNoXXVGLy-4l03MKlj6UYC1bBtwRtOC3Rm7VYeaWQdlMaqln8wbm2RuISZ0hu0ICLIle5Xv1OadGwyvgzk0-eGLQ27IdFg4TVh5c8nKVSu7r1sgq-BP3LVBaA8_4g2ZlRFat-n6amFSmYPn0THU8GTmIhxd5UjXVsgtjdMvi4BIXpPBn5_fvERBzw"
              />
            </div>

            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              Environmental Stewardship
            </h2>
            <p className="text-[#9dd090]/80 text-lg font-medium leading-relaxed">
              Menjaga bumi tetap bersih melalui kecerdasan buatan dan kepedulian
              bersama.
            </p>
          </div>
        </section>

        {/* Right Side: Recovery Form Panel */}
        <section className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16 lg:p-24">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Link
              className="inline-flex items-center gap-2 text-[#154212] font-semibold mb-12 group transition-all duration-200"
              href="/login"
            >
              <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="font-label">Kembali ke Login</span>
            </Link>

            <div className="mb-10">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-[#154212] mb-4">
                Lupa Kata Sandi?
              </h1>
              <p className="text-[#42493e] leading-relaxed text-lg">
                Masukkan alamat email Anda di bawah ini. Kami akan mengirimkan
                kode verifikasi untuk mengatur ulang kata sandi Anda.
              </p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              {/* Email Input */}
              <div className="space-y-3">
                <label
                  className="block font-headline text-sm font-bold text-[#42493e] px-1 uppercase tracking-wider"
                  htmlFor="email"
                >
                  Email Terdaftar
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[#72796e] group-focus-within:text-[#154212] transition-colors">
                      mail
                    </span>
                  </div>
                  {/* Perbaikan khusus pada css input-focus: menggunakan outline-none dan memodifikasi style bawaan untuk box-shadow border transparan Next.js */}
                  <input
                    className="block w-full pl-12 pr-4 py-4 bg-[#f3f3f3] border-0 border-b-2 border-transparent focus:ring-0 focus:border-[#154212] focus:outline-none transition-all text-[#1a1c1c] font-medium placeholder:text-[#72796e] text-lg rounded-t-lg outline-none"
                    id="email"
                    name="email"
                    placeholder="nama@email.com"
                    type="email"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  className="w-full organic-gradient text-white py-5 rounded-md font-headline font-bold text-lg shadow-[0_10px_30px_rgba(21,66,18,0.15)] hover:shadow-[0_15px_40px_rgba(21,66,18,0.25)] transition-all transform active:scale-[0.98]"
                  type="submit"
                >
                  Kirim Kode Verifikasi
                </button>
              </div>

              {/* Help Navigation */}
              <div className="pt-12 mt-12 border-t border-[#e2e2e2]/50">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-headline font-bold text-[#154212]">
                      Butuh bantuan?
                    </span>
                    <span className="text-sm text-[#42493e]">
                      Hubungi pusat bantuan kami
                    </span>
                  </div>
                  <button
                    type="button"
                    className="p-3 bg-[#e8e8e8] rounded-full hover:bg-[#e2e2e2] transition-colors group"
                  >
                    <span className="material-symbols-outlined text-[#154212] group-hover:scale-110 transition-transform">
                      help_outline
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
