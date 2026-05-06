"use client";

import React, { useEffect, useState } from "react";

interface UserProfileButtonProps {
  onClick?: () => void;
}

export default function UserProfileButton({ onClick }: UserProfileButtonProps) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_BASE}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Ambil data user dari localStorage untuk mengetahui role, atau redirect berdasar role profile API
      try {
        const userObj = localStorage.getItem("user");
        if (userObj) {
          const user = JSON.parse(userObj);
          if (user.role === "admin") {
            window.location.href = "/admin/settings";
            return;
          }
        }
      } catch (e) {}
      window.location.href = "/dashboard/settings";
    }
  };

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  const BACKEND_BASE = API_BASE.replace("/api", "");

  const displayImage = profile?.profilePicture
    ? profile.profilePicture.startsWith("http")
      ? profile.profilePicture
      : `${BACKEND_BASE}${profile.profilePicture}`
    : "https://ui-avatars.com/api/?name=" +
      (profile?.fullName || "User") +
      "&background=154212&color=fff";

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center gap-3 bg-white hover:bg-[#f4fef0] border border-zinc-200 hover:border-[#5ccf3c] rounded-full py-2 pl-2 pr-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-sm"
    >
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#bcf0ae] flex-shrink-0">
        <img
          alt="Profile"
          className="w-full h-full object-cover"
          src={displayImage}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-bold text-[#154212] leading-tight tracking-wide">
          {profile?.username || "User"}
        </span>

        {/* XP Badge */}
        <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#154212] bg-[#d4f5c4] rounded-full px-2.5 py-[3px] w-fit leading-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5ccf3c] inline-block" />
          {profile?.xp ? `${profile.xp} XP` : "0 XP"}
        </span>
      </div>
    </button>
  );
}


