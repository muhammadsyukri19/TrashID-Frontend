const notificationRows = [
  {
    title: "Push Notification",
    description: "Terima pemberitahuan instan di perangkat Anda",
    icon: "notifications_active",
    enabled: true,
  },
  {
    title: "Email",
    description: "Dapatkan laporan mingguan dan update penting",
    icon: "mail",
    enabled: false,
  },
  {
    title: "Pembaruan Aktivitas",
    description: "Pantau status pengumpulan sampah secara real-time",
    icon: "update",
    enabled: true,
  },
];

export default function AdminSettingsNotificationsPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#6f7b64]">Setelan &gt; Notifikasi</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#154212] font-display">
          Notifikasi
        </h1>
        <p className="text-sm text-zinc-500">Kelola bagaimana Anda menerima pemberitahuan.</p>
      </div>

      <section className="grid gap-8 xl:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          {notificationRows.map((row) => (
            <div
              key={row.title}
              className="flex items-center gap-4 rounded-2xl border border-[#eef1ea] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(21,66,18,0.05)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c9f2bc] text-[#154212]">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {row.icon}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-extrabold text-[#1f241b]">{row.title}</h2>
                <p className="text-xs text-zinc-500">{row.description}</p>
              </div>

              <div
                className={`relative h-7 w-14 rounded-full border transition-colors ${row.enabled ? "border-[#0a7c4a] bg-[#0a7c4a]" : "border-[#dde2d8] bg-[#f0f2ee]"}`}
              >
                <div
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${row.enabled ? "right-1" : "left-1"}`}
                />
              </div>
            </div>
          ))}
        </div>

        <aside className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#124524] to-[#0b2e18] p-6 text-white shadow-[0_20px_40px_rgba(7,36,16,0.2)]">
          <div className="absolute -bottom-6 -right-4 h-36 w-36 rounded-full bg-white/6 blur-2xl" />
          <div className="relative space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#b9ebae]">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
            <h2 className="text-2xl font-extrabold font-display">Keamanan Data</h2>
            <p className="text-sm leading-6 text-white/78">
              TrashID berkomitmen melindungi informasi pribadi Anda. Semua notifikasi dienkripsi untuk memastikan privasi aktivitas pengelolaan lingkungan Anda tetap terjaga.
            </p>
            <button className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#154212] transition-transform hover:-translate-y-0.5">
              Baca Kebijakan
            </button>
          </div>
        </aside>
      </section>

      <section className="rounded-[28px] border border-[#eef1ea] bg-white p-6 shadow-[0_10px_24px_rgba(21,66,18,0.05)] lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f9e2] text-[#0c6b3c]">
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                lock
              </span>
            </div>
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex rounded-full bg-[#c9f2bc] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#154212]">
                Layanan Terpercaya
              </span>
              <h2 className="text-2xl font-extrabold text-[#1f241b] font-display">Privasi Tanpa Kompromi</h2>
              <p className="text-sm leading-6 text-zinc-600">
                Kami mengutamakan keamanan data sebagai pilar utama dalam membangun komunitas lingkungan yang berkelanjutan. Setiap pemberitahuan yang Anda terima telah melalui filter keamanan tingkat tinggi.
              </p>
            </div>
          </div>

          <button className="self-start rounded-full border border-[#cfd8c8] px-5 py-3 text-sm font-bold text-[#154212] transition-colors hover:border-[#97b590] hover:bg-[#f5fbf1]">
            Hubungi Tim Keamanan
          </button>
        </div>
      </section>
    </div>
  );
}
