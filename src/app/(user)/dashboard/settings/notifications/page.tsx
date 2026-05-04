"use client"; // Menandakan ini adalah Client Component

import React, { useState } from "react";

export default function NotifikasiPage() {
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] = useState(true);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(false);
  const [isActivityTrackingEnabled, setIsActivityTrackingEnabled] = useState(true);

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

          .info-card {
            background-color: #006e1c;
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
          }

          .info-card h4 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
          }

          .service-card {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto bg-[#f9f9f9] min-h-screen">
        <div className="container">
          <h2 className="font-display">Notifikasi</h2>
          <p className="font-body text-lg text-[#42493e] mb-8">
            Kelola bagaimana anda menerima pemberitahuan.
          </p>

          {/* Push Notification */}
          <div className="section">
            <h3>Push Notification</h3>
            <p>Terima pemberitahuan instan di perangkat Anda</p>
            <div className="toggle-switch">
              <label htmlFor="push-notification">Aktifkan</label>
              <input
                type="checkbox"
                id="push-notification"
                checked={isPushNotificationEnabled}
                onChange={() => setIsPushNotificationEnabled(!isPushNotificationEnabled)}
              />
            </div>
          </div>

          {/* Email Notification */}
          <div className="section">
            <h3>Email</h3>
            <p>Terima laporan mingguan dan update penting</p>
            <div className="toggle-switch">
              <label htmlFor="email-notification">Aktifkan</label>
              <input
                type="checkbox"
                id="email-notification"
                checked={isEmailNotificationEnabled}
                onChange={() => setIsEmailNotificationEnabled(!isEmailNotificationEnabled)}
              />
            </div>
          </div>

          {/* Activity Tracking */}
          <div className="section">
            <h3>Pembaruan Aktivitas</h3>
            <p>Pantau status pengumpulan sampah secara real-time</p>
            <div className="toggle-switch">
              <label htmlFor="activity-tracking">Aktifkan</label>
              <input
                type="checkbox"
                id="activity-tracking"
                checked={isActivityTrackingEnabled}
                onChange={() => setIsActivityTrackingEnabled(!isActivityTrackingEnabled)}
              />
            </div>
          </div>

          {/* Keamanan Data */}
          <div className="info-card">
            <h4>Keamanan Data</h4>
            <p>
              TrashID bertanggung jawab melindungi informasi pribadi Anda. Semua
              notifikasi disertai untuk memastikan privasi aktivitas pengolahan
              lingkungan Anda tetap terjaga.
            </p>
            <button className="bg-white text-[#006e1c] px-6 py-3 rounded-md">
              Baca Kebijakan
            </button>
          </div>

          {/* Layanan Terpercaya */}
          <div className="service-card">
            <h4>Layanan Terpercaya</h4>
            <p>
              Privasi Tanpa Kompromi. Kami mengutamakan keamanan data sebagai pilar
              utama dalam membangun komunitas lingkungan yang berkelanjutan.
            </p>
            <button className="bg-[#154212] text-white px-6 py-3 rounded-md">
              Hubungi Tim Keamanan
            </button>
          </div>
        </div>
      </main>
    </>
  );
}