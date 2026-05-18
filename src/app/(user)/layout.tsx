"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import UserProfileButton from "@/components/UserProfileButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useInactivityTimeout } from "@/hooks/useInactivityTimeout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  // Enable inactivity timeout check and tracking
  useInactivityTimeout();

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
      <div className="fixed inset-0 z-[9999] bg-[#fcfdfa] flex flex-col items-center justify-center animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          {/* Modern Minimal Loader */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#154212]/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-[#154212] rounded-full animate-spin"></div>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-bold text-[#154212] tracking-wider uppercase opacity-80">Memuat Data</p>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-[#154212] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1 h-1 bg-[#154212] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1 h-1 bg-[#154212] rounded-full animate-bounce"></span>
            </div>
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
