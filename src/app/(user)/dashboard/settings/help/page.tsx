"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function BantuanPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
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

  const toggleFAQ = (id: string) => {
    setOpen(open === id ? null : id);
  };

  return (
    <main className="flex flex-col font-body text-[#1a1c1c] p-6 lg:p-15 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] font-bold text-zinc-500 mb-6 shrink-0">
        <Link
          href="/dashboard/settings"
          className="hover:text-[#154212] transition-colors"
        >
          Setelan
        </Link>
        <span>/</span>
        <span className="text-[#154212]">Bantuan</span>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 lg:p-12 w-full flex-1 flex flex-col shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h1 className="font-extrabold text-3xl tracking-tight text-[#154212] mb-2">
              Bantuan & FAQ
            </h1>
            <p className="text-[14px] text-zinc-500">
              Temukan jawaban untuk pertanyaan yang sering ditanyakan.
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        {loading ? (
          <div className="flex-1 flex flex-col justify-center items-center py-16">
            <span className="w-10 h-10 border-4 border-zinc-200 border-t-[#154212] rounded-full animate-spin mb-4"></span>
            <p className="text-[14px] font-medium text-zinc-500">
              Memuat bantuan...
            </p>
          </div>
        ) : faqs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq._id}
                onClick={() => toggleFAQ(faq._id)}
                className={`border rounded-2xl p-6 cursor-pointer transition-all ${
                  open === faq._id
                    ? "border-[#154212]/40 bg-[#154212]/5"
                    : "border-zinc-200 bg-white hover:border-[#154212]/30 hover:bg-zinc-50"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-[15px] font-extrabold text-[#1A1C1C] leading-relaxed">
                    {faq.question}
                  </h3>

                  <span className="material-symbols-outlined text-[#154212] shrink-0">
                    {open === faq._id ? "expand_less" : "expand_more"}
                  </span>
                </div>

                {open === faq._id && (
                  <div className="mt-4 pt-4 border-t border-zinc-200">
                    <p className="text-[14px] text-zinc-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-zinc-200 bg-zinc-50 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#154212]/10 text-[#154212] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">
                help
              </span>
            </div>
            <h3 className="text-[16px] font-extrabold text-[#1A1C1C] mb-2">
              Belum ada FAQ
            </h3>
            <p className="text-[14px] text-zinc-500">
              Belum ada FAQ yang ditambahkan oleh Admin.
            </p>
          </div>
        )}

        {/* Support Section */}
        <div className="mt-10 pt-10 border-t border-zinc-100">
          <div className="bg-[#154212] text-white rounded-3xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="text-[18px] font-extrabold mb-2">
                Masih butuh bantuan?
              </h4>
              <p className="text-[14px] text-white/80 leading-relaxed">
                Hubungi tim support TrashID jika pertanyaan Anda belum terjawab
                melalui FAQ.
              </p>
            </div>

            <Link
              href="mailto:support@trashid.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#154212] font-bold text-[13px] rounded-lg hover:bg-zinc-100 transition-all shadow-sm"
            >
              Hubungi Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}