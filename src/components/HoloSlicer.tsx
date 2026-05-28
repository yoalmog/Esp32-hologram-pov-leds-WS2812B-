import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onUpload: (data: any) => void;
}

export const HoloSlicer: React.FC<Props> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = (img: HTMLImageElement) => {
    setIsProcessing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Resize to 128x128 for easier sampling
    ctx.drawImage(img, 0, 0, 128, 128);

    const slices = 128; // Angular steps
    const radialResolution = 64; // Per arm
    const center = { x: 64, y: 64 };
    
    const result: number[][][] = []; // [slice][led][r,g,b]

    for (let s = 0; s < slices; s++) {
      const angle = (s / slices) * Math.PI * 2;
      const sliceData: number[][] = [];
      
      for (let r = 0; r < radialResolution; r++) {
        // Sample points from center outwards
        const radius = (r / radialResolution) * 64;
        const x = center.x + Math.cos(angle) * radius;
        const y = center.y + Math.sin(angle) * radius;
        
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        sliceData.push([pixel[0], pixel[1], pixel[2]]);
      }
      result.push(sliceData);
    }

    // Generate Preview
    renderPreview(result);
    
    setTimeout(() => {
      onUpload(result);
      setIsProcessing(false);
    }, 500);
  };

  const renderPreview = (data: number[][][]) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 256, 256);
    const center = 128;
    
    data.forEach((slice, sIdx) => {
      const angle = (sIdx / data.length) * Math.PI * 2;
      const nextAngle = ((sIdx + 1) / data.length) * Math.PI * 2;
      
      slice.forEach((color, rIdx) => {
        const r1 = (rIdx / slice.length) * 120;
        const r2 = ((rIdx + 1) / slice.length) * 120;
        
        ctx.beginPath();
        ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        ctx.arc(center, center, r2, angle, nextAngle);
        ctx.arc(center, center, r1, nextAngle, angle, true);
        ctx.fill();
      });
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-[#38bdf8] rounded-2xl py-10 px-6 cursor-pointer transition bg-slate-900/30 group">
          <Upload className="w-10 h-10 text-slate-500 mb-3 group-hover:text-[#38bdf8] transition-colors" />
          <span className="text-sm font-bold text-slate-300">Upload Logo / Image</span>
          <span className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Supports JPG, PNG (Square works best)</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setPreview(url);
                const img = new Image();
                img.onload = () => processImage(img);
                img.src = url;
              }
            }}
          />
        </label>
      </div>

      <canvas ref={canvasRef} width={128} height={128} className="hidden" />

      {preview && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center gap-4"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#38bdf8]" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8]">POV Sliced Preview</h4>
            </div>
            {isProcessing ? (
              <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            )}
          </div>
          
          <div className="relative group">
            <canvas ref={previewCanvasRef} width={256} height={256} className="rounded-full shadow-[0_0_30px_rgba(56,189,248,0.2)] bg-black" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full pointer-events-none"></div>
          </div>
          
          <div className="w-full grid grid-cols-2 gap-4 mt-2">
            <div className="bg-black/40 rounded-xl p-3 border border-slate-800/50">
              <span className="text-[9px] text-slate-500 uppercase block mb-1">Resolution</span>
              <span className="text-xs font-mono font-bold text-white">128 × 64 pts</span>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-slate-800/50">
              <span className="text-[9px] text-slate-500 uppercase block mb-1">Data Size</span>
              <span className="text-xs font-mono font-bold text-white">24.5 KB</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
