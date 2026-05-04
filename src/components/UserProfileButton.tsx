"use client";

import React from "react";

interface UserProfileButtonProps {
  onClick?: () => void;
}

export default function UserProfileButton({ onClick }: UserProfileButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default action: redirect to profile page
      window.location.href = "/settings/profile"; // Ganti dengan path yang sesuai
    }
  };

  return (
    <button
      className="flex items-center gap-4 bg-[#ffffff] p-2 pr-6 rounded-full shadow-sm w-max"
      onClick={handleClick}
    >
      <div className="w-10 h-10 rounded-full bg-[#bcf0ae] flex items-center justify-center text-[#154212] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Profile"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida/ADBb0ujX_HXUNEHS34qx9QFELl6qnlMsqwyw1gcVALDixFN66R7M9oEzlvWURa4R6h8N7YOGVXgrrePGx3v4YQGTEIB-VDORPj2zxCrBYlDlX9zZNW-RiEKnmM3v7S6413B2EM2kCgFxO_1hw7hnvzDl6WEXD5wUovWkEAujhpkSAHfiVZT6rDodKZALlzI45YDwiFxmfOIl3Doz5RA4h8rcoTHvUS1cRvPIf042nkmpy59NpnFbfbsRV84XbL8RWHdpsiIOruUaHIU"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-[#1a1c1c]">
          User Curator
        </span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
          Premium Tier
        </span>
      </div>
    </button>
  );
}