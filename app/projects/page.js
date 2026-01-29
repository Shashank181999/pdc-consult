'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Categories and Sectors matching admin form
const projectCategories = [
  { id: 'all', name: 'All Categories' },
  { id: 'residential', name: 'Residential Buildings' },
  { id: 'commercial', name: 'Commercial & Office' },
  { id: 'mixed-use', name: 'Mixed Use Developments' },
  { id: 'hospitality', name: 'Hotels & Hospitality' },
  { id: 'renovations', name: 'Renovations' }
];

const projectSectors = [
  { id: 'all', name: 'All Sectors' },
  { id: 'high-rise', name: 'High Rise Towers' },
  { id: 'villas', name: 'Villas & Master Plans' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'retail', name: 'Retail & Commercial' },
  { id: 'education', name: 'Education' },
  { id: 'oil-gas', name: 'Oil & Gas' }
];

// ============================================
// SMOOTH PROJECTS HERO
// ============================================
const ProjectsHero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000&auto=format&fit=crop"
          alt="Dubai Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
      </motion.div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-[#ed1b24] rounded-full animate-pulse"></span>
          <span className="text-white/90 text-sm font-medium tracking-wide">Our Portfolio</span>
        </motion.div>

        {/* Main Title with Stagger */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9]"
          >
            Iconic
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] to-[#ff6b6b]">Projects</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Transforming visions into landmarks across the UAE and MENA region
        </motion.p>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-12 sm:gap-16"
        >
          {[
            { value: '200+', label: 'Projects' },
            { value: '$5B+', label: 'Value' },
            { value: '15+', label: 'Years' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center group cursor-default"
            >
              <div className="text-4xl sm:text-5xl font-bold text-white group-hover:text-[#ed1b24] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-widest mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-white/50 text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#ed1b24] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// FEATURED PROJECTS - HORIZONTAL SCROLL STYLE
// ============================================
const FeaturedProjects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featuredProjects = [
    {
      id: '1',
      title: 'The Royal Atlantis',
      category: 'Luxury Hotel',
      location: 'Palm Jumeirah',
      value: '$1.4B',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Marina Gate Towers',
      category: 'Residential',
      location: 'Dubai Marina',
      value: '$890M',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: '3',
      title: 'DIFC Innovation Hub',
      category: 'Commercial',
      location: 'DIFC, Dubai',
      value: '$620M',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop',
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ed1b24] rounded-full blur-[300px] opacity-[0.03]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-[#ed1b24]"
            />
            <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Featured Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white">
            Landmark <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] to-[#ff6b6b]">Developments</span>
          </h2>
        </motion.div>

        {/* Featured Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/projects/${project.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-[#111] border border-white/5 hover:border-[#ed1b24]/30 transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                    {/* Value Badge */}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                      <span className="text-white font-bold">{project.value}</span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block px-3 py-1 bg-[#ed1b24] text-white text-xs font-bold uppercase tracking-wider rounded mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[#ed1b24] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-sm">{project.location}</span>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute bottom-6 right-6 w-12 h-12 bg-[#ed1b24] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-white -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.div>
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
// FILTER TABS
// ============================================
const FilterTabs = ({ activeFilter, setActiveFilter }) => {
  const filters = ['All', 'Residential', 'Commercial', 'Hospitality', 'Mixed Use'];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveFilter(filter)}
          className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
            activeFilter === filter
              ? 'bg-[#ed1b24] text-white shadow-lg shadow-[#ed1b24]/25'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
          }`}
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
};

// ============================================
// PROJECTS GRID - BENTO STYLE
// ============================================
const ProjectsGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [
    { id: '1', title: 'The Royal Atlantis', category: 'Hospitality', location: 'Palm Jumeirah', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop', span: 'col-span-2 row-span-2' },
    { id: '2', title: 'Marina Gate', category: 'Residential', location: 'Dubai Marina', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop', span: '' },
    { id: '3', title: 'DIFC Tower', category: 'Commercial', location: 'DIFC', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', span: '' },
    { id: '4', title: 'Emirates Estate', category: 'Residential', location: 'Emirates Hills', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop', span: 'row-span-2' },
    { id: '5', title: 'Business Bay', category: 'Commercial', location: 'Business Bay', image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=800&auto=format&fit=crop', span: '' },
    { id: '6', title: 'Palm Resort', category: 'Hospitality', location: 'Palm Jumeirah', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop', span: 'col-span-2' },
    { id: '5', title: 'Creek Residences', category: 'Residential', location: 'Dubai Creek', image: 'https://images.unsplash.com/photo-1565761318617-1c81c2936972?q=80&w=800&auto=format&fit=crop', span: '' },
    { id: '6', title: 'JBR Complex', category: 'Mixed Use', location: 'JBR Walk', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop', span: '' },
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
            All <span className="font-normal text-[#ed1b24]">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Explore our complete portfolio of successful developments
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.id}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`${project.span} relative group`}
            >
              <Link href={`/projects/${project.id}`} className="block h-full">
                <div className={`relative overflow-hidden rounded-2xl h-full ${
                  project.span?.includes('row-span-2') ? 'min-h-[500px]' : 'min-h-[250px]'
                }`}>
                  {/* Image */}
                  <motion.img
                    animate={{ scale: hoveredId === project.id ? 1.1 : 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    hoveredId === project.id
                      ? 'bg-gradient-to-t from-black via-black/60 to-black/30'
                      : 'bg-gradient-to-t from-black/80 via-black/30 to-transparent'
                  }`}></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <motion.div
                      animate={{ y: hoveredId === project.id ? 0 : 10, opacity: hoveredId === project.id ? 1 : 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="inline-block px-2.5 py-1 bg-[#ed1b24]/90 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{project.title}</h3>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {project.location}
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      scale: hoveredId === project.id ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-[#ed1b24] rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-[#ed1b24] hover:border-[#ed1b24] transition-all duration-300"
          >
            <span className="flex items-center gap-3">
              Load More Projects
              <motion.svg
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// STATS SECTION
// ============================================
const StatsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { value: '$5B+', label: 'Projects Managed', icon: '💰' },
    { value: '200+', label: 'Projects Delivered', icon: '🏗️' },
    { value: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { value: '15+', label: 'Years Experience', icon: '📅' }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-[#0a0a0a] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(237,27,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(237,27,36,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative p-8 bg-black/50 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-[#ed1b24]/30 transition-all duration-300 text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:text-[#ed1b24] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
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
const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ed1b24] via-[#c41119] to-[#8b0000]"></div>

      {/* Animated Shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -left-40 -top-40 w-80 h-80 border border-white/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 -bottom-20 w-60 h-60 border border-white/10 rounded-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6"
          >
            Have a Project in Mind?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
          >
            Let's transform your vision into an iconic landmark
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-[#ed1b24] font-bold text-lg rounded-full hover:bg-black hover:text-white transition-colors duration-300"
            >
              Start Your Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-[#ed1b24] transition-colors duration-300"
            >
              Download Brochure
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function ProjectsPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-black selection:bg-[#ed1b24] selection:text-white" style={{ fontFamily: "'Archivo', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      <Header />
      <ProjectsHero />
      <FeaturedProjects />
      <ProjectsGrid />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
