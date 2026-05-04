"use client"; // Menandakan ini adalah Client Component

import React, { useState } from "react";
import Link from "next/link";

export default function ProfilPage() {
  const [user, setUser] = useState({
    name: "User Name",
    email: "username@gmail.com",
    phone: "0812++++++++",
    address: "Jalan jalan, Desa desa",
  });

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

          .container {
            max-width: 800px;
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

          .profile-card {
            display: flex;
            justify-content: space-between;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }

          .profile-card .avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: #bcf0ae;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #154212;
            font-size: 36px;
            margin-right: 20px;
          }

          .profile-card .details {
            flex-grow: 1;
          }

          .profile-card .details h3 {
            font-size: 20px;
            font-weight: 600;
            color: #154212;
            margin-bottom: 10px;
          }

          .profile-card .details p {
            font-size: 14px;
            color: #42493e;
            margin-bottom: 5px;
          }

          .edit-button {
            padding: 8px 16px;
            background-color: #154212;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
          }

          .edit-button:hover {
            background-color: #006e1c;
          }
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto bg-[#f9f9f9] min-h-screen">
        <div className="container">
          <h2 className="font-display">Profil Saya</h2>
          <p className="font-body text-lg text-[#42493e] mb-8">
            Ambil atau unggah foto kondisi TPU untuk dilaporkan.
          </p>

          {/* Profil Card */}
          <div className="profile-card">
            <div className="avatar">
              {/* Ganti dengan gambar profil pengguna jika ada */}
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="details">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p><strong>Nama Lengkap:</strong> {user.name}</p>
              <p><strong>Nomor Telepon:</strong> {user.phone}</p>
              <p><strong>Alamat:</strong> {user.address}</p>
            </div>
            <Link href="/dashboard/settings/profile/edit">
              <button className="edit-button">Edit Profil</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}