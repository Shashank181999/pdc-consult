'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const OrgDiagram = () => {
  const [activeTab, setActiveTab] = useState('training');
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  const trainingPrograms = [
    {
      title: "Project Planning & Control",
      description: "Master the fundamentals of project scheduling, resource allocation, and timeline management with real-world case studies.",
      duration: "5 Days",
      level: "Intermediate",
      participants: "120+",
      color: "from-red-900/20 to-transparent"
    },
    {
      title: "Human Resources Management",
      description: "Develop strategic HR capabilities for talent acquisition, performance management, and organizational development.",
      duration: "4 Days",
      level: "Advanced",
      participants: "95+",
      color: "from-orange-900/20 to-transparent"
    },
    {
      title: "Primavera V6.8.1 Corporate Training",
      description: "Comprehensive hands-on training on Oracle Primavera P6 for enterprise project management excellence.",
      duration: "6 Days",
      level: "Professional",
      participants: "200+",
      color: "from-red-800/20 to-transparent"
    },
    {
      title: "Project Management",
      description: "Complete project management methodology covering initiation, planning, execution, monitoring, and closure.",
      duration: "5 Days",
      level: "Intermediate",
      participants: "150+",
      color: "from-rose-900/20 to-transparent"
    },
    {
      title: "Customer Service Excellence",
      description: "Build world-class customer service skills and create memorable client experiences that drive loyalty.",
      duration: "3 Days",
      level: "Beginner",
      participants: "180+",
      color: "from-red-700/20 to-transparent"
    }
  ];

  const strategicServices = [
    {
      title: "Sales & Marketing Strategy",
      description: "Data-driven marketing planning, brand positioning, and comprehensive sales enablement programs for market leadership.",
      stats: "15+ Years Experience",
      color: "from-red-900/20 to-transparent"
    },
    {
      title: "Corporate Social Responsibility",
      description: "Develop impactful and sustainable CSR strategies that align with business objectives and community needs.",
      stats: "50+ CSR Projects",
      color: "from-orange-900/20 to-transparent"
    },
    {
      title: "Business Communication",
      description: "Executive communication mastery, presentation skills, and strategic stakeholder engagement techniques.",
      stats: "1000+ Executives",
      color: "from-red-800/20 to-transparent"
    },
    {
      title: "Quality Improvement",
      description: "Advanced process optimization, quality assurance frameworks, and continuous improvement methodologies.",
      stats: "85% Success Rate",
      color: "from-rose-900/20 to-transparent"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-black py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

        .heading-font {
          font-family: 'Playfair Display', serif;
        }

        .body-font {
          font-family: 'Montserrat', sans-serif;
        }

        .premium-card {
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ed1b24, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .premium-card:hover::before {
          opacity: 1;
        }

        .premium-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(237, 27, 36, 0.08), transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .premium-card:hover::after {
          opacity: 1;
        }

        .premium-card:hover {
          transform: translateY(-8px);
          border-color: rgba(237, 27, 36, 0.3);
        }

        .stat-badge {
          background: linear-gradient(135deg, rgba(237, 27, 36, 0.2) 0%, rgba(237, 27, 36, 0.05) 100%);
          border: 1px solid rgba(237, 27, 36, 0.3);
          backdrop-filter: blur(8px);
        }

        .tab-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #ed1b24, #ff4444);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glow-text {
          text-shadow: 0 0 40px rgba(237, 27, 36, 0.3);
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(237, 27, 36, 0.5), transparent);
          position: relative;
        }

        .divider-line::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: #ed1b24;
          border-radius: 50%;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #ed1b24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .number-badge {
          position: absolute;
          top: -10px;
          left: -10px;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ed1b24 0%, #c41119 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 18px;
          color: white;
          z-index: 10;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(237, 27, 36, 0.15) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="absolute top-20 right-0 w-96 h-96 bg-[#ed1b24] rounded-full blur-[150px] opacity-[0.08]"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#ed1b24] rounded-full blur-[150px] opacity-[0.08]"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="px-5 py-2.5 rounded-full border-2 border-[#ed1b24] bg-[#ed1b24]/5 backdrop-blur-sm">
              <span className="text-[#ed1b24] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Excellence in Education
              </span>
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1]" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Transform Your{" "}
            <span className="gradient-text font-normal">Future</span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Premium training programs and strategic consulting services crafted for ambitious professionals and forward-thinking organizations
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="divider-line max-w-md mx-auto mt-8"
          />
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative flex justify-center mb-16 sm:mb-20"
        >
          <div className="inline-flex bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-2 gap-2">
            <button
              onClick={() => setActiveTab('training')}
              className={`relative px-8 sm:px-10 py-4 text-sm sm:text-base font-bold rounded-xl transition-all body-font ${
                activeTab === 'training'
                  ? 'text-white bg-[#ed1b24]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="relative z-10">PM Corporate Training</span>
            </button>
            <button
              onClick={() => setActiveTab('strategic')}
              className={`relative px-8 sm:px-10 py-4 text-sm sm:text-base font-bold rounded-xl transition-all body-font ${
                activeTab === 'strategic'
                  ? 'text-white bg-[#ed1b24]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="relative z-10">Strategic Management</span>
            </button>
          </div>
        </motion.div>

        {/* Training Programs Grid */}
        {activeTab === 'training' && (
          <motion.div
            key="training"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-16"
          >
            {trainingPrograms.map((program, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="premium-card rounded-2xl p-7 sm:p-8 cursor-pointer group relative"
              >
                {/* Number Badge */}
                <div className="number-badge body-font">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Stats Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="stat-badge px-3 py-1.5 rounded-lg text-[#ed1b24] text-xs font-bold body-font">
                      {program.duration}
                    </span>
                    <span className="stat-badge px-3 py-1.5 rounded-lg text-[#ed1b24] text-xs font-bold body-font">
                      {program.level}
                    </span>
                    <span className="stat-badge px-3 py-1.5 rounded-lg text-gray-400 text-xs font-semibold body-font">
                      {program.participants} Trained
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="heading-font text-xl sm:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#ed1b24] transition-colors duration-300">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="body-font text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Action */}
                  <div className="flex items-center gap-3 text-[#ed1b24] font-bold text-sm body-font group-hover:gap-4 transition-all">
                    <span>Enroll Now</span>
                    <motion.svg
                      animate={{ x: hoveredCard === index ? 5 : 0 }}
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Strategic Services Grid */}
        {activeTab === 'strategic' && (
          <motion.div
            key="strategic"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8 max-w-6xl mx-auto mb-16"
          >
            {strategicServices.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="premium-card rounded-2xl p-8 sm:p-10 cursor-pointer group relative"
              >
                {/* Number Badge */}
                <div className="number-badge body-font">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Stats Badge */}
                  <div className="inline-block mb-6">
                    <span className="stat-badge px-4 py-2 rounded-lg text-[#ed1b24] text-xs font-bold body-font">
                      {service.stats}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="heading-font text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#ed1b24] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="body-font text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Action */}
                  <div className="flex items-center gap-3 text-[#ed1b24] font-bold text-sm body-font group-hover:gap-4 transition-all">
                    <span>Explore Service</span>
                    <motion.svg
                      animate={{ x: hoveredCard === index ? 5 : 0 }}
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-[#ed1b24] to-[#c41119] text-white font-bold text-base rounded-xl hover:shadow-2xl hover:shadow-red-900/50 transition-all body-font"
            >
              Download Complete Brochure
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-[#ed1b24] text-[#ed1b24] font-bold text-base rounded-xl hover:bg-[#ed1b24] hover:text-white transition-all body-font"
            >
              Schedule Consultation
            </motion.button>
          </div>

          <p className="body-font text-gray-500 text-sm mt-6">
            Join <span className="text-[#ed1b24] font-bold">2,500+</span> professionals who transformed their careers with us
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OrgDiagram;