"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import UserProfileButton from "@/components/UserProfileButton";
import { useRouter } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Mengecek apakah token ada di localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Jika tidak ada token, paksa arahkan ke halaman login
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="bg-[#f9f9f9] min-h-screen text-[#1a1c1c] font-body flex selection:bg-[#91f78e] relative">
      {/*
        Komponen Reusable Sidebar dipanggil di sini.
        Karena ini area khusus User, kita lempar role="user"
      */}
      <Sidebar
        role="user"
        />

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
