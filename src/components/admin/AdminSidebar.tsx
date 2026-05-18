"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoutModal from "../LogoutModal";

type MenuItem = {
  title: string;
  icon: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { title: "Beranda", icon: "dashboard", href: "/admin/dashboard" },
  { title: "Kelola Laporan", icon: "assignment", href: "/admin/reports" },
  { title: "Data TPS", icon: "map", href: "/admin/tpu" },
  { title: "Manajemen Pengguna", icon: "group", href: "/admin/users" },
  { title: "Pengaturan", icon: "settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("lastActivity");
    router.push("/");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] p-2 bg-white rounded-md shadow-md text-[#154212] flex items-center justify-center lg:hidden"
      >
        <span className="material-symbols-outlined">
          {isOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen flex flex-col justify-between py-6 bg-[#f9f9f9] w-72 shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-[#e2e2e2] z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <div className="px-6 py-8 flex items-center gap-3 text-2xl font-black text-[#154212] font-headline">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
            <span>TrashID</span>
          </div>

          <nav className="mt-4 flex flex-col gap-1">
            {menuItems.map((item) => {
              const isBaseRoute = item.href === "/admin/dashboard";
              const isActive = isBaseRoute
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
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
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-4">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-4 text-[#ba1a1a] px-4 py-3 font-['Manrope'] text-sm font-semibold hover:bg-red-50 transition-all duration-300 rounded-full group"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
              logout
            </span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      <LogoutModal 
        isOpen={showLogoutModal} 
        onConfirm={handleLogout} 
        onCancel={() => setShowLogoutModal(false)} 
      />
    </>
  );
}
