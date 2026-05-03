const stats = [
  { label: "Total Laporan", value: "12", tone: "green", icon: "description" },
  { label: "Menunggu Verifikasi", value: "4", tone: "amber", icon: "schedule" },
  { label: "Terverifikasi", value: "6", tone: "emerald", icon: "check_circle" },
  { label: "Ditolak", value: "2", tone: "red", icon: "cancel" },
];

const reports = [
  {
    id: "#LP247",
    name: "TPU Jambaro",
    area: "Ingi Jaya",
    reporter: "Rizki Aulia",
    reporterInitials: "RA",
    description:
      "Sampah sudah menumpuk dan meluber ke badan jalan. Tidak ada petugas kebersihan sejak 3 hari lalu. Bau menyengat dan mengganggu aktivitas warga sekitar.",
    location: "5.5382° N, 95.3205° E",
    date: "12 Apr 2026, 09:42",
    status: "Waiting",
    statusTone: "amber",
  },
  {
    id: "#LP246",
    name: "TPU Lamteumen",
    area: "Jaya Baru",
    reporter: "Siti Nurhaliza",
    reporterInitials: "SN",
    description:
      "TPS tidak terangkut selama 3 hari berturut-turut, sampah sudah penuh dan bau sangat menyengat ke area permukiman.",
    location: "5.5501° N, 95.3180° E",
    date: "12 Apr 2026, 08:55",
    status: "Waiting",
    statusTone: "amber",
  },
  {
    id: "#LP245",
    name: "TPU Punge",
    area: "Punge Blang Cut",
    reporter: "Ahmad Fauzi",
    reporterInitials: "AF",
    description:
      "Kondisi sudah kembali normal setelah pengangkutan pagi ini. Petugas sudah membersihkan area sekitar.",
    location: "5.5623° N, 95.3112° E",
    date: "12 Apr 2026, 07:30",
    status: "Terverifikasi",
    statusTone: "green",
  },
  {
    id: "#LP244",
    name: "TPU Baro",
    area: "Banda Raya",
    reporter: "Maya Sari",
    reporterInitials: "MS",
    description:
      "Bak sampah sudah hampir penuh perlu segera dikosongkan sebelum hari pekan.",
    location: "5.5419° N, 95.3240° E",
    date: "11 Apr 2026, 18:10",
    status: "Terverifikasi",
    statusTone: "green",
  },
  {
    id: "#LP242",
    name: "TPU Lamdom",
    area: "Lueng Bata",
    reporter: "Yuni Kartika",
    reporterInitials: "YK",
    description:
      "Ditemukan pembakaran liar di sekitar TPS, asap mengganggu warga sekitar.",
    location: "5.5478° N, 95.3090° E",
    date: "11 Apr 2026, 12:30",
    status: "Ditolak",
    statusTone: "red",
  },
];

function StatIcon({ name }: { name: string }) {
  return (
    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
      {name}
    </span>
  );
}

