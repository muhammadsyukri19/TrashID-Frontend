"use client"; // Menandakan ini adalah Client Component

import React, { useState } from "react";

export default function ScanSampahPage() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
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
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            position: relative;
          }

          .image-placeholder {
            width: 100%;
            height: 250px;
            background-color: #f3f3f3;
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .image-placeholder img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 15px;
          }

          .button {
            padding: 12px 20px;
            font-size: 16px;
            font-weight: bold;
            color: white;
            background-color: #154212;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin: 10px;
          }

          .button:hover {
            background-color: #2e7d32;
          }

          .upload-input {
            display: none;
          }
        `,
      }}
      />

      <main className="p-8 lg:p-12 w-full max-w-[1000px] mx-auto bg-[#f9f9f9] min-h-screen">
        <div className="container">
          <h2 className="font-display text-3xl text-[#154212] mb-4">Scan Sampah</h2>
          <p className="font-body text-lg text-[#42493e] mb-6">Ambil atau unggah foto sampah untuk mengetahui jenisnya.</p>

          {/* Image Placeholder */}
          <div className="image-placeholder">
            {image ? (
              <img src={image} alt="Sampah" />
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: "50px" }}>
                image
              </span>
            )}
          </div>

          {/* Ambil Foto or Upload Foto */}
          <div className="mt-6">
            <label htmlFor="upload-photo" className="button">
              Upload Foto
            </label>
            <input
              type="file"
              id="upload-photo"
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleImageUpload}
              className="upload-input"
            />
            {/* Here you can add the "Ambil Foto" button if using camera functionality */}
            {/* <button className="button">Ambil Foto</button> */}
          </div>

          {/* Scan Button */}
          <button className="button mt-8" style={{ width: "100%" }}>
            Scan Sekarang
          </button>
        </div>
      </main>
    </>
  );
}