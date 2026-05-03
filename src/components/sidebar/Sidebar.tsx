"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Role = "admin" | "user";

interface MenuItem {
  title: string;
  icon: string;
  href: string;
}

// Dummy Menu berdasarkan Role
const menuConfig: Record<Role, MenuItem[]> = {
  admin: [
    { title: "Dashboard", icon: "dashboard", href: "/admin/dashboard" },
    { title: "Kelola Laporan", icon: "assignment", href: "/admin/reports" },
    { title: "Verifikasi AI", icon: "psychology", href: "/admin/ai-verify" },
    { title: "Data TPU", icon: "map", href: "/admin/tpu" },
    { title: "Manajemen Pengguna", icon: "group", href: "/admin/users" },
    { title: "Pengaturan", icon: "settings", href: "/admin/settings" },
  ],
  user: [
    { title: "Beranda", icon: "home", href: "/dashboard" },
    {
      title: "Lapor Kondisi TPU",
      icon: "report_problem",
      href: "/dashboard/lapor",
    },
    { title: "Peta TPU", icon: "map", href: "/dashboard/peta" },
    { title: "Scan AI", icon: "center_focus_strong", href: "/dashboard/scan" },
    { title: "Setelan", icon: "settings", href: "/dashboard/settings" },
  ],
};

interface SidebarProps {
  role: Role;
  userName?: string;
  userType?: string;
  avatarUrl?: string;
}

export default function Sidebar({
  role,
  userName = "Pengguna",
  userType = "Member Umum",
  avatarUrl = "https://ui-avatars.com/api/?name=User&background=154212&color=fff",
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menus = menuConfig[role];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-white rounded-md shadow-md text-[#154212] flex items-center justify-center"
      >
        <span className="material-symbols-outlined">
          {isOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Overlay Layer for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-screen flex flex-col justify-between py-6 bg-[#f9f9f9] w-72 shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-[#e2e2e2] z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Identity */}
          <div className="px-6 py-8 flex items-center gap-3 text-2xl font-black text-[#154212] font-headline">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
            <span>TrashID</span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 flex flex-col gap-1">
            {menus.map((menu, index) => {
              // Exact match, or starts with (for nested routes) but avoid base dashboard overriding children
              const isBaseRoute =
                menu.href === "/dashboard" || menu.href === "/admin/dashboard";
              const isActive = isBaseRoute
                ? pathname === menu.href
                : pathname === menu.href ||
                  pathname?.startsWith(`${menu.href}/`);

              return (
                <Link
                  key={index}
                  href={menu.href}
                  onClick={() => setIsOpen(false)} // Close sidebar on mobile tap
                  className={`flex items-center gap-4 mx-4 px-4 py-3 font-['Manrope'] text-sm font-semibold transition-all duration-300 rounded-full ${
                    isActive
                      ? "bg-[#154212]/10 text-[#154212] translate-x-1"
                      : "text-[#42493e] hover:bg-[#e2e2e2]/60 hover:text-[#154212]"
                  }`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    {menu.icon}
                  </span>
                  <span>{menu.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile / Footer Section */}
        <div className="px-4">
          <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] rounded-xl mb-4 border border-[#e2e2e2]/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover shadow-sm bg-white"
              src={avatarUrl}
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-[#1a1c1c] truncate">
                {userName}
              </p>
              <p className="text-xs text-[#72796e] truncate">{userType}</p>
            </div>
          </div>

          <button className="w-full flex items-center gap-4 text-[#ba1a1a] px-4 py-3 font-['Manrope'] text-sm font-semibold hover:bg-red-50 transition-all duration-300 rounded-full group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
              logout
            </span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
