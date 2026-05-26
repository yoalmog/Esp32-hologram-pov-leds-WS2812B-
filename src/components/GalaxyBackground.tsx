import React from "react";
import galaxy1 from "../assets/images/hd_vivid_galaxy_1779780978111.png";
import galaxy2 from "../assets/images/rainbow_galaxy_1779781352503.png";
import galaxy3 from "../assets/images/warm_galaxy_1779781369262.png";
import video1 from "../assets/12656_Big_Bang_1080.webm";
import video2 from "../assets/129936-745943770.mp4";

interface Props {
  bgImageId?: string;
}

export const GalaxyBackground: React.FC<Props> = ({ bgImageId = "galaxy1" }) => {
  const isVideo = bgImageId.startsWith("video");

  const getImgSrc = () => {
    if (bgImageId === "galaxy2") return galaxy2;
    if (bgImageId === "galaxy3") return galaxy3;
    return galaxy1;
  };

  const getVideoSrc = () => {
    if (bgImageId === "video1") return video1;
    if (bgImageId === "video2") return video2;
    return video1;
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020108] flex items-center justify-center">
      {isVideo ? (
        <video
          src={getVideoSrc()}
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-70 transition-opacity duration-1000"
        />
      ) : (
        <img
          src={getImgSrc()}
          alt="Galaxy Background"
          className="absolute w-full h-full object-cover opacity-70 transition-opacity duration-1000"
          referrerPolicy="no-referrer"
        />
      )}
      {/* Subtle pulsing glow in the center */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,transparent_50%)] transition-opacity duration-1000"
        style={{ animation: 'pulse 4s ease-in-out infinite' }}
      ></div>
      {/* Gradients to dim edges and blend into the dark UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/95"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_150%)] opacity-80"></div>
    </div>
  );
};
