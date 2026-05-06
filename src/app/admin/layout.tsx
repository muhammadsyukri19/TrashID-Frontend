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
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

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
