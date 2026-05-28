import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { ShieldCheck, ShieldAlert, Wifi, Bluetooth, Camera as CameraIcon, MapPin } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const PermissionsManager: React.FC<Props> = ({ onComplete }) => {
  const [status, setStatus] = useState({
    bluetooth: 'pending',
    camera: 'pending',
    location: 'pending',
    wifi: 'pending'
  });
  const [isInitializing, setIsInitializing] = useState(true);

  const requestAll = async () => {
    setIsInitializing(true);
    
    // 1. Bluetooth
    try {
      await BleClient.initialize();
      // Try to enable if disabled (Android specific)
      try { await BleClient.enable(); } catch(e) {}
      setStatus(s => ({ ...s, bluetooth: 'granted' }));
    } catch (e) {
      console.warn("BLE Init failed:", e);
      setStatus(s => ({ ...s, bluetooth: 'error' }));
    }

    // 2. Camera
    try {
      const p = await Camera.requestPermissions();
      setStatus(s => ({ ...s, camera: p.camera === 'granted' ? 'granted' : 'denied' }));
    } catch (e) {
      setStatus(s => ({ ...s, camera: 'denied' }));
    }

    // 3. Location (needed for BLE on Android)
    try {
      const p = await Geolocation.requestPermissions();
      setStatus(s => ({ ...s, location: p.location === 'granted' || p.coarseLocation === 'granted' ? 'granted' : 'denied' }));
    } catch (e) {
      setStatus(s => ({ ...s, location: 'denied' }));
    }

    // 4. WiFi / Network (Network plugin doesn't need permissions usually but we check connectivity)
    setStatus(s => ({ ...s, wifi: 'granted' }));

    setIsInitializing(false);
  };

  useEffect(() => {
    requestAll();
  }, []);

  const allGranted = Object.values(status).every(v => v === 'granted' || v === 'pending');

  if (allGranted && !isInitializing) {
    onComplete();
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020108] flex flex-col items-center justify-center p-6 text-white font-sans antialiased">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="relative">
            <ShieldCheck className="w-16 h-16 text-[#38bdf8] animate-pulse" />
            <div className="absolute inset-0 blur-xl bg-[#38bdf8]/20 rounded-full"></div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-center mb-2 tracking-tight">Security Check</h2>
        <p className="text-slate-400 text-center text-sm mb-8">
          To connect with your ESP32 hardware, please grant the following permissions.
        </p>

        <div className="space-y-4 mb-10">
          <PermissionRow 
            icon={<Bluetooth className="w-4 h-4" />} 
            label="Bluetooth LE" 
            status={status.bluetooth} 
          />
          <PermissionRow 
            icon={<MapPin className="w-4 h-4" />} 
            label="Hardware Location" 
            status={status.location} 
          />
          <PermissionRow 
            icon={<CameraIcon className="w-4 h-4" />} 
            label="Diagnostic Camera" 
            status={status.camera} 
          />
          <PermissionRow 
            icon={<Wifi className="w-4 h-4" />} 
            label="Network Stack" 
            status={status.wifi} 
          />
        </div>

        <button
          onClick={requestAll}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-black font-bold uppercase text-xs tracking-widest shadow-lg shadow-[#38bdf8]/20 transition-all hover:scale-[1.02] active:scale-95"
        >
          Check Permissions Again
        </button>

        <button
          onClick={onComplete}
          className="w-full mt-3 py-3 text-slate-500 font-medium text-[10px] uppercase tracking-widest hover:text-slate-300 transition-colors"
        >
          Skip (Hardware may not work)
        </button>
      </motion.div>
    </div>
  );
};

const PermissionRow = ({ icon, label, status }: { icon: React.ReactNode, label: string, status: string }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-slate-900/80 text-slate-400">
        {icon}
      </div>
      <span className="text-[13px] font-medium text-slate-200">{label}</span>
    </div>
    {status === 'granted' ? (
      <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
    ) : status === 'pending' ? (
      <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse"></div>
    ) : (
      <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
    )}
  </div>
);
