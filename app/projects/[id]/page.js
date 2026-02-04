'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { supabase } from '../../admin/supabase';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// DEFAULT/FALLBACK IMAGES BY CATEGORY
// ============================================
const defaultImages = {
  hospitality: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop',
  residential: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
  commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
  'mixed-use': 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000&auto=format&fit=crop',
  renovations: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000&auto=format&fit=crop'
};

// Default gallery images
const defaultGalleryImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop'
];

// ============================================
// STATIC PROJECT DATA (FALLBACK)
// ============================================
const staticProjectsData = {
  '1': {
    id: '1',
    title: 'The Royal Atlantis',
    subtitle: 'Redefining Luxury Hospitality',
    category: 'Luxury Hotel',
    location: 'Palm Jumeirah, Dubai',
    client: 'Atlantis Resorts',
    year: '2023',
    duration: '48 Months',
    value: '$1.4 Billion',
    area: '460,000 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop',
    description: 'The Royal Atlantis represents the pinnacle of luxury hospitality, featuring 795 elegantly appointed rooms and suites, world-class dining experiences curated by celebrity chefs, and the world\'s largest jellyfish tank. This iconic development has redefined the Dubai skyline and set new standards for ultra-luxury resorts.',
    challenge: 'Creating an architectural marvel that would complement the existing Atlantis while establishing its own iconic identity, all while meeting the highest standards of luxury hospitality.',
    solution: 'Our team developed a comprehensive project management strategy that integrated cutting-edge design with practical functionality. We coordinated over 50 contractors and managed complex MEP systems while maintaining strict quality standards.',
    features: [
      'World\'s highest infinity pool',
      '90+ swimming pools and water features',
      '17 celebrity chef restaurants',
      'State-of-the-art wellness center',
      'Private beach access',
      'Smart room technology',
      'Sustainable design elements',
      'LEED certified construction'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop'
    ],
    services: ['Project Development', 'Construction Management', 'Quality Assurance', 'Cost Control'],
    tags: ['Hospitality', 'Ultra-Luxury', 'Mixed-Use', 'Waterfront']
  },
  // ... (Other static projects omitted for brevity, but structure is identical)
};

