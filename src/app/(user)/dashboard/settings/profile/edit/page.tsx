"use client"; // Menandakan ini adalah Client Component

import React, { useState } from "react";

export default function EditProfilPage() {
  const [formData, setFormData] = useState({
    fullName: "Nama Lengkap",
    username: "Username",
    email: "email@example.com",
    phone: "0812++++++++",
    address: "Alamat",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfilePhoto(file);
  };

  const handlePhotoDelete = () => {
    setProfilePhoto(null);
  };

  const handleSave = () => {
    // Handle save functionality (could involve API call)
    alert("Profil disimpan!");
  };

  const handleCancel = () => {
    // Handle cancel functionality (e.g., navigate back)
    alert("Perubahan dibatalkan");
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

          .profile-photo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #bcf0ae;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #154212;
            font-size: 36px;
            margin-bottom: 20px;
          }

          .profile-photo img {
            width: 100%;
            height: 100%;
            object-cover: cover;
            border-radius: 50%;
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

          .form-group .file-input {
            font-size: 12px;
            margin-top: 10px;
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
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto bg-[#f9f9f9] min-h-screen">
        <div className="container">
          <h2 className="font-display">Edit Profil</h2>

          {/* Foto Profil */}
          <div className="profile-photo">
            {profilePhoto ? (
              <img src={URL.createObjectURL(profilePhoto)} alt="Profile" />
            ) : (
              <span className="material-symbols-outlined">person</span>
            )}
          </div>

          <div className="form-group">
            <button className="file-input" onClick={() => document.getElementById("file-upload")?.click()}>
              Unggah Foto
            </button>
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfilePhotoUpload}
            />
            {profilePhoto && (
              <button className="file-input" onClick={handlePhotoDelete}>
                Hapus Foto
              </button>
            )}
          </div>

          {/* Form Input */}
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Nomor Telepon</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Alamat</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          {/* Button */}
          <div className="button-container">
            <button className="cancel-btn" onClick={handleCancel}>Batal</button>
            <button className="save-btn" onClick={handleSave}>Simpan</button>
          </div>
        </div>
      </main>
    </>
  );
}