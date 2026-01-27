'use client';

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, CheckCircle, XCircle, UserCheck, ScanFace } from 'lucide-react';

export default function AttendanceCam() {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified' | 'failed'>('idle');

  // Camera capture logic
  const capture = useCallback(() => {
    setStatus('scanning');
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc || null);

    // Simulate AI Processing (2 seconds delay)
    setTimeout(() => {
      // Demo logic: 90% chance of success
      const isSuccess = Math.random() > 0.1; 
      setStatus(isSuccess ? 'verified' : 'failed');
    }, 2000);
  }, [webcamRef]);

  const reset = () => {
    setImgSrc(null);
    setStatus('idle');
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl shadow-2xl border border-gray-800 mt-8 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
          <ScanFace /> Smart Attendance Kiosk
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> Live Feed
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* LEFT: CAMERA FEED */}
        <div className="relative rounded-lg overflow-hidden border-2 border-cyan-900 bg-gray-900 h-64 flex justify-center items-center group">
            {imgSrc ? (
                <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
            ) : (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                />
            )}

            {/* Scanning Animation Overlay */}
            {status === 'scanning' && (
                <div className="absolute inset-0 bg-cyan-500/10 z-20">
                    <div className="h-1 w-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-scan-down absolute top-0"></div>
                </div>
            )}
            
            {/* Grid Overlay for Sci-Fi Look */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none grid grid-cols-3 grid-rows-3"></div>
        </div>

        {/* RIGHT: CONTROL PANEL */}
        <div className="space-y-6">
            
            {/* Status Display */}
            <div className="h-24 flex items-center justify-center border border-dashed border-gray-700 rounded-lg bg-gray-900/50">
                {status === 'idle' && <p className="text-gray-500">Ready to Scan...</p>}
                {status === 'scanning' && <p className="text-cyan-400 animate-pulse">🔍 Analyzing Biometrics...</p>}
                {status === 'verified' && (
                    <div className="text-green-400 flex flex-col items-center animate-bounce-short">
                        <CheckCircle size={32} />
                        <span className="font-bold text-lg">Identity Verified</span>
                        <span className="text-xs text-gray-400">Rahul Sharma (ID: 204)</span>
                    </div>
                )}
                {status === 'failed' && (
                    <div className="text-red-400 flex flex-col items-center">
                        <XCircle size={32} />
                        <span className="font-bold">Not Recognized</span>
                        <button onClick={capture} className="text-xs underline mt-1">Try Again</button>
                    </div>
                )}
            </div>

            {/* Buttons */}
            {imgSrc ? (
                <button 
                    onClick={reset}
                    className="w-full py-3 rounded-lg font-bold bg-gray-700 hover:bg-gray-600 transition-all"
                >
                    Retake Photo
                </button>
            ) : (
                <button 
                    onClick={capture}
                    className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/20 flex justify-center items-center gap-2 transition-all active:scale-95"
                >
                    <Camera size={20} /> Mark Attendance
                </button>
            )}

            {/* Stats */}
            <div className="flex justify-between text-xs text-gray-500 border-t border-gray-800 pt-4">
                <span>Today's Count: <span className="text-white font-bold">184/200</span></span>
                <span className="flex items-center gap-1"><UserCheck size={12}/> AI Active</span>
            </div>
        </div>
      </div>
    </div>
  );
}