'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ProjectBrochure = ({ theme = 'dark' }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = [
    {
      number: "01",
      title: "Project Development Consultancy",
      subtitle: "PDC Consult Services",
      description: "End-to-end project development solutions from feasibility studies to final delivery. We provide strategic guidance, risk assessment, and comprehensive planning to ensure your project's success from conception through completion.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      tags: ["Feasibility Studies", "Master Planning", "Risk Assessment"]
    },
    {
      number: "02",
      title: "Architectural Design and Urban Planning",
      subtitle: "PDC Consult Services",
      description: "Official representatives of Carlos Ott in UAE, GCC & Middle East. World-class architectural excellence combined with innovative urban planning solutions that create sustainable, iconic developments.",
      image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
      tags: ["Carlos Ott Partnership", "Urban Masterplanning", "Iconic Design"]
    },
    {
      number: "03",
      title: "Hospitality Projects",
      subtitle: "PDC Consult Services",
      description: "Specialized consultancy for luxury hotels, resorts, and hospitality ventures in the MENA region. From concept development to operational readiness, we deliver comprehensive solutions.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      tags: ["Hotel Development", "Resort Planning", "Brand Positioning"]
    },
    {
      number: "04",
      title: "Cost Management & Value Engineering",
      subtitle: "PDC Consult Services",
      description: "Strategic cost optimization and value engineering services that maximize project value while maintaining quality standards. Our expert analysis identifies cost-saving opportunities.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      tags: ["Budget Optimization", "Value Analysis", "Cost Modeling"]
    },
    {
      number: "05",
      title: "PM Corporate Training",
      subtitle: "PDC Consult Services",
      description: "Comprehensive project management training programs designed to elevate capabilities across your organization. Industry-certified courses and customized workshops.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      tags: ["PMP Certification", "Corporate Workshops", "Primavera Training"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Define colors based on theme
  const isDark = theme === 'dark';

  return (
    <section 
      ref={sectionRef} 
      className={`relative w-full py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');

        .heading-font, .body-font {
          font-family: 'Archivo', sans-serif;
        }

        /* Project Card Base Styles - Colors handled by Tailwind classes below */
        .project-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .project-card:hover {
          border-color: rgba(237, 27, 36, 0.4);
          transform: translateY(-6px);
        }

        .image-frame {
          position: relative;
          border: 2px solid #ed1b24;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .image-frame:hover {
          border-color: #ff2d38;
        }

        .image-frame img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover .image-frame img {
          transform: scale(1.05);
        }

        .number-label {
          font-family: 'Archivo', sans-serif;
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: #ed1b24;
          transition: all 0.3s ease;
        }

        .project-card:hover .number-label {
          transform: translateX(4px);
        }

        .red-underline {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #ed1b24, #ff4444);
          transition: width 0.4s ease;
        }

        .project-card:hover .red-underline {
          width: 120px;
        }

        .large-number {
          font-family: 'Archivo', sans-serif;
          transition: all 0.4s ease;
        }

        .project-card:hover .large-number {
          transform: scale(1.1);
          opacity: 0.3 !important;
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(237, 27, 36, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(237, 27, 36, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>

      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none"></div>

      {/* Gradient Overlays */}
      <div className={`absolute top-0 left-0 w-96 h-96 bg-[#ed1b24] rounded-full blur-[150px] pointer-events-none ${isDark ? 'opacity-[0.08]' : 'opacity-[0.05]'}`}></div>
      <div className={`absolute bottom-0 right-0 w-96 h-96 bg-[#ed1b24] rounded-full blur-[150px] pointer-events-none ${isDark ? 'opacity-[0.08]' : 'opacity-[0.05]'}`}></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-1.5 h-10 bg-[#ed1b24]"></div>
              {/* FIXED: Dynamic Text Color */}
              <h3 className={`heading-font text-3xl sm:text-4xl tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                <span className="text-[#ed1b24]">PDC</span> CONSULT
              </h3>
            </div>
          </div>

          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            /* FIXED: Dynamic Text Color */
            className={`heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-[1.1] ${isDark ? 'text-white' : 'text-black'}`}
          >
            Our Portfolio of{" "}
            <span className="font-semibold text-[#ed1b24]">Excellence</span>
          </motion.h2>
          
          {/* Subtitle Paragraph */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            /* FIXED: Dynamic Text Color */
            className={`body-font text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Delivering exceptional project development and construction management services across the UAE and MENA region
          </motion.p>

          <motion.div 
            className="red-underline mx-auto mt-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12 sm:space-y-16 md:space-y-20"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div 
                  /* FIXED: Card Background logic based on theme */
                  className={`project-card rounded-2xl p-6 sm:p-8 md:p-10 ${
                    isDark 
                      ? 'bg-[#111] border border-white/10' 
                      : 'bg-white border border-gray-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  <div className="number-label mb-4">{project.number}.</div>
                  <div className="image-frame rounded-xl aspect-[3/4] relative">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="space-y-6 sm:space-y-8">
                  {/* Number */}
                  <div className="flex items-center gap-4">
                    <span className="large-number heading-font text-7xl sm:text-8xl md:text-9xl font-light text-[#ed1b24] opacity-15">
                      {project.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    {/* FIXED: Title Color */}
                    <h3 className={`heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
                      {project.title}
                    </h3>
                    <p className="body-font text-[#ed1b24] text-sm sm:text-base font-bold uppercase tracking-widest">
                      {project.subtitle}
                    </p>
                    <div className="red-underline mt-5"></div>
                  </div>

                  {/* Description */}
                  {/* FIXED: Description Color */}
                  <p className={`body-font text-base sm:text-lg md:text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        /* FIXED: Tag Colors */
                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold body-font cursor-pointer border transition-all duration-300 ${
                          isDark 
                            ? 'bg-red-500/10 border-red-500/30 text-white hover:bg-[#ed1b24]' 
                            : 'bg-red-50 border-red-100 text-[#ed1b24] hover:bg-[#ed1b24] hover:text-white'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Link */}
                  <motion.button
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    /* FIXED: Button Colors */
                    className={`inline-flex items-center gap-3 font-bold text-base sm:text-lg body-font mt-4 transition-colors ${
                      isDark 
                        ? 'text-[#ed1b24] hover:text-white' 
                        : 'text-[#ed1b24] hover:text-black'
                    }`}
                  >
                    <span>Learn More</span>
                    <motion.svg 
                      className="w-5 h-5"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 sm:mt-24 md:mt-32"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-[#ed1b24] to-[#c41119] text-white font-semibold text-base sm:text-lg rounded-xl transition-all body-font relative overflow-hidden group shadow-lg"
          >
            <motion.span
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
              style={{ opacity: 0.1 }}
            ></motion.span>
            <span className="relative z-10">Download Full Brochure</span>
            <motion.svg 
              className="w-6 h-6 relative z-10"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </motion.svg>
          </motion.button>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            /* FIXED: Footer Text Color */
            className={`body-font text-sm sm:text-base mt-6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
          >
            Complete portfolio of our project development consultancy services
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectBrochure;