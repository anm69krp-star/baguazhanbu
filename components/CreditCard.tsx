import React, { useCallback, useRef, useState } from 'react';

interface CSSVariables extends React.CSSProperties {
  '--rx'?: string;
  '--ry'?: string;
  '--mx'?: string;
  '--my'?: string;
  '--hyp'?: string;
  '--opacity'?: string;
}

export interface HexagramData {
  symbol: string; // The unicode char (e.g., ䷀)
  name: string;   // e.g., 乾
  pinyin: string; // e.g., Qián
  nature: string; // e.g., 天 (Upper/Lower trigrams usually, or nature association)
  desc: string;   // Short description (Classical)
  modern: string; // Modern vernacular interpretation
  luck: string;   // Fortune level (e.g., 上上, 中平)
}

interface CreditCardProps {
  data: HexagramData;
  index?: number;
  isRevealed?: boolean; // If true, card is in "result" mode (larger, centered)
}

export const CreditCard: React.FC<CreditCardProps> = ({ data, index = 0, isRevealed = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState<CSSVariables>({
    '--rx': '0deg',
    '--ry': '0deg',
    '--mx': '50%',
    '--my': '50%',
    '--hyp': '0',
    '--opacity': '0',
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    
    const px = (2 * x / w) - 1; 
    const py = (2 * y / h) - 1; 

    const rX = py * -15; 
    const rY = px * 10;
    
    const hyp = Math.sqrt(px*px + py*py);

    setStyles({
      '--rx': `${rX.toFixed(2)}deg`,
      '--ry': `${rY.toFixed(2)}deg`,
      '--mx': `${((x / w) * 100).toFixed(2)}%`,
      '--my': `${((y / h) * 100).toFixed(2)}%`,
      '--hyp': hyp.toFixed(2),
      '--opacity': '1',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyles({
      '--rx': '0deg',
      '--ry': '0deg',
      '--mx': '50%',
      '--my': '50%',
      '--hyp': '0',
      '--opacity': '0',
    });
  }, []);

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card relative rounded-sm cursor-pointer touch-none preserve-3d 
        ${isRevealed ? 'w-[280px] h-[520px] sm:w-[320px] sm:h-[600px]' : 'w-[160px] h-[440px]'}
      `}
      style={styles}
    >
      {/* Deep Shadow */}
      <div className="absolute inset-0 rounded-sm bg-stone-900/60 blur-xl translate-z-[-30px] transition-all duration-300 ease-out scale-90 opacity-60" />

      {/* --- Card Face --- */}
      <div className="absolute inset-0 rounded-sm bg-[#1a1a1a] overflow-hidden backface-hidden shadow-2xl border border-stone-700/30">
        
        {/* Base Material */}
        <div className="absolute inset-0 z-0 bg-[#121212]" />
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        
        {/* Traditional "Wu Wen" Frame */}
        <div className="absolute inset-2 border border-stone-600/30 rounded-sm z-0 pointer-events-none"></div>
        <div className="absolute inset-3 border border-stone-600/20 rounded-sm z-0 pointer-events-none"></div>

        {/* Visual: Mist/Mountain */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000] via-[#1c1c1c] to-transparent opacity-90 z-0" 
          style={{ height: '40%' }}
        />

        {/* 1. Dynamic "Gold Dust" Light */}
        <div 
          className="absolute inset-0 z-10 mix-blend-color-dodge transition-opacity duration-200"
          style={{ 
            background: `radial-gradient(circle at var(--mx) var(--my), rgba(212, 175, 55, 0.5) 0%, rgba(0,0,0,0) 60%)`,
            opacity: 'var(--opacity)'
          }}
        />
        
        {/* 2. "Flowing Gold" Sheen */}
        <div 
            className="absolute inset-0 z-10 mix-blend-overlay opacity-50 transition-opacity duration-200"
            style={{
              background: `linear-gradient(160deg, transparent 20%, rgba(255, 215, 0, 0.2) 45%, rgba(255, 250, 220, 0.1) 55%, transparent 80%)`,
              transform: 'translateY(calc((var(--my) - 50%) * -1.5))', 
              opacity: 'calc(var(--hyp) * 0.7)'
            }}
        />

        {/* 3. Red Seal */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-90 transform-style-3d translate-z-10">
          <div className="w-10 h-10 border-[1px] border-red-800/60 bg-red-900/10 backdrop-blur-sm flex items-center justify-center shadow-inner rounded-sm">
              <div className="w-8 h-8 bg-red-800/90 mask-seal flex items-center justify-center rounded-[1px]">
                <span className="font-['Ma_Shan_Zheng'] text-[#f0f0e8] text-[16px] leading-none mt-[2px] ml-[1px]">
                  {isRevealed ? '解' : '卦'}
                </span>
              </div>
          </div>
        </div>
        
        {/* CENTER CONTENT: HEXAGRAM */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none gap-6 translate-z-10">
            {/* The Hexagram Symbol */}
            <div className={`font-serif text-amber-100/90 leading-none drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]
              ${isRevealed ? 'text-9xl' : 'text-8xl'}
            `}>
              {data.symbol}
            </div>

            {/* Vertical Text Name */}
            <div className="writing-vertical flex gap-4 opacity-80 mix-blend-screen items-center">
              <span className="font-['Ma_Shan_Zheng'] text-4xl tracking-[0.2em] text-amber-100 shadow-black drop-shadow-lg">
                  {data.name}
              </span>
              {/* Subtle Pinyin/Nature next to it */}
              <span className="font-serif text-[10px] tracking-[0.3em] text-stone-500 uppercase">
                 {data.nature} · {data.pinyin}
              </span>
            </div>
        </div>
        
        {/* Top minimal accent */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-stone-700 to-transparent opacity-50"></div>
      </div>

      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
        .card {
          /* Local tilt transform */
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          transition: width 0.5s ease, height 0.5s ease, transform 0.1s ease-out;
        }
        
        .card:not(:hover) {
          transition: width 0.5s ease, height 0.5s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .translate-z-[-30px] {
           transform: translateZ(-30px);
        }
        .translate-z-10 {
           transform: translateZ(10px);
        }
      `}</style>
    </div>
  );
};