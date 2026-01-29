'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VisionSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const testimonial = {
    quote: "FROM BLUEPRINTS TO BUILDINGS, WE'RE MAKING DREAMS TANGIBLE.",
    author: "Marwa Abd El Aziz",
    role: "Founder & Managing Director",
    image: "/Owner.png"
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-black py-20 sm:py-24 md:py-32 overflow-hidden">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');

        .heading-font {
          font-family: 'Oswald', sans-serif;
        }

        .body-font {
          font-family: 'Source Sans 3', sans-serif;
        }

        .quote-card {
          background: linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.95) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
        }

        .image-container {
          position: relative;
          overflow: hidden;
        }

        .image-container::before {
          content: '';
          position: absolute;
          inset: 0;
   
          z-index: 1;
        }

        .quote-mark {
          font-family: Georgia, serif;
          font-size: clamp(80px, 15vw, 180px);
          line-height: 0.8;
          color: #ed1b24;
          opacity: 0.15;
          position: absolute;
          z-index: 0;
        }

        .number-badge {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 700;
          color: rgba(237, 27, 36, 0.1);
          position: absolute;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .red-line {
          height: 4px;
          background: linear-gradient(90deg, #ed1b24, transparent);
          animation: slideIn 1s ease-out;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(237, 27, 36, 0.15) 1px, transparent 0)',
          backgroundSize: '60px 60px',
          height: '100%'
        }}></div>
      </div>

      <div className="absolute top-20 right-0 w-96 h-96 bg-[#ed1b24] rounded-full blur-[150px] opacity-[0.08]"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-5"
          >
            <div className="px-5 py-2.5 rounded-full border-2 border-[#ed1b24] bg-[#ed1b24]/5">
              <span className="text-[#ed1b24] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Our Vision
              </span>
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Building{" "}
            <span className="text-[#ed1b24] font-normal">Excellence</span>
          </h2>
        </motion.div>

        {/* Single Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center quote-card rounded-3xl p-8 xl:p-12 relative overflow-hidden">
            {/* Number Badge */}
       

            {/* Image Column */}
            <motion.div 
              className="lg:col-span-5 lg:order-1"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="image-container rounded-2xl overflow-hidden aspect-[4/5] relative">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover relative z-0"
                />
              </div>
            </motion.div>

            {/* Quote Column */}
            <div className="lg:col-span-7 lg:order-2">
              <div className="relative">
                {/* Quote Mark */}
                <div className="quote-mark absolute -top-8 left-0">"</div>

                {/* Red Line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="red-line w-20 sm:w-32 mb-8"
                ></motion.div>

                {/* Quote Text */}
                <h3 className="heading-font text-3xl sm:text-4xl xl:text-5xl font-bold text-white mb-8 leading-tight relative z-10">
                  {testimonial.quote}
                </h3>

                {/* Author */}
                <div>
                  <p className="body-font text-xl sm:text-2xl font-bold text-[#ed1b24] mb-2">
                    {testimonial.author}
                  </p>
                  <p className="body-font text-base sm:text-lg text-gray-400 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden quote-card rounded-3xl overflow-hidden relative">
            {/* Number Badge */}
      

            {/* Image */}
            <div className="image-container aspect-[16/10] sm:aspect-[21/9] relative">
              <img 
                src={testimonial.image}
                alt={testimonial.author}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 md:p-10 relative z-10">
              {/* Quote Mark */}
              <div className="quote-mark absolute -top-4 left-4 sm:left-6">"</div>

              {/* Red Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="red-line w-16 sm:w-24 mb-6"
              ></motion.div>

              {/* Quote Text */}
              <h3 className="heading-font text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight relative z-10">
                {testimonial.quote}
              </h3>

              {/* Author */}
              <div>
                <p className="body-font text-lg sm:text-xl font-bold text-[#ed1b24] mb-1">
                  {testimonial.author}
                </p>
                <p className="body-font text-sm sm:text-base text-gray-400 font-medium">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 sm:mt-20 md:mt-24"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#ed1b24] to-[#c41119] text-white font-bold text-base sm:text-lg rounded-xl hover:shadow-2xl hover:shadow-red-900/50 transition-all body-font"
          >
            <span>Discover Our Projects</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;