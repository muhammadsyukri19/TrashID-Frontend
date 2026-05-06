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
      return () => clearTimeout(timer);
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

  if (isInitializing) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#fcfdfa] flex flex-col items-center justify-center gap-6 animate-fade-in font-body">
        <div className="relative">
          <div className="w-24 h-24 bg-[#154212] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#154212]/20 animate-pulse">
            <img src="/logo.png" alt="TrashID Logo" className="w-[50px] h-[50px] brightness-0 invert" />
          </div>
          <div className="absolute -inset-4 border-2 border-[#154212]/10 rounded-[2.5rem] animate-ping"></div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-black text-[#154212] tracking-tight font-headline">TrashID Admin</h2>
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
