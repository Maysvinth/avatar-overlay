import React, { useMemo } from 'react';
import { CharacterType } from '../types';

interface AvatarProps {
  type: CharacterType;
  volume: number; // 0.0 to 1.0
}

const Avatar: React.FC<AvatarProps> = ({ type, volume }) => {
  // Smooth the mouth movement slightly
  const mouthOpen = Math.min(50, volume * 80); 

  // Helper for anime eyes to reduce code duplication
  const AnimeEye = ({ x, y, color, sharp = false }: { x: number, y: number, color: string, sharp?: boolean }) => (
    <g transform={`translate(${x}, ${y})`}>
      {/* Sclera - sharp or round */}
      {sharp ? (
         <path d="M -9 -4 Q 0 -8 9 -4 C 9 -4 8 2 7 5 Q 0 8 -7 5 C -8 2 -9 -4 -9 -4" fill="white" stroke="#1f2937" strokeWidth="0.5" />
      ) : (
         <path d="M -8 -6 Q 0 -9 8 -6 C 8 -6 9 0 8 6 Q 0 9 -8 6 C -8 6 -9 0 -8 -6" fill="white" stroke="#1f2937" strokeWidth="0.5" />
      )}
      
      {/* Upper Lash */}
      <path d={sharp ? "M -10 -2 Q 0 -9 10 -2" : "M -9 -4 Q 0 -11 9 -4"} fill="none" stroke="#1f2937" strokeWidth={sharp ? 2 : 1.5} strokeLinecap="round" />
      
      {/* Iris */}
      <ellipse cx="0" cy="1" rx={3.5} ry={4.5} fill={color} />
      
      {/* Pupil */}
      <circle cx="0" cy="1" r="1.5" fill="#0f172a" />
      
      {/* Highlight */}
      <circle cx="-2" cy="-2" r={1.5} fill="white" opacity="0.9" />
    </g>
  );

  const renderCharacter = () => {
    switch (type) {
      /* --- MIWA MIKADONO (Middle Sister) --- */
      case CharacterType.MIWA:
        return (
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            {/* --- BACK HAIR (Long Straight Black) --- */}
            <path d="M 60 50 L 55 220 L 145 220 L 140 50" fill="#1f2937" /> 
            <path d="M 55 220 Q 100 230 145 220" fill="#1f2937" />

            {/* --- LEGS & SOCKS --- */}
            <path d="M 90 200 L 90 280" stroke="#fff1e6" strokeWidth="11" strokeLinecap="round" />
            <path d="M 110 200 L 110 280" stroke="#fff1e6" strokeWidth="11" strokeLinecap="round" />
            
            {/* Black Knee Highs */}
            <path d="M 90 220 L 90 280" stroke="#111827" strokeWidth="11.5" strokeLinecap="round" />
            <path d="M 110 220 L 110 280" stroke="#111827" strokeWidth="11.5" strokeLinecap="round" />

            {/* Shoes (Loafers) */}
            <path d="M 82 280 L 94 280 L 94 285 L 82 285 Z" fill="#374151" />
            <path d="M 106 280 L 118 280 L 118 285 L 106 285 Z" fill="#374151" />

            {/* --- SKIRT (Dark Grey Pleated) --- */}
            <path d="M 75 160 L 125 160 L 135 200 Q 100 210 65 200 Z" fill="#374151" />
            {/* Pleats */}
            <path d="M 85 160 L 82 203" stroke="#1f2937" strokeWidth="0.5" />
            <path d="M 95 160 L 95 205" stroke="#1f2937" strokeWidth="0.5" />
            <path d="M 105 160 L 105 205" stroke="#1f2937" strokeWidth="0.5" />
            <path d="M 115 160 L 118 203" stroke="#1f2937" strokeWidth="0.5" />

            {/* --- TORSO (Uniform) --- */}
            <path d="M 75 160 L 75 100 L 125 100 L 125 160 Z" fill="#fff" /> {/* White Shirt Base */}
            
            {/* Cream Sweater Vest */}
            <path d="M 76 160 L 74 115 L 100 135 L 126 115 L 124 160 Z" fill="#fde68a" /> 
            <path d="M 74 115 L 100 135 L 126 115" stroke="#d4d4d8" strokeWidth="0.5" fill="none" /> {/* V-Neck line */}

            {/* --- ARMS --- */}
            <path d="M 75 105 Q 65 140 70 170" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
            <path d="M 125 105 Q 135 140 130 170" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
            {/* Hands */}
            <circle cx="70" cy="175" r="4" fill="#fff1e6" />
            <circle cx="130" cy="175" r="4" fill="#fff1e6" />

            {/* --- NECK & ACCESSORIES --- */}
            <rect x="92" y="95" width="16" height="10" fill="#fff1e6" />
            <path d="M 90 100 L 100 110 L 110 100" fill="white" /> {/* Collar */}
            
            {/* Red Ribbon */}
            <path d="M 95 110 L 92 125 L 100 118 L 108 125 L 105 110 Z" fill="#ef4444" /> 
            <circle cx="100" cy="112" r="2.5" fill="#b91c1c" />

            {/* --- HEAD --- */}
            <path d="M 72 80 Q 72 110 100 110 Q 128 110 128 80 Q 128 45 100 45 Q 72 45 72 80" fill="#fff1e6" />

            {/* --- FACE --- */}
            {/* Sharp "Cool Beauty" Eyes (Indigo/Violet) */}
            <AnimeEye x={86} y={82} color="#4f46e5" sharp={true} />
            <AnimeEye x={114} y={82} color="#4f46e5" sharp={true} />
            
            {/* Nose */}
            <path d="M 100 88 L 99 90" stroke="#d1d5db" strokeWidth="1" />

            {/* Mouth */}
            <path 
              d={`M 97 100 Q 100 ${100 + mouthOpen/4} 103 100`} 
              fill={mouthOpen > 5 ? "#be123c" : "transparent"} 
              stroke="#be123c" 
              strokeWidth="1" 
            />

            {/* --- FRONT HAIR (Hime Cut + Headband) --- */}
            
            {/* White Headband (Alice Band) */}
            <path d="M 68 65 Q 100 45 132 65" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Bangs (Straight Cut) */}
            <path d="M 72 60 L 72 75 L 128 75 L 128 60" fill="#1f2937" />
            {/* Bangs Detail lines */}
            <path d="M 85 60 L 85 75" stroke="#1f2937" strokeWidth="0.5" />
            <path d="M 100 60 L 100 75" stroke="#1f2937" strokeWidth="0.5" />
            <path d="M 115 60 L 115 75" stroke="#1f2937" strokeWidth="0.5" />
            
            {/* Hime Sidelocks (Straight, chin length) */}
            <path d="M 68 60 L 68 105 L 75 105 L 75 60" fill="#1f2937" />
            <path d="M 132 60 L 132 105 L 125 105 L 125 60" fill="#1f2937" />

            {/* Top Head Curve */}
            <path d="M 68 65 Q 100 55 132 65" fill="none" stroke="#1f2937" strokeWidth="1" />

            {/* --- BLUSH --- */}
            <ellipse cx="80" cy="92" rx="3" ry="2" fill="#fca5a5" opacity="0.3" />
            <ellipse cx="120" cy="92" rx="3" ry="2" fill="#fca5a5" opacity="0.3" />
          </svg>
        );

      /* --- PREVIOUS STANDARD CHARACTERS --- */
      case CharacterType.RANMA:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
             {/* Pigtail (Back) */}
             <path d="M 140 80 Q 180 90 160 140" stroke="#ef4444" strokeWidth="12" fill="none" />
             <circle cx="140" cy="80" r="8" fill="#facc15" /> {/* Hair tie */}

             {/* Shirt Body */}
             <path d="M 60 150 C 60 150, 65 210, 100 210 C 135 210, 140 150, 140 150" fill="#b91c1c" />
             {/* Shirt Collar */}
             <path d="M 85 150 L 85 160 L 115 160 L 115 150" fill="#b91c1c" stroke="#fca5a5" strokeWidth="1" />
             {/* Shirt Frogs (Buttons) */}
             <line x1="100" y1="160" x2="100" y2="210" stroke="#7f1d1d" strokeWidth="1" />
             <circle cx="100" cy="170" r="3" fill="#facc15" />
             <circle cx="100" cy="185" r="3" fill="#facc15" />
             <circle cx="100" cy="200" r="3" fill="#facc15" />

             {/* Face */}
             <path d="M 65 100 C 65 100, 65 150, 100 150 C 135 150, 135 100, 135 100" fill="#ffe4d6" />
             <rect x="65" y="80" width="70" height="40" fill="#ffe4d6" />

             {/* Ears */}
             <circle cx="65" cy="115" r="8" fill="#ffe4d6" />
             <circle cx="135" cy="115" r="8" fill="#ffe4d6" />

             {/* Bangs / Hair Front */}
             <path d="M 55 90 Q 65 60 100 50 Q 135 60 145 90 L 145 70 Q 100 20 55 70 Z" fill="#ef4444" />
             <path d="M 60 80 Q 70 120 80 90" fill="#ef4444" />
             <path d="M 120 90 Q 130 120 140 80" fill="#ef4444" />
             <path d="M 90 55 L 95 85 L 100 55 L 105 85 L 110 55" fill="#ef4444" />

             {/* Eyes */}
             <g transform="translate(0, 5)">
               <ellipse cx="82" cy="110" rx="8" ry="10" fill="white" stroke="#1f2937" strokeWidth="0.5" />
               <ellipse cx="118" cy="110" rx="8" ry="10" fill="white" stroke="#1f2937" strokeWidth="0.5" />
               <ellipse cx="82" cy="110" rx="4" ry="6" fill="#3b82f6" />
               <ellipse cx="118" cy="110" rx="4" ry="6" fill="#3b82f6" />
               {/* Shine */}
               <circle cx="84" cy="107" r="2" fill="white" />
               <circle cx="120" cy="107" r="2" fill="white" />
             </g>

             {/* Blush */}
             <ellipse cx="70" cy="130" rx="5" ry="3" fill="#fca5a5" opacity="0.6" />
             <ellipse cx="130" cy="130" rx="5" ry="3" fill="#fca5a5" opacity="0.6" />

             {/* Mouth */}
             <path 
               d={`M 90 138 Q 100 ${138 + mouthOpen} 110 138`} 
               fill={mouthOpen > 5 ? "#9f1239" : "transparent"}
               stroke="#1f2937"
               strokeWidth="1.5"
             />
          </svg>
        );

      case CharacterType.STEVEN:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
            {/* Hair Group (Afro shape) */}
            <g fill="#1f2937">
              <circle cx="100" cy="90" r="70" />
              <circle cx="50" cy="80" r="30" />
              <circle cx="150" cy="80" r="30" />
              <circle cx="40" cy="120" r="25" />
              <circle cx="160" cy="120" r="25" />
              <circle cx="100" cy="40" r="35" />
            </g>

            {/* Shirt Body */}
            <path d="M 55 160 C 55 160, 60 210, 100 210 C 140 210, 145 160, 145 160 Z" fill="#ef4444" />
            
            {/* Star on Shirt */}
            <polygon points="100,165 106,180 122,180 110,190 114,205 100,196 86,205 90,190 78,180 94,180" fill="#facc15" />

            {/* Face */}
            <ellipse cx="100" cy="115" rx="48" ry="45" fill="#ffe4d6" />

            {/* Sideburns/Hair framing face */}
            <path d="M 55 100 Q 60 120 70 110" fill="none" stroke="#1f2937" strokeWidth="0" /> 
            
            {/* Eyes */}
            <ellipse cx="85" cy="105" rx="6" ry="8" fill="black" />
            <ellipse cx="115" cy="105" rx="6" ry="8" fill="black" />
            {/* Eye Shine */}
            <circle cx="87" cy="103" r="2" fill="white" />
            <circle cx="117" cy="103" r="2" fill="white" />

            {/* Eyebrows */}
            <path d="M 80 95 Q 85 92 90 95" stroke="black" strokeWidth="2" fill="none" />
            <path d="M 110 95 Q 115 92 120 95" stroke="black" strokeWidth="2" fill="none" />

            {/* Nose */}
            <path d="M 100 115 Q 104 118 100 122" stroke="#e0b19e" strokeWidth="2" fill="none" />

            {/* Mouth */}
            <path 
              d={`M 85 135 Q 100 ${135 + mouthOpen} 115 135`} 
              fill={mouthOpen > 5 ? "#be123c" : "white"}
              stroke="black"
              strokeWidth="1.5"
            />
             {/* Tongue/Teeth detail if mouth is wide open */}
            {mouthOpen > 15 && (
                <path 
                  d={`M 90 ${135 + mouthOpen - 5} Q 100 ${135 + mouthOpen} 110 ${135 + mouthOpen - 5}`} 
                  stroke="none" 
                  fill="#f43f5e" 
                />
            )}
          </svg>
        );

      case CharacterType.ROBOT:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
            {/* Head */}
            <rect x="40" y="40" width="120" height="120" rx="10" fill="#4b5563" stroke="#9ca3af" strokeWidth="4" />
            {/* Eyes */}
            <rect x="60" y="70" width="30" height="20" fill="#60a5fa" className="animate-pulse" />
            <rect x="110" y="70" width="30" height="20" fill="#60a5fa" className="animate-pulse" />
            {/* Antenna */}
            <line x1="100" y1="40" x2="100" y2="10" stroke="#9ca3af" strokeWidth="4" />
            <circle cx="100" cy="10" r="5" fill="#ef4444" />
            {/* Mouth */}
            <rect 
              x="70" 
              y={120 - mouthOpen / 2} 
              width="60" 
              height={5 + mouthOpen} 
              fill="#1f2937" 
              rx="2"
            />
            {/* Bars inside mouth (speaker grill) */}
            {mouthOpen > 10 && (
                <g stroke="#374151" strokeWidth="2">
                   <line x1="80" y1={120 - mouthOpen / 2} x2="80" y2={120 + mouthOpen / 2} />
                   <line x1="90" y1={120 - mouthOpen / 2} x2="90" y2={120 + mouthOpen / 2} />
                   <line x1="100" y1={120 - mouthOpen / 2} x2="100" y2={120 + mouthOpen / 2} />
                   <line x1="110" y1={120 - mouthOpen / 2} x2="110" y2={120 + mouthOpen / 2} />
                   <line x1="120" y1={120 - mouthOpen / 2} x2="120" y2={120 + mouthOpen / 2} />
                </g>
            )}
          </svg>
        );

      case CharacterType.ALIEN:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
            {/* Head */}
            <path d="M100 20 C 40 20, 20 80, 20 100 C 20 160, 70 190, 100 190 C 130 190, 180 160, 180 100 C 180 80, 160 20, 100 20 Z" fill="#10b981" />
            {/* Eyes */}
            <ellipse cx="65" cy="80" rx="20" ry="30" fill="black" transform="rotate(-15, 65, 80)" />
            <ellipse cx="135" cy="80" rx="20" ry="30" fill="black" transform="rotate(15, 135, 80)" />
            <circle cx="70" cy="70" r="5" fill="white" />
            <circle cx="130" cy="70" r="5" fill="white" />
            {/* Mouth */}
            <path 
              d={`M 80 150 Q 100 ${150 + mouthOpen} 120 150`} 
              stroke="black" 
              strokeWidth={3 + mouthOpen / 5}
              fill="black"
            />
          </svg>
        );

      case CharacterType.MINIMAL:
        return (
           <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
             <circle cx="100" cy="100" r={50 + volume * 20} fill="white" opacity="0.1" />
             <circle cx="100" cy="100" r={40 + volume * 30} fill="white" opacity="0.3" />
             <circle cx="100" cy="100" r={30 + volume * 40} fill="white" opacity="0.8" />
           </svg>
        );

      case CharacterType.HUMAN:
      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
            {/* Hair Back */}
            <circle cx="100" cy="90" r="65" fill="#3f2c22" />
            {/* Face */}
            <ellipse cx="100" cy="100" rx="50" ry="60" fill="#fca5a5" />
            {/* Hair Front */}
            <path d="M 50 80 Q 100 40 150 80 L 150 60 Q 100 10 50 60 Z" fill="#3f2c22" />
            {/* Eyes */}
            <circle cx="80" cy="90" r="5" fill="#1f2937" />
            <circle cx="120" cy="90" r="5" fill="#1f2937" />
            {/* Blush */}
            <ellipse cx="70" cy="110" rx="8" ry="4" fill="#f87171" opacity="0.5" />
            <ellipse cx="130" cy="110" rx="8" ry="4" fill="#f87171" opacity="0.5" />
            {/* Mouth */}
            <path 
              d={`M 85 130 Q 100 ${130 + mouthOpen} 115 130`} 
              fill={mouthOpen > 5 ? "#be123c" : "transparent"}
              stroke="#be123c"
              strokeWidth="3"
            />
          </svg>
        );
    }
  };

  return (
    <div className="w-48 h-48 md:w-64 md:h-64 transition-all duration-100 ease-out transform">
      {renderCharacter()}
    </div>
  );
};

export default Avatar;