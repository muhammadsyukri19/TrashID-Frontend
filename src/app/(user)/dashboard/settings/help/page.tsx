"use client"; // Menandakan ini adalah Client Component

import React, { useState } from "react";
import Link from "next/link";

export default function BantuanPage() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (open === index) {
      setOpen(null); // Menutup jika sudah terbuka
    } else {
      setOpen(index); // Membuka FAQ yang diklik
    }
  };

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

          .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: left;
          }

          .container h2 {
            font-size: 24px;
            font-weight: 700;
            color: #154212;
            margin-bottom: 20px;
          }

          .faq-item {
            background-color: #f9f9f9;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .faq-item:hover {
            background-color: #f3f3f3;
          }

          .faq-item h3 {
            font-size: 18px;
            font-weight: 600;
            color: #154212;
            margin-bottom: 10px;
          }

          .faq-item p {
            font-size: 14px;
            color: #42493e;
            margin-top: 10px;
          }

          .toggle-icon {
            float: right;
            font-size: 24px;
            color: #154212;
          }

          .view-all-button {
            background-color: #154212;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            text-align: center;
            display: inline-block;
            margin-top: 20px;
          }

          .view-all-button:hover {
            background-color: #006e1c;
          }
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto bg-[#f9f9f9] min-h-screen">
        <div className="container">
          <h2 className="font-display">Bantuan</h2>
          <p className="font-body text-lg text-[#42493e] mb-8">
            Punya Pertanyaan Lain?
          </p>

          {/* FAQ Accordion */}
          <div className="faq-item" onClick={() => toggleFAQ(0)}>
            <div className="flex justify-between items-center">
              <h3 className="font-headline">Kapan jadwal pengambilan sampah untuk daerah perumahan?</h3>
              <span className="material-symbols-outlined toggle-icon">
                {open === 0 ? "expand_less" : "expand_more"}
              </span>
            </div>
            {open === 0 && <p>Pengambilan sampah dilakukan setiap hari Senin dan Kamis untuk daerah perumahan.</p>}
          </div>

          <div className="faq-item" onClick={() => toggleFAQ(1)}>
            <div className="flex justify-between items-center">
              <h3 className="font-headline">Bagaimana cara melaporkan jika sampah belum diangkut?</h3>
              <span className="material-symbols-outlined toggle-icon">
                {open === 1 ? "expand_less" : "expand_more"}
              </span>
            </div>
            {open === 1 && <p>Anda bisa melaporkan masalah ini melalui aplikasi atau menghubungi customer service.</p>}
          </div>

          <div className="faq-item" onClick={() => toggleFAQ(2)}>
            <div className="flex justify-between items-center">
              <h3 className="font-headline">Apa perbedaan layanan Home dan Business?</h3>
              <span className="material-symbols-outlined toggle-icon">
                {open === 2 ? "expand_less" : "expand_more"}
              </span>
            </div>
            {open === 2 && <p>Layanan Home mencakup pengambilan sampah domestik, sementara Business lebih difokuskan pada pengumpulan sampah dari bisnis.</p>}
          </div>

          <div className="faq-item" onClick={() => toggleFAQ(3)}>
            <div className="flex justify-between items-center">
              <h3 className="font-headline">Dapatkah saya mengubah metode pembayaran di tengah bulan?</h3>
              <span className="material-symbols-outlined toggle-icon">
                {open === 3 ? "expand_less" : "expand_more"}
              </span>
            </div>
            {open === 3 && <p>Ya, Anda dapat mengubah metode pembayaran kapan saja melalui pengaturan akun di aplikasi.</p>}
          </div>

          {/* Lihat Semua FAQ Button */}
          <Link href="/faq">
            <button className="view-all-button">Lihat Semua FAQ</button>
          </Link>
        </div>
      </main>
    </>
  );
}