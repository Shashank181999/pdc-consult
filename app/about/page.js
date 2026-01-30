'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ============================================
// ABOUT HERO
// ============================================
const AboutHero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop"
          alt="Dubai Skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
      </motion.div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-[#ed1b24] rounded-full animate-pulse"></span>
          <span className="text-white/90 text-sm font-medium tracking-wide">Since 2009</span>
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9]"
          >
            About
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] to-[#ff6b6b]">PDC Consult</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Building tomorrow's landmarks with vision, expertise, and unwavering commitment to excellence
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-white/50 text-xs uppercase tracking-[0.3em]">Discover</span>
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
// OUR STORY SECTION - IMAGE FOCUSED
// ============================================
const OurStorySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-2 relative rounded-2xl overflow-hidden aspect-[16/10]"
              >
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                  alt="Dubai Skyline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </motion.div>

              {/* Small Image 1 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden aspect-square"
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop"
                  alt="Office Interior"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Small Image 2 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden aspect-square"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                  alt="Architecture"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
              className="absolute -bottom-6 -right-6 bg-[#ed1b24] p-6 rounded-2xl shadow-2xl shadow-red-900/30"
            >
              <div className="text-center">
                <span className="text-4xl font-bold text-white">15+</span>
                <p className="text-white/90 text-sm font-medium mt-1">Years</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Our Story</span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mt-4 mb-8 leading-[1.1]">
              A Legacy of
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] to-[#ff6b6b]"> Excellence</span>
            </h2>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Founded in 2009, PDC Consult has grown from a boutique consultancy to become one of the
                most trusted names in project development across the UAE and MENA region.
              </p>
              <p>
                Our journey is defined by iconic projects, lasting partnerships, and an unwavering
                commitment to transforming visions into landmarks that stand the test of time.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
              {[
                { value: '$5B+', label: 'Projects Value' },
                { value: '200+', label: 'Projects' },
                { value: '50+', label: 'Clients' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// WHAT WE DO - IMAGE CARDS
// ============================================
const WhatWeDoSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      title: 'Project Development',
      description: 'End-to-end project development from concept to completion',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Construction Management',
      description: 'Expert oversight ensuring quality, timeline and budget adherence',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Hospitality Consulting',
      description: 'Specialized expertise for luxury hotels and resorts',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">What We Do</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mt-4">
            Our <span className="font-normal text-[#ed1b24]">Expertise</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl h-[450px]">
                {/* Image */}
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ed1b24] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{service.description}</p>

                  {/* Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mt-4 flex items-center gap-2 text-[#ed1b24] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span>Learn More</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// WHY CHOOSE US - SPLIT SECTION
// ============================================
const WhyChooseUsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const reasons = [
    { title: 'Regional Expertise', desc: 'Deep understanding of UAE & MENA markets' },
    { title: 'Proven Track Record', desc: '$5B+ in successfully delivered projects' },
    { title: 'End-to-End Solutions', desc: 'Complete project lifecycle management' },
    { title: 'Quality Assurance', desc: 'Uncompromising standards in every detail' }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Why PDC</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mt-4 mb-8 leading-[1.1]">
              Why Choose
              <span className="font-normal text-[#ed1b24]"> Us?</span>
            </h2>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#ed1b24]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ed1b24] transition-colors">
                    <span className="text-[#ed1b24] font-bold text-lg group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{reason.title}</h3>
                    <p className="text-gray-400">{reason.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                alt="Modern Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Quote Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-xl font-light italic leading-relaxed">
                  "Excellence is not a destination, it's a continuous journey of improvement."
                </p>
                <p className="text-[#ed1b24] font-semibold mt-4">— PDC Philosophy</p>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#ed1b24]/20 rounded-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ACHIEVEMENTS SECTION
// ============================================
const AchievementsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Big Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] to-[#ff6b6b] leading-none">
              $5B+
            </div>
            <p className="text-gray-400 text-xl mt-4">In Projects Managed</p>
          </motion.div>

          {/* Right - Achievement Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { number: '200+', label: 'Projects Completed', desc: 'Across residential, commercial, and hospitality sectors' },
              { number: '50+', label: 'Satisfied Clients', desc: 'From government entities to private developers' },
              { number: '15+', label: 'Years of Excellence', desc: 'Building trust since 2009' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-[#ed1b24]/30 transition-all"
              >
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-bold text-[#ed1b24]">{item.number}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.label}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// TEAM SECTION
// ============================================
const TeamSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const team = [
    { name: 'Marwa Abd El Aziz', role: 'Founder & Managing Director', image: '/Owner.png' },
    { name: 'Ahmed Hassan', role: 'Director of Operations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
    { name: 'Sara Al Maktoum', role: 'Head of Strategy', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop' },
    { name: 'Omar Khalil', role: 'Chief Financial Officer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Leadership</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mt-4">
            Meet the <span className="font-normal text-[#ed1b24]">Team</span>
          </h2>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ed1b24] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{member.role}</p>
                </div>

                {/* LinkedIn */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#ed1b24] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CLIENTS / PARTNERS SECTION
// ============================================
const ClientsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // All client logos from public/logo folder
  const clientLogos = [
    { src: '/logo/Government_of_Dubai_logo.svg', name: 'Government of Dubai' },
    { src: '/logo/the_private_office_of_sheikh_saeed_al_maktoum_logo.jpeg', name: 'Private Office of Sheikh Saeed Al Maktoum' },
    { src: '/logo/EMIRATESNBD.AE_BIG-5d0a63c2.png.webp', name: 'Emirates NBD' },
    { src: '/logo/NBAD_logo.jpg', name: 'NBAD' },
    { src: '/logo/etisalat-by-eand-en-1920x363_tcm771-311270.png', name: 'Etisalat' },
    { src: '/logo/ecc.jpg', name: 'ECC' },
    { src: '/logo/almajal_holding_1.png', name: 'Al Majal Holding' },
    { src: '/logo/abdulsamad_al_qurashi_0.jpg', name: 'Abdul Samad Al Qurashi' },
    { src: '/logo/3142F6tlt5L._SY400_.jpg', name: 'Client' },
    { src: '/logo/brand.gif', name: 'Client' },
    { src: '/logo/images.jpeg', name: 'Client' },
    { src: '/logo/images.png', name: 'Client' },
    { src: '/logo/images-2.jpeg', name: 'Client' },
    { src: '/logo/images-2.png', name: 'Client' },
    { src: '/logo/images-3.jpeg', name: 'Client' },
    { src: '/logo/images-3.png', name: 'Client' },
    { src: '/logo/images-4.jpeg', name: 'Client' },
    { src: '/logo/images-4.png', name: 'Client' },
  ];

  // Split logos for two rows
  const firstRow = clientLogos.slice(0, 9);
  const secondRow = clientLogos.slice(9);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-32 bg-black overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm">Trusted By</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mt-3 sm:mt-4">
            Our <span className="font-normal text-[#ed1b24]">Partners</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Trusted by leading organizations across the UAE and MENA region
          </p>
        </motion.div>

        {/* Infinite Marquee - First Row */}
        <div className="relative mb-4 sm:mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex overflow-hidden"
          >
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              className="flex gap-4 sm:gap-6 lg:gap-8 shrink-0"
            >
              {[...firstRow, ...firstRow].map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-28 h-20 sm:w-36 sm:h-24 md:w-44 md:h-28 lg:w-52 lg:h-32 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/5 hover:border-[#ed1b24]/30 hover:bg-white/10 transition-all duration-300 shrink-0 p-3 sm:p-4 lg:p-6 group"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Infinite Marquee - Second Row (Reverse Direction) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              className="flex gap-4 sm:gap-6 lg:gap-8 shrink-0"
            >
              {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-28 h-20 sm:w-36 sm:h-24 md:w-44 md:h-28 lg:w-52 lg:h-32 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/5 hover:border-[#ed1b24]/30 hover:bg-white/10 transition-all duration-300 shrink-0 p-3 sm:p-4 lg:p-6 group"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Static Grid for Mobile Alternative (hidden on larger screens) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden mt-12 px-4 sm:px-6"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center aspect-[4/3] bg-white/5 rounded-lg border border-white/5 hover:border-[#ed1b24]/30 transition-all p-3"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
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
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#ed1b24]/90"></div>
      </div>

      {/* Animated Shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -left-40 -top-40 w-80 h-80 border border-white/10 rounded-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6">
            Ready to Build Something
            <br /><span className="font-normal text-white">Extraordinary?</span>
          </h2>
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Let's transform your vision into reality with our expertise
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-[#ed1b24] font-bold text-lg rounded-full hover:bg-black hover:text-white transition-colors duration-300"
            >
              Get in Touch
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-[#ed1b24] transition-colors duration-300"
            >
              View Projects
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function AboutPage() {
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
      <AboutHero />
      <OurStorySection />
      <WhatWeDoSection />
      <WhyChooseUsSection />
      <AchievementsSection />
      <TeamSection />
      <ClientsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
