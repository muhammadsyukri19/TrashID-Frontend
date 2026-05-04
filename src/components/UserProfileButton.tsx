"use client";

import React, { useEffect, useState } from "react";

interface UserProfileButtonProps {
  onClick?: () => void;
}

export default function UserProfileButton({ onClick }: UserProfileButtonProps) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5001/api/users/profile", {
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
      // Default action: redirect to profile page
      window.location.href = "/dashboard/settings/profile"; // Ganti dengan path yang sesuai
    }
  };

  // Tentukan gambar profil dengan fallback
  const displayImage = profile?.profilePicture
    ? (profile.profilePicture.startsWith("http")
        ? profile.profilePicture
        : `http://localhost:5001${profile.profilePicture}`)
    : "https://ui-avatars.com/api/?name=" + (profile?.fullName || "User") + "&background=154212&color=fff";

  return (
    <button
      className="flex items-center gap-4 bg-[#ffffff] p-2 pr-6 rounded-full shadow-sm w-max"
      onClick={handleClick}
    >
      <div className="w-10 h-10 rounded-full bg-[#bcf0ae] flex items-center justify-center text-[#154212] overflow-hidden">
        {/* Gambar profil */}
        <img
          alt="Profile"
          className="w-full h-full object-cover"
          src={displayImage}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-[#1a1c1c]">
          {profile?.username || "User"} {/* Nama pengguna atau fallback */}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
          {profile?.xp ? `${profile.xp} XP` : "0 XP"} {/* XP pengguna atau fallback */}
        </span>
      </div>
    </button>
  );
}