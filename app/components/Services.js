'use client';

import React, { useState, useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const { theme } = useTheme();

  const containerRef = useRef(null);

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

  /* ================= DATA ================= */
  const services = [
    {
      id: 'project-development',
      number: '01',
      title: 'Projects Development & Management',
      description:
        'Comprehensive project lifecycle management from conception to completion, ensuring timely delivery and optimal resource allocation.',
      features: ['End-to-end oversight', 'Risk mitigation', 'Quality assurance', 'Stakeholder coordination'],
      icon: '🏗️',
    },
    {
      id: 'architectural-design',
      number: '02',
      title: 'Architectural Design & Urban Planning',
      description:
        'Official representatives of Carlos Ott in U.A.E., GCC & Middle East. World-class architectural excellence and innovative urban solutions.',
      features: ['Carlos Ott partnership', 'Iconic design', 'Urban masterplanning', 'Sustainable development'],
      icon: '🏛️',
    },
    {
      id: 'hospitality-consultancy',
      number: '03',
      title: 'Hospitality Consultancy',
      description:
        'Strategic advisory services for luxury hotels, resorts, and hospitality ventures in the MENA region.',
      features: ['Brand positioning', 'Operational excellence', 'Experience design', 'Revenue optimization'],
      icon: '🏨',
    },
    {
      id: 'cost-management',
      number: '04',
      title: 'Cost Management & Value Engineering',
      description:
        'Optimize project costs while maximizing value through systematic analysis and innovative engineering solutions.',
      features: ['Budget optimization', 'Value analysis', 'Cost modeling', 'Procurement strategy'],
      icon: '💰',
    },
    {
      id: 'pm-training',
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
    <section ref={containerRef} className={`relative py-20 md:py-32 overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');

        .service-card {
          font-family: 'Archivo', sans-serif;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
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
          transition: opacity 0.3s ease;
        }

        .service-card.active::before {
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
        }

        .stat-card {
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: rgba(237, 27, 36, 0.5);
          transform: translateY(-4px);
        }

        .slide-content {
          border: 1px solid rgba(237, 27, 36, 0.2);
        }

        .stat-card-dark {
          background: linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(30, 30, 30, 0.8) 100%);
          border: 1px solid rgba(237, 27, 36, 0.2);
        }

        .stat-card-light {
          background: white;
          border: 1px solid rgba(237, 27, 36, 0.15);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .slide-content-dark {
          background: linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.95) 100%);
        }

        .slide-content-light {
          background: white;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .learn-more-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, #ed1b24 0%, #c41119 100%);
          transition: all 0.3s ease;
        }

        .learn-more-btn:hover {
          transform: translateX(4px);
        }
      `}</style>

      {/* Static Background Gradient */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: `radial-gradient(circle at 30% 40%, rgba(237,27,36,0.2), transparent 50%)`,
        }}
      />

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
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[#ed1b24]/30 bg-[#ed1b24]/5">
            <span className="text-[#ed1b24] text-sm font-semibold tracking-wider uppercase">Our Services</span>
          </div>
          
          <h2 className={`heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Services that{" "}
            <span className="block mt-2 bg-gradient-to-r from-[#ed1b24] via-[#ff4444] to-[#ed1b24] bg-clip-text text-transparent font-normal">
              Define Excellence
            </span>
          </h2>

          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Delivering world-class solutions across project management, architecture, and consultancy
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 max-w-7xl mx-auto mb-20 md:mb-32">
          {/* LEFT NAV - Service List */}
          <div
            className={`lg:col-span-5 space-y-3 transition-all duration-500 delay-100 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`service-card ${
                  activeService === index ? 'active' : ''
                } w-full text-left p-5 md:p-6 rounded-2xl group hover:translate-x-2 transition-transform duration-300`}
                style={{
                  background:
                    activeService === index
                      ? 'linear-gradient(135deg, rgba(237, 27, 36, 0.15) 0%, rgba(237, 27, 36, 0.05) 100%)'
                      : theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                  border: activeService === index
                    ? '1px solid rgba(237, 27, 36, 0.3)'
                    : theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110"
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-xs font-bold tracking-wider transition-colors duration-300"
                        style={{
                          color: activeService === index ? '#ed1b24' : 'rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        {service.number}
                      </span>
                    </div>
                    <span
                      className="font-medium text-sm md:text-base block transition-colors duration-300"
                      style={{
                        color: activeService === index
                          ? (theme === 'dark' ? '#ffffff' : '#1a1a1a')
                          : (theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'),
                      }}
                    >
                      {service.title}
                    </span>
                  </div>
                  <div
                    className="transition-all duration-300"
                    style={{
                      transform: activeService === index ? 'translateX(0)' : 'translateX(-10px)',
                      opacity: activeService === index ? 1 : 0
                    }}
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
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT CONTENT - Service Details */}
          <div
            className={`lg:col-span-7 relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] transition-all duration-500 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <div className={`slide-content h-full p-6 sm:p-8 md:p-12 rounded-3xl relative overflow-hidden ${
                  theme === 'dark' ? 'slide-content-dark' : 'slide-content-light'
                }`}>
                  {/* Large Number Background */}
                  <div
                    className="absolute -top-4 -right-4 text-[180px] sm:text-[220px] md:text-[280px] font-light opacity-[0.03] select-none pointer-events-none heading-font"
                    style={{ color: '#ed1b24' }}
                  >
                    {services[activeService].number}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className="text-5xl sm:text-6xl md:text-7xl mb-4">
                        {services[activeService].icon}
                      </div>
                      <h3 className={`heading-font text-2xl sm:text-3xl md:text-4xl font-medium mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {services[activeService].title}
                      </h3>
                    </div>

                    <p className={`mb-8 md:mb-10 text-base sm:text-lg leading-relaxed ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {services[activeService].description}
                    </p>

                    <div className="space-y-4 mb-8 md:mb-10">
                      <h4 className={`font-medium text-sm uppercase tracking-wider mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Key Features
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {services[activeService].features.map((feature, i) => (
                          <div
                            key={i}
                            className={`flex items-center text-sm md:text-base ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            <span className="feature-dot"></span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link href={`/services/${services[activeService].id}`}>
                      <button className="learn-more-btn px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2">
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
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* STATS Section */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 transition-all duration-500 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`stat-card p-6 sm:p-8 rounded-2xl text-center ${
                theme === 'dark' ? 'stat-card-dark' : 'stat-card-light'
              }`}
            >
              <div
                className={`text-3xl sm:text-4xl md:text-5xl font-light mb-2 heading-font bg-clip-text text-transparent ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-white to-[#ed1b24]'
                    : 'bg-gradient-to-br from-gray-900 to-[#ed1b24]'
                }`}
              >
                {isInView && <CountUp end={stat.value} duration={2} />}
                {stat.suffix}
              </div>
              <p className={`text-xs sm:text-sm font-normal uppercase tracking-wider ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}