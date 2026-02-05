'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

// ============================================
// STATIC SERVICES DATA (FALLBACK)
// ============================================
const staticServicesData = [
  {
    id: 'project-development',
    number: '01',
    title: 'Projects Development & Management',
    shortDesc: 'End-to-end project lifecycle management',
    description: 'Comprehensive project lifecycle management from conception to completion, ensuring timely delivery and optimal resource allocation across residential, commercial, and mixed-use developments.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    features: ['End-to-end oversight', 'Risk mitigation', 'Quality assurance', 'Stakeholder coordination'],
    color: '#ed1b24'
  },
  {
    id: 'architectural-design',
    number: '02',
    title: 'Architectural Design & Urban Planning',
    shortDesc: 'World-class architectural excellence',
    description: 'Official representatives of Carlos Ott in U.A.E., GCC & Middle East. World-class architectural excellence and innovative urban solutions that define skylines.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1200&auto=format&fit=crop',
    features: ['Carlos Ott partnership', 'Iconic design', 'Urban masterplanning', 'Sustainable development'],
   color: '#ed1b24'
  },
  {
    id: 'hospitality-consultancy',
    number: '03',
    title: 'Hospitality Consultancy',
    shortDesc: 'Strategic advisory for luxury hospitality',
    description: 'Strategic advisory services for luxury hotels, resorts, and hospitality ventures in the MENA region, from concept to operational excellence.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    features: ['Brand positioning', 'Operational excellence', 'Experience design', 'Revenue optimization'],
    color: '#ed1b24'
  },
  {
    id: 'cost-management',
    number: '04',
    title: 'Consultancy',
    shortDesc: 'Strategic advisory services',
    description: 'Optimize project costs while maximizing value through systematic analysis and innovative engineering solutions that deliver exceptional ROI.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    features: ['Budget optimization', 'Value analysis', 'Cost modeling', 'Procurement strategy'],
     color: '#ed1b24'
  },
  {
    id: 'pm-training',
    number: '05',
    title: 'Organisation Facilities - PM',
    shortDesc: 'Facility management excellence',
    description: 'Professional development programs designed to elevate project management capabilities across your organization with certified trainers.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    features: ['Facility management', 'Operations excellence', 'Asset management', 'Maintenance planning'],
     color: '#ed1b24'
  }
];

// ============================================
// HERO SECTION
// ============================================
const ServicesHero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={heroRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-black overflow-hidden">
      {/* Background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
          alt="Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black"></div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1, y: [0, -20, 0] }}
            transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
            className="absolute w-64 h-64 border border-[#ed1b24]/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-[#ed1b24] rounded-full animate-pulse"></span>
          <span className="text-white/90 text-sm font-medium tracking-wide">What We Offer</span>
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9]"
          >
            Our
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] to-[#ff6b6b]">Services</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Comprehensive solutions that transform visions into iconic landmarks
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">Explore</span>
          <svg className="w-5 h-5 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// SERVICES GRID - BENTO STYLE
// ============================================
const ServicesGrid = ({ services, loading, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  if (loading) {
    return (
      <section className={`relative py-24 lg:py-32 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#ed1b24] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 overflow-hidden ${theme === 'dark' ? 'bg-[#050505]' : 'bg-gray-50'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(237,27,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(237,27,36,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Expertise</span>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            What We <span className="font-normal text-[#ed1b24]">Do</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              <Link href={`/services/${service.id}`}>
                {/* 
                  Card Container 
                  Changes: Added duration-500 and ease-out for smooth color transition.
                */}
                <div className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ease-out h-full hover:scale-[1.02] ${index === 0 ? 'min-h-[500px]' : 'min-h-[280px]'} ${
                  theme === 'dark'
                    ? 'bg-[#0a0a0a] border-white/5 hover:border-[#ed1b24]/40'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl'
                }`}>
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }} // Smooth image scale
                      src={service.image}
                      alt={service.title}
                      // Increased opacity in light mode to avoid the "grey box" look
                      className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
                        theme === 'dark' ? 'opacity-30 group-hover:opacity-40' : 'opacity-100'
                      }`}
                    />
                    {/* 
                      Gradient Overlay 
                      Fixed: Used black gradient in white theme to remove white shadow haze.
                    */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                      theme === 'dark'
                        ? 'bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent'
                        : 'bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90'
                    }`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-6 lg:p-8 flex flex-col justify-end">
                    {/* Number */}
                    <div className="absolute top-6 right-6">
                      <span className={`text-6xl lg:text-7xl font-light transition-colors duration-500 ease-out group-hover:text-[#ed1b24]/20 ${
                        theme === 'dark' ? 'text-white/5' : 'text-white/10'
                      }`}>
                        {service.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 transition-all duration-500 ease-out group-hover:bg-[#ed1b24] group-hover:border-[#ed1b24] group-hover:text-white ${
                        theme === 'dark'
                          ? 'bg-[#ed1b24]/10 border-[#ed1b24]/20 text-[#ed1b24]'
                          : 'bg-white/10 border-white/20 text-white backdrop-blur-sm'
                      }`}
                    >
                      {service.icon}
                    </div>

                    {/* Title & Description */}
                    {/* Force text white in both themes because of the dark overlay fix */}
                    <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm lg:text-base mb-4 line-clamp-2 text-gray-300">
                      {service.shortDesc}
                    </p>

                    {/* Features - Only for large card */}
                    {index === 0 && (
                      <div className="hidden lg:flex flex-wrap gap-2 mb-4">
                        {service.features.map((feature, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-xs bg-white/10 text-gray-200 backdrop-blur-sm border border-white/10">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-[#ed1b24] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-x-0 group-hover:translate-x-2">
                      <span>Explore Service</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROCESS SECTION
// ============================================
const ProcessSection = ({ theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const steps = [
    { number: '01', title: 'Discovery', desc: 'Understanding your vision and requirements' },
    { number: '02', title: 'Strategy', desc: 'Developing comprehensive project roadmap' },
    { number: '03', title: 'Execution', desc: 'Bringing plans to life with precision' },
    { number: '04', title: 'Delivery', desc: 'Completing projects beyond expectations' }
  ];

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ed1b24] rounded-full blur-[300px] opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Our Approach</span>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            How We <span className="font-normal text-[#ed1b24]">Work</span>
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`p-8 rounded-3xl border hover:border-[#ed1b24]/30 transition-all duration-500 ease-out h-full ${
                theme === 'dark'
                  ? 'bg-white/[0.02] border-white/5'
                  : 'bg-gray-50 border-gray-200 hover:shadow-lg'
              }`}>
                {/* Number */}
                <div className="text-6xl font-light text-[#ed1b24]/20 group-hover:text-[#ed1b24]/40 transition-colors duration-500 ease-out mb-4">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{step.desc}</p>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#ed1b24]/50 to-transparent"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// WHY CHOOSE US
// ============================================
const WhyChooseUs = ({ theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const reasons = [
    { icon: '🏆', title: '15+ Years', desc: 'Industry experience' },
    { icon: '🌍', title: 'Regional Leader', desc: 'UAE & MENA expertise' },
    { icon: '💎', title: '$5B+ Projects', desc: 'Successfully delivered' },
    { icon: '🤝', title: '50+ Clients', desc: 'Trusted partnerships' }
  ];

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 overflow-hidden ${theme === 'dark' ? 'bg-[#050505]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Why PDC</span>
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light mt-4 mb-6 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Excellence in
              <span className="font-normal text-[#ed1b24]"> Every Detail</span>
            </h2>
            <p className={`text-lg leading-relaxed mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              We combine deep regional expertise with world-class standards to deliver
              exceptional results that exceed expectations and stand the test of time.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-3xl">{reason.icon}</span>
                  <div>
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{reason.title}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{reason.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
                alt="Excellence"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
              className="absolute -bottom-6 -left-6 bg-[#ed1b24] p-6 rounded-2xl shadow-2xl"
            >
              <div className="text-white">
                <span className="text-4xl font-bold">98%</span>
                <p className="text-white/80 text-sm mt-1">Client Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ed1b24] via-[#c41119] to-[#8b0000]"></div>

      {/* Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6">
            Ready to Start Your
            <br /><span className="font-bold">Next Project?</span>
          </h2>
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Let's discuss how our expertise can bring your vision to life
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-[#ed1b24] font-bold text-lg rounded-full hover:bg-black hover:text-white transition-colors duration-300"
              >
                Get in Touch
              </motion.button>
            </Link>
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-[#ed1b24] transition-colors duration-300"
              >
                View Projects
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function ServicesPage() {
  const { theme } = useTheme();
  // Always use static services for the main services page
  const services = staticServicesData;
  const loading = false;

  // Scroll to top instantly on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className={`w-full selection:bg-[#ed1b24] selection:text-white transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`} style={{ fontFamily: "'Archivo', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      <Header />
      <ServicesHero />
      <ServicesGrid services={services} loading={loading} theme={theme} />
      <ProcessSection theme={theme} />
      <WhyChooseUs theme={theme} />
      <CTASection />
      <Footer />
    </main>
  );
}