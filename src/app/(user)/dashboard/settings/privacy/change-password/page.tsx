"use client"; // Menandakan ini adalah Client Component

import React, { useState } from "react";

export default function UbahKataSandiPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (newPassword === confirmNewPassword) {
      alert("Kata sandi berhasil diubah!");
    } else {
      alert("Kata sandi baru dan konfirmasi kata sandi tidak cocok.");
    }
  };

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

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            font-size: 14px;
            font-weight: 600;
            color: #42493e;
            margin-bottom: 8px;
            display: block;
          }

          .form-group input {
            width: 100%;
            padding: 10px;
            font-size: 14px;
            border-radius: 8px;
            border: 1px solid #e2e2e2;
            margin-bottom: 10px;
            outline: none;
          }

          .form-group input:focus {
            border-color: #154212;
          }

          .password-eye-icon {
            cursor: pointer;
            position: absolute;
            right: 10px;
            top: 40%;
          }

          .security-info {
            background-color: #006e1c;
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
          }

          .security-info h4 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

          .button-container button {
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 8px;
            cursor: pointer;
          }

          .button-container .cancel-btn {
            background-color: #e57373;
            color: white;
            border: none;
          }

          .button-container .save-btn {
            background-color: #154212;
            color: white;
            border: none;
          }

          .button-container .cancel-btn:hover {
            background-color: #d32f2f;
          }

          .button-container .save-btn:hover {
            background-color: #006e1c;
          }

          .help-section {
            margin-top: 30px;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }

          .help-section h4 {
            font-size: 20px;
            font-weight: 600;
            color: #154212;
            margin-bottom: 10px;
          }

          .help-section p {
            font-size: 14px;
            color: #42493e;
          }
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto bg-[#f9f9f9] min-h-screen">
        <div className="container">
          <h2 className="font-display">Ubah Kata Sandi</h2>
          <p className="font-body text-lg text-[#42493e] mb-8">
            Amankan akun Anda dengan mengganti kata sandi secara berkala
          </p>

          {/* Formulir Ubah Kata Sandi */}
          <div className="form-group">
            <label>Kata Sandi Saat Ini</label>
            <div style={{ position: "relative" }}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Masukkan Kata Sandi"
              />
              <span
                className="material-symbols-outlined password-eye-icon"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Kata Sandi Baru</label>
            <div style={{ position: "relative" }}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Buat Kata Sandi Baru"
              />
              <span
                className="material-symbols-outlined password-eye-icon"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Konfirmasi Kata Sandi Baru</label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Ulangi Kata Sandi Baru"
              />
              <span
                className="material-symbols-outlined password-eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>

          {/* Keamanan Kata Sandi */}
          <div className="security-info">
            <h4>Keamanan Kata Sandi</h4>
            <p>
              Pastikan kata sandi baru Anda memenuhi kriteria berikut untuk menjaga keamanan akun TrashID Anda:
            </p>
            <ul>
              <li>Minimal 8 karakter unik</li>
              <li>Komposisi huruf besar dan kecil</li>
              <li>Setidaknya ada satu angka (0-9)</li>
              <li>Karakter spesial (misal: @, #, $, !)</li>
            </ul>
          </div>

          {/* Tombol */}
          <div className="button-container">
            <button className="cancel-btn" onClick={() => alert("Perubahan dibatalkan")}>Batal</button>
            <button className="save-btn" onClick={handleSubmit}>Simpan Perubahan</button>
          </div>

          {/* Bantuan */}
          <div className="help-section">
            <h4>Butuh bantuan?</h4>
            <p>lupa kata sandi lama? Hubungi pusat bantuan Kami</p>
            <button className="save-btn">Hubungi bantuan</button>
          </div>
        </div>
      </main>
    </>
  );
}