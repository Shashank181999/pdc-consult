'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../admin/supabase';

// ============================================
// DEFAULT/FALLBACK IMAGES BY CATEGORY
// ============================================
const defaultImages = {
  hospitality: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
  residential: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
  commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  'mixed-use': 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1200&auto=format&fit=crop',
  renovations: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop'
};

// ============================================
// STATIC PROJECT DATA (FALLBACK)
// ============================================
const staticProjects = [
  {
    id: '1',
    title: 'The Royal Atlantis',
    category: 'hospitality',
    sector: 'hospitality',
    location: 'Palm Jumeirah',
    value: '$1.4B',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
    featured: true
  },
  {
    id: '2',
    title: 'Marina Gate Towers',
    category: 'residential',
    sector: 'high-rise',
    location: 'Dubai Marina',
    value: '$890M',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    featured: true
  },
  {
    id: '3',
    title: 'DIFC Innovation Hub',
    category: 'commercial',
    sector: 'high-rise',
    location: 'DIFC, Dubai',
    value: '$620M',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    featured: true
  },
  {
    id: '4',
    title: 'Emirates Hills Estate',
    category: 'residential',
    sector: 'villas',
    location: 'Emirates Hills',
    value: '$45M',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '5',
    title: 'Burj Vista Tower',
    category: 'residential',
    sector: 'high-rise',
    location: 'Downtown Dubai',
    value: '$520M',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '6',
    title: 'Palm Jumeirah Resort',
    category: 'hospitality',
    sector: 'hospitality',
    location: 'Palm Jumeirah',
    value: '$380M',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '7',
    title: 'Business Bay Complex',
    category: 'mixed-use',
    sector: 'high-rise',
    location: 'Business Bay',
    value: '$750M',
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '8',
    title: 'Creek Harbor Mall',
    category: 'commercial',
    sector: 'retail',
    location: 'Dubai Creek',
    value: '$420M',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '9',
    title: 'Al Barari Villas',
    category: 'residential',
    sector: 'villas',
    location: 'Al Barari',
    value: '$85M',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '10',
    title: 'Dubai Healthcare City',
    category: 'commercial',
    sector: 'healthcare',
    location: 'Healthcare City',
    value: '$350M',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '11',
    title: 'Jumeirah Beach Hotel Renovation',
    category: 'renovations',
    sector: 'hospitality',
    location: 'Jumeirah Beach',
    value: '$180M',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '12',
    title: 'Knowledge Village Campus',
    category: 'commercial',
    sector: 'education',
    location: 'Dubai Knowledge Park',
    value: '$220M',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '13',
    title: 'Jebel Ali Port Expansion',
    category: 'commercial',
    sector: 'infrastructure',
    location: 'Jebel Ali',
    value: '$1.2B',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '14',
    title: 'Palm Residences',
    category: 'residential',
    sector: 'villas',
    location: 'Palm Jumeirah',
    value: '$95M',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    featured: false
  },
  {
    id: '15',
    title: 'City Walk Extension',
    category: 'mixed-use',
    sector: 'retail',
    location: 'City Walk',
    value: '$580M',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop',
    featured: false
  }
];

// Helper function to get fallback image
const getProjectImage = (project) => {
  if (project.hero_image) return project.hero_image;
  if (project.image_url) return project.image_url;
  if (project.image && project.image.startsWith('http')) return project.image;
  return defaultImages[project.category] || defaultImages.default;
};

// Categories and Sectors for filtering
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'residential', name: 'Residential Buildings' },
  { id: 'commercial', name: 'Commercial & Office' },
  { id: 'mixed-use', name: 'Mixed Use Developments' },
  { id: 'hospitality', name: 'Hotels & Hospitality' },
  { id: 'renovations', name: 'Renovations' }
];

const sectors = [
  { id: 'all', name: 'All Sectors' },
  { id: 'high-rise', name: 'High Rise Towers' },
  { id: 'villas', name: 'Villas & Master Plans' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'retail', name: 'Retail & Commercial' },
  { id: 'education', name: 'Education' }
];

// Hero images for different categories and sectors
const heroImages = {
  // Categories
  all: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000&auto=format&fit=crop',
  residential: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
  commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
  'mixed-use': 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000&auto=format&fit=crop',
  hospitality: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop',
  renovations: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop',
  // Sectors
  'high-rise': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
  villas: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop',
  healthcare: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop',
  infrastructure: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2000&auto=format&fit=crop',
  retail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000&auto=format&fit=crop',
  education: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop'
};

// Number of projects to show initially and per load
const INITIAL_PROJECTS = 6;
const PROJECTS_PER_LOAD = 6;

// ============================================
// PROJECTS HERO
// ============================================
const ProjectsHero = ({ activeCategory, activeSector }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Get display title based on filter
  const getTitle = () => {
    if (activeSector && activeSector !== 'all') {
      const sector = sectors.find(s => s.id === activeSector);
      return sector ? sector.name : 'Projects';
    }
    if (activeCategory && activeCategory !== 'all') {
      const category = categories.find(c => c.id === activeCategory);
      return category ? category.name : 'Projects';
    }
    return 'All Projects';
  };

  // Get hero image based on active filter
  const getHeroImage = () => {
    if (activeSector && activeSector !== 'all') {
      return heroImages[activeSector] || heroImages.all;
    }
    if (activeCategory && activeCategory !== 'all') {
      return heroImages[activeCategory] || heroImages.all;
    }
    return heroImages.all;
  };

  return (
    <section ref={heroRef} className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[400px] sm:min-h-[500px] flex items-center justify-center bg-black overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={getHeroImage()}
          alt="Dubai Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
      </motion.div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm"
        >
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
          <span className="text-gray-600">/</span>
          <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link>
          {(activeCategory !== 'all' || activeSector !== 'all') && (
            <>
              <span className="text-gray-600">/</span>
              <span className="text-[#ed1b24]">{getTitle()}</span>
            </>
          )}
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 bg-[#ed1b24] rounded-full animate-pulse"></span>
          <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wide">Our Portfolio</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[0.95] mb-4 sm:mb-6 px-2"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] to-[#ff6b6b]">{getTitle()}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4"
        >
          Transforming visions into landmarks across the UAE and MENA region
        </motion.p>
      </motion.div>
    </section>
  );
};

// ============================================
// FILTER SECTION
// ============================================
const FilterSection = ({ activeCategory, activeSector, onCategoryChange, onSectorChange, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (catId) => {
    onCategoryChange(catId);
    if (onFilterChange) onFilterChange();
  };

  const handleSectorChange = (sectorId) => {
    onSectorChange(sectorId);
    setShowFilters(false);
    if (onFilterChange) onFilterChange();
  };

  return (
    <section className="sticky top-[72px] z-40 bg-black/95 backdrop-blur-lg border-b border-white/10 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#ed1b24] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sector Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Sector: {sectors.find(s => s.id === activeSector)?.name || 'All'}</span>
              <svg className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                {sectors.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => handleSectorChange(sector.id)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      activeSector === sector.id
                        ? 'bg-[#ed1b24] text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {sector.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROJECTS GRID
// ============================================
const ProjectsGrid = ({ projects, visibleCount, onLoadMore, isLoading }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [hoveredId, setHoveredId] = useState(null);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;
  const remainingCount = projects.length - visibleCount;

  if (projects.length === 0) {
    return (
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
          <p className="text-gray-400 mb-8">No projects match your current filter criteria.</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ed1b24] text-white font-medium rounded-lg hover:bg-white hover:text-[#ed1b24] transition-all"
          >
            View All Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <p className="text-gray-400">
            Showing <span className="text-white font-medium">{visibleProjects.length}</span> of <span className="text-white font-medium">{projects.length}</span> projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group ${project.featured ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <Link href={`/projects/${project.id}`} className="block h-full">
                <div className="relative overflow-hidden rounded-2xl h-[300px] sm:h-[350px] bg-[#111] border border-white/5 hover:border-[#ed1b24]/30 transition-all duration-500">
                  {/* Image */}
                  <motion.img
                    animate={{ scale: hoveredId === project.id ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
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

                  {/* Value Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-white text-sm font-bold">{project.value}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="inline-block w-fit px-3 py-1 bg-[#ed1b24] text-white text-xs font-bold uppercase tracking-wider rounded mb-3">
                      {categories.find(c => c.id === project.category)?.name || project.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#ed1b24] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {project.location}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      scale: hoveredId === project.id ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 left-4 w-10 h-10 bg-[#ed1b24] rounded-full flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-white -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center mt-12"
          >
            <motion.button
              onClick={onLoadMore}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-4 bg-transparent border-2 border-[#ed1b24] text-white font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#ed1b24]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Button Background Animation */}
              <span className="absolute inset-0 bg-[#ed1b24] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              
              {/* Button Content */}
              <span className="relative flex items-center gap-3">
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Projects</span>
                    <span className="px-2 py-0.5 bg-white/10 group-hover:bg-white/20 rounded-full text-sm transition-colors">
                      +{Math.min(PROJECTS_PER_LOAD, remainingCount)}
                    </span>
                    <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>

            {/* Remaining Count Text */}
            <p className="mt-4 text-gray-500 text-sm">
              {remainingCount} more project{remainingCount !== 1 ? 's' : ''} to explore
            </p>
          </motion.div>
        )}

        {/* All Projects Loaded Message */}
        {!hasMore && projects.length > INITIAL_PROJECTS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center mt-12"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>All {projects.length} projects loaded</span>
            </div>
          </motion.div>
        )}
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
    <section ref={sectionRef} className="relative py-16 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 sm:p-8 bg-black/50 rounded-2xl border border-white/5 hover:border-[#ed1b24]/30 transition-colors"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">{stat.label}</div>
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
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#ed1b24] via-[#c41119] to-[#8b0000] overflow-hidden">
      <div className="absolute -left-40 -top-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
          Have a Project in Mind?
        </h2>
        <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          Let's transform your vision into an iconic landmark
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-5 bg-white text-[#ed1b24] font-bold text-lg rounded-xl hover:bg-black hover:text-white transition-colors duration-300"
            >
              Start Your Project
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-[#ed1b24] transition-colors duration-300"
          >
            Download Brochure
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN CONTENT COMPONENT (with useSearchParams)
// ============================================
function ProjectsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSector, setActiveSector] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECTS);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          // Transform Supabase data to match expected format
          const transformedProjects = data.map((project, index) => ({
            id: project.id.toString(),
            title: project.title,
            category: project.category || 'commercial',
            sector: project.sector || 'high-rise',
            location: project.location || 'Dubai',
            value: project.value || 'N/A',
            image: getProjectImage(project),
            featured: index < 3,
            description: project.description,
            client: project.client,
            status: project.status
          }));
          setProjects(transformedProjects);
        } else {
          // Use static projects as fallback if no data
          setProjects(staticProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Use static projects as fallback on error
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Read filters from URL on mount and when URL changes
  useEffect(() => {
    const category = searchParams.get('category');
    const sector = searchParams.get('sector');

    if (category) setActiveCategory(category);
    if (sector) setActiveSector(sector);
  }, [searchParams]);

  // Update URL when filters change
  const updateFilters = (category, sector) => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (sector !== 'all') params.set('sector', sector);

    const newUrl = params.toString() ? `/projects?${params.toString()}` : '/projects';
    window.history.pushState({}, '', newUrl);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    updateFilters(category, activeSector);
  };

  const handleSectorChange = (sector) => {
    setActiveSector(sector);
    updateFilters(activeCategory, sector);
  };

  // Reset visible count when filters change
  const handleFilterChange = () => {
    setVisibleCount(INITIAL_PROJECTS);
  };

  // Load more projects
  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleCount(prev => prev + PROJECTS_PER_LOAD);
      setLoadingMore(false);
    }, 500);
  };

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchSector = activeSector === 'all' || project.sector === activeSector;
    return matchCategory && matchSector;
  });

  // Scroll to top instantly on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <Header />
      <ProjectsHero activeCategory={activeCategory} activeSector={activeSector} />
      <FilterSection
        activeCategory={activeCategory}
        activeSector={activeSector}
        onCategoryChange={handleCategoryChange}
        onSectorChange={handleSectorChange}
        onFilterChange={handleFilterChange}
      />
      {loading ? (
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#ed1b24] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </section>
      ) : (
        <ProjectsGrid 
          projects={filteredProjects} 
          visibleCount={visibleCount}
          onLoadMore={handleLoadMore}
          isLoading={loadingMore}
        />
      )}
      <StatsSection />
      <CTASection />
      <Footer />
    </>
  );
}

// ============================================
// MAIN PAGE WITH SUSPENSE
// ============================================
export default function ProjectsPage() {
  return (
    <main className="w-full bg-black selection:bg-[#ed1b24] selection:text-white" style={{ fontFamily: "'Archivo', sans-serif" }}>
      <Suspense fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#ed1b24] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}