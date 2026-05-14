"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const refreshUser = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userData);
    } catch (e) {
      console.error("Error refreshing user:", e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      if (userData.role !== "admin") {
        router.push("/dashboard");
      }
      setUser(userData);
      
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 800);

      window.addEventListener("profileUpdated", refreshUser);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("profileUpdated", refreshUser);
      };
    } catch (e) {
      router.push("/login");
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
            <p className="text-sm font-bold text-[#154212] tracking-wider uppercase opacity-80">Memuat Sistem Admin</p>
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
    <div className="bg-[#f9f9f9] min-h-screen text-[#1a1c1c] font-body flex selection:bg-[#91f78e]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0,24&display=swap');
          .font-headline, .font-display { font-family: 'Manrope', sans-serif; }
          .font-body, body { font-family: 'Inter', sans-serif; }
        `,
        }}
      />

      <AdminSidebar />

      <div className="lg:ml-72 flex-1 min-h-screen flex flex-col transition-all duration-300">
        {/* Top Header Section */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#e2e2e2] sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="hidden lg:block">
            <h2 className="text-sm font-bold text-[#6f7b64] uppercase tracking-widest">Admin Panel</h2>
          </div>
          
          <Link href="/admin/settings/profile" className="flex items-center gap-3 hover:bg-zinc-50 p-2 rounded-xl transition-all border border-transparent hover:border-zinc-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#1a1c1c]">{user?.fullName || "Admin System"}</p>
              <p className="text-[11px] font-bold text-[#154212] uppercase tracking-tighter">Administrator</p>
            </div>
            <img
              src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.username || 'A'}&background=154212&color=fff`}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-zinc-200 shadow-sm"
            />
          </Link>
        </header>

        {/* Content Area */}
        <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
