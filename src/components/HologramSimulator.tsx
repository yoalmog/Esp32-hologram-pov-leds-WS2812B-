import React, { useEffect, useRef } from 'react';

interface HologramSimulatorProps {
  effect: string;
  speed: number;
  brightness: number;
  customColor: string;
  logoUrl?: string | null;
  povText?: string;
  logoRotation?: number;
  logoTintColor?: string | null;
  povTextAnimation?: string;
  effectSpeedRate?: number;
  effectScale?: number;
  effectComplexity?: number;
  videoUrl?: string | null;
  ledCount?: number;
}

export const HologramSimulator: React.FC<HologramSimulatorProps> = ({
  effect = 'rainbow',
  speed = 80,
  brightness = 150,
  customColor = '#00b4d8',
  logoUrl,
  povText = "POV SYSTEM HOLOSPIN 3D ",
  logoRotation = 0,
  logoTintColor = null,
  povTextAnimation = 'fade',
  effectSpeedRate = 1.0,
  effectScale = 1.0,
  effectComplexity = 8,
  videoUrl = null,
  ledCount = 44,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const tintedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const updateLogo = () => {
      if (logoUrl) {
        const img = new Image();
        img.src = logoUrl;
        img.onload = () => {
          logoImgRef.current = img;
          applyTint(img);
        };
        img.onerror = () => {
          console.error("Failed to load logo image:", logoUrl);
          logoImgRef.current = null;
          tintedCanvasRef.current = null;
        };
      } else {
        logoImgRef.current = null;
        tintedCanvasRef.current = null;
      }
    };

    const applyTint = (img: HTMLImageElement) => {
      if (logoTintColor) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          ctx.globalCompositeOperation = 'source-in';
          ctx.fillStyle = logoTintColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          tintedCanvasRef.current = canvas;
        } else {
          tintedCanvasRef.current = null;
        }
      } else {
        tintedCanvasRef.current = null;
      }
    };

    updateLogo();
  }, [logoUrl, logoTintColor]);

  useEffect(() => {
    if (videoUrl) {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = "anonymous";
      video.play().catch(err => console.log("Hologram video auto-play prevented/failed", err));
      videoRef.current = video;
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current = null;
      }
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current = null;
      }
    };
  }, [videoUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI Canvas support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    
    // Scale radius based on LED count (ref: 44 LEDs is standard)
    const safeLedCount = typeof ledCount === 'number' && !isNaN(ledCount) ? ledCount : 44;
    const ledScaling = Math.min(1.15, Math.max(0.3, safeLedCount / 44));
    const radius = Math.min(cx, cy) * 0.95 * ledScaling;

    let animationFrameId: number;
    let rotation = 0;
    let time = 0;

    const parseHsl = (hslStr: string) => {
      // Very basic extraction, safely handled
      return hslStr;
    };

    const drawEffect = (c: CanvasRenderingContext2D, t: number, rot: number) => {
      c.save();
      c.translate(cx, cy);

      switch (effect) {
        case 'solid':
          c.fillStyle = customColor;
          c.beginPath();
          c.arc(0, 0, radius, 0, Math.PI * 2);
          c.fill();
          break;
        case 'rainbow':
          let gradient: any;
          if (c.createConicGradient) {
            gradient = c.createConicGradient(t * 0.002, 0, 0);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(1/6, 'yellow');
            gradient.addColorStop(2/6, 'green');
            gradient.addColorStop(3/6, 'cyan');
            gradient.addColorStop(4/6, 'blue');
            gradient.addColorStop(5/6, 'magenta');
            gradient.addColorStop(1, 'red');
          } else {
            gradient = c.createRadialGradient(0, 0, 0, 0, 0, radius);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(1, 'blue');
          }
          c.fillStyle = gradient;
          c.beginPath();
          c.arc(0, 0, radius, 0, Math.PI * 2);
          c.fill();
          break;
        case 'fire':
          const fireGrad = c.createRadialGradient(0, 0, 0, 0, 0, radius);
          const flicker = Math.sin(t * 0.02) * 0.05 + 1;
          fireGrad.addColorStop(0, `rgba(255, 200, 0, 1)`);
          fireGrad.addColorStop(0.4, `rgba(255, 50, 0, ${0.8 * flicker})`);
          fireGrad.addColorStop(0.8, `rgba(100, 0, 0, ${0.2 * flicker})`);
          fireGrad.addColorStop(1, 'transparent');
          c.fillStyle = fireGrad;
          c.beginPath();
          c.arc(0, 0, radius, 0, Math.PI * 2);
          c.fill();
          break;
        case 'matrix':
          c.strokeStyle = '#4ade80';
          c.lineWidth = 15;
          c.setLineDash([20, 20]);
          c.lineDashOffset = -t * 0.1;
          c.beginPath();
          c.arc(0, 0, radius - 10, 0, Math.PI * 2);
          c.stroke();
          
          c.lineWidth = 8;
          c.setLineDash([10, 30]);
          c.lineDashOffset = t * 0.15;
          c.beginPath();
          c.arc(0, 0, radius - 35, 0, Math.PI * 2);
          c.stroke();
          c.setLineDash([]);
          break;
        case 'hypno':
          c.strokeStyle = '#a855f7';
          const hypnoRings = Math.max(2, Math.round(effectComplexity));
          for (let i = 0; i < hypnoRings; i++) {
            c.lineWidth = (6 + i * 2) * effectScale;
            c.beginPath();
            const r = ((radius * effectScale) - i * ((radius * effectScale) / hypnoRings) + (t * 0.05)) % (radius * effectScale);
            if (r > 0) {
              c.arc(0, 0, r, 0, Math.PI * 2);
              c.stroke();
            }
          }
          break;
        case 'space':
           let spaceGrad: any;
           if (c.createConicGradient) {
             spaceGrad = c.createConicGradient(t * 0.001, 0, 0);
             spaceGrad.addColorStop(0, '#000');
             spaceGrad.addColorStop(0.3, 'rgba(236,72,153,0.8)');
             spaceGrad.addColorStop(0.7, 'rgba(56,189,248,0.8)');
             spaceGrad.addColorStop(1, '#000');
           } else {
             spaceGrad = c.createRadialGradient(0, 0, 0, 0, 0, radius * effectScale);
             spaceGrad.addColorStop(0, 'rgba(236,72,153,0.8)');
             spaceGrad.addColorStop(1, '#000');
           }
           c.fillStyle = spaceGrad;
           c.beginPath();
           c.arc(0, 0, radius * effectScale, 0, Math.PI * 2);
           c.fill();
           
           // Stars
           c.fillStyle = 'white';
           const starCount = Math.max(5, Math.round(effectComplexity * 3.5));
           for (let i=0; i<starCount; i++) {
               const angle = (i * 1234.5) % (Math.PI * 2);
               const dist = (i * 76.5 + t * 0.05) % (radius * effectScale);
               c.beginPath();
               c.arc(Math.cos(angle)*dist, Math.sin(angle)*dist, Math.random() * 2 * effectScale, 0, Math.PI * 2);
               c.fill();
           }
           break;
        case 'mandala':
          c.strokeStyle = '#2dd4bf';
          c.lineWidth = 4 * effectScale;
          const mandalaPetals = Math.max(3, Math.round(effectComplexity));
          for(let i=0; i<mandalaPetals; i++) {
              c.save();
              c.rotate(i * (Math.PI * 2 / mandalaPetals) + t * 0.001);
              c.beginPath();
              c.moveTo(0, 0);
              c.quadraticCurveTo((radius * effectScale)/2, (radius * effectScale)/2, radius * effectScale, 0);
              c.quadraticCurveTo((radius * effectScale)/2, -(radius * effectScale)/2, 0, 0);
              c.stroke();
              c.restore();
          }
          break;
        case 'acid':
          const a1 = t * 0.005;
          let aGrad: any;
          if (c.createConicGradient) {
            aGrad = c.createConicGradient(a1, 0, 0);
            aGrad.addColorStop(0, 'rgba(163,230,53,0.1)');
            aGrad.addColorStop(0.5, '#a3e635');
            aGrad.addColorStop(1, 'rgba(163,230,53,0.1)');
          } else {
            aGrad = c.createRadialGradient(0, 0, 0, 0, 0, radius);
            aGrad.addColorStop(0, '#a3e635');
            aGrad.addColorStop(1, 'rgba(163,230,53,0.1)');
          }
          c.fillStyle = aGrad;
          c.beginPath();
          c.arc(0, 0, radius, 0, Math.PI * 2);
          c.fill();
          break;
        case 'plasma':
          for (let i = 0; i < 36; i++) {
            const angle = (i * Math.PI * 2) / 36 + t * 0.001;
            const dist = Math.sin(t * 0.003 + i) * radius * 0.5 + radius * 0.4;
            c.beginPath();
            c.arc(Math.cos(angle) * dist, Math.sin(angle) * dist, 8 + Math.sin(t * 0.01 + i) * 6, 0, Math.PI * 2);
            c.fillStyle = `hsl(${(i * 10 + t * 0.05) % 360}, 100%, 60%)`;
            c.fill();
          }
          break;
        case 'portal':
          c.lineWidth = 4;
          for (let i = 0; i < 12; i++) {
             const ringR = ((t * 0.05 + i * (radius/12))) % radius;
             c.beginPath();
             c.arc(0, 0, Math.max(0, ringR), 0, Math.PI * 2);
             c.strokeStyle = `rgba(56, 189, 248, ${1 - ringR/radius})`;
             c.stroke();
          }
          break;
        case 'dna':
          c.lineWidth = 4;
          for (let i = -radius; i < radius; i += 10) {
             const x1 = Math.sin(i * 0.05 + t * 0.005) * (radius * 0.4);
             const x2 = Math.sin(i * 0.05 + t * 0.005 + Math.PI) * (radius * 0.4);
             
             c.strokeStyle = 'rgba(255,255,255,0.2)';
             c.beginPath(); c.moveTo(x1, i); c.lineTo(x2, i); c.stroke();
             
             c.fillStyle = '#f43f5e';
             c.beginPath(); c.arc(x1, i, 4, 0, Math.PI * 2); c.fill();
             
             c.fillStyle = '#3b82f6';
             c.beginPath(); c.arc(x2, i, 4, 0, Math.PI * 2); c.fill();
          }
          break;
        case 'clock':
          c.save();
          // Clock face
          c.strokeStyle = '#38bdf8';
          c.lineWidth = 4;
          c.beginPath();
          c.arc(0, 0, radius - 5, 0, Math.PI * 2);
          c.stroke();
          
          c.lineWidth = 2;
          for(let i=0; i<12; i++) {
              c.save();
              c.rotate(i * (Math.PI / 6));
              c.beginPath();
              c.moveTo(0, -(radius - 15));
              c.lineTo(0, -(radius - 5));
              c.stroke();
              c.restore();
          }
          
          // Hands
          const date = new Date();
          const ms = date.getMilliseconds();
          const sec = date.getSeconds() + ms/1000;
          const min = date.getMinutes() + sec/60;
          
          c.lineCap = 'round';
          c.lineWidth = 6;
          c.save();
          c.rotate((min * Math.PI / 30) + Math.PI);
          c.beginPath(); c.moveTo(0,0); c.lineTo(0, radius * 0.6); c.stroke();
          c.restore();

          c.lineWidth = 3;
          c.save();
          c.rotate((sec * Math.PI / 30) + Math.PI);
          c.beginPath(); c.moveTo(0,0); c.lineTo(0, radius * 0.8); c.stroke();
          c.restore();
          c.restore();
          break;
        case 'mushrooms':
          c.save();
          const drawMushroom = (mx: number, my: number, bounceOff: number, scale: number, color: string, spotColor: string) => {
             const bounce = Math.sin(t * 0.005 + bounceOff) * 10;
             const sway = Math.cos(t * 0.003 + bounceOff) * 0.1;
             c.save();
             c.translate(mx, my + bounce);
             c.scale(scale, scale);
             c.rotate(sway);
             
             // Stem
             c.fillStyle = '#fff';
             c.beginPath();
             c.moveTo(-10, 0);
             c.quadraticCurveTo(-15, 30, -5, 50);
             c.lineTo(5, 50);
             c.quadraticCurveTo(15, 30, 10, 0);
             c.fill();
             
             // Cap
             c.fillStyle = color;
             c.beginPath();
             c.moveTo(-40, 0);
             c.quadraticCurveTo(-40, -40, 0, -40);
             c.quadraticCurveTo(40, -40, 40, 0);
             c.quadraticCurveTo(0, 10, -40, 0);
             c.fill();
             
             // Spots
             c.fillStyle = spotColor;
             c.beginPath(); c.arc(-20, -15, 6, 0, 2*Math.PI); c.fill();
             c.beginPath(); c.arc(15, -25, 8, 0, 2*Math.PI); c.fill();
             c.beginPath(); c.arc(5, -10, 4, 0, 2*Math.PI); c.fill();
             
             c.restore();
          };
          
          c.shadowBlur = 15;
          c.shadowColor = 'rgba(251, 113, 133, 0.8)';
          // Base terrain/light
          c.fillStyle = 'rgba(168, 85, 247, 0.2)';
          c.beginPath(); c.ellipse(0, 40, 60, 20, 0, 0, Math.PI*2); c.fill();
          
          drawMushroom(-35, 5, 0, 0.8, '#f43f5e', '#fff');
          drawMushroom(35, 10, Math.PI, 0.7, '#a855f7', '#0ff');
          drawMushroom(0, -15, Math.PI/2, 1.1, '#06b6d4', '#ff0');
          c.shadowBlur = 0;
          c.restore();
          break;
        case 'alien':
          c.save();
          const headOsc = Math.sin(t * 0.003) * 15;
          c.shadowBlur = 20;
          c.shadowColor = '#4ade80';
          
          c.save();
          c.translate(0, headOsc);
          // Head
          c.fillStyle = '#86efac';
          c.beginPath();
          c.ellipse(0, -10, 45, 60, 0, 0, Math.PI * 2);
          c.fill();
          
          // Eyes
          const eyeBlink = Math.sin(t*0.01) > 0.95 ? 0.1 : 1;
          c.fillStyle = '#000';
          c.save(); c.translate(-20, 0); c.rotate(-0.3); c.beginPath(); c.ellipse(0, 0, 10, 25*eyeBlink, 0, 0, Math.PI*2); c.fill(); c.restore();
          c.save(); c.translate(20, 0); c.rotate(0.3); c.beginPath(); c.ellipse(0, 0, 10, 25*eyeBlink, 0, 0, Math.PI*2); c.fill(); c.restore();
          
          // Mouth
          c.strokeStyle = '#000';
          c.lineWidth = 2;
          c.beginPath(); c.moveTo(-5, 30); c.lineTo(5, 30); c.stroke();
          
          // Antennae
          c.strokeStyle = '#86efac';
          c.lineWidth = 4;
          c.beginPath(); c.moveTo(0, -70); c.lineTo(-20, -90); c.stroke();
          c.beginPath(); c.moveTo(0, -70); c.lineTo(20, -90); c.stroke();
          c.fillStyle = '#facc15';
          c.beginPath(); c.arc(-20, -90, 6, 0, Math.PI*2); c.fill();
          c.beginPath(); c.arc(20, -90, 6, 0, Math.PI*2); c.fill();
          
          c.restore();
          
          // Floating stars around
          c.fillStyle = '#fff';
          for(let i=0; i<5; i++) {
            c.beginPath();
            c.arc(Math.cos(t*0.002 + i)*60, Math.sin(t*0.003 + i)*60, 2, 0, Math.PI*2);
            c.fill();
          }
          
          c.shadowBlur = 0;
          c.restore();
          break;
        case 'cube3d':
          c.save();
          const size = radius * 0.45;
          const verts = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
          ];
          const edges = [
            [0,1],[1,2],[2,3],[3,0],
            [4,5],[5,6],[6,7],[7,4],
            [0,4],[1,5],[2,6],[3,7]
          ];
          
          const rx = t * 0.001;
          const ry = t * 0.0015;
          const rz = t * 0.0005;
          
          const cosX = Math.cos(rx); const sinX = Math.sin(rx);
          const cosY = Math.cos(ry); const sinY = Math.sin(ry);
          const cosZ = Math.cos(rz); const sinZ = Math.sin(rz);
          
          const proj = [];
          
          for (let v of verts) {
            let x = v[0], y = v[1], z = v[2];
            // Rotate X
            let y1 = y * cosX - z * sinX;
            let z1 = y * sinX + z * cosX;
            // Rotate Y
            let x1 = x * cosY + z1 * sinY;
            let z2 = -x * sinY + z1 * cosY;
            // Rotate Z
            let x2 = x1 * cosZ - y1 * sinZ;
            let y2 = x1 * sinZ + y1 * cosZ;
            
            // Perspective filter
            const p = 250 / (250 + z2 * size);
            proj.push([x2 * size * p, y2 * size * p]);
          }
          
          c.strokeStyle = '#60a5fa';
          c.lineWidth = 3;
          c.lineJoin = 'round';
          c.shadowBlur = 15;
          c.shadowColor = '#60a5fa';
          
          c.beginPath();
          for (let e of edges) {
            c.moveTo(proj[e[0]][0], proj[e[0]][1]);
            c.lineTo(proj[e[1]][0], proj[e[1]][1]);
          }
          c.stroke();
          
          // Nodes
          c.fillStyle = '#fff';
          for (let p of proj) {
            c.beginPath(); c.arc(p[0], p[1], 4, 0, Math.PI*2); c.fill();
          }
          
          c.shadowBlur = 0;
          c.restore();
          break;
        case 'pov_text':
          c.save();
          
          const textToDraw = povText ? povText.toUpperCase().trim() : "POV SYSTEM";
          const glowColor = customColor || '#ffffff';
          c.shadowBlur = 20;
          c.shadowColor = glowColor;

          // Draw an elegant, ultra-cool cybernetic HUD glass panel / frame
          const bannerW = radius * 1.5;
          const bannerH = radius * 0.45;
          
          // Glass background panel with subtle glow
          c.fillStyle = 'rgba(255, 255, 255, 0.05)';
          c.strokeStyle = glowColor;
          c.lineWidth = 2;
          c.beginPath();
          // Backward compatible rounded rect
          const bannerX = -bannerW / 2;
          const bannerY = -bannerH / 2;
          const bannerWidth = bannerW;
          const bannerHeight = bannerH;
          const bannerRadius = 12;
          c.moveTo(bannerX + bannerRadius, bannerY);
          c.lineTo(bannerX + bannerWidth - bannerRadius, bannerY);
          c.arcTo(bannerX + bannerWidth, bannerY, bannerX + bannerWidth, bannerY + bannerHeight, bannerRadius);
          c.arcTo(bannerX + bannerWidth, bannerY + bannerHeight, bannerX, bannerY + bannerHeight, bannerRadius);
          c.arcTo(bannerX, bannerY + bannerHeight, bannerX, bannerY, bannerRadius);
          c.arcTo(bannerX, bannerY, bannerX + bannerWidth, bannerY, bannerRadius);
          c.closePath();
          c.fill();
          c.stroke();
          
          // Tech bracket accents [ ]
          c.strokeStyle = '#fff';
          c.lineWidth = 2.5;
          // Left bracket
          c.beginPath();
          c.moveTo(bannerX + 20, bannerY - 5);
          c.lineTo(bannerX - 5, bannerY - 5);
          c.lineTo(bannerX - 5, bannerY + bannerHeight + 5);
          c.lineTo(bannerX + 20, bannerY + bannerHeight + 5);
          c.stroke();
          
          // Right bracket
          c.beginPath();
          c.moveTo(bannerX + bannerWidth - 20, bannerY - 5);
          c.lineTo(bannerX + bannerWidth + 5, bannerY - 5);
          c.lineTo(bannerX + bannerWidth + 5, bannerY + bannerHeight + 5);
          c.lineTo(bannerX + bannerWidth - 20, bannerY + bannerHeight + 5);
          c.stroke();
          
          // Tech crosshairs / indicator dots
          c.fillStyle = '#fff';
          c.beginPath();
          c.arc(bannerX - 15, 0, 3, 0, Math.PI * 2);
          c.arc(bannerX + bannerWidth + 15, 0, 3, 0, Math.PI * 2);
          c.fill();
          
          // Dynamic text size scaling to keep everything within the banner boundaries
          c.textBaseline = 'middle';
          c.textAlign = 'center';
          let fontSize = radius * 0.16;
          c.font = `900 ${fontSize}px sans-serif`;
          
          const maxTextW = bannerW - 30;
          let measuredW = c.measureText(textToDraw).width;
          if (measuredW > maxTextW) {
             fontSize = fontSize * (maxTextW / measuredW);
             c.font = `900 ${fontSize}px sans-serif`;
          }
          
          c.save();
          if (povTextAnimation === 'fade') {
             // Dynamic smooth alpha fade in/out
             c.globalAlpha = 0.45 + 0.55 * Math.abs(Math.sin(t * 0.0035));
          } else if (povTextAnimation === 'slide') {
             // Elegant back-and-forth slide animation
             const slideX = Math.sin(t * 0.002) * 15;
             c.translate(slideX, 0);
          } else if (povTextAnimation === 'pulse') {
             // Pumping scale pulse
             const scalePulse = 0.9 + 0.16 * Math.abs(Math.sin(t * 0.003));
             c.scale(scalePulse, scalePulse);
          }

          // Outer text reflection/glow layer
          c.fillStyle = '#fff';
          c.shadowBlur = 25;
          c.shadowColor = glowColor;
          c.fillText(textToDraw, 0, 0);
          c.restore();
          
          c.restore();
          break;
        case 'logo':
          if (logoImgRef.current) {
            c.save();
            // Force source-over so the logo displays its true, vibrant colors or customized tint
            c.globalCompositeOperation = 'source-over';
            
            // Set high quality interpolation parameters to keep small images sharp and clear
            c.imageSmoothingEnabled = true;
            c.imageSmoothingQuality = 'high';

            // Rotate logo according to slider state
            if (logoRotation) {
              c.rotate(logoRotation * Math.PI / 180);
            }

            const img = logoImgRef.current;
            if (!img) {
              c.restore();
              break;
            }
            // Scale up the logo significantly as per "יותר גדול הלוגו"
            const imgSize = radius * 1.85; 
            const aspectRatio = img.width > 0 && img.height > 0 ? img.width / img.height : 1;
            let drawW = imgSize;
            let drawH = imgSize / aspectRatio;
            if (drawH > imgSize) {
              drawH = imgSize;
              drawW = imgSize * aspectRatio;
            }
            if (isNaN(drawW) || isNaN(drawH)) {
              drawW = imgSize;
              drawH = imgSize;
            }
            c.shadowBlur = 30;
            c.shadowColor = logoTintColor || 'rgba(255, 255, 255, 0.5)'; // Neutral white aura by default

            if (logoTintColor && tintedCanvasRef.current) {
              try {
                c.drawImage(tintedCanvasRef.current, -drawW / 2, -drawH / 2, drawW, drawH);
              } catch (e) {
                // Fallback to original image if tinted canvas is tainted
                try {
                  c.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
                } catch (err) {
                  // If fallback also fails (e.g. CORS), we must not throw
                }
              }
            } else {
              try {
                c.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
              } catch (e) {
                console.error("Failed to draw image (likely CORS issue):", e);
              }
            }
            c.restore();
          } else {
            c.save();
            if (logoRotation) {
              c.rotate(logoRotation * Math.PI / 180);
            }
            c.rotate(-t * 0.001);
            c.strokeStyle = logoTintColor || '#ffffff';
            c.lineWidth = 10;
            c.shadowBlur = 25;
            c.shadowColor = logoTintColor || '#ffffff';
            
            c.beginPath();
            c.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
            c.stroke();
            
            for (let i = 0; i < 6; i++) {
              c.save();
              c.rotate(i * Math.PI / 3 + t * 0.002);
              c.beginPath();
              c.moveTo(radius * 0.5, 0);
              c.quadraticCurveTo(radius * 0.8, -radius * 0.2, radius * 0.85, 0);
              c.stroke();
              
              c.fillStyle = '#fff';
              c.beginPath(); c.arc(radius * 0.9, 0, 6, 0, Math.PI*2); c.fill();
              c.restore();
            }
            
            c.fillStyle = '#facc15';
            c.shadowColor = '#facc15';
            c.beginPath(); c.arc(0, 0, radius * 0.15 + Math.sin(t*0.005)*5, 0, Math.PI*2); c.fill();
            
            c.restore();
          }
          break;
        case 'kaleidoscope':
          c.save();
          {
            const segments = Math.max(4, Math.round(effectComplexity * 1.5)); // Dynamic symmetry segmented facets
            const sliceAngle = (Math.PI * 2) / segments;
            c.strokeStyle = customColor || '#fb7185';
            c.shadowBlur = 15;
            c.shadowColor = customColor || '#fb7185';
            
            for (let i = 0; i < segments; i++) {
              c.save();
              c.rotate(i * sliceAngle + t * 0.0008);
              
              // Draw nested geometric crystal structure within the slice
              c.lineWidth = 3 * effectScale;
              c.beginPath();
              c.moveTo(0, 0);
              
              const r1 = (radius * 0.5 + Math.sin(t * 0.003) * 20) * effectScale;
              const r2 = (radius * 0.95 + Math.cos(t * 0.002) * 10) * effectScale;
              
              c.lineTo(Math.cos(sliceAngle / 2) * r1, Math.sin(sliceAngle / 2) * r1);
              c.lineTo(0, r2);
              c.lineTo(Math.cos(-sliceAngle / 2) * r1, Math.sin(-sliceAngle / 2) * r1);
              c.closePath();
              c.stroke();
              
              // Inner concentric decorative arcs
              c.lineWidth = 1.5 * effectScale;
              c.beginPath();
              c.arc(0, 0, radius * 0.3 * effectScale, -sliceAngle/2, sliceAngle/2);
              c.stroke();
              
              c.beginPath();
              c.arc(0, 0, radius * 0.6 * effectScale, -sliceAngle/2, sliceAngle/2);
              c.stroke();
              
              // Floating particle dots inside
              c.fillStyle = '#fff';
              c.beginPath();
              c.arc(0, (radius * 0.45 + Math.sin(t * 0.004) * 15) * effectScale, 3 * effectScale, 0, Math.PI * 2);
              c.fill();
              
              c.restore();
            }
          }
          c.shadowBlur = 0;
          c.restore();
          break;
        case 'video_synth':
          c.save();
          {
            const syncColor = customColor || '#ffffff';
            
            // Draw uploaded video frames first if available!
            const video = videoRef.current;
            const hasVideo = !!(video && !video.paused && !video.ended && video.videoWidth > 0);
            if (hasVideo) {
              c.save();
              c.beginPath();
              c.arc(0, 0, (radius - 12) * effectScale, 0, Math.PI * 2);
              c.clip();
              
              // Draw centered video preserving aspect ratio
              const vW = video.videoWidth;
              const vH = video.videoHeight;
              const minDim = Math.min(vW, vH);
              const size = (radius - 12) * 2 * effectScale;
              
              try {
                c.drawImage(
                  video,
                  (vW - minDim) / 2,
                  (vH - minDim) / 2,
                  minDim,
                  minDim,
                  -size / 2,
                  -size / 2,
                  size,
                  size
                );
              } catch (e) {
                console.error("Video draw failed:", e);
              }
              c.restore();
            } else {
              // Only draw animated CRT grids, scanlines and oscilloscope green wave if NO active video is playing
              c.strokeStyle = syncColor;
              c.shadowBlur = 20;
              c.shadowColor = syncColor;
              
              // Draw circular CRT vector screen outline
              c.lineWidth = 4;
              c.beginPath();
              c.arc(0, 0, radius - 10, 0, Math.PI * 2);
              c.stroke();
              
              // Draw neon waveform grid patterns
              c.lineWidth = 1;
              c.strokeStyle = 'rgba(56, 189, 248, 0.15)';
              c.beginPath();
              for (let x = -radius; x <= radius; x += 20) {
                c.moveTo(x, -radius);
                c.lineTo(x, radius);
              }
              for (let y = -radius; y <= radius; y += 20) {
                c.moveTo(-radius, y);
                c.lineTo(radius, y);
              }
              c.stroke();
              
              // Animated horizontal feedback scanlines
              c.strokeStyle = syncColor;
              c.lineWidth = 2.5;
              c.beginPath();
              for (let i = 0; i < 4; i++) {
                const yLine = -radius + ((t * 0.12 + i * (radius / 2)) % (radius * 2));
                if (Math.abs(yLine) < radius - 10) {
                  const xBounds = Math.sqrt(radius * radius - yLine * yLine) - 15;
                  c.moveTo(-xBounds, yLine);
                  c.lineTo(xBounds, yLine);
                }
              }
              c.stroke();
              
              // Oscilloscope wavy audio feedback lines (sin/cos synth combination)
              c.lineWidth = 3;
              c.strokeStyle = '#22c55e'; // pure neon vector green
              c.beginPath();
              for (let x = -radius + 20; x <= radius - 20; x += 4) {
                const angleVal = (x * 0.035) + (t * 0.008);
                const amplitude = 25 * Math.sin(t * 0.001) + 15;
                const yWave = Math.sin(angleVal) * amplitude + Math.cos(x * 0.01 - t * 0.004) * 10;
                // Bound inside screen
                if (x * x + yWave * yWave < (radius - 20) * (radius - 20)) {
                  if (x === -radius + 20) c.moveTo(x, yWave);
                  else c.lineTo(x, yWave);
                }
              }
              c.stroke();
  
              // Core vector radar sweeper
              c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
              c.lineWidth = 2;
              const sweepAngle = (t * 0.002) % (Math.PI * 2);
              c.beginPath();
              c.moveTo(0,0);
              c.lineTo(Math.cos(sweepAngle) * (radius - 10), Math.sin(sweepAngle) * (radius - 10));
              c.stroke();
            }
          }
          c.shadowBlur = 0;
          c.restore();
          break;
        case 'animation_flow':
          c.save();
          {
            const flowColor = customColor || '#a855f7';
            c.strokeStyle = flowColor;
            c.shadowBlur = 15;
            c.shadowColor = flowColor;
            
            // Multiple concentric expanding tech circles with high-speed dashes
            for (let k = 1; k <= 3; k++) {
              c.lineWidth = 1.5 * k;
              c.setLineDash([30 * k, 40]);
              c.lineDashOffset = -t * 0.3 * k;
              c.beginPath();
              c.arc(0, 0, radius * 0.3 * k, 0, Math.PI * 2);
              c.stroke();
            }
            c.setLineDash([]); // Reset
            
            // Flow streams of high-velocity neon arrows/nodes emitting from center to outside
            const streamCount = 14;
            for (let i = 0; i < streamCount; i++) {
              const angle = (i * Math.PI * 2) / streamCount + t * 0.0005;
              const progress = ((t * 0.15 + i * (radius / streamCount)) % radius);
              const px = Math.cos(angle) * progress;
              const py = Math.sin(angle) * progress;
              const sizeMult = 2 + (progress / radius) * 4;
              
              c.fillStyle = `rgba(255, 255, 255, ${1 - progress / radius})`;
              c.beginPath();
              c.arc(px, py, sizeMult, 0, Math.PI * 2);
              c.fill();
              
              // Trail laser vector tail
              c.strokeStyle = flowColor;
              c.lineWidth = 1.5;
              c.beginPath();
              c.moveTo(px, py);
              c.lineTo(Math.cos(angle) * (progress - 20), Math.sin(angle) * (progress - 20));
              c.stroke();
            }
          }
          c.shadowBlur = 0;
          c.restore();
          break;
      }
      c.restore();
    };

    const animate = () => {
      time += 16 * effectSpeedRate; // Dynamic internal logic simulation speed rate

      const speedNormalized = speed / 255;
      const bladeSpeed = speedNormalized * 1.5; // Radians per frame
      rotation += bladeSpeed;

      // Persistence of vision blur
      const fadeAlpha = speed === 0 ? 1 : Math.max(0.012, 0.12 - speedNormalized * 0.1);
      
      // Clear with absolute scale-free transform to guarantee 100% pixel coverage on High-DPI/Retina screens
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Simulated brightness
      ctx.globalAlpha = speed > 5 ? 0.4 + (brightness / 255) * 0.6 : 0.05;

      // Define the clipping path for blades
      ctx.save();
      ctx.beginPath();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      const bladeWidth = speedNormalized > 0.85 ? radius * 2.5 : 8 + (speedNormalized * 40);
      ctx.rect(-radius, -bladeWidth/2, radius * 2, bladeWidth);
      ctx.rect(-bladeWidth/2, -radius, bladeWidth, radius * 2);
      ctx.restore();
      ctx.clip(); // Apply the clip globally relative to the main stable coordinate system

      // Draw the effect with "lighter" blending for LED realism
      ctx.globalCompositeOperation = 'lighter';
      drawEffect(ctx, time, rotation);
      ctx.globalCompositeOperation = 'source-over';
      
      ctx.restore();

      // Holographic fan LED concentric gaps
      if (speed > 10) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.4 + speedNormalized * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let r = 28; r < radius; r += 4) {
          ctx.moveTo(cx + r, cy);
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
      }
      
      // Draw the central motor hub with metallic finish
      ctx.globalAlpha = 1;

      // Outer bezel of the hub
      const hubGrad = ctx.createLinearGradient(cx - 25, cy - 25, cx + 25, cy + 25);
      hubGrad.addColorStop(0, '#333');
      hubGrad.addColorStop(0.5, '#111');
      hubGrad.addColorStop(1, '#222');
      
      ctx.fillStyle = hubGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.fill();
      
      // Center dark cap
      ctx.fillStyle = '#0a0a0c';
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner screw
      const screwGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8);
      screwGrad.addColorStop(0, '#555');
      screwGrad.addColorStop(1, '#000');
      ctx.fillStyle = screwGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();

      // Rotation blur layer
      if (speedNormalized > 0.5) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.02 * speedNormalized})`;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [effect, speed, brightness, customColor, povText, logoUrl, logoRotation, logoTintColor, povTextAnimation, effectSpeedRate, effectScale, effectComplexity, ledCount]);

  return (
    <div className="w-full h-full relative p-2">
       {/* Dark backdrop ring for the device */}
       <div className="absolute inset-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.9)] bg-black/40 border border-white/5"></div>
       <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full rounded-full"
          style={{ mixBlendMode: 'screen' }}
       />
    </div>
  );
};
