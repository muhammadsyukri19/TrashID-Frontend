"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function AdminSettingsHelpPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
        const response = await fetch(`${API_BASE}/faqs`);
        const data = await response.json();
        if (data.status === "success") {
          setFaqs(data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil FAQ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className="space-y-6 lg:space-y-8 p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#6f7b64] mb-2">
          <Link href="/admin/settings" className="hover:text-[#154212]">Setelan</Link>
          <span>&gt;</span>
          <span>Bantuan</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#154212] font-display">
          Bantuan & FAQ
        </h1>
      </div>

      <section className="mx-auto max-w-4xl rounded-[32px] bg-[#f7f8f5] px-6 py-8 shadow-[0_20px_40px_rgba(21,66,18,0.06)] lg:px-8 lg:py-10">
        <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2c6a31]">Pertanyaan Sering Diajukan</p>
            <h2 className="text-3xl font-extrabold text-[#154212] font-display">Punya Pertanyaan Lain?</h2>
          </div>

          <Link
            href="/admin/settings/help/edit"
            className="inline-flex items-center gap-2 rounded-full border border-[#6ea76b] bg-white px-4 py-2 text-sm font-bold text-[#154212] shadow-sm transition-colors hover:bg-[#eef6ea]"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Kelola FAQ
          </Link>
        </div>

        <div className="mt-8 space-y-3">
          {loading ? (
            <p className="text-center text-gray-500 py-4">Memuat data...</p>
          ) : faqs.length > 0 ? (
            faqs.map((faq) => (
              <div
                key={faq._id}
                className="flex w-full flex-col rounded-xl bg-[#f1f3ef] px-5 py-4 text-left text-sm font-semibold text-[#2b3126]"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#154212] font-bold">{faq.question}</span>
                </div>
                <p className="text-xs font-normal text-gray-600">{faq.answer}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-4">Belum ada FAQ yang ditambahkan.</p>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/admin/settings/help/edit" className="text-sm font-bold text-[#0b7a3e] transition-colors hover:text-[#095f31]">
            Tambah atau Edit FAQ Baru →
          </Link>
        </div>
      </section>
    </div>
  );
}
