"use client"; // Menandakan ini adalah Client Component

import React from "react";
import Link from "next/link"; // Import Link dari Next.js

export default function SetelanPage() {
  const settings = [
    { icon: "person", title: "Profil", description: "Atur informasi dan foto profil", link: "/dashboard/settings/profile" },
    { icon: "notifications", title: "Notifikasi", description: "Kelola preferensi notifikasi", link: "/dashboard/settings/notifications" },
    { icon: "lock", title: "Privacy", description: "Pengaturan keamanan & data pribadi", link: "/dashboard/settings/privacy" },
    { icon: "help", title: "Bantuan", description: "Bantuan dan informasi aplikasi", link: "/dashboard/settings/help" },
  ];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0,24&display=swap');

          .font-headline, .font-display { font-family: 'Manrope', sans-serif; }
          .font-body { font-family: 'Inter', sans-serif; }

          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }

          .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: #fff;
            border: 1px solid #e2e2e2;
            border-radius: 10px;
            margin-bottom: 15px;
            cursor: pointer;
          }

          .setting-item:hover {
            background-color: #f3f3f3;
          }

          .setting-item .icon {
            font-size: 28px;
            color: #154212;
          }

          .setting-item .text {
            flex-grow: 1;
            padding-left: 15px;
          }

          .setting-item .text h3 {
            font-size: 18px;
            font-weight: 600;
            color: #154212;
          }

          .setting-item .text p {
            font-size: 14px;
            color: #42493e;
          }

          .setting-item .arrow {
            font-size: 18px;
            color: #154212;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: left;
          }

          .container h2 {
            font-size: 24px;
            font-weight: 700;
            color: #154212;
            margin-bottom: 20px;
          }

          .container p {
            font-size: 16px;
            color: #42493e;
            margin-bottom: 30px;
          }
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1000px] mx-auto bg-[#f9f9f9] min-h-screen">
        <div className="container">
          <h2 className="font-display">Setelan</h2>
          <p className="font-body">Lorem ipsum</p>

          {/* Setting List with Links */}
          {settings.map((setting, index) => (
            <Link key={index} href={setting.link}>
              <div className="setting-item">
                <span className="material-symbols-outlined icon">{setting.icon}</span>
                <div className="text">
                  <h3>{setting.title}</h3>
                  <p>{setting.description}</p>
                </div>
                <span className="material-symbols-outlined arrow">chevron_right</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}