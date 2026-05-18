"use client";

import { useRef, useEffect, useState } from "react";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export default function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setError(null);
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } // Prefer back camera on mobile
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreamReady(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Gagal mengakses kamera. Pastikan Anda telah memberikan izin.");
      }
    };

    if (isOpen) {
      startCamera();
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsStreamReady(false);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture_${Date.now()}.jpg`, { type: "image/jpeg" });
            onCapture(file);
            onClose();
          }
        }, "image/jpeg", 0.9);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600">photo_camera</span>
            Ambil Foto Sampah
          </h3>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="text-center p-6 space-y-4">
              <span className="material-symbols-outlined text-red-500 text-5xl">error</span>
              <p className="text-white font-medium">{error}</p>
            </div>
          ) : (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className={`w-full h-full object-cover transition-opacity duration-500 ${isStreamReady ? 'opacity-100' : 'opacity-0'}`}
              />
              {!isStreamReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-white/60">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-green-500 rounded-full animate-spin"></div>
                  <p className="text-sm">Menghubungkan ke kamera...</p>
                </div>
              )}
              {/* Scan Line Overlay */}
              <div className="absolute inset-x-0 top-0 h-1 bg-green-400/50 shadow-[0_0_15px_rgba(74,222,128,0.5)] animate-[scan_3s_ease-in-out_infinite] z-10"></div>
            </>
          )}
        </div>

        <div className="p-8 flex flex-col items-center gap-4">
          <button
            onClick={capturePhoto}
            disabled={!isStreamReady}
            className="w-20 h-20 rounded-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 text-white flex items-center justify-center shadow-lg shadow-green-600/20 active:scale-90 transition-all border-4 border-white"
          >
            <span className="material-symbols-outlined text-5xl">radio_button_checked</span>
          </button>
          <p className="text-gray-400 text-sm">Ketuk tombol untuk mengambil gambar</p>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}</style>
    </div>
  );
}
