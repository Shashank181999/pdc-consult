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

  useEffect(() => {
    const data = {
      hero: {
        headline: "Architecting The Future of Business",
        subheadline:
          "Partnering with visionary leaders to navigate complexity, drive sustainable growth, and redefine industry standards in the Middle East and beyond.",
        cta: "Explore Our Solutions",
        image: "/background.png",
        mobileImage: "/mobile.jpeg"
      },
      services: [
        {
          title: "Strategic Transformation",
          description:
            "Reimagining business models to unlock new value streams and ensure long-term resilience."
        },
        {
          title: "Investment Advisory",
          description:
            "Data-driven financial structuring and risk management to maximize capital efficiency."
        },
        {
          title: "Digital Ecosystems",
          description:
            "Leveraging AI and automation to streamline operations and enhance customer experiences."
        }
      ]
    };

    setContent(data);

    if (data?.hero?.headline) {
      const words = data.hero.headline.split(' ');
      setHeadline({
        main: words[0],
        highlight: words.slice(1).join(' ')
      });
    }
  }, []);

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

    const loadTimer = setTimeout(() => setLoaded(true), 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      clearTimeout(loadTimer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile]);

  const parallaxX = isMobile ? 0 : (mousePosition.x - 0.5) * -15;
  const parallaxY = isMobile ? 0 : (mousePosition.y - 0.5) * -15;

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#050505] flex items-center justify-center font-sans"
    >
      {/* ================= 1. BACKGROUND LAYER ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Parallax Image */}
        <div
          className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
            imageLoaded && loaded ? 'scale-105 opacity-100' : 'scale-115 opacity-0'
          }`}
          style={{ 
            transform: isMobile 
              ? 'scale(1.05)' 
              : `translate(${parallaxX}px, ${parallaxY}px) scale(1.05)` 
          }}
        >
          <img
            src={isMobile ? (content?.hero?.mobileImage || content?.hero?.image) : content?.hero?.image}
            alt="Background"
            className="w-full h-full object-cover"
            style={{
              filter: isMobile
                ? 'contrast(1.05) brightness(1) saturate(1.1)'
                : 'contrast(1.1) brightness(0.9) saturate(1.1)',
              objectPosition: 'center center'
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Global Tint - LIGHTER ON MOBILE */}
        <div className="absolute inset-0 bg-black/20 sm:bg-black/30 md:bg-black/30"></div>

        {/* Gradient Overlay - Mobile: bottom-heavy, Desktop: left-side */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent sm:from-black sm:via-black/50 sm:to-black/20 md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent md:w-[65%]"></div>

        {/* Additional Mobile Top Visibility Layer */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
        
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      {/* ================= 2. MAIN CONTENT ================= */}
      <div className="relative z-10 w-full max-w-[1500px] px-4 sm:px-6 md:px-12 lg:px-16 mx-auto py-20 md:py-0 flex flex-col justify-end md:justify-center min-h-screen pb-24 md:pb-0">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT SIDE: TYPOGRAPHY --- */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8">
            
            {/* Top Label */}
            <div className={`flex items-center gap-2 md:gap-3 transition-all duration-1000 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <div className="h-[2px] w-4 md:w-6 bg-[#ed1b24] shadow-[0_0_10px_#ed1b24]"></div>
              <h6 className="text-white text-[10px] md:text-xs font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-md">
                PDC Consult
              </h6>
            </div>

            {/* Headline */}
            <div className="relative">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] md:leading-[0.95] tracking-tight transition-all duration-1000 delay-100 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <span className="drop-shadow-2xl">{headline.main}</span>
                <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] to-[#ff5c63] drop-shadow-lg font-normal">
                  {headline.highlight}
                </span>
              </h1>
            </div>

            {/* Description & Button */}
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 sm:items-start transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
               <div className="hidden sm:block w-[2px] h-16 md:h-20 bg-gradient-to-b from-[#ed1b24] to-transparent"></div>
               
               <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-md drop-shadow-md">
                    {content?.hero?.subheadline}
                  </p>

                  <button className="group relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden rounded-sm hover:bg-[#ed1b24] hover:border-[#ed1b24] transition-all duration-300">
                    <span className="relative z-10 flex items-center gap-2 md:gap-3 text-white text-xs md:text-sm font-semibold tracking-wider md:tracking-widest uppercase">
                      {content?.hero?.cta}
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </button>
               </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: FEATURE LIST --- */}
          <div className={`hidden md:flex lg:col-span-5 flex-col justify-center pt-8 lg:pt-0 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              <div className="flex flex-col gap-3 md:gap-4 relative z-10">
                {content?.services && content.services.slice(0, 4).map((service, i) => (
                  <div key={i} className="group relative cursor-pointer">
                    <div className="p-4 md:p-5 lg:p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:border-[#ed1b24] hover:bg-white/15 transition-all duration-300 hover:-translate-x-2">
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] md:w-[3px] bg-[#ed1b24] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-lg"></div>

                      <div className="flex justify-between items-start">
                        <h3 className="text-sm sm:text-base md:text-lg font-medium text-white mb-1 md:mb-2 group-hover:text-[#ed1b24] transition-colors line-clamp-1">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md px-4 md:px-6 py-3 md:py-4 flex flex-wrap justify-between items-center gap-2 text-[9px] md:text-[10px] text-gray-400 tracking-wider md:tracking-widest uppercase font-medium z-20">
          <span className="text-[8px] md:text-[10px]">© PDC Consult 2024</span>
          <span className="hidden sm:block text-[8px] md:text-[10px]">Architecture • Design • Engineering</span>
          <div className="flex gap-3 md:gap-4 text-[8px] md:text-[10px]">
             <span className="hover:text-[#ed1b24] cursor-pointer transition-colors">Instagram</span>
             <span className="hover:text-[#ed1b24] cursor-pointer transition-colors">LinkedIn</span>
          </div>
      </div>
    </section>
  );
};

export default HomeBanner;