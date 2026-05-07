"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import UserProfileButton from "@/components/UserProfileButton";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Mengecek apakah token ada di localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      // Simulasi loading singkat agar transisi terasa smooth dan premium
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [router]);

  if (isInitializing) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#fcfdfa] flex flex-col items-center justify-center gap-6 animate-fade-in font-body">
        <div className="relative">
          <div className="w-24 h-24 bg-[#154212] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#154212]/20 animate-pulse">
            <Image src="/logo.png" alt="TrashID Logo" width={50} height={50} className="brightness-0 invert" />
          </div>
          <div className="absolute -inset-4 border-2 border-[#154212]/10 rounded-[2.5rem] animate-ping"></div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-black text-[#154212] tracking-tight font-headline">TrashID</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#154212] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-[#154212] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-[#154212] rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen text-[#1a1c1c] font-body flex selection:bg-[#91f78e] relative">
      <Sidebar role="user" />

      {/* Profile Button - Positioned absolutely in top right */}
      <div className="absolute top-15 right-15 z-50">
        <UserProfileButton />
      </div>

      {/* Main Content Workspace */}
      <div className="lg:ml-72 flex-1 min-h-screen transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
