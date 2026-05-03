import Link from "next/link";

const faqs = [
  "Kapan jadwal pengambilan sampah untuk daerah perumahan?",
  "Bagaimana cara melaporkan jika sampah belum diangkut?",
  "Apa perbedaan layanan Home and Business?",
  "Dapatkah saya mengubah metode pembayaran di tengah bulan?",
];

export default function AdminSettingsHelpPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#6f7b64]">Setelan &gt; Bantuan</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#154212] font-display">
          Bantuan
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
            Edit FAQ
          </Link>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <button
              key={faq}
              className="flex w-full items-center justify-between rounded-xl bg-[#f1f3ef] px-5 py-4 text-left text-sm font-semibold text-[#2b3126] transition-colors hover:bg-[#eaf0e5]"
            >
              <span>{faq}</span>
              <span className="material-symbols-outlined text-[18px] text-[#5e6658]">
                keyboard_arrow_down
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/admin/settings/help/edit" className="text-sm font-bold text-[#0b7a3e] transition-colors hover:text-[#095f31]">
            Lihat Semua FAQ →
          </Link>
        </div>
      </section>
    </div>
  );
}
