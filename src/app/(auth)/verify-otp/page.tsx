"use client";

import React from "react";
import Link from "next/link";

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
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .otp-input:focus {
            box-shadow: 0 4px 12px rgba(21, 66, 18, 0.08);
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
        }
      `,
        }}
      />

      <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#f9f9f9] font-body text-[#1a1c1c]">
        {/* Left Section: Eco-tech Illustration */}
        <section className="hidden md:flex md:w-1/2 relative items-center justify-center bg-[#2d5a27] overflow-hidden">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#94f990] via-transparent to-transparent"></div>

          <div className="relative z-10 w-full max-w-xl px-12 text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span
                  className="material-symbols-outlined text-white text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield_person
                </span>
              </div>
            </div>

            <h1 className="font-headline font-extrabold text-4xl text-[#9dd090] tracking-tight leading-tight mb-6">
              Membangun Masa Depan yang Lebih Bersih
            </h1>
            <p className="text-[#9dd090]/80 text-lg leading-relaxed">
              Setiap langkah kecil dalam mengelola limbah berkontribusi pada
              ekosistem yang berkelanjutan. Terima kasih telah menjaga keamanan
              akun Anda.
            </p>

            <div className="mt-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-80 object-cover rounded-xl shadow-2xl shadow-[#154212]/20 rotate-3 transform"
                alt="Modern eco-friendly technology abstract concept with glowing green circuit patterns and organic leaf shapes on a dark forest background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP1FRqQENqmS8H0JCpcTn_j2djNkmLobYCnNoXYLcQapB9LkJihoh_rn0HCMvh53jFcXQ5K0mg2P874eerAYP1spvGFelYGzy2W1MMGxPAcWYIsoqPJghYi0hobxEiWHNjyS8KVcxHiI3TdPnmZshytdpNH_4kSzVTdIhulwirQ_wkToBgDKJzSCkGYZEB8ws72lEg4gh3Uh2pU6Dc34tSZO-V4wTvtypIn6hJR3rtNeY-MksT00rDtqi_o_Y2JtvXz6KUhWYCFQ"
              />
            </div>
          </div>

          {/* Absolute Decorative elements */}
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#006e1c] rounded-full blur-[100px] opacity-30"></div>
          <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-[#154212] rounded-full blur-[120px] opacity-20"></div>
        </section>

        {/* Right Section: Verification Form */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-[#f9f9f9]">
          <div className="w-full max-w-md">
            {/* Branding Anchor */}
            <div className="mb-12 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2d5a27] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">
                  recycling
                </span>
              </div>
              <span className="font-headline font-black text-2xl text-[#154212] tracking-tighter">
                TrashID
              </span>
            </div>

            <div className="mb-10">
              <h2 className="font-headline font-extrabold text-3xl text-[#1a1c1c] tracking-tight mb-3">
                Verifikasi Akun
              </h2>
              <p className="text-[#42493e] leading-relaxed">
                Kami telah mengirimkan kode verifikasi 6 digit ke email dan
                nomor telepon terdaftar Anda.
              </p>
            </div>

            {/* OTP Form */}
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="flex justify-between gap-2 md:gap-3">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    className="otp-input w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold rounded-md bg-[#f3f3f3] border-none focus:ring-2 focus:ring-[#154212] transition-all duration-200 text-[#154212]"
                    maxLength={1}
                    placeholder="·"
                    type="text"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#42493e] font-medium text-sm">
                  <span className="material-symbols-outlined text-lg">
                    timer
                  </span>
                  <span>00:30</span>
                </div>
                <button
                  className="text-[#154212] font-semibold text-sm hover:underline underline-offset-4 transition-all opacity-50 cursor-not-allowed"
                  type="button"
                >
                  Kirim ulang kode
                </button>
              </div>

              <button className="w-full py-4 bg-[#154212] text-white rounded-md font-bold text-lg hover:shadow-xl hover:shadow-[#154212]/10 active:scale-95 transition-all duration-200">
                Verifikasi
              </button>
            </form>

            <div className="mt-12 pt-12 border-t border-[#c2c9bb]/15 flex flex-col gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white">
                <div className="p-2 bg-[#d1e4ff] rounded-lg">
                  <span className="material-symbols-outlined text-[#001d36]">
                    info
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1c1c]">
                    Butuh bantuan?
                  </p>
                  <p className="text-xs text-[#42493e]">
                    Pastikan Anda memeriksa folder spam jika kode tidak kunjung
                    sampai.
                  </p>
                </div>
              </div>

              <Link
                className="inline-flex items-center gap-2 text-[#42493e] hover:text-[#154212] transition-colors text-sm font-medium group"
                href="/login"
              >
                <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
                Kembali ke halaman masuk
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
