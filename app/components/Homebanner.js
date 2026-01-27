'use client';

import React, { useEffect, useState, useRef } from 'react';

const HomeBanner = () => {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(false);

  const [headline, setHeadline] = useState({ main: '', highlight: '' });
  const [content, setContent] = useState(null);

  const containerRef = useRef(null);
  const requestRef = useRef(null);

  // --- 1. FETCH DATA ---
  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('http://localhost:4000/api/content'); 
        const data = await res.json();
        setContent(data);

        if (data?.hero?.headline) {
          const words = data.hero.headline.split(' ');
          setHeadline({ 
            main: words[0], 
            highlight: words.slice(1).join(' ') 
          });
        }
      } catch (err) {
        console.error('Failed to fetch content:', err);
      }
    }
    fetchContent();
  }, []);

  // --- 2. MOUSE & RESIZE LOGIC ---
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();

    const handleMouseMove = (e) => {
      if (requestRef.current || isMobile) return;
      requestRef.current = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
          });
        }
        requestRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkMobile);
    
    // Trigger entrance animation
    const loadTimer = setTimeout(() => setLoaded(true), 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      clearTimeout(loadTimer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile]);

  // Parallax Calculation
  const parallaxX = isMobile ? 0 : (mousePosition.x - 0.5) * -12;
  const parallaxY = isMobile ? 0 : (mousePosition.y - 0.5) * -12;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#050505] flex items-center"
      style={{ minHeight: '100dvh' }}
    >
      {/* ================= 1. CINEMATIC BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* The Image */}
        <div
          className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
            imageLoaded && loaded ? 'scale-105 opacity-100' : 'scale-115 opacity-0'
          }`}
          style={{ transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.05)` }}
        >
          <img
            src={content?.hero?.image}
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
            // Clean, high contrast, no weird colors
            style={{ filter: 'contrast(1.15) brightness(0.9) saturate(1.1)' }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* 
           SMART GRADIENT: 
           Solid black on left -> Clear on right
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-black/60 to-transparent sm:via-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>

      {/* ================= 2. MAIN CONTENT GRID ================= */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 py-24">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          {/* --- LEFT COLUMN: TEXT & BRANDING (Span 7) --- */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-10">
            
            {/* BRAND LABEL (Clean, no glow) */}
            <div className={`flex items-center gap-4 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="h-[2px] w-12 bg-[#ed1b24]"></div>
              <h2 className="text-white font-bold tracking-[0.3em] text-sm uppercase">
                PDC <span className="text-[#ed1b24]">CONSULT</span>
              </h2>
            </div>

            {/* HEADLINE */}
            <div className="relative z-20">
              <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter transition-all duration-1000 delay-100 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                {headline.main}
                <br />
                {/* Gradient Text using #ed1b24 */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] via-[#ff4d55] to-white">
                  {headline.highlight}
                </span>
              </h1>
            </div>

            {/* SUBHEADLINE */}
            <p className={`text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {content?.hero?.subheadline}
            </p>

            {/* CTA BUTTON */}
            <div className={`pt-2 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button className="group relative px-10 py-5 bg-transparent overflow-hidden border border-white/20 transition-all duration-300 hover:border-[#ed1b24]">
                {/* Red Fill Animation (Only on hover) */}
                <div className="absolute inset-0 w-0 bg-[#ed1b24] transition-all duration-[250ms] ease-out group-hover:w-full opacity-100"></div>
                
                <span className="relative z-10 flex items-center gap-4 text-white font-bold tracking-widest uppercase text-sm">
                  {content?.hero?.cta}
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: INTERACTIVE CARDS (Span 5) --- */}
          <div className={`lg:col-span-5 flex flex-col gap-5 perspective-1000 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            {content?.services && content.services.map((service, i) => (
              <div 
                key={i} 
                className="group relative p-6 bg-black/20 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all duration-500 cursor-pointer hover:-translate-x-2 overflow-hidden"
              >
                {/* The Red Laser Line (Only shows on Hover) */}
                <div className="absolute top-0 left-0 w-[2px] h-full bg-[#ed1b24] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                
                <div className="relative z-10 pl-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ed1b24] transition-colors flex items-center justify-between">
                     {service.title}
                     <span className="text-[#ed1b24] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                       →
                     </span>
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeBanner;