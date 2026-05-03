import React from "react";

const stats = [
  { label: "Total Fasilitas", value: "150", icon: "location_city", tone: "green" },
  { label: "Penuh", value: "18", icon: "error", tone: "red" },
  { label: "Hampir Penuh", value: "34", icon: "warning", tone: "amber" },
  { label: "Normal", value: "98", icon: "check_circle", tone: "emerald" },
];

const facilities = [
  {
    year: "2023",
    province: "D.I. Yogyakarta",
    city: "Kab. Kulon Progo",
    name: "TPA Banyuroto",
    type: "TPA Pemda (Non Regional)",
    wasteIn: "11,680.00",
    landfillIn: "11,680.00",
    openHours: "06.00 - 12.00 WIB",
    status: "Penuh",
    statusTone: "red",
  },
  {
    year: "2023",
    province: "D.I. Yogyakarta",
    city: "Kab. Gunung Kidul",
    name: "TPA Wukirsari",
    type: "TPA Pemda (Non Regional)",
    wasteIn: "18,286.50",
    landfillIn: "17,921.50",
    openHours: "06.00 - 09.00 WIB",
    status: "Hampir Penuh",
    statusTone: "amber",
  },
  {
    year: "2023",
    province: "D.I. Yogyakarta",
    city: "Kota Yogyakarta",
    name: "TPS Piyungan (Regional)",
    type: "TPA Regional",
    wasteIn: "97,086.35",
    landfillIn: "92,134.39",
    openHours: "06.00 - 09.00 WIB",
    status: "Normal",
    statusTone: "green",
  },
  {
    year: "2023",
    province: "D.I. Yogyakarta",
    city: "Kab. Kulon Progo",
    name: "TPA Banyuroto",
    type: "TPA Pemda (Non Regional)",
    wasteIn: "9,761.50",
    landfillIn: "7,206.50",
    openHours: "08.00 - 10.00 WIB",
    status: "Penuh",
    statusTone: "red",
  },
  {
    year: "2023",
    province: "D.I. Yogyakarta",
    city: "Kab. Sleman",
    name: "TPA Piyungan (Regional)",
    type: "TPA Regional",
    wasteIn: "98,436.85",
    landfillIn: "93,414.45",
    openHours: "06.00 - 09.00 WIB",
    status: "Hampir Penuh",
    statusTone: "amber",
  },
  {
    year: "2023",
    province: "D.I. Yogyakarta",
    city: "Kota Yogyakarta",
    name: "TPS Piyungan (Regional)",
    type: "TPA Regional",
    wasteIn: "91,119.74",
    landfillIn: "86,471.39",
    openHours: "05.00 - 07.00 WIB (hanya jika ada truk)",
    status: "Normal",
    statusTone: "green",
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

export default function AdminTpuPage() {
  return (
    <div className="space-y-8 font-body">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212]">
            Kelola TPU
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Pantau kapasitas TPS/TPA, status operasional, dan kondisi fasilitas dalam satu halaman yang rapi.
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
                    : stat.tone === "red"
                      ? "bg-[#fde7e6] text-[#b84a4a]"
                      : stat.tone === "amber"
                        ? "bg-[#fff2df] text-[#c06a00]"
                        : "bg-[#e7f5e9] text-[#3d7b3d]"
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
        <div className="flex flex-col gap-5 border-b border-[#eee9df] p-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-headline text-lg font-bold text-[#154212]">TPS/TPA</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Filter data wilayah dan lihat ringkasan fasilitas operasional.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3 lg:w-[720px]">
            {[
              { label: "Tahun", placeholder: "Pilih Tahun" },
              { label: "Provinsi", placeholder: "D.I. Yogyakarta", active: true },
              { label: "Kabupaten/Kota", placeholder: "Pilih Kabupaten/Kota" },
            ].map((filter) => (
              <label key={filter.label} className="space-y-1">
                <span className="text-xs font-semibold text-[#39533a]">{filter.label}</span>
                <div className="relative">
                  <select className="h-9 w-full appearance-none rounded-full border border-[#d9e4d3] bg-[#f7fbf5] px-4 pr-10 text-xs text-[#1a1c1c] outline-none focus:border-[#154212]">
                    <option>{filter.placeholder}</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2 text-[18px] text-zinc-400">
                    expand_more
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto p-5 pb-2">
          <table className="min-w-[1180px] w-full text-left">
            <thead className="bg-[#154212] text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              <tr>
                <th className="px-5 py-3">Tahun</th>
                <th className="px-5 py-3">Provinsi</th>
                <th className="px-5 py-3">Kabupaten/Kota</th>
                <th className="px-5 py-3">Nama Fasilitas</th>
                <th className="px-5 py-3">Jenis</th>
                <th className="px-5 py-3">Sampah Masuk (ton/th)</th>
                <th className="px-5 py-3">Sampah Masuk Landfill (ton/th)</th>
                <th className="px-5 py-3">Jam Buka</th>
                <th className="px-5 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e7efe3]">
              {facilities.map((facility, index) => (
                <tr
                  key={`${facility.year}-${facility.name}-${index}`}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-[#f0f7ef]"} transition-colors hover:bg-[#e8f3e8]`}
                >
                  <td className="px-5 py-4 text-sm font-medium text-[#1f311f]">{facility.year}</td>
                  <td className="px-5 py-4 text-sm text-zinc-700">{facility.province}</td>
                  <td className="px-5 py-4 text-sm text-zinc-700">{facility.city}</td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-bold text-[#1a1c1c]">{facility.name}</p>
                      <p className="text-xs text-zinc-500">{facility.city}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-700">{facility.type}</td>
                  <td className="px-5 py-4 text-sm font-medium text-[#1f311f]">{facility.wasteIn}</td>
                  <td className="px-5 py-4 text-sm font-medium text-[#1f311f]">{facility.landfillIn}</td>
                  <td className="px-5 py-4 text-sm text-zinc-700">{facility.openHours}</td>
                  <td className="px-5 py-4 text-center">
                    <StatusBadge tone={facility.statusTone}>{facility.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#eee9df] px-5 py-4 text-sm text-zinc-500 lg:flex-row lg:items-center lg:justify-end">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#d9e4d3] bg-white px-3 text-xs font-semibold text-[#39533a]">
              10
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
          </div>
          <div className="flex items-center gap-2 lg:ml-4">
            <span className="text-xs text-zinc-500">1-10 of 150</span>
            {[
              "first_page",
              "chevron_left",
              "chevron_right",
              "last_page",
            ].map((icon) => (
              <button
                key={icon}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e4e4de] bg-white text-[#4f5e4b] transition-colors hover:bg-[#f4f8f2]"
                aria-label={icon}
              >
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-headline text-lg font-bold text-[#154212]">Kelola Kondisi TPU</h2>
          <a href="#" className="text-sm font-semibold text-[#154212] hover:underline">
            Lihat Selengkapnya ›
          </a>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.7fr)]">
          <div className="overflow-hidden rounded-xl border border-[#e4e4de] bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <div className="rounded-[22px] border border-[#dfe8d8] bg-gradient-to-br from-[#49c27f] via-[#2f8a62] to-[#1d5b57] p-5">
              <div className="relative h-[250px] overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,rgba(19,97,33,0.2),rgba(255,255,255,0.02))]">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_48%,rgba(255,248,181,0.42)_50%,transparent_52%),linear-gradient(90deg,transparent_48%,rgba(255,248,181,0.28)_50%,transparent_52%)] bg-[size:100%_30px,30px_100%] opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(255,255,255,0.18),transparent_20%),radial-gradient(circle_at_76%_18%,rgba(255,255,255,0.14),transparent_18%),radial-gradient(circle_at_52%_52%,rgba(255,255,255,0.12),transparent_24%)]" />
                <div className="absolute left-4 bottom-4 rounded-lg bg-white/90 px-3 py-2 text-[11px] text-[#4d4a41] shadow-sm">
                  <p className="font-semibold text-[#2f2d28]">Keterangan:</p>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#d65d5d]" /> Penuh
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#f3c250]" /> Hampir Penuh
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#9bd15a]" /> Kosong
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#e4e4de] bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-400">Ringkasan Area</p>
            <div className="mt-6 space-y-4">
              {[
                { label: "Organik", value: "642 kg", tone: "green" },
                { label: "Anorganik", value: "410 kg", tone: "blue" },
                { label: "Residu", value: "232 kg", tone: "red" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.tone === "green" ? "bg-[#2f6e2f]" : item.tone === "blue" ? "bg-[#2d6fb1]" : "bg-[#b84a4a]"}`} />
                    <span>{item.label}</span>
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
