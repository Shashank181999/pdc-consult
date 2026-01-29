'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// ============================================
// DUMMY PROJECT DATA (Will be replaced with Firebase)
// ============================================
const projectsData = {
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
  '2': {
    id: '2',
    title: 'Marina Gate Towers',
    subtitle: 'Elevated Waterfront Living',
    category: 'Residential Complex',
    location: 'Dubai Marina',
    client: 'Select Group',
    year: '2022',
    duration: '36 Months',
    value: '$890 Million',
    area: '320,000 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
    description: 'Marina Gate is a stunning three-tower residential development that offers unparalleled waterfront living in the heart of Dubai Marina. The development features over 1,500 premium residences with breathtaking views of the marina, Arabian Gulf, and Dubai skyline.',
    challenge: 'Delivering three interconnected towers with shared amenities while ensuring each tower maintained its unique character and appeal to different market segments.',
    solution: 'We implemented an integrated project delivery approach, coordinating design and construction phases to optimize efficiency while maintaining the highest quality standards throughout.',
    features: [
      'Panoramic marina views',
      'Sky gardens on multiple levels',
      'Infinity edge swimming pools',
      'Private cinema rooms',
      'Fully equipped fitness center',
      'Direct marina access',
      'Smart home automation',
      'Concierge services'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop'
    ],
    services: ['Development Consulting', 'Project Management', 'Interior Design Coordination', 'Handover Management'],
    tags: ['Residential', 'High-Rise', 'Waterfront', 'Premium']
  },
  '3': {
    id: '3',
    title: 'DIFC Innovation Hub',
    subtitle: 'The Future of Workspaces',
    category: 'Commercial Tower',
    location: 'DIFC, Dubai',
    client: 'DIFC Authority',
    year: '2024',
    duration: '30 Months',
    value: '$620 Million',
    area: '185,000 sqm',
    status: 'In Progress',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
    description: 'The DIFC Innovation Hub represents the next generation of commercial developments, designed to foster creativity, collaboration, and technological innovation. This LEED Platinum certified building features flexible workspaces, cutting-edge smart building technology, and sustainable design principles.',
    challenge: 'Creating a future-proof commercial space that adapts to evolving work patterns while achieving the highest sustainability certifications and smart building standards.',
    solution: 'Our team integrated advanced BIM technology throughout the project lifecycle, enabling real-time collaboration and ensuring seamless coordination between all stakeholders.',
    features: [
      'LEED Platinum certified',
      'Smart building management system',
      'Flexible floor plates',
      'Rooftop event space',
      'Electric vehicle charging',
      'Rainwater harvesting',
      'Solar panel integration',
      'Wellness-focused design'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200&auto=format&fit=crop'
    ],
    services: ['Master Planning', 'Sustainability Consulting', 'Construction Management', 'Technology Integration'],
    tags: ['Commercial', 'Smart Building', 'LEED Certified', 'Innovation']
  },
  '4': {
    id: '4',
    title: 'Emirates Hills Estate',
    subtitle: 'Private Luxury Redefined',
    category: 'Private Villa',
    location: 'Emirates Hills, Dubai',
    client: 'Private Client',
    year: '2023',
    duration: '24 Months',
    value: '$45 Million',
    area: '4,500 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop',
    description: 'This bespoke private villa represents the ultimate in personalized luxury living. Situated on a prime plot overlooking the Montgomerie Golf Course, this residence features custom Italian marble, smart home technology, and landscaped gardens designed by award-winning architects.',
    challenge: 'Delivering a highly customized luxury residence that met the client\'s exacting standards while managing complex procurement of rare materials from around the world.',
    solution: 'We established a dedicated project team that worked closely with the client, architects, and specialized craftsmen to ensure every detail exceeded expectations.',
    features: [
      'Custom Italian marble throughout',
      'Private infinity pool',
      'Home cinema and entertainment suite',
      'Wine cellar with climate control',
      'Smart home automation',
      'Private gym and spa',
      'Staff quarters',
      'Landscaped gardens'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=1200&auto=format&fit=crop'
    ],
    services: ['Bespoke Project Management', 'Interior Design Coordination', 'Procurement Management', 'Quality Control'],
    tags: ['Residential', 'Luxury Villa', 'Bespoke', 'Private']
  },
  '5': {
    id: '5',
    title: 'Burj Vista Tower',
    subtitle: 'Downtown Living Elevated',
    category: 'Residential Tower',
    location: 'Downtown Dubai',
    client: 'Emaar Properties',
    year: '2022',
    duration: '42 Months',
    value: '$520 Million',
    area: '175,000 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
    description: 'Burj Vista offers an unparalleled living experience in the heart of Downtown Dubai, with direct views of the Burj Khalifa and Dubai Fountain. This twin-tower development features premium apartments and penthouses designed with meticulous attention to detail.',
    challenge: 'Constructing in the busy Downtown Dubai area while ensuring minimal disruption to the surrounding community and maintaining the area\'s premium aesthetic standards.',
    solution: 'Implemented advanced logistics planning and off-site prefabrication to minimize on-site construction time while maintaining quality and safety standards.',
    features: [
      'Direct Burj Khalifa views',
      'Dubai Fountain observation deck',
      'Sky lobby with concierge',
      'Resort-style pool deck',
      'Private dining rooms',
      'Children\'s play areas',
      'Business center',
      'Direct Dubai Mall access'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    ],
    services: ['Project Development', 'Construction Management', 'MEP Coordination', 'Handover Management'],
    tags: ['Residential', 'High-Rise', 'Downtown', 'Premium']
  },
  '6': {
    id: '6',
    title: 'Palm Jumeirah Resort',
    subtitle: 'Beachfront Paradise',
    category: 'Beach Resort',
    location: 'Palm Jumeirah, Dubai',
    client: 'Nakheel Properties',
    year: '2023',
    duration: '36 Months',
    value: '$380 Million',
    area: '95,000 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2000&auto=format&fit=crop',
    description: 'This stunning beach resort captures the essence of tropical luxury on the iconic Palm Jumeirah. Featuring 350 rooms and suites, multiple dining venues, a world-class spa, and pristine private beach access.',
    challenge: 'Building on the Palm\'s unique terrain while creating seamless indoor-outdoor experiences that celebrate the beachfront location.',
    solution: 'Developed innovative construction techniques suitable for the Palm\'s environment and created architectural solutions that maximize sea views from every room.',
    features: [
      '500m private beach',
      'Overwater villas',
      'Destination spa',
      'Multiple infinity pools',
      'Water sports center',
      'Kids club',
      'Beachfront dining',
      'Sunset lounge'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop'
    ],
    services: ['Resort Development', 'Hospitality Consulting', 'Beach Engineering', 'Landscape Design'],
    tags: ['Hospitality', 'Beach Resort', 'Luxury', 'Waterfront']
  }
};

// Related projects (for the related section)
const relatedProjects = [
  { id: '1', title: 'The Royal Atlantis', category: 'Luxury Hotel', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop' },
  { id: '2', title: 'Marina Gate Towers', category: 'Residential', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop' },
  { id: '3', title: 'DIFC Innovation Hub', category: 'Commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop' },
  { id: '4', title: 'Emirates Hills Estate', category: 'Private Villa', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop' }
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
const ProjectStats = ({ project }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { label: 'Project Value', value: project.value, icon: '💰' },
    { label: 'Total Area', value: project.area, icon: '📐' },
    { label: 'Duration', value: project.duration, icon: '⏱️' },
    { label: 'Year', value: project.year, icon: '📅' }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 bg-[#0a0a0a] border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/5 hover:border-[#ed1b24]/30 transition-colors"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
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
const ProjectOverview = ({ project }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-black overflow-hidden">
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

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight">
              Project <span className="font-normal text-[#ed1b24]">Description</span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
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
            <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 lg:p-10 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Project Details</h3>

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
                  <div key={index} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Services Provided</h4>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-[#ed1b24]/10 border border-[#ed1b24]/30 rounded text-sm text-[#ed1b24]"
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
const ChallengeSection = ({ project }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-[#0a0a0a] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
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
            className="bg-black p-8 lg:p-10 rounded-2xl border border-white/5"
          >
            <div className="w-14 h-14 bg-[#ed1b24]/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
            <p className="text-gray-400 leading-relaxed">{project.challenge}</p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black p-8 lg:p-10 rounded-2xl border border-[#ed1b24]/20"
          >
            <div className="w-14 h-14 bg-[#ed1b24] rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
            <p className="text-gray-400 leading-relaxed">{project.solution}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// IMAGE GALLERY SECTION
// ============================================
const ImageGallery = ({ project }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-black overflow-hidden">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">
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
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
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
                  <div className="w-12 h-12 bg-[#ed1b24] rounded-full flex items-center justify-center">
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
const FeaturesSection = ({ project }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-[#0a0a0a] overflow-hidden">
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

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
              Key <span className="font-normal text-[#ed1b24]">Features</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
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
                  className="flex items-center gap-3 p-4 bg-black rounded-lg border border-white/5 hover:border-[#ed1b24]/30 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#ed1b24]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
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
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
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
const RelatedProjects = ({ currentProjectId }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Filter out current project
  const filteredProjects = relatedProjects.filter(p => p.id !== currentProjectId).slice(0, 3);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-black overflow-hidden">
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">
              Related <span className="font-normal text-[#ed1b24]">Projects</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-white hover:text-[#ed1b24] transition-colors group"
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
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
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
                <h3 className="text-xl font-bold text-white group-hover:text-[#ed1b24] transition-colors">
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
  const params = useParams();
  const projectId = params.id;

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // Get project data (will be replaced with Firebase fetch)
  const project = projectsData[projectId];

  // Handle project not found
  if (!project) {
    return (
      <main className="w-full min-h-screen bg-black flex items-center justify-center" style={{ fontFamily: "'Archivo', sans-serif" }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
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
    <main className="w-full bg-black selection:bg-[#ed1b24] selection:text-white" style={{ fontFamily: "'Archivo', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      <Header />
      <ProjectHero project={project} />
      <ProjectStats project={project} />
      <ProjectOverview project={project} />
      <ChallengeSection project={project} />
      <ImageGallery project={project} />
      <FeaturesSection project={project} />
      <RelatedProjects currentProjectId={projectId} />
      <ProjectCTA />
      <Footer />
    </main>
  );
}
