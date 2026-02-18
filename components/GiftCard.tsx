
import React, { useState } from 'react';

interface GiftCardProps {
  image: string;
  label: string;
  delay: number;
}

export const GiftCard: React.FC<GiftCardProps> = ({ image, label, delay }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="flex flex-col items-center w-full max-w-[400px] perspective-1000 transform-gpu opacity-0 animate-unbox"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
    >
      <div className="relative group w-full transition-all duration-500 hover:scale-[1.05]">
        {/* Card Frame */}
        <div className="relative aspect-square md:aspect-[1/1] overflow-hidden rounded-[32px] border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white transition-all duration-500 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.3)] flex items-center justify-center">
          
          {/* Loading Placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 animate-pulse">
              <span className="text-6xl">🎁</span>
            </div>
          )}

          {/* The Actual Image */}
          <img 
            src={image} 
            alt={label} 
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-sm'}`}
          />
          
          {/* Shine Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Label Tag */}
        <div className="mt-8 relative text-center">
          <div className="inline-block text-xl md:text-2xl bg-white px-10 py-4 rounded-full border-[4px] border-black font-bold shadow-[6px_6px_0px_#000] transform -rotate-1 group-hover:rotate-0 transition-all duration-300">
            {label}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes unbox {
          0% {
            transform: scale(0.6) translateY(100px) rotateX(-30deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) translateY(-15px) rotateX(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }
        .animate-unbox {
          animation: unbox 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};
