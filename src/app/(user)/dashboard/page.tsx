"use client";

import React from "react";
import Link from "next/link";

export default function UserDashboardPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0,24&display=swap');

        .font-headline, .font-display { font-family: 'Manrope', sans-serif; }
        .font-body, body { font-family: 'Inter', sans-serif; }
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `,
        }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto bg-[#f9f9f9]">
        {/* Quick Action Cards (Bento Style) */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-[#154212] tracking-tight font-display mb-2">
              Halo, Sahabat TrashID!
            </h2>
            <p className="text-zinc-500 font-medium">
              Yuk mulai kontribusi kecil hari ini untuk lingkungan yang lebih
              bersih.
            </p>
          </div>
           </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Scan Sampah Card */}
          <div className="relative overflow-hidden bg-white rounded-xl shadow-[0_20px_40px_rgba(21,66,18,0.06)] group p-8 flex flex-col justify-between h-64 border border-[#c2c9bb]/10">
            <div className="relative z-10 max-w-[70%]">
              <h3 className="font-headline text-2xl font-bold text-[#154212] mb-3">
                Scan Sampah
              </h3>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                Identifikasi jenis sampah Anda dengan AI untuk pemilahan yang
                lebih akurat.
              </p>
              <button className="bg-[#154212] hover:bg-[#2d5a27] text-white px-6 py-3 rounded-md transition-all flex items-center gap-2 group-hover:translate-x-1 duration-300">
                <span className="material-symbols-outlined text-sm">
                  qr_code_scanner
                </span>
                <span className="font-headline text-sm font-bold">
                  Scan Sekarang
                </span>
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-20 group-hover:opacity-30 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="AI Scan Illustration"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida/ADBb0uja1dB_Du8ngZmHelyVRaV-j66qqVrIKiFgkyvxP-znuYk77cKToqAsffSs6Q9Z4RB5qKbxeX79JLP5el-zxJVymO4nZPZKzJhxAIO1gIA6cztXFHi3aULrKJXgKtvK-_QMx_XBn4dyuJ99bB2BjXVRaa0G2eD_-bu-homanboF-AYO1g8tTOf_lnr9TMkqT4V_zTCO2B_GpdWxFfj6sxv_XTNp1lHK_JvwQI5tzM4I84-GUlVleqNSUKIDfj6EwvNC4610WDGy"
              />
            </div>
          </div>

          {/* Laporkan TPU Card */}
          <div className="relative overflow-hidden bg-white rounded-xl shadow-[0_20px_40px_rgba(21,66,18,0.06)] group p-8 flex flex-col justify-between h-64 border border-[#c2c9bb]/10">
            <div className="relative z-10 max-w-[70%]">
              <h3 className="font-headline text-2xl font-bold text-[#154212] mb-3">
                Laporkan Kondisi TPU
              </h3>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                Laporkan penumpukan sampah di tempat umum agar segera
                ditindaklanjuti.
              </p>
              <button className="bg-[#006e1c] text-white px-6 py-3 rounded-md transition-all flex items-center gap-2 group-hover:translate-x-1 duration-300">
                <span className="material-symbols-outlined text-sm">
                  add_location_alt
                </span>
                <span className="font-headline text-sm font-bold">
                  Buat Laporan
                </span>
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-60 h-60 opacity-20 group-hover:opacity-30 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Map Illustration"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida/ADBb0uj-nsINTkAilFM1YQVCZGlmHXeivtV3kphqrgp-1zy4gsrmyb-Mqz8MZXhktRrTgaFTwLUVGSOqebU8RiHazuEVmyyEe5w4HX7mtkZ6sbu67NI8FIq2K4NEfWYZsT3QFYbqc2yNfBLAX1amkXwFZOP55Huali9orFASLeEGSerAeQnaEXobFeetCzn75U2k4y1WZjLGZZ5CZzNIdNVdFCHhBtSE3lnYcFt9celLCOmF5RM8iR6JDfwILc-KazlC5aLL9nwC4OM"
              />
            </div>
          </div>
        </section>

        {/* Riwayat & Peta Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Riwayat (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-headline text-xl font-bold text-[#154212]">
                Riwayat Laporan
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    className="pl-10 pr-4 py-2 bg-[#ffffff] border-none rounded-full text-xs focus:ring-2 focus:ring-[#154212] w-48 shadow-sm outline-none"
                    placeholder="Cari laporan..."
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2 text-zinc-400 text-sm">
                    search
                  </span>
                </div>
                <button className="p-2 bg-[#ffffff] rounded-full shadow-sm hover:bg-zinc-100 transition-colors">
                  <span className="material-symbols-outlined text-zinc-500">
                    filter_list
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-[#f3f3f3] border-b border-[#c2c9bb]/10">
                  <tr>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                      Jenis Sampah
                    </th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400 text-center">
                      Status
                    </th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  <tr className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-emerald-600 text-lg">
                            recycling
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#1a1c1c]">
                          Sampah Plastik
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-zinc-500">
                      24 Okt 2023
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-[#006e1c]/10 text-[#006e1c] uppercase tracking-tight">
                        Finished
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-zinc-400 hover:text-[#154212] transition-colors">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-amber-600 text-lg">
                            construction
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#1a1c1c]">
                          Puing Bangunan
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-zinc-500">
                      23 Okt 2023
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-[#d1e4ff] text-[#001d36] uppercase tracking-tight">
                        Waiting
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-zinc-400 hover:text-[#154212] transition-colors">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-emerald-600 text-lg">
                            compost
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#1a1c1c]">
                          Sampah Organik
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-zinc-500">
                      22 Okt 2023
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-[#003b67] text-white uppercase tracking-tight">
                        Processed
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-zinc-400 hover:text-[#154212] transition-colors">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-blue-600 text-lg">
                            description
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#1a1c1c]">
                          Kertas & Karton
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-zinc-500">
                      21 Okt 2023
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-[#006e1c]/10 text-[#006e1c] uppercase tracking-tight">
                        Finished
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-zinc-400 hover:text-[#154212] transition-colors">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Peta (1/3 width) */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-headline text-xl font-bold text-[#154212]">
                Peta Lokasi TPU
              </h3>
              <Link
                className="text-xs font-bold text-[#91f78e] hover:underline bg-[#154212] px-3 py-1 rounded-full"
                href="#"
              >
                Selengkapnya
              </Link>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-[0_20px_40px_rgba(21,66,18,0.06)] h-[400px] flex flex-col border border-[#c2c9bb]/10">
              <div className="flex-1 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 z-10 bg-black/5 pointer-events-none group-hover:bg-transparent transition-colors"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Map Location"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida/ADBb0ugleZgXYklm-Z-tdFLaimV08bFOk86_QH2nf0mbv4LI38qu7vRRPvsUEtDfis75DF4tLXasuy278GZsUHYaQ9O9bWXjLpCYlQwDYtc6KbSH08qZetjHuJevg2zN3RRZEXaMZisEUXxEGn-ZHvRAqt-mt_xxLP4-yY-f_GzOxX_4sAP2uU1MCeOxD0yHEAIStqnjLg5OLk36fSaoooMaASUIUOedBhSroQ9BO-vPILAfH0DGggX2MHr2VItoqdi3BiIspAWPF42u"
                />

                {/* Floating Map Legend Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                      Titik Terdekat
                    </span>
                    <span className="text-xs font-bold text-[#154212]">
                      TPU Kebon Jeruk
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#154212] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-sm">
                      directions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contextual Impact Meter */}
        <section className="mt-12 bg-[#2d5a27] text-[#9dd090] p-10 rounded-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h3 className="font-headline text-lg font-bold opacity-80 mb-2 text-white">
                Impact Meter
              </h3>
              <div className="flex items-baseline gap-2 text-white">
                <span className="font-display display-lg text-5xl font-extrabold tracking-tighter">
                  1,284
                </span>
                <span className="text-xl font-bold opacity-90">KG</span>
              </div>
              <p className="text-sm mt-4 max-w-sm opacity-80 leading-relaxed text-white">
                Sampah yang berhasil Anda selamatkan dari TPA dan dialihkan ke
                proses daur ulang yang bertanggung jawab.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-center min-w-[120px]">
                <span className="block text-2xl font-bold text-white">42</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-70 text-white">
                  Reports
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-center min-w-[120px]">
                <span className="block text-2xl font-bold text-white">12</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-70 text-white">
                  Badges
                </span>
              </div>
            </div>
          </div>
          {/* Decorative circle */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full"></div>
        </section>

        {/* Floating Action Button (FAB) */}
        <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#154212] to-[#2d5a27] text-white shadow-[0_20px_40px_rgba(21,66,18,0.2)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-50 group">
          <span className="material-symbols-outlined text-3xl">add</span>
          <span className="absolute right-20 bg-[#154212] px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
            Lapor Sekarang
          </span>
        </button>
      </main>
    </>
  );
}
