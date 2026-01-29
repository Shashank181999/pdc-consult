'use client';

import React, { useState, useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef(null);
  const animationRef = useRef(null);

  /* ================= INTERSECTION OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* ================= MOUSE FOLLOW BACKGROUND ================= */
  useEffect(() => {
    let target = { x: 50, y: 50 };

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 100;
      target.y = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const animate = () => {
      setMousePosition((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.08,
        y: prev.y + (target.y - prev.y) * 0.08,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  /* ================= DATA ================= */
  const services = [
    {
      number: '01',
      title: 'Projects Development & Management',
      description:
        'Comprehensive project lifecycle management from conception to completion, ensuring timely delivery and optimal resource allocation.',
      features: ['End-to-end oversight', 'Risk mitigation', 'Quality assurance', 'Stakeholder coordination'],
      icon: '🏗️',
    },
    {
      number: '02',
      title: 'Architectural Design & Urban Planning',
      description:
        'Official representatives of Carlos Ott in U.A.E., GCC & Middle East. World-class architectural excellence and innovative urban solutions.',
      features: ['Carlos Ott partnership', 'Iconic design', 'Urban masterplanning', 'Sustainable development'],
      icon: '🏛️',
    },
    {
      number: '03',
      title: 'Hospitality Consultancy',
      description:
        'Strategic advisory services for luxury hotels, resorts, and hospitality ventures in the MENA region.',
      features: ['Brand positioning', 'Operational excellence', 'Experience design', 'Revenue optimization'],
      icon: '🏨',
    },
    {
      number: '04',
      title: 'Cost Management & Value Engineering',
      description:
        'Optimize project costs while maximizing value through systematic analysis and innovative engineering solutions.',
      features: ['Budget optimization', 'Value analysis', 'Cost modeling', 'Procurement strategy'],
      icon: '💰',
    },
    {
      number: '05',
      title: 'PM Training Services',
      description:
        'Professional development programs designed to elevate project management capabilities across your organization.',
      features: ['Certification programs', 'Custom workshops', 'Best practices', 'Continuous learning'],
      icon: '📚',
    },
  ];

  const stats = [
    { value: 250, label: 'Projects Completed', suffix: '+' },
    { value: 25, label: 'Years Experience', suffix: '+' },
    { value: 18, label: 'Countries Served', suffix: '' },
    { value: 98, label: 'Client Satisfaction', suffix: '%' },
  ];

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 bg-black overflow-hidden">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');

        .grain-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .service-card {
          font-family: 'Archivo', sans-serif;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(180deg, transparent, #ed1b24, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-card.active::before {
          opacity: 1;
        }

        .service-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(237, 27, 36, 0.1), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-card.active::after {
          opacity: 1;
        }

        .heading-font {
          font-family: 'Archivo', sans-serif;
        }

        .feature-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #ed1b24;
          border-radius: 50%;
          margin-right: 12px;
          box-shadow: 0 0 8px rgba(237, 27, 36, 0.6);
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(30, 30, 30, 0.8) 100%);
          border: 1px solid rgba(237, 27, 36, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: rgba(237, 27, 36, 0.5);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(237, 27, 36, 0.2);
        }

        .slide-content {
          background: linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.95) 100%);
          border: 1px solid rgba(237, 27, 36, 0.2);
          backdrop-filter: blur(20px);
        }

        .learn-more-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, #ed1b24 0%, #c41119 100%);
          transition: all 0.3s ease;
        }

        .learn-more-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .learn-more-btn:hover::before {
          left: 100%;
        }

        .learn-more-btn:hover {
          transform: translateX(4px);
          box-shadow: 0 10px 30px rgba(237, 27, 36, 0.4);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-border {
          0%, 100% { border-color: rgba(237, 27, 36, 0.2); }
          50% { border-color: rgba(237, 27, 36, 0.6); }
        }

        .pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(237,27,36,0.25), transparent 60%)`,
        }}
      />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(237,27,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(237,27,36,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-2 rounded-full border border-[#ed1b24]/30 bg-[#ed1b24]/5"
          >
            <span className="text-[#ed1b24] text-sm font-semibold tracking-wider uppercase">Our Services</span>
          </motion.div>
          
          <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
            Services that{" "}
            <span className="block mt-2 bg-gradient-to-r from-[#ed1b24] via-[#ff4444] to-[#ed1b24] bg-clip-text text-transparent font-normal">
              Define Excellence
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Delivering world-class solutions across project management, architecture, and consultancy
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 max-w-7xl mx-auto mb-20 md:mb-32">
          {/* LEFT NAV - Service List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 space-y-3"
          >
            {services.map((service, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveService(index)}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 8 }}
                className={`service-card ${
                  activeService === index ? 'active' : ''
                } w-full text-left p-5 md:p-6 rounded-2xl transition-all duration-500 group`}
                style={{
                  background:
                    activeService === index
                      ? 'linear-gradient(135deg, rgba(237, 27, 36, 0.15) 0%, rgba(237, 27, 36, 0.05) 100%)'
                      : 'rgba(255, 255, 255, 0.02)',
                  border: activeService === index ? '1px solid rgba(237, 27, 36, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="text-3xl md:text-4xl transition-transform duration-500 group-hover:scale-110"
                    style={{
                      filter: activeService === index ? 'drop-shadow(0 0 10px rgba(237, 27, 36, 0.5))' : 'none',
                    }}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-xs font-bold tracking-wider"
                        style={{
                          color: activeService === index ? '#ed1b24' : 'rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        {service.number}
                      </span>
                    </div>
                    <span
                      className="font-medium text-sm md:text-base block"
                      style={{
                        color: activeService === index ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {service.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{ x: activeService === index ? 0 : -10, opacity: activeService === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="#ed1b24"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* RIGHT CONTENT - Service Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-7 relative"
            style={{ minHeight: '600px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <div className="slide-content h-full p-6 sm:p-8 md:p-12 rounded-3xl relative overflow-hidden">
                  {/* Large Number Background */}
                  <div
                    className="absolute -top-4 -right-4 text-[180px] sm:text-[220px] md:text-[280px] font-light opacity-[0.03] select-none pointer-events-none heading-font"
                    style={{ color: '#ed1b24' }}
                  >
                    {services[activeService].number}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mb-6"
                    >
                      <div className="text-5xl sm:text-6xl md:text-7xl mb-4 floating">
                        {services[activeService].icon}
                      </div>
                      <h3 className="heading-font text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-4">
                        {services[activeService].title}
                      </h3>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-gray-400 mb-8 md:mb-10 text-base sm:text-lg leading-relaxed"
                    >
                      {services[activeService].description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="space-y-4 mb-8 md:mb-10"
                    >
                      <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-4">
                        Key Features
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {services[activeService].features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                            className="flex items-center text-gray-300 text-sm md:text-base"
                          >
                            <span className="feature-dot"></span>
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="learn-more-btn px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2"
                    >
                      Learn More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* STATS Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -8 }}
              className="stat-card p-6 sm:p-8 rounded-2xl text-center group pulse-border"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + i * 0.1, type: 'spring' }}
                className="text-3xl sm:text-4xl md:text-5xl font-light mb-2 heading-font"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #ed1b24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {isInView && <CountUp end={stat.value} duration={2.5} />}
                {stat.suffix}
              </motion.div>
              <p className="text-gray-400 text-xs sm:text-sm font-normal uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}