"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [active, setActive] = useState("platform");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const menu = [
    { id: "platform", label: "Platform" },
    { id: "uji", label: "Uji" },
    { id: "fitur", label: "Fitur" },
    { id: "tentang", label: "Tentang" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const scrollPosition = window.scrollY + 100;

      menu.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActive(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('platform')}>
        <div className="relative w-10 h-10 transition-transform duration-300 group-hover:rotate-12">
          <Image src="/logo.png" alt="TrashID Logo" fill className="object-contain" />
        </div>
        <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${
          scrolled ? "text-green-800" : "text-white"
        }`}>
          TrashID
        </span>
      </div>

      {/* MENU */}
      <div className="hidden md:flex items-center gap-10">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative py-1 text-sm font-semibold transition-all duration-300 group ${
              active === item.id
                ? (scrolled ? "text-green-700" : "text-green-400")
                : (scrolled ? "text-gray-600 hover:text-green-700" : "text-gray-200 hover:text-white")
            }`}
          >
            {item.label}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-current transform origin-left transition-transform duration-300 ${
              active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`} />
          </button>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={() => router.push('/login')}
        className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 ${
          scrolled 
            ? "bg-green-700 text-white hover:bg-green-800" 
            : "bg-white text-green-900 hover:bg-green-50"
        }`}
      >
        Mulai
      </button>
    </nav>
  );
}