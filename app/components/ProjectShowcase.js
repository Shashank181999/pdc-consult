'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ProjectShowcase = ({ theme = 'dark' }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState(null);
  const isDark = theme === 'dark';

  const services = [
    {
      number: "01",
      title: "Project Development Consultancy",
      description: "Comprehensive project development services from conception to completion, ensuring strategic planning and flawless execution.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      features: ["Feasibility Studies", "Master Planning", "Risk Assessment", "Value Engineering"]
    },
    {
      number: "02",
      title: "Construction Management",
      description: "Expert oversight of construction projects with focus on quality, timeline adherence, and budget optimization.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
      features: ["Quality Control", "Timeline Management", "Budget Oversight", "Contractor Coordination"]
    },
    {
      number: "03",
      title: "Project Control & Monitoring",
      description: "Advanced project control systems ensuring milestones are met and resources are optimally allocated.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      features: ["Progress Tracking", "Cost Control", "Document Management", "Quality Assurance"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative w-full py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        .heading-font {
          font-family: 'Archivo', sans-serif;
        }

        .body-font {
          font-family: 'Inter', sans-serif;
        }

        /* Base Card Logic */
        .project-card {
          /* Colors handled by Tailwind */
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        /* Red Top Bar Animation */
        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #ed1b24;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
          z-index: 20;
        }

        .project-card:hover::before {
          transform: scaleX(1);
        }

        .project-card:hover {
          border-color: rgba(237, 27, 36, 0.4);
          transform: translateY(-4px);
        }

        .image-container {
          position: relative;
          overflow: hidden;
          background: #000;
        }

        .image-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
          z-index: 1;
        }

        .image-container img {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover .image-container img {
          transform: scale(1.08);
        }

        /* Tag Hover Effects only - base colors in Tailwind */
        .feature-tag {
          transition: all 0.3s ease;
        }
        
        .feature-tag:hover {
          transform: translateY(-2px);
        }

        .red-accent-bar {
          width: 80px;
          height: 3px;
          background: #ed1b24;
        }
      `}</style>

      {/* Background Elements */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-[0.01]' : 'opacity-[0.03]'}`}>
        <div style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          height: '100%'
        }}></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className={`px-5 py-2.5 rounded-full border-2 border-[#ed1b24] ${isDark ? 'bg-[#ed1b24]/5' : 'bg-red-50'}`}>
              <span className="text-[#ed1b24] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase body-font">
                PDC Consult Services
              </span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
            <div>
              <h2 className={`heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-[1.1] tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Project Development{" "}
                <span className="text-[#ed1b24] font-normal">Consultancy</span>
              </h2>
              <div className="red-accent-bar"></div>
            </div>
            
            <div>
              <p className={`body-font text-base sm:text-lg md:text-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Delivering comprehensive project development solutions across the UAE and MENA region with unmatched expertise and precision.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`project-card rounded-2xl overflow-hidden cursor-pointer group border ${
                isDark 
                  ? 'bg-gradient-to-br from-[#0f0f0f] to-[#191919] border-white/10' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}
            >
              {/* Image */}
              <div className="image-container aspect-[16/10] relative">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 z-10 p-6 sm:p-8 flex flex-col justify-end">
                  <div className="transform translate-y-0 transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="heading-font text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-2 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 relative z-10">
                <p className={`body-font text-sm sm:text-base leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className={`feature-tag px-3 py-1.5 rounded-lg text-xs font-semibold body-font cursor-pointer border ${
                        isDark 
                          ? 'bg-white/5 border-red-500/30 text-red-500 hover:bg-red-500/10' 
                          : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <motion.div 
                  className={`flex items-center gap-2 font-bold text-sm body-font group-hover:gap-3 transition-all ${isDark ? 'text-white' : 'text-gray-900'}`}
                  animate={{ x: hoveredCard === index ? 5 : 0 }}
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t pt-12 sm:pt-16 ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          {[
            { value: "250+", label: "Projects Delivered" },
            { value: "$5B+", label: "Value Managed" },
            { value: "23+", label: "Years Experience" },
            { value: "98%", label: "Client Satisfaction" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className={`heading-font text-4xl sm:text-5xl md:text-6xl font-light mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`body-font text-xs sm:text-sm font-normal uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center mt-16 sm:mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#ed1b24] text-white font-semibold text-base sm:text-lg rounded-xl transition-all body-font shadow-lg hover:shadow-xl hover:bg-red-700"
          >
            <span>View All Services</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;