import { useState, useEffect } from "react";
import {
  Menu,
  Wifi,
  Bluetooth,
  SlidersHorizontal,
  Settings,
  Aperture,
  Activity,
  Lightbulb,
  RotateCcw,
} from "lucide-react";

const effects = [
  "🌌",
  "🪐",
  "🌈",
  "🧬",
  "💫",
  "⚡",
  "🌀",
  "🛸",
];

export default function App() {
  const [effectIndex, setEffectIndex] = useState(0);
  const [rpm, setRpm] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEffectIndex((prev) => (prev + 1) % effects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0a2342,black_70%)] opacity-90" />

      <div className="absolute inset-0 animate-pulse opacity-20">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-10">
        <Menu size={34} className="text-slate-400" />

        <div className="text-center">
          <h1 className="text-4xl font-black tracking-widest bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            HOLOSPIN
          </h1>

          <p className="text-xs tracking-[4px] text-slate-400">
            POV HOLOGRAPHIC SYSTEM
          </p>
        </div>

        <div className="flex gap-4">
          <Bluetooth className="text-slate-500" />
          <Wifi className="text-green-400" />
        </div>
      </div>

      {/* HOLOGRAM */}
      <div className="relative z-10 flex justify-center mt-14">
        <div className="relative w-[320px] h-[320px] rounded-full bg-black border border-cyan-500/30 shadow-[0_0_80px_rgba(0,255,255,0.2)] flex items-center justify-center overflow-hidden">

          {/* Rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/10 scale-90" />
          <div className="absolute inset-0 rounded-full border border-cyan-500/10 scale-75" />
          <div className="absolute inset-0 rounded-full border border-cyan-500/10 scale-50" />

          {/* Rotating Effect */}
          <div className="absolute inset-0 animate-spin duration-[8000ms] flex items-center justify-center text-8xl">
            {effects[effectIndex]}
          </div>

          {/* Center */}
          <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-700 shadow-inner z-10" />
        </div>
      </div>

      {/* RPM */}
      <div className="relative z-10 mt-10 flex flex-col items-center">
        <div className="w-44 h-24 border-[14px] border-slate-700 border-b-0 rounded-t-full relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-5xl font-bold">
            {rpm}
          </div>
        </div>

        <p className="text-slate-500 mt-3 tracking-[4px]">RPM</p>
      </div>

      {/* HEALTH PANEL */}
      <div className="relative z-10 mx-6 mt-12 bg-black/60 backdrop-blur-xl border border-cyan-500/10 rounded-3xl p-5">
        
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Activity className="text-fuchsia-500" />
            <h2 className="text-2xl font-bold tracking-wide">
              REAL-TIME HEALTH
            </h2>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <div className="w-3 h-3 rounded-full bg-slate-600" />
            WAITING
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          
          <div className="bg-[#050816] rounded-2xl border border-cyan-500/10 p-5 flex flex-col items-center">
            <Activity className="text-slate-400 mb-3" />
            <p className="font-bold tracking-widest text-center">
              HALL SENSOR
            </p>
            <span className="text-slate-500 mt-2">N/A</span>
          </div>

          <div className="bg-[#050816] rounded-2xl border border-cyan-500/10 p-5 flex flex-col items-center">
            <Lightbulb className="text-slate-400 mb-3" />
            <p className="font-bold tracking-widest text-center">
              LED STRIP
            </p>
            <span className="text-slate-500 mt-2">N/A</span>
          </div>

          <div className="bg-[#050816] rounded-2xl border border-cyan-500/10 p-5 flex flex-col items-center">
            <RotateCcw className="text-slate-400 mb-3" />
            <p className="font-bold tracking-widest text-center">
              MOTOR
            </p>
            <span className="text-slate-500 mt-2">N/A</span>
          </div>

        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-cyan-500/10 h-24 flex items-center justify-around z-20">

        <div className="flex flex-col items-center text-cyan-400">
          <SlidersHorizontal />
          <span className="text-xs mt-2 tracking-widest">
            CONTROLLER
          </span>
        </div>

        <div className="flex flex-col items-center text-slate-500">
          <Settings />
          <span className="text-xs mt-2 tracking-widest">
            SETTINGS
          </span>
        </div>

        <div className="flex flex-col items-center text-slate-500">
          <Aperture />
          <span className="text-xs mt-2 tracking-widest">
            EFFECTS
          </span>
        </div>
      </div>
    </div>
  );
}