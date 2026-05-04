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
        userName="User Curator"
        userType="Premium Tier"
        avatarUrl="https://lh3.googleusercontent.com/aida/ADBb0ujX_HXUNEHS34qx9QFELl6qnlMsqwyw1gcVALDixFN66R7M9oEzlvWURa4R6h8N7YOGVXgrrePGx3v4YQGTEIB-VDORPj2zxCrBYlDlX9zZNW-RiEKnmM3v7S6413B2EM2kCgFxO_1hw7hnvzDl6WEXD5wUovWkEAujhpkSAHfiVZT6rDodKZALlzI45YDwiFxmfOIl3Doz5RA4h8rcoTHvUS1cRvPIf042nkmpy59NpnFbfbsRV84XbL8RWHdpsiIOruUaHIU"
      />

      {/* Profile Button - Positioned absolutely in top right */}
      <div className="absolute top-6 right-6 z-50">
        <UserProfileButton />
      </div>

      {/* Main Content Workspace */}
      <div className="lg:ml-72 flex-1 min-h-screen transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
