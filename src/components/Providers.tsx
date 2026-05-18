"use client";

import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "PASTE_YOUR_GOOGLE_CLIENT_ID_HERE";
  const pathname = usePathname();
  
  // State to track unified page loading and reveal transitions
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    // Tiny delay to allow all child components to mount and paint concurrently in the DOM
    const timer = setTimeout(() => {
      setVisible(true);
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div 
        className={`transition-all duration-500 ease-out transform ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </GoogleOAuthProvider>
  );
}
