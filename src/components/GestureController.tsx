import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

interface GestureControllerProps {
  active: boolean;
  sensitivity?: number; // 1-100
  neutralCenter?: { x: number; y: number };
  onVerticalSwipe: (delta: number) => void;
  onHorizontalSwipe: (delta: number) => void;
  onMove?: (x: number, y: number) => void;
  onGesture?: (gesture: string) => void;
  onHandDetected?: (isDetected: boolean, strength: number, position?: { x: number; y: number }) => void;
}

export const GestureController: React.FC<GestureControllerProps> = ({
  active,
  sensitivity = 20,
  neutralCenter = { x: 0.5, y: 0.5 },
  onVerticalSwipe,
  onHorizontalSwipe,
  onMove,
  onGesture,
  onHandDetected,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const [workerReady, setWorkerReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [currentGesture, setCurrentGesture] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastHandPos = useRef<{ x: number; y: number } | null>(null);
  const lastMovePos = useRef<{ x: number; y: number } | null>(null);
  const frameCounter = useRef(0);
  const isProcessing = useRef(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentGesture) {
      timeout = setTimeout(() => setCurrentGesture(null), 1000);
    }
    return () => clearTimeout(timeout);
  }, [currentGesture]);

  useEffect(() => {
    if (active && !workerRef.current) {
      const worker = new Worker(new URL('../workers/gestureWorker.ts', import.meta.url), { type: 'module' });
      
      worker.onmessage = (e) => {
        if (e.data.type === 'READY') {
          setWorkerReady(true);
        } else if (e.data.type === 'RESULTS') {
          isProcessing.current = false;
          handleResults(e.data.results);
        }
      };

      worker.postMessage({ type: 'INIT' });
      workerRef.current = worker;
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [active]);

  const handleResults = (results: any) => {
    const ctx = canvasRef.current?.getContext("2d", { alpha: true });
    if (!ctx || !canvasRef.current) return;
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    if (results.landmarks && results.landmarks.length > 0) {
      const hand = results.landmarks[0];
      const score = results.handedness && results.handedness[0] ? (results.handedness[0][0].score || 0.8) : 0.8;
      const pos = { x: hand[8].x, y: hand[8].y };
      
      if (onHandDetected) onHandDetected(true, score, pos);

      // Gesture Recognition
      const isFingerUp = (tipIdx: number, baseIdx: number) => hand[tipIdx].y < hand[baseIdx].y - 0.05;
      const indexUp = isFingerUp(8, 6);
      const middleUp = isFingerUp(12, 10);
      const ringUp = isFingerUp(16, 14);
      const pinkyUp = isFingerUp(20, 18);
      
      // Thumb detection is a bit different (x-axis distance)
      const thumbUp = Math.abs(hand[4].x - hand[2].x) > 0.05 && hand[4].y < hand[2].y;

      let detected = "None";
      if (indexUp && middleUp && !ringUp && !pinkyUp) {
        detected = "peace";
      } else if (indexUp && middleUp && ringUp && pinkyUp) {
        detected = "palm";
      } else if (!indexUp && !middleUp && !ringUp && !pinkyUp && !thumbUp) {
        detected = "fist";
      } else if (thumbUp && !indexUp && !middleUp && !ringUp && !pinkyUp) {
        detected = "thumbs_up";
      } else if (indexUp && !middleUp && !ringUp && !pinkyUp) {
        detected = "point_up";
      } else if (indexUp && pinkyUp && !middleUp && !ringUp) {
        detected = "rock_on";
      }

      if (detected !== "None" && onGesture) {
        onGesture(detected);
      }

      // Draw cursor
      const cx = (1 - pos.x) * canvasRef.current.width;
      const cy = pos.y * canvasRef.current.height;
      
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#00b4d8";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (onMove) {
        const moveThreshold = 0.005;
        if (!lastMovePos.current || 
            Math.abs(pos.x - lastMovePos.current.x) > moveThreshold || 
            Math.abs(pos.y - lastMovePos.current.y) > moveThreshold) {
          onMove(pos.x, pos.y);
          lastMovePos.current = pos;
        }
      }

      if (lastHandPos.current) {
        const dx = pos.x - lastHandPos.current.x;
        const dy = pos.y - lastHandPos.current.y;
        const threshold = Math.max(0.002, 0.4 / sensitivity);

        if (Math.abs(dy) > threshold && Math.abs(dy) > Math.abs(dx)) {
          onVerticalSwipe(-dy * 200); 
          setCurrentGesture(dy > 0 ? "DIMMING..." : "BRIGHTENING...");
        } else if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
          onHorizontalSwipe(dx * 200);
          setCurrentGesture(dx > 0 ? "SLOWER..." : "FASTER...");
        }
      }
      lastHandPos.current = pos;
    } else {
      if (onHandDetected) onHandDetected(false, 0);
      lastHandPos.current = null;
      lastMovePos.current = null;
    }
  };

  useEffect(() => {
    let localStream: MediaStream | null = null;
    let animationId: number | null = null;

    async function startCamera() {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: 320, 
                height: 240,
                facingMode: "user" 
            } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            animationId = requestAnimationFrame(predictLoop);
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
        setCameraError("Camera access denied or unavailable.");
      }
    }

    async function predictLoop() {
      if (videoRef.current && workerRef.current && workerReady && active) {
        frameCounter.current++;
        
        // Process every 3rd frame and only if worker is not busy
        if (frameCounter.current % 3 === 0 && !isProcessing.current && videoRef.current.videoWidth > 0) {
          try {
            isProcessing.current = true;
            const bitmap = await createImageBitmap(videoRef.current);
            workerRef.current.postMessage({ 
              type: 'PROCESS', 
              imageBitmap: bitmap, 
              timestamp: performance.now() 
            }, [bitmap]);
          } catch (err) {
            console.warn("Frame capture failed", err);
            isProcessing.current = false;
          }
        }
        animationId = requestAnimationFrame(predictLoop);
      } else if (active) {
        animationId = requestAnimationFrame(predictLoop);
      }
    }

    if (active) {
      startCamera();
    } 

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [active, workerReady, onVerticalSwipe, onHorizontalSwipe, onMove]);

  if (!active) return null;

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col gap-2 items-end">
      {cameraError && (
        <div className="bg-rose-500/90 text-white text-[8px] px-2 py-1 rounded-full animate-pulse uppercase tracking-widest font-black">
          {cameraError}
        </div>
      )}
      <div className="relative w-24 h-18 rounded-xl border-2 border-[#00b4d8] bg-black overflow-hidden shadow-2xl">
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover scale-x-[-1]" 
          muted 
          playsInline 
        />
        <canvas 
          ref={canvasRef}
          width={96}
          height={72}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        <div className="absolute top-1 left-1 px-1 bg-[#00b4d8]/80 text-[#0c0e15] text-[6px] font-black rounded uppercase">
          Gesture On
        </div>
        {lastHandPos.current && (
          <div className="absolute top-1 right-1 px-1 bg-emerald-500/80 text-[#0c0e15] text-[5px] font-black rounded uppercase animate-pulse">
            Interactive
          </div>
        )}
        {currentGesture && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
            <span className="text-[7px] font-black text-white bg-[#00b4d8]/90 px-1 rounded animate-pulse">
              {currentGesture}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
