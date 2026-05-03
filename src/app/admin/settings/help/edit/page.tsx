const helpItems = [1, 2, 3];

export default function AdminSettingsHelpEditPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#6f7b64]">Setelan &gt; Bantuan &gt; Edit Bantuan</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#154212] font-display">
          Edit Bantuan
        </h1>
      </div>

      <div className="flex justify-end">
        <button className="rounded-lg bg-[#9ccf8c] px-4 py-2 text-sm font-bold text-[#1f3f1e] transition-colors hover:bg-[#86c276]">
          + Tambah Bantuan
        </button>
      </div>

      <section className="space-y-4">
        {helpItems.map((item) => (
          <article
            key={item}
            className="grid gap-4 rounded-[24px] border border-[#dde5d7] bg-white p-4 shadow-[0_10px_24px_rgba(21,66,18,0.05)] lg:grid-cols-[48px_1fr] lg:items-start"
          >
            <div className="flex items-start justify-center lg:pt-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e3eadf] text-[#5b6454] font-bold">
                {String(item).padStart(2, "0")}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_48px] lg:items-start">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1f241b]">Soal</label>
                  <input
                    className="w-full rounded-lg border border-[#98bc94] bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-[#2f6e2f]"
                    defaultValue="Kapan jadwal pengambilan sampah untuk daerah perumahan?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1f241b]">Jawaban</label>
                  <textarea
                    className="min-h-24 w-full rounded-lg border border-[#98bc94] bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-[#2f6e2f]"
                    defaultValue="Jawaban"
                  />
                </div>
              </div>

              <button className="justify-self-start rounded-xl bg-[#ecf4e8] p-2 text-[#4f5f49] transition-colors hover:bg-[#e0ece0] lg:justify-self-end lg:mt-1">
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      <div className="flex items-center justify-between pt-2">
        <button className="rounded-lg bg-[#ff1f1f] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#e01515]">
          Batal
        </button>
        <button className="rounded-lg bg-[#2f6e2f] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#245824]">
          Simpan
        </button>
      </div>
    </div>
  );
}
