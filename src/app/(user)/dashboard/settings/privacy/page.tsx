"use client"; // Menandakan ini adalah Client Component

import React, { useState } from "react";
import Link from "next/link"; // Tambahkan import Link di bagian atas file

export default function PrivasiPage() {
  const [isTwoFactorActive, setIsTwoFactorActive] = useState(true);
  const [isLocationTracking, setIsLocationTracking] = useState(false);
  const [isProfilePublic, setIsProfilePublic] = useState(true);

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
            max-width: 1000px;
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

          .section {
            margin-bottom: 20px;
          }

          .section h3 {
            font-size: 20px;
            font-weight: 600;
            color: #154212;
            margin-bottom: 10px;
          }

          .section p {
            font-size: 14px;
            color: #42493e;
            margin-bottom: 15px;
          }

          .toggle-switch {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .toggle-switch label {
            font-size: 14px;
            font-weight: 600;
            color: #42493e;
          }

          .toggle-switch input {
            width: 40px;
            height: 20px;
            border-radius: 20px;
            background-color: #ddd;
            cursor: pointer;
          }

          .toggle-switch input:checked {
            background-color: #154212;
          }

          .commitment-card {
            background-color: #006e1c;
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
          }

          .commitment-card h4 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
          }

          .danger-zone {
            background-color: #e57373;
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
          }

          .danger-zone h4 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
          }
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto bg-[#f9f9f9] min-h-screen">
        <div className="container">
          <h2 className="font-display">Privasi</h2>
          <p className="font-body text-lg text-[#42493e] mb-8">
            Kelola bagaimana anda menerima pemberitahuan.
          </p>

          {/* Ubah Kata Sandi */}
          <div className="section">
            <h3>Ubah Kata Sandi</h3>
            <p>Terakhir diubah 3 bulan yang lalu</p>
            <button className="bg-[#154212] text-white px-6 py-3 rounded-md">
              <Link href="/dashboard/settings/privacy/change-password">Perbarui Sekarang</Link>
            </button>
          </div>

          {/* Autentikasi Dua Faktor */}
          <div className="section">
            <h3>Autentikasi Dua Faktor</h3>
            <p>Meningkatkan akun via SMS atau App</p>
            <div className="toggle-switch">
              <label htmlFor="two-factor">Aktif</label>
              <input
                type="checkbox"
                id="two-factor"
                checked={isTwoFactorActive}
                onChange={() => setIsTwoFactorActive(!isTwoFactorActive)}
              />
            </div>
          </div>

          {/* Keamanan Akun */}
          <div className="section">
            <h3>Keamanan Akun</h3>
            <div className="toggle-switch">
              <label htmlFor="location-tracking">Izinkan Pelacakan Lokasi</label>
              <input
                type="checkbox"
                id="location-tracking"
                checked={isLocationTracking}
                onChange={() => setIsLocationTracking(!isLocationTracking)}
              />
            </div>
          </div>

          {/* Visibilitas Data */}
          <div className="section">
            <h3>Visibilitas Data</h3>
            <div className="toggle-switch">
              <label htmlFor="public-profile">Tampilkan Profil ke Publik</label>
              <input
                type="checkbox"
                id="public-profile"
                checked={isProfilePublic}
                onChange={() => setIsProfilePublic(!isProfilePublic)}
              />
            </div>
          </div>

          {/* Commitmen Privasi */}
          <div className="commitment-card">
            <h4>Komitmen Privasi</h4>
            <p>
              Di TrashID, kami percaya bahwa data Anda adalah milik Anda. Kami
              menggunakan informasi yang dikumpulkan semata-mata untuk meningkatkan
              efisiensi logistik sampah komunitas.
            </p>
          </div>

          {/* Zona Berbahaya */}
          <div className="danger-zone">
            <h4>Zona Berbahaya</h4>
            <p>
              Penghapusan akun bersifat permanen. Semua riwayat akun kebijakan dan
              data pengolahan sampah akan hilang.
            </p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-md">
              Minta Penghapusan Akun
            </button>
          </div>
        </div>
      </main>
    </>
  );
}