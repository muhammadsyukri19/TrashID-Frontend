"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function AdminEditFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
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

  const handleAdd = async () => {
    if (!newFAQ.question || !newFAQ.answer) return alert("Isi semua kolom!");
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/faqs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFAQ),
      });

      if (response.ok) {
        setIsAdding(false);
        setNewFAQ({ question: "", answer: "" });
        fetchFAQs();
      }
    } catch (error) {
      alert("Gagal menambah FAQ");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus FAQ ini?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/faqs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchFAQs();
      }
    } catch (error) {
      alert("Gagal menghapus FAQ");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#154212] font-display">Kelola FAQ</h1>
          <p className="text-[#6f7b64]">Perbarui pertanyaan dan jawaban bantuan untuk pengguna.</p>
        </div>
        <Link href="/admin/settings/help" className="text-sm font-bold text-[#154212] hover:underline">
          ← Kembali
        </Link>
      </div>

      {/* Form Tambah FAQ */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-bold text-[#154212] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">add_circle</span>
          Tambah FAQ Baru
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Pertanyaan"
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#154212] outline-none"
            value={newFAQ.question}
            onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
          />
          <textarea
            placeholder="Jawaban"
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#154212] outline-none min-h-[100px]"
            value={newFAQ.answer}
            onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
          />
          <button
            onClick={handleAdd}
            className="bg-[#154212] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#006e1c] transition-colors"
          >
            Simpan FAQ
          </button>
        </div>
      </div>

      {/* Daftar FAQ */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#154212] mb-4">Daftar FAQ Saat Ini</h2>
        {loading ? (
          <p>Memuat data...</p>
        ) : faqs.length > 0 ? (
          faqs.map((faq) => (
            <div key={faq._id} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h3 className="font-bold text-[#154212] mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title="Hapus"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10 bg-gray-50 rounded-2xl text-gray-400">Belum ada FAQ yang dibuat.</p>
        )}
      </div>
    </div>
  );
}