// Related projects (for the related section)
const relatedProjects = [
  { id: '1', title: 'The Royal Atlantis', category: 'Luxury Hotel', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop' },
  { id: '2', title: 'Marina Gate Towers', category: 'Residential', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop' },
  { id: '3', title: 'DIFC Innovation Hub', category: 'Commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop' },
  // ...
];

// ============================================
// PROJECT HERO SECTION
// ============================================
const ProjectHero = ({ project }) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-end bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-28 left-4 sm:left-8 lg:left-16 z-20"
      >
        <Link
          href="/projects"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back to Projects</span>
        </Link>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-16 pb-16 lg:pb-24">
        <div className="max-w-4xl">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-[#ed1b24] text-white text-xs font-bold uppercase tracking-wider rounded mb-6">
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 leading-[0.95]"
          >
            {project.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-300 mb-8"
          >
            {project.subtitle}
          </motion.p>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 text-gray-300"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{project.location}</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{project.year}</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {project.status}
            </span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-8 lg:right-16 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-xs uppercase tracking-widest rotate-90 origin-center translate-x-8">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// PROJECT STATS SECTION
// ============================================
const ProjectStats = ({ project, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';

  const stats = [
    { label: 'Project Value', value: project.value, icon: '💰' },
    { label: 'Total Area', value: project.area, icon: '📐' },
    { label: 'Duration', value: project.duration, icon: '⏱️' },
    { label: 'Year', value: project.year, icon: '📅' }
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-16 border-y transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-center p-6 rounded-xl border transition-colors ${
                isDark 
                  ? 'bg-white/5 border-white/5 hover:border-[#ed1b24]/30' 
                  : 'bg-white border-gray-100 shadow-sm hover:border-[#ed1b24]/30 hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className={`text-2xl sm:text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
              <div className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROJECT OVERVIEW SECTION
// ============================================
const ProjectOverview = ({ project, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#ed1b24]"></span>
              <span className="text-[#ed1b24] font-bold uppercase tracking-widest text-xs">Overview</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light mb-8 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Project <span className="font-normal text-[#ed1b24]">Description</span>
            </h2>

            <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm border ${
                    isDark 
                      ? 'bg-white/5 border-white/10 text-gray-300' 
                      : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right - Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={`p-8 lg:p-10 rounded-2xl border ${
              isDark 
                ? 'bg-gradient-to-br from-[#111] to-[#0a0a0a] border-white/5' 
                : 'bg-white border-gray-200 shadow-xl'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Project Details</h3>

              <div className="space-y-5">
                {[
                  { label: 'Client', value: project.client },
                  { label: 'Location', value: project.location },
                  { label: 'Category', value: project.category },
                  { label: 'Project Value', value: project.value },
                  { label: 'Total Area', value: project.area },
                  { label: 'Duration', value: project.duration },
                  { label: 'Status', value: project.status }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex justify-between items-center py-3 border-b last:border-0 ${
                      isDark ? 'border-white/5' : 'border-gray-100'
                    }`}
                  >
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{item.label}</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Services Provided</h4>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1.5 rounded text-sm border ${
                        isDark 
                          ? 'bg-[#ed1b24]/10 border-[#ed1b24]/30 text-[#ed1b24]' 
                          : 'bg-red-50 border-red-100 text-[#ed1b24]'
                      }`}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CHALLENGE & SOLUTION SECTION
// ============================================
const ChallengeSection = ({ project, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div style={{
          backgroundImage: 'radial-gradient(#ed1b24 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          height: '100%'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`p-8 lg:p-10 rounded-2xl border ${
              isDark 
                ? 'bg-black border-white/5' 
                : 'bg-white border-gray-200 shadow-lg'
            }`}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
              isDark ? 'bg-[#ed1b24]/10' : 'bg-red-50'
            }`}>
              <svg className="w-7 h-7 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>The Challenge</h3>
            <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.challenge}</p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-8 lg:p-10 rounded-2xl border ${
              isDark 
                ? 'bg-black border-[#ed1b24]/20' 
                : 'bg-white border-red-100 shadow-lg'
            }`}
          >
            <div className="w-14 h-14 bg-[#ed1b24] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Solution</h3>
            <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.solution}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// IMAGE GALLERY SECTION
// ============================================
const ImageGallery = ({ project, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState(null);
  const isDark = theme === 'dark';

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#ed1b24]"></span>
            <span className="text-[#ed1b24] font-bold uppercase tracking-widest text-xs">Gallery</span>
            <span className="h-px w-8 bg-[#ed1b24]"></span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Project <span className="font-normal text-[#ed1b24]">Images</span>
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {project.gallery.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group shadow-lg ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <div className={`${index === 0 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#ed1b24] rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={selectedImage}
                alt="Gallery Image"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ed1b24] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ============================================
// FEATURES SECTION
// ============================================
const FeaturesSection = ({ project, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#ed1b24]"></span>
              <span className="text-[#ed1b24] font-bold uppercase tracking-widest text-xs">Highlights</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Key <span className="font-normal text-[#ed1b24]">Features</span>
            </h2>

            <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              This project showcases exceptional attention to detail and innovative solutions
              that set new standards in the industry.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-black border-white/5 hover:border-[#ed1b24]/30' 
                      : 'bg-white border-gray-200 shadow-sm hover:border-[#ed1b24]/30 hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-[#ed1b24]/10' : 'bg-red-50'
                  }`}>
                    <svg className="w-4 h-4 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                src={project.gallery[1] || project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            {/* Decorative Border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#ed1b24]/20 rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// RELATED PROJECTS SECTION
// ============================================
const RelatedProjects = ({ currentProjectId, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';

  // Filter out current project
  const filteredProjects = relatedProjects.filter(p => p.id !== currentProjectId).slice(0, 3);

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#ed1b24]"></span>
              <span className="text-[#ed1b24] font-bold uppercase tracking-widest text-xs">Explore More</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Related <span className="font-normal text-[#ed1b24]">Projects</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className={`flex items-center gap-2 transition-colors group ${
              isDark ? 'text-white hover:text-[#ed1b24]' : 'text-gray-900 hover:text-[#ed1b24]'
            }`}
          >
            <span className="font-medium">View All Projects</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 shadow-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-[#ed1b24] text-white text-xs font-bold uppercase rounded">
                      {project.category}
                    </span>
                  </div>
                  {/* Hover Arrow */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                <h3 className={`text-xl font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-[#ed1b24]' : 'text-gray-900 group-hover:text-[#ed1b24]'
                }`}>
                  {project.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const ProjectCTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-[#ed1b24] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -left-40 -top-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
            Inspired by This Project?
          </h2>
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Let's discuss how we can bring your vision to life with the same dedication and expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-10 py-5 bg-white text-[#ed1b24] font-bold text-lg rounded-lg hover:bg-black hover:text-white transition-all duration-300 shadow-xl"
            >
              Start Your Project
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/projects"
              className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-[#ed1b24] transition-all duration-300"
            >
              View More Projects
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PROJECT DETAILS PAGE
// ============================================
export default function ProjectDetailsPage() {
  const { theme } = useTheme();
  const params = useParams();
  const projectId = params.id;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top instantly on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [projectId]);

  // Fetch project from Supabase or use static data
  // Fetch project from Supabase or use static data
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);

      // 1. First check if it's a static project ID (1-15)
      if (staticProjectsData[projectId]) {
        setProject(staticProjectsData[projectId]);
        setLoading(false);
        return;
      }

      // 2. VALIDATION: Check if projectId is a valid UUID
      // This prevents sending "16", "abc", etc. to Supabase which causes "invalid input syntax for type uuid"
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);

      if (!isUuid) {
        console.warn(`Project ID "${projectId}" is not in static data and is not a valid UUID.`);
        setProject(null);
        setLoading(false);
        return;
      }

      // 3. Try to fetch from Supabase (Only if it's a UUID)
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (error) throw error;

        if (data) {
          // Transform Supabase data to match expected format
          const heroImage = data.hero_image || data.image_url || defaultImages[data.category?.toLowerCase()] || defaultImages.default;
          
          const transformedProject = {
            id: data.id.toString(),
            title: data.title || 'Untitled Project',
            subtitle: data.subtitle || data.description?.substring(0, 50) || 'Project Details',
            category: data.category || 'Commercial',
            location: data.location || 'Dubai',
            client: data.client || 'Private Client',
            year: data.year || new Date().getFullYear().toString(),
            duration: data.duration || '24 Months',
            value: data.value || 'N/A',
            area: data.area || 'N/A',
            status: data.status || 'In Progress',
            heroImage: heroImage,
            description: data.description || 'A prestigious project showcasing excellence in construction and design.',
            challenge: data.challenge || 'Delivering exceptional quality while meeting strict timelines and budget constraints.',
            solution: data.solution || 'Our team implemented innovative solutions and maintained rigorous quality control throughout the project lifecycle.',
            features: data.features || [
              'Premium quality materials',
              'Sustainable design',
              'Smart building systems'
            ],
            gallery: data.gallery && data.gallery.length > 0 ? data.gallery : [heroImage, ...defaultGalleryImages.slice(0, 5)],
            services: data.services || ['Project Development', 'Construction Management'],
            tags: data.tags || [data.category || 'Commercial']
          };
          setProject(transformedProject);
        } else {
          setProject(null);
        }
      } catch (error) {
        // Improved error logging to see the actual message
        console.error('Supabase Error:', error.message || error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  // Loading state
  if (loading) {
    return (
      <main className={`w-full min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ fontFamily: "'Archivo', sans-serif" }}>
        <div className="w-12 h-12 border-4 border-[#ed1b24] border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  // Handle project not found
  if (!project) {
    return (
      <main className={`w-full min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ fontFamily: "'Archivo', sans-serif" }}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Project Not Found</h1>
          <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>The project you're looking for doesn't exist.</p>
          <Link
            href="/projects"
            className="px-8 py-4 bg-[#ed1b24] text-white font-bold rounded-lg hover:bg-white hover:text-[#ed1b24] transition-all"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`w-full selection:bg-[#ed1b24] selection:text-white transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`} style={{ fontFamily: "'Archivo', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      <Header />
      <ProjectHero project={project} theme={theme} />
      <ProjectStats project={project} theme={theme} />
      <ProjectOverview project={project} theme={theme} />
      <ChallengeSection project={project} theme={theme} />
      <ImageGallery project={project} theme={theme} />
      <FeaturesSection project={project} theme={theme} />
      <RelatedProjects currentProjectId={projectId} theme={theme} />
      <ProjectCTA />
      <Footer />
    </main>
  );
}