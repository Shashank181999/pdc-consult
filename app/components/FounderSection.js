'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FounderSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  const achievements = [
    {
      number: "23+",
      label: "Years Experience"
    },
    {
      number: "$5B+",
      label: "Projects Managed"
    },
    {
      number: "200+",
      label: "Successful Developments"
    },
    {
      number: "2001",
      label: "UAE Property Pioneer"
    }
  ];

  const credentials = [
    {
      title: "MSc. Real Estate Development",
      institution: "American Academy U.S.A",
      type: "Master's Degree"
    },
    {
      title: "PMP® Certified",
      institution: "Project Management Institute",
      type: "Professional Certification"
    },
    {
      title: "B.Arch. Architecture",
      institution: "Architectural Engineering",
      type: "Bachelor's Degree"
    }
  ];

  const expertise = [
    "Site Identification & Feasibility",
    "Financial Analysis & Acquisition",
    "Master Planning & Design Review",
    "Project Development & Oversight",
    "Revenue & Profit Optimization",
    "Corporate Visibility Strategy"
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-black py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');

        .heading-font {
          font-family: 'Archivo', sans-serif;
        }

        .body-font {
          font-family: 'Archivo', sans-serif;
        }

        .founder-card {
          background: linear-gradient(135deg, rgba(15, 15, 15, 0.98) 0%, rgba(25, 25, 25, 0.98) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(237, 27, 36, 0.08) 0%, rgba(20, 20, 20, 0.95) 100%);
          border: 1px solid rgba(237, 27, 36, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ed1b24, transparent);
          transform: scaleX(0);
          transition: transform 0.6s ease;
        }

        .stat-card:hover::before {
          transform: scaleX(1);
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(237, 27, 36, 0.5);
        }

        .credential-badge {
          background: linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%);
          border: 1px solid rgba(237, 27, 36, 0.3);
          border-left: 3px solid #ed1b24;
          transition: all 0.3s ease;
        }

        .credential-badge:hover {
          border-color: #ed1b24;
          transform: translateX(8px);
        }

        .expertise-pill {
          background: rgba(237, 27, 36, 0.1);
          border: 1px solid rgba(237, 27, 36, 0.3);
          transition: all 0.3s ease;
        }

        .expertise-pill:hover {
          background: rgba(237, 27, 36, 0.2);
          border-color: rgba(237, 27, 36, 0.6);
          transform: scale(1.05);
        }

        .profile-image-container {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
        }

        .profile-image-container::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #ed1b24, #ff4444, #ed1b24);
          border-radius: 24px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .profile-image-container:hover::before {
          opacity: 1;
        }

        .quote-mark {
          font-size: 120px;
          line-height: 0.8;
          color: rgba(237, 27, 36, 0.15);
          font-family: Georgia, serif;
          position: absolute;
        }

        .signature {
          font-family: 'Archivo', sans-serif;
          font-size: 28px;
          font-style: italic;
          color: #ed1b24;
          font-weight: 500;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .floating {
          animation: float 4s ease-in-out infinite;
        }

        .red-accent-line {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #ed1b24, transparent);
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]">
          <div style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(237, 27, 36, 0.2) 1px, transparent 0)',
            backgroundSize: '60px 60px',
            height: '100%'
          }}></div>
        </div>
        <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-[#ed1b24] rounded-full blur-[180px] opacity-[0.06]"></div>
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[#ed1b24] rounded-full blur-[150px] opacity-[0.06]"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-5"
          >
            <div className="px-5 py-2.5 rounded-full border-2 border-[#ed1b24] bg-[#ed1b24]/5">
              <span className="text-[#ed1b24] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase body-font">
                Leadership
              </span>
            </div>
          </motion.div>
          
          <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4">
            Visionary{" "}
            <span className="text-[#ed1b24] font-normal">Leadership</span>
          </h2>
          
          <div className="red-accent-line mx-auto mt-6"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 mb-16 sm:mb-20">
          
          {/* Left Column - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            {/* Profile Image */}
            <div className="relative mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="profile-image-container"
              >
                <div className="aspect-[3/4] sm:aspect-[4/5] md:aspect-square bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden border border-white/5">
                  {/* Owner Image */}
                  <img 
                    src="/owner1.png" 
                    alt="Marwa Abd El Aziz - Founder & Managing Director"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#ed1b24] to-[#c41119] rounded-2xl p-6 floating"
              >
                <div className="text-center">
                  <div className="text-3xl font-black text-white body-font">23+</div>
                  <div className="text-xs text-white/90 font-semibold uppercase tracking-wider body-font">Years</div>
                </div>
              </motion.div>
            </div>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="heading-font text-2xl font-medium text-white mb-6">
                Credentials & Education
              </h3>
              
              {credentials.map((cred, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="credential-badge rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#ed1b24] flex-shrink-0 mt-3"></div>
                    <div className="flex-1">
                      <h4 className="body-font font-bold text-white text-base sm:text-lg mb-1">
                        {cred.title}
                      </h4>
                      <p className="body-font text-gray-400 text-sm mb-1">
                        {cred.institution}
                      </p>
                      <span className="body-font text-[#ed1b24] text-xs font-semibold uppercase tracking-wider">
                        {cred.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Bio & Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="founder-card rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative order-1 lg:order-2"
          >
            {/* Quote Mark - Hidden on mobile */}
            <div className="quote-mark absolute -top-4 left-4 hidden md:block">"</div>

            {/* Title & Name */}
            <div className="relative z-10 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="body-font text-[#ed1b24] text-sm font-bold tracking-[0.2em] uppercase mb-3">
                  Founder & Managing Director
                </p>
                <h3 className="heading-font text-4xl sm:text-5xl md:text-6xl font-light text-white mb-2">
                  Marwa Abd El Aziz
                </h3>
                <p className="body-font text-gray-400 text-base font-medium">
                  MSc. Real Estate Development | B.Arch. | PMP®
                </p>
              </motion.div>
            </div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8 space-y-4"
            >
              <p className="body-font text-gray-300 text-base sm:text-lg leading-relaxed">
                Marwa is a <span className="text-white font-semibold">pioneer and expert</span> in developing projects to build revenue, profits and corporate visibility with extensive experience in all facets of projects.
              </p>
              
              <p className="body-font text-gray-300 text-base sm:text-lg leading-relaxed">
                Starting with site identification, developing and overseeing the implementation of feasibility plans for projects, she actively participates in financial analysis, acquisition, master planning, design review and tendering.
              </p>
              
              <p className="body-font text-gray-300 text-base sm:text-lg leading-relaxed">
                Since <span className="text-[#ed1b24] font-bold">2001</span>, she has been a driving force in the UAE Property Development industry, coordinating administrative activities for construction projects with an overall budget exceeding <span className="text-[#ed1b24] font-bold">$5 billion</span>.
              </p>
            </motion.div>

            {/* Expertise Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="body-font text-white font-medium text-lg mb-4">
                Core Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="expertise-pill px-4 py-2 rounded-full text-[#ed1b24] text-sm font-semibold body-font cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 pt-8 border-t border-white/10"
            >
              <div className="signature">Marwa Abd El Aziz</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {achievements.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1, type: "spring" }}
              whileHover={{ y: -8 }}
              className="stat-card rounded-2xl p-6 sm:p-8 md:p-10 text-center cursor-pointer"
            >
              <div className="heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-3 sm:mb-4">
                {stat.number}
              </div>
              <div className="body-font text-gray-400 text-xs sm:text-sm md:text-base font-normal uppercase tracking-wider leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#ed1b24] to-[#c41119] text-white font-bold text-base rounded-xl hover:shadow-2xl hover:shadow-red-900/50 transition-all body-font"
          >
            <span>Connect on LinkedIn</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default FounderSection;