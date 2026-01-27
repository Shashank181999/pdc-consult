'use client';

import React, { useEffect, useState, useRef } from 'react';

const HomeBanner = () => {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  
  const containerRef = useRef(null);
  const requestRef = useRef(null);

  const brandRed = '#ed1b24';

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

    const handleScroll = () => {
      setScrollIndicator(window.scrollY <= 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);

    const loadTimer = setTimeout(() => setLoaded(true), 200);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      clearTimeout(loadTimer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile]);

  const parallaxX = isMobile ? 0 : (mousePosition.x - 0.5) * -25;
  const parallaxY = isMobile ? 0 : (mousePosition.y - 0.5) * -25;

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full overflow-hidden bg-black"
        style={{ height: '100vh', minHeight: '600px' }}
      >
        {/* Dynamic Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
          {/* Main Background Image */}
          <div
            className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
              imageLoaded && loaded 
                ? 'scale-100 opacity-100 blur-0' 
                : 'scale-110 opacity-0 blur-2xl'
            }`}
            style={{
              transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.1)`,
              willChange: 'transform',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=90&w=2400&auto=format&fit=crop"
              alt="PDC Consult Background"
              className="w-full h-full object-cover"
              style={{ 
                filter: 'brightness(0.3) contrast(1.2) saturate(0)',
                mixBlendMode: 'luminosity',
              }}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              fetchPriority="high"
            />
            
            {/* Subtle overlay for better text contrast */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)',
              }}
            />
          </div>

          {/* Sophisticated Gradient Overlays */}
          <div
            className="absolute inset-0 transition-opacity duration-1500"
            style={{
              opacity: loaded ? 1 : 0,
              background: `
                radial-gradient(ellipse 100% 100% at 20% 40%, ${brandRed}20 0%, transparent 50%),
                linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.95) 100%)
              `,
            }}
          />

          {/* Red Accent Gradient */}
          <div 
            className="absolute inset-0 opacity-30 transition-opacity duration-2000"
            style={{
              opacity: loaded ? 0.2 : 0,
              background: `
                radial-gradient(at 30% 30%, ${brandRed}30 0px, transparent 50%),
                radial-gradient(at 70% 70%, ${brandRed}15 0px, transparent 50%)
              `,
              filter: 'blur(80px)',
            }}
          />

          {/* Noise Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Geometric Pattern Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, ${brandRed}03 2px, ${brandRed}03 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, ${brandRed}03 2px, ${brandRed}03 4px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 100%)',
          }}
        />

        {/* Architectural Corner Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left */}
          <div
            className={`absolute top-0 left-0 w-40 h-40 border-l-[3px] border-t-[3px] transition-all duration-1500 ${
              loaded ? 'opacity-40 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              borderColor: brandRed,
              transitionDelay: '400ms',
            }}
          >
            <div className="absolute top-8 left-8 w-8 h-8 border border-white/20" />
          </div>

          {/* Bottom Right */}
          <div
            className={`absolute bottom-0 right-0 w-40 h-40 border-r-[3px] border-b-[3px] transition-all duration-1500 ${
              loaded ? 'opacity-40 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              borderColor: brandRed,
              transitionDelay: '600ms',
            }}
          >
            <div className="absolute bottom-8 right-8 w-8 h-8 border border-white/20" />
          </div>

          {/* Floating Geometric Shapes - Desktop */}
          {!isMobile && (
            <>
              <div
                className={`absolute top-1/4 right-20 w-60 h-60 rounded-full border border-white/10 transition-all duration-2000 ${
                  loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{
                  transform: `translate(${(mousePosition.x - 0.5) * 40}px, ${(mousePosition.y - 0.5) * 40}px)`,
                  transitionDelay: '800ms',
                }}
              />
              <div
                className={`absolute bottom-1/4 left-32 w-32 h-32 rotate-45 transition-all duration-2000 ${
                  loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{
                  border: `1px solid ${brandRed}20`,
                  transform: `rotate(45deg) translate(${(mousePosition.x - 0.5) * -30}px, ${(mousePosition.y - 0.5) * -30}px)`,
                  transitionDelay: '1000ms',
                }}
              />
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Hero Section */}
          <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-32 py-12 sm:py-16">
            <div className="max-w-8xl w-full">
              <div className="max-w-4xl">
                {/* Animated Badge */}
                <div
                  className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full backdrop-blur-xl transition-all duration-1000 ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: '200ms',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="relative">
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ 
                        backgroundColor: brandRed,
                        animationDuration: '2s',
                      }}
                    />
                    <span
                      className="relative block w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: brandRed,
                        boxShadow: `0 0 15px ${brandRed}`,
                      }}
                    />
                  </div>
                  <span className="text-white/70 text-xs tracking-[0.2em] uppercase font-medium">
                    Dubai · Strategic Consulting
                  </span>
                </div>

                {/* Main Headlines with Staggered Animation */}
                <div className="space-y-1 mb-8">
                  <div className="overflow-hidden">
                    <h1
                      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter transition-all duration-1000 ${
                        loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                      }`}
                      style={{
                        transitionDelay: '350ms',
                        fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
                        textShadow: '0 2px 40px rgba(0,0,0,0.5)',
                      }}
                    >
                      Transform
                    </h1>
                  </div>
                  <div className="overflow-hidden">
                    <h1
                      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter transition-all duration-1000 ${
                        loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                      }`}
                      style={{
                        transitionDelay: '500ms',
                        background: `linear-gradient(135deg, ${brandRed} 0%, #ff6b75 50%, ${brandRed} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% 200%',
                        animation: loaded ? 'gradientShift 6s ease infinite' : 'none',
                        fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
                        filter: `drop-shadow(0 0 40px ${brandRed}50)`,
                      }}
                    >
                      Your Vision
                    </h1>
                  </div>
                </div>

                {/* Decorative Line */}
                <div
                  className={`flex items-center gap-3 mb-6 transition-all duration-1000 ${
                    loaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: '700ms' }}
                >
                  <div
                    className="h-[1px] transition-all duration-1500 ease-out"
                    style={{
                      width: loaded ? '60px' : '0px',
                      background: `linear-gradient(90deg, ${brandRed} 0%, transparent 100%)`,
                      transitionDelay: '900ms',
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-white/30 text-xs italic font-light">Est. 2009</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/30 text-xs font-light">Dubai</span>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-base sm:text-lg text-white/70 leading-relaxed mb-8 max-w-2xl font-light transition-all duration-1000 ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: '850ms',
                    textShadow: '0 1px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  Partnering with visionary leaders to architect{' '}
                  <span 
                    className="font-semibold text-white relative"
                    style={{
                      background: `linear-gradient(135deg, white 0%, ${brandRed} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    transformative outcomes
                  </span>
                  . Strategy reimagined. Innovation accelerated.
                </p>

                {/* CTA Buttons */}
                <div
                  className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 transition-all duration-1000 ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: '1000ms' }}
                >
                  <button
                    className="group relative px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${brandRed} 0%, #c41219 100%)`,
                      boxShadow: `0 8px 30px ${brandRed}40`,
                    }}
                  >
                    <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                    <span className="relative flex items-center justify-center gap-2">
                      <span className="group-hover:text-black transition-colors duration-300">
                        Begin Your Journey
                      </span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-500 group-hover:text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>

                  <button 
                    className="group relative px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm text-white overflow-hidden transition-all duration-500 hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '2px solid rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span
                      className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 transition-transform duration-500 group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="hidden sm:inline">Explore Impact</span>
                      <span className="sm:hidden">Impact</span>
                    </span>
                  </button>
                </div>

                {/* Stats with Enhanced Design */}
                <div
                  className={`grid grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: '1150ms' }}
                >
                  {[
                    { value: '15+', label: 'Years' },
                    { value: '500+', label: 'Projects' },
                    { value: '$2B+', label: 'Value' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="group relative cursor-pointer"
                      style={{ transitionDelay: `${1200 + i * 100}ms` }}
                    >
                      <div className="relative p-4 rounded-xl backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        <div
                          className="text-2xl sm:text-3xl font-black mb-1 transition-all duration-500"
                          style={{
                            background: `linear-gradient(135deg, ${brandRed} 0%, white 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: `drop-shadow(0 0 15px ${brandRed}30)`,
                          }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-white/50 text-xs font-medium tracking-wide">
                          {stat.label}
                        </div>
                        <div
                          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                          style={{ backgroundColor: brandRed }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div
            className={`w-full px-6 sm:px-12 lg:px-20 xl:px-32 py-4 sm:py-6 backdrop-blur-xl transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: '1300ms',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="max-w-8xl mx-auto flex items-center justify-between">
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {[
                  { name: 'LinkedIn', icon: 'in', url: '#' },
                  { name: 'Twitter', icon: '𝕏', url: '#' },
                  { name: 'Instagram', icon: 'ig', url: '#' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    aria-label={social.name}
                    className="w-9 h-9 rounded-lg backdrop-blur-sm flex items-center justify-center text-white/50 text-xs font-bold hover:text-white transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Scroll Indicator */}
              <div
                className={`hidden sm:flex items-center gap-2 transition-all duration-700 ${
                  scrollIndicator ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <span className="text-white/30 text-xs tracking-[0.15em] uppercase font-semibold hidden md:block">
                  Scroll
                </span>
                <div
                  className="w-5 h-8 rounded-full flex justify-center pt-2 backdrop-blur-sm"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${brandRed}40`,
                  }}
                >
                  <div
                    className="w-0.5 h-1.5 rounded-full animate-bounce"
                    style={{
                      backgroundColor: brandRed,
                      animationDuration: '2s',
                      boxShadow: `0 0 8px ${brandRed}`,
                    }}
                  />
                </div>
              </div>

              {/* Contact */}
              <a
                href="mailto:hello@pdcconsult.com"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-white/50 text-xs font-semibold hover:text-white transition-all duration-300 group backdrop-blur-sm"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span className="hidden lg:inline">hello@pdcconsult.com</span>
                <span className="lg:hidden">Contact</span>
                <svg
                  className="w-3 h-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Contact Button - Mobile */}
        <button
          className={`fixed bottom-6 right-6 sm:hidden z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-1000 active:scale-95 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{
            background: `linear-gradient(135deg, ${brandRed} 0%, #c41219 100%)`,
            boxShadow: `0 8px 30px ${brandRed}50`,
            transitionDelay: '1400ms',
          }}
          aria-label="Contact us"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </section>

      {/* Keyframe Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </>
  );
};

export default HomeBanner;