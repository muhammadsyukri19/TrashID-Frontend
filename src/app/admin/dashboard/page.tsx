const summaryCards = [
  { label: "Total Laporan", value: "2,412", trend: "+12%", tone: "green", icon: "chart" },
  { label: "Waiting", value: "48", trend: "High", tone: "blue", icon: "clock" },
  { label: "Terverifikasi", value: "1,204", trend: "Stable", tone: "emerald", icon: "check" },
  { label: "Selesai", value: "1,160", trend: "+8%", tone: "olive", icon: "done" },
];

const recentReports = [
  {
    title: "Organik - Sector A-12",
    meta: "2 mins ago • Reported by Ahmad S.",
    status: "Waiting",
    statusClass: "bg-[#fff2df] text-[#c06a00]",
    icon: "bin",
  },
  {
    title: "Plastic Waste - Downtown",
    meta: "15 mins ago • Reported by Maria K.",
    status: "Terverifikasi",
    statusClass: "bg-[#e7f5e9] text-[#2f6e2f]",
    icon: "recycle",
  },
  {
    title: "Chemical/Hazmat - Ind. Zone",
    meta: "1 hour ago • Reported by Ops Team",
    status: "Ditolak",
    statusClass: "bg-[#fde7e6] text-[#b84a4a]",
    icon: "flask",
  },
];

const wasteBreakdown = [
  { name: "Organik", value: "642 kg", color: "#1f7a33" },
  { name: "Anorganik", value: "410 kg", color: "#245e9b" },
  { name: "Residu", value: "232 kg", color: "#c63b3b" },
];

function Icon({ name }: { name: string }) {
  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 7.2v5.1l3.5 2.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="m7.5 12 3 3L17 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (name === "done") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="m8.2 12.4 2.4 2.4 5.2-5.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (name === "recycle") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M8.5 7.5 12 2.9l3.5 4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.7 10.5 4 15l5.4-.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.3 10.5 20 15l-5.4-.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.7 19.8h4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "flask") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M9 3.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10.5 3.5v4.1L5.8 16.1A3 3 0 0 0 8.4 20.5h7.2a3 3 0 0 0 2.6-4.4l-4.7-8.5V3.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "bin") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M5.5 7.5h13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9 7.5V6.4A1.4 1.4 0 0 1 10.4 5h3.2A1.4 1.4 0 0 1 15 6.4v1.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M7.5 7.5 8.2 19h7.6l.7-11.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M4.5 19.5h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 16v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 16V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 16v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return null;
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-8 font-body">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212] sm:text-4xl">
            Halo, Admin!
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Ringkasan operasional harian untuk memantau laporan, TPU, dan tindak lanjut dengan cepat.
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
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-[#e4e4de] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  card.tone === "green"
                    ? "bg-[#ecf7eb] text-[#2f6e2f]"
                    : card.tone === "blue"
                      ? "bg-[#eaf2ff] text-[#2d6fb1]"
                      : card.tone === "emerald"
                        ? "bg-[#e7f5e9] text-[#3d7b3d]"
                        : "bg-[#eef6e7] text-[#50703f]"
                }`}
              >
                <Icon name={card.icon} />
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  card.tone === "blue" ? "bg-[#fff2df] text-[#c06a00]" : "bg-[#eef8ea] text-[#2e7a2e]"
                }`}
              >
                {card.trend}
              </span>
            </div>
            <p className="mt-4 text-sm text-zinc-500">{card.label}</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#154212]">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)]">
          <div className="rounded-xl bg-gradient-to-br from-[#154212] to-[#2d5a27] p-6 text-white shadow-[0_20px_40px_rgba(21,66,18,0.08)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">Total Impact</p>
            <div className="mt-6 flex items-end gap-2">
              <span className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl">1,284.5</span>
              <span className="pb-2 text-lg font-semibold text-white/80">KG</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/72">
              Total waste diverted from landfills since the start of operations this year.
            </p>
          </div>

          <div className="rounded-xl border border-[#e4e4de] bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-headline text-lg font-bold text-[#154212]">Laporan Terkini</h2>
                <p className="mt-1 text-sm text-zinc-500">Pantau laporan yang baru masuk dan status verifikasinya.</p>
              </div>
              <a href="#" className="text-sm font-semibold text-[#154212] hover:underline">
                Selengkapnya
              </a>
            </div>

            <div className="mt-5 divide-y divide-[#eee9df]">
              {recentReports.map((report) => (
                <div key={report.title} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f7ef] text-[#56704c]">
                    <Icon name={report.icon} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#1a1c1c]">{report.title}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{report.meta}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${report.statusClass}`}>{report.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-[#e4e4de] bg-[#154212] p-6 text-white shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <p className="text-sm font-semibold text-white/80">Smart Allocation</p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Sector B-2 has high accumulation of inorganic waste. Suggest rerouting truck #44.
            </p>
            <button className="mt-6 rounded-md bg-[#006e1c] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a7f26]">
              Execute Route
            </button>
          </div>

          <div className="rounded-xl border border-[#e4e4de] bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-400">Waste Breakdown</p>
            <div className="mt-6 flex items-center justify-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[#e6eee3] bg-white">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#154212]">64%</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Allocated</div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {wasteBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold text-[#1a1c1c]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
