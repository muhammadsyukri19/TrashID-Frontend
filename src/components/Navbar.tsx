"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("platform");

  const menu = [
    { id: "platform", label: "Platform" },
    { id: "uji", label: "Uji" },
    { id: "fitur", label: "Fitur" },
    { id: "tentang", label: "Tentang" },
  ];

  // 🔥 SCROLL FUNCTION (SMOOTH)
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ACTIVE DETECT
  useEffect(() => {
    const handleScroll = () => {
      menu.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop - 120;
          const bottom = top + section.offsetHeight;

          if (window.scrollY >= top && window.scrollY < bottom) {
            setActive(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 px-10 py-4 flex items-center justify-between shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="TrashID Logo" width={40} height={40} />
        <span className="font-semibold text-green-700 text-lg">
          TrashID
        </span>
      </div>

      {/* MENU */}
      <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`transition pb-1 ${
              active === item.id
                ? "text-green-700 border-b-2 border-green-700"
                : "hover:text-green-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={() => scrollToSection("uji")}
        className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
      >
        Mulai
      </button>
    </nav>
  );
}