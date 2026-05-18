"use client";
import React from "react";
import Link from "next/link";

export default function UserSettingsMenuPage() {
  const menus = [
    { title: "Profil", desc: "Atur informasi dan foto profil", icon: "person", href: "/dashboard/settings/profile" },
    { title: "Notifikasi", desc: "Kelola preferensi notifikasi", icon: "notifications", href: "/dashboard/settings/notifications" },
    { title: "Privacy", desc: "Pengaturan keamanan & data pribadi", icon: "lock", href: "/dashboard/settings/privacy" },
    { title: "Bantuan", desc: "Bantuan dan informasi aplikasi", icon: "help", href: "/dashboard/settings/help" }
  ];

  return (
    <main className="flex flex-col font-body text-[#1a1c1c] p-6 lg:p-15 animate-fade-in">
      <header className="mb-8 shrink-0">
        <h1 className="font-headline text-3xl font-extrabold text-[#154212] tracking-tight font-display mb-2">Setelan</h1>
        <p className="text-2sm text-zinc-500 font-medium">Lebih lanjut</p>
      </header>

      <div className="flex flex-col gap-4 w-full">
        {menus.map((menu, idx) => (
          menu.href !== "#" ? (
            <Link href={menu.href} key={idx} className="flex items-center justify-between p-6 bg-white border border-zinc-200 rounded-2xl hover:border-[#154212] transition-all cursor-pointer group shadow-sm w-full">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-[#ebf5e9] text-[#154212] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl">{menu.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a1c1c] mb-1">{menu.title}</h3>
                  <p className="text-[13px] text-zinc-500">{menu.desc}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-zinc-400 group-hover:text-[#154212] transition-colors text-2xl">chevron_right</span>
            </Link>
          ) : (
            <div key={idx} className="flex items-center justify-between p-6 bg-zinc-50 border border-zinc-200 rounded-2xl opacity-70 cursor-not-allowed w-full">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-zinc-200 text-zinc-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">{menu.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-zinc-600 mb-1">{menu.title}</h3>
                  <p className="text-[13px] text-zinc-500">{menu.desc}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-zinc-400 text-2xl">chevron_right</span>
            </div>
          )
        ))}
      </div>
    </main>
  );
}
