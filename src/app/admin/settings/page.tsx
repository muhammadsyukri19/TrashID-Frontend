import Link from "next/link";

const settingsItems = [
  {
    title: "Profil",
    description: "Atur informasi dan foto profil",
    icon: "person",
    href: "/admin/settings/profile",
  },
  {
    title: "Notifikasi",
    description: "Kelola preferensi notifikasi",
    icon: "notifications",
    href: "/admin/settings/notifications",
  },
  {
    title: "Bantuan",
    description: "Bantuan dan informasi aplikasi",
    icon: "help",
    href: "/admin/settings/help",
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-[#6f7b64]">Setelan</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#154212] font-display">
          Setelan
        </h1>
        <p className="max-w-xl text-sm text-zinc-500">
          Kelola profil admin, preferensi notifikasi, dan pusat bantuan dengan tampilan yang konsisten dengan UI utama TrashID.
        </p>
      </header>

      <section className="space-y-4">
        {settingsItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex items-center gap-4 rounded-2xl border border-[#a8c3a2] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(21,66,18,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7fb67a] hover:shadow-[0_16px_28px_rgba(21,66,18,0.08)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b9ebae] text-[#154212]">
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                {item.icon}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold text-[#1f241b] font-display">
                {item.title}
              </h2>
              <p className="text-sm text-zinc-500">{item.description}</p>
            </div>

            <span className="text-2xl leading-none text-[#1f241b] transition-transform duration-300 group-hover:translate-x-1">
              ›
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}