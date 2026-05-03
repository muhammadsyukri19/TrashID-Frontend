"use client";

import React from "react";

export default function LaporTPUPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0,24&display=swap');

        .font-headline, .font-display { font-family: 'Manrope', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `,
        }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1000px] mx-auto bg-[#f9f9f9] min-h-screen">
        {/* Header */}
        <header className="mb-10">
          <h2 className="text-3xl font-extrabold text-[#154212] tracking-tight font-display mb-2">
            Laporkan Kondisi TPU
          </h2>
          <p className="text-[#42493e] font-medium text-lg">
            Ambil atau unggah foto kondisi TPU untuk dilaporkan.
          </p>
        </header>

        {/* Content Card */}
        <section className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(21,66,18,0.04)] border border-[#e2e2e2]/50 p-8 md:p-12">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Upload/Camera Area */}
            <div className="border-2 border-dashed border-[#a1d494] bg-[#f9f9f9]/80 hover:bg-[#ebf5e9] transition-colors rounded-2xl py-12 px-6 flex flex-col items-center justify-center cursor-pointer group">
              <div className="w-20 h-20 mb-6 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-[40px] text-[#154212]">
                  add_photo_alternate
                </span>
              </div>

              <h3 className="font-headline text-xl font-bold text-[#154212] text-center mb-2">
                Klik untuk Ambil atau Unggah Lokasi TPU
              </h3>
              <p className="text-sm text-[#72796e] mb-8 font-medium">
                dengan format .jpg atau .jpeg
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm">
                <button
                  type="button"
                  className="flex-1 bg-[#154212]/10 hover:bg-[#154212]/20 text-[#154212] py-3 px-4 rounded-xl font-bold font-headline transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    photo_camera
                  </span>
                  Ambil Foto
                </button>
                <button
                  type="button"
                  className="flex-1 bg-[#154212]/10 hover:bg-[#154212]/20 text-[#154212] py-3 px-4 rounded-xl font-bold font-headline transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    upload_file
                  </span>
                  Upload Foto
                </button>
              </div>
            </div>

            {/* Input Fields Container */}
            <div className="space-y-6 pt-4">
              {/* Lokasi */}
              <div className="space-y-2">
                <label
                  className="block font-headline text-sm font-bold text-[#1a1c1c]"
                  htmlFor="lokasi"
                >
                  Lokasi
                </label>
                <input
                  type="text"
                  id="lokasi"
                  placeholder="Lokasi TPU"
                  className="w-full px-5 py-4 bg-[#f3f3f3] border-2 border-transparent focus:border-[#154212] focus:bg-white rounded-xl outline-none transition-all text-[#1a1c1c] font-medium placeholder:text-[#72796e]"
                />
              </div>

              {/* Kondisi TPU */}
              <div className="space-y-2">
                <label
                  className="block font-headline text-sm font-bold text-[#1a1c1c]"
                  htmlFor="kondisi"
                >
                  Kondisi TPU
                </label>
                <input
                  type="text"
                  id="kondisi"
                  placeholder="Kondisi"
                  className="w-full px-5 py-4 bg-[#f3f3f3] border-2 border-transparent focus:border-[#154212] focus:bg-white rounded-xl outline-none transition-all text-[#1a1c1c] font-medium placeholder:text-[#72796e]"
                />
              </div>

              {/* Deskripsi */}
              <div className="space-y-2">
                <label
                  className="block font-headline text-sm font-bold text-[#1a1c1c]"
                  htmlFor="deskripsi"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  placeholder="(opsional)"
                  rows={4}
                  className="w-full px-5 py-4 bg-[#f3f3f3] border-2 border-transparent focus:border-[#154212] focus:bg-white rounded-xl outline-none transition-all text-[#1a1c1c] font-medium placeholder:text-[#72796e] resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                className="w-full bg-[#154212] hover:bg-[#2d5a27] text-white py-5 rounded-xl font-headline font-bold text-lg shadow-[0_10px_30px_rgba(21,66,18,0.15)] hover:shadow-[0_15px_40px_rgba(21,66,18,0.25)] transition-all transform active:scale-[0.99]"
              >
                Laporkan
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
