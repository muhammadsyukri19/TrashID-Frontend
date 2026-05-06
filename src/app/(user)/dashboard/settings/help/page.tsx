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

  const toggleFAQ = (id: string) => {
    setOpen(open === id ? null : id);
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

          .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }

          .faq-item {
            background-color: #f9f9f9;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid transparent;
          }

          .faq-item:hover {
            border-color: #154212;
            background-color: #f3f3f3;
          }

          .faq-answer {
            font-size: 14px;
            color: #42493e;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #eee;
            line-height: 1.6;
          }
        `,
        }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto bg-[#f9f9f9] min-h-screen">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-[#154212] mb-2">Bantuan & FAQ</h2>
          <p className="font-body text-[#42493e] mb-8">
            Temukan jawaban untuk pertanyaan yang sering ditanyakan.
          </p>

          {loading ? (
            <div className="text-center py-10 text-[#42493e]">Memuat bantuan...</div>
          ) : faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq._id} className="faq-item" onClick={() => toggleFAQ(faq._id)}>
                <div className="flex justify-between items-center">
                  <h3 className="font-headline font-semibold text-[#154212]">{faq.question}</h3>
                  <span className="material-symbols-outlined text-[#154212]">
                    {open === faq._id ? "expand_less" : "expand_more"}
                  </span>
                </div>
                {open === faq._id && <div className="faq-answer font-body">{faq.answer}</div>}
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-[#42493e] bg-gray-50 rounded-lg">
              Belum ada FAQ yang ditambahkan oleh Admin.
            </div>
          )}

          <div className="mt-8 pt-6 border-top border-gray-100">
            <p className="text-sm text-[#42493e] mb-4">Masih butuh bantuan?</p>
            <Link href="mailto:support@trashid.com">
              <button className="bg-[#154212] text-white px-6 py-3 rounded-lg hover:bg-[#006e1c] transition-colors">
                Hubungi Support
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}