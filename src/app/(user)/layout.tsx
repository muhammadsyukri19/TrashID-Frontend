import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import UserProfileButton from "@/components/UserProfileButton";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