function StatusBadge({ tone, children }: { tone: string; children: React.ReactNode }) {
  const className =
    tone === "green"
      ? "bg-[#e7f5e9] text-[#2f6e2f]"
      : tone === "red"
        ? "bg-[#fde7e6] text-[#b84a4a]"
        : "bg-[#fff2df] text-[#c06a00]";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${className}`}>
      {children}
    </span>
  );
}

export default function AdminReportsPage() {
  return (
    <div className="space-y-8 font-body">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212]">
            Manajemen Laporan
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Pantau laporan masuk, verifikasi, dan tindak lanjut dalam tampilan yang ringkas dan mudah dibaca.
          </p>
        </div>

        <div className="hidden items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm md:flex">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=154212&color=fff"
            alt="Admin"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-bold text-[#1a1c1c]">Admin</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">Dashboard</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#e4e4de] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  stat.tone === "green"
                    ? "bg-[#ecf7eb] text-[#2f6e2f]"
                    : stat.tone === "emerald"
                      ? "bg-[#e7f5e9] text-[#3d7b3d]"
                      : stat.tone === "red"
                        ? "bg-[#fde7e6] text-[#b84a4a]"
                        : "bg-[#fff2df] text-[#c06a00]"
                }`}
              >
                <StatIcon name={stat.icon} />
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#154212]">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-[#e4e4de] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-4 border-b border-[#eee9df] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-headline text-lg font-bold text-[#154212]">Daftar Laporan Masuk</h2>
            <p className="mt-1 text-sm text-zinc-500">Gunakan pencarian dan filter untuk memeriksa laporan dengan cepat.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari ID, TPU, atau pelapor..."
                className="h-9 w-[220px] rounded-full border border-[#d9e4d3] bg-[#f7fbf5] pl-10 pr-4 text-xs text-[#1a1c1c] outline-none placeholder:text-zinc-400 focus:border-[#154212]"
              />
              <span className="material-symbols-outlined absolute left-3 top-2 text-[18px] text-zinc-400">
                search
              </span>
            </div>

            {[
              "Semua Status",
              "Semua TPU",
              "7 Hari Terakhir",
            ].map((item) => (
              <button
                key={item}
                className="h-9 rounded-full border border-[#d9e4d3] bg-[#f7fbf5] px-4 text-xs font-semibold text-[#39533a] transition-colors hover:bg-[#eef8ea]"
              >
                {item}
              </button>
            ))}

            <button className="h-9 rounded-full bg-[#154212] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#214d20]">
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-left">
            <thead className="bg-[#f3f7ef] text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b9270]">
              <tr>
                <th className="px-5 py-3">ID Laporan</th>
                <th className="px-5 py-3">Nama TPU</th>
                <th className="px-5 py-3">Pelapor</th>
                <th className="px-5 py-3">Deskripsi Kondisi</th>
                <th className="px-5 py-3">Lokasi GPS</th>
                <th className="px-5 py-3">Waktu Lapor</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eee9df]">
              {reports.map((report) => (
                <tr key={report.id} className="align-top transition-colors hover:bg-[#fafcf8]">
                  <td className="px-5 py-4">
                    <div className="text-sm font-bold text-[#5d8057]">{report.id}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="min-w-[180px]">
                      <p className="text-sm font-bold text-[#1a1c1c]">{report.name}</p>
                      <p className="text-xs text-zinc-500">{report.area}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f5e9] text-[10px] font-bold text-[#2f6e2f]">
                        {report.reporterInitials}
                      </div>
                      <span className="text-sm font-semibold text-[#1a1c1c]">{report.reporter}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="max-w-[360px] text-sm leading-6 text-zinc-600">{report.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-semibold text-[#2d6fb1]">
                      {report.location}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-500">{report.date}</td>
                  <td className="px-5 py-4 text-center">
                    <StatusBadge tone={report.statusTone}>{report.status}</StatusBadge>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex items-center gap-1 rounded-full border border-[#e4e4de] bg-white p-1 shadow-sm">
                      <button className="rounded-full p-1.5 text-[#7b8b76] transition-colors hover:bg-[#f1f6ef] hover:text-[#154212]" aria-label="Lihat detail">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button className="rounded-full p-1.5 text-[#7b8b76] transition-colors hover:bg-[#eef8ea] hover:text-[#2f6e2f]" aria-label="Verifikasi">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      </button>
                      <button className="rounded-full p-1.5 text-[#7b8b76] transition-colors hover:bg-[#fde7e6] hover:text-[#b84a4a]" aria-label="Tolak">
                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#eee9df] px-5 py-4 text-sm text-zinc-500 lg:flex-row lg:items-center lg:justify-between">
          <p>
            Menampilkan <span className="font-semibold text-[#1a1c1c]">1 - 5</span> dari <span className="font-semibold text-[#1a1c1c]">12</span> laporan
          </p>

          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded-md border border-[#e4e4de] bg-white text-[#94a28e] transition-colors hover:bg-[#f4f8f2]">‹</button>
            <button className="h-8 w-8 rounded-md bg-[#154212] text-white">1</button>
            <button className="h-8 w-8 rounded-md border border-[#e4e4de] bg-white text-[#5f6757] transition-colors hover:bg-[#f4f8f2]">2</button>
            <button className="h-8 w-8 rounded-md border border-[#e4e4de] bg-white text-[#94a28e] transition-colors hover:bg-[#f4f8f2]">›</button>
          </div>
        </div>
      </section>
    </div>
  );
}
