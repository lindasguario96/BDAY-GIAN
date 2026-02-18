
import React, { useState, useEffect } from 'react';
import { GiftCard } from './components/GiftCard';
import { ConfettiEffect } from './components/ConfettiEffect';

const App: React.FC = () => {
  const [revealed, setRevealed] = useState({
    enjoy: false,
    play: false
  });
  const [allRevealed, setAllRevealed] = useState(false);

  useEffect(() => {
    if (revealed.enjoy && revealed.play) {
      const timer = setTimeout(() => {
        setAllRevealed(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [revealed]);

  const handleReveal = (type: 'enjoy' | 'play') => {
    setRevealed(prev => ({ ...prev, [type]: true }));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-12 px-4">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-70 transition-opacity duration-1000"
        style={{
          backgroundImage: `url('image_2f04c4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="fixed inset-0 z-[1] bg-white/30 backdrop-blur-[1px]" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-[#1a1a1a] mb-6 drop-shadow-sm animate-pulse">
            Happy Birthday Gian!
          </h1>
          <div className="text-xl md:text-3xl text-[#1a1a1a] font-medium h-20 flex items-center justify-center">
            {allRevealed ? (
              <div className="animate-bounce">
                <span className="inline-block transform scale-150 mr-2">🎁 </span>
                <span>Ecco i tuoi regalini! Speriamo che ti piacciano :) </span>
                <span className="inline-block transform scale-150 ml-2"> 🎁</span>
              </div>
            ) : (
              <p className="bg-white/40 px-6 py-2 rounded-2xl border-2 border-dashed border-black/10">
                Nell'attesa di averli tra le tue mani,<br className="hidden md:block" /> scarta virtualmente i tuoi regali:
              </p>
            )}
          </div>
        </header>

        {/* Action Buttons Section */}
        <div className={`flex gap-6 mb-16 flex-wrap justify-center transition-all duration-1000 ${allRevealed ? 'opacity-0 scale-90 pointer-events-none absolute -top-999' : 'opacity-100 scale-100'}`}>
          <button
            onClick={() => handleReveal('enjoy')}
            disabled={revealed.enjoy}
            className={`
              group relative px-10 py-5 text-2xl md:text-4xl border-[4px] border-black rounded-[60px] btn-shadow transition-all duration-300
              ${revealed.enjoy 
                ? 'bg-gray-200 opacity-20 cursor-not-allowed grayscale' 
                : 'bg-[#d1e3ff] hover:scale-110 active:scale-95 hover:rotate-2'}
            `}
          >
            let's enjoy
            {!revealed.enjoy && <span className="absolute -top-3 -right-3 text-2xl animate-bounce">🎶</span>}
          </button>
          <button
            onClick={() => handleReveal('play')}
            disabled={revealed.play}
            className={`
              group relative px-10 py-5 text-2xl md:text-4xl border-[4px] border-black rounded-[60px] btn-shadow transition-all duration-300
              ${revealed.play 
                ? 'bg-gray-200 opacity-20 cursor-not-allowed grayscale' 
                : 'bg-[#d4f4e2] hover:scale-110 active:scale-95 hover:-rotate-2'}
            `}
          >
            let's play
            {!revealed.play && <span className="absolute -top-3 -right-3 text-2xl animate-bounce delay-150">🎮</span>}
          </button>
        </div>

        {/* Gifts Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl px-4 items-start">
          <div className="flex justify-center h-full min-h-[400px]">
            {revealed.enjoy && (
              <GiftCard 
                image="https://cdn-p.smehost.net/sites/af0adc8ea1314bfb8328afdc06ce1e06/wp-content/uploads/2025/05/Frieren_LP_Packshot_Cover_wVinyl_Website.jpg" 
                label="Frieren Soundtrack Vinyl"
                delay={0}
              />
            )}
          </div>
          <div className="flex justify-center h-full min-h-[400px]">
            {revealed.play && (
              <GiftCard 
                image="https://cyberpiggy.com/image/cache/catalog/banners/steam25-800x800.jpeg" 
                label="Steam Gift Card"
                delay={0.3}
              />
            )}
          </div>
        </div>
      </div>

      {allRevealed && <ConfettiEffect />}
    </div>
  );
};

export default App;
