'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
  })
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// ============================================
// DEFAULT IMAGES & DATA
// ============================================
const defaultServiceImages = {
  'project-development': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop',
  'architectural-design': 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000&auto=format&fit=crop',
  'hospitality-consultancy': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop',
  'cost-management': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
  'pm-training': 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop'
};

const dummyProjects = [
  { id: '1', title: 'The Royal Atlantis', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop', value: '$1.4B', location: 'Palm Jumeirah, Dubai', category: 'Hospitality' },
  { id: '2', title: 'Marina Gate Towers', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop', value: '$890M', location: 'Dubai Marina', category: 'Residential' },
  { id: '3', title: 'DIFC Innovation Hub', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', value: '$620M', location: 'DIFC, Dubai', category: 'Commercial' },
  { id: '4', title: 'Emirates Hills Estate', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop', value: '$45M', location: 'Emirates Hills', category: 'Residential' },
  { id: '5', title: 'Business Bay Complex', image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=800&auto=format&fit=crop', value: '$750M', location: 'Business Bay', category: 'Mixed-Use' },
  { id: '6', title: 'Palm Jumeirah Resort', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop', value: '$380M', location: 'Palm Jumeirah', category: 'Hospitality' }
];

const staticServicesData = {
  'project-development': {
    id: 'project-development',
    number: '01',
    title: 'Projects Development & Management',
    subtitle: 'From Vision to Reality',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop',
    description: 'Comprehensive project lifecycle management from conception to completion, ensuring timely delivery and optimal resource allocation.',
    longDescription: `Our Project Development & Management service provides end-to-end oversight of complex construction and development projects. With over 15 years of experience in the UAE and MENA region, we bring unparalleled expertise to every phase of your project.\n\nFrom initial feasibility studies to final handover, our team ensures that every milestone is met with precision and excellence. We coordinate with architects, contractors, and stakeholders to deliver projects that exceed expectations while staying within budget and timeline.`,
    features: [
      { title: 'End-to-End Oversight', desc: 'Complete project lifecycle management from concept to completion' },
      { title: 'Risk Mitigation', desc: 'Proactive identification and management of project risks' },
      { title: 'Quality Assurance', desc: 'Rigorous quality control at every project phase' },
      { title: 'Stakeholder Coordination', desc: 'Seamless communication between all project parties' },
      { title: 'Budget Control', desc: 'Strict financial management and cost optimization' },
      { title: 'Timeline Management', desc: 'Precise scheduling and milestone tracking' }
    ],
    stats: [
      { value: '200+', label: 'Projects Completed' },
      { value: '$5B+', label: 'Projects Value' },
      { value: '98%', label: 'On-Time Delivery' },
      { value: '15+', label: 'Years Experience' }
    ],
    process: [
      { step: '01', title: 'Feasibility Analysis', desc: 'Comprehensive assessment of project viability' },
      { step: '02', title: 'Planning & Design', desc: 'Detailed project planning and design coordination' },
      { step: '03', title: 'Procurement', desc: 'Strategic contractor and material sourcing' },
      { step: '04', title: 'Construction', desc: 'Expert oversight of construction activities' },
      { step: '05', title: 'Quality Control', desc: 'Rigorous quality assurance processes' },
      { step: '06', title: 'Handover', desc: 'Seamless project completion and delivery' }
    ],
    relatedProjects: [
      { title: 'The Royal Atlantis', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop', value: '$1.4B' },
      { title: 'Marina Gate Towers', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop', value: '$890M' },
      { title: 'DIFC Innovation Hub', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', value: '$620M' }
    ]
  },
  'architectural-design': {
    id: 'architectural-design',
    number: '02',
    title: 'Architectural Design & Urban Planning',
    subtitle: 'Carlos Ott Partnership',
    heroImage: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000&auto=format&fit=crop',
    description: 'Official representatives of Carlos Ott in UAE, GCC & Middle East. World-class architectural excellence and innovative urban solutions.',
    longDescription: `As the official representatives of Carlos Ott in the UAE, GCC, and Middle East, we bring world-renowned architectural expertise to every project. Our partnership combines local market knowledge with international design excellence.\n\nFrom iconic skyscrapers to sustainable urban developments, our architectural design services create spaces that inspire and endure. We specialize in creating landmarks that define skylines and communities.`,
    features: [
      { title: 'Carlos Ott Partnership', desc: 'Exclusive representation of world-renowned architect' },
      { title: 'Iconic Design', desc: 'Creating architectural landmarks that define cities' },
      { title: 'Urban Masterplanning', desc: 'Comprehensive urban development strategies' },
      { title: 'Sustainable Development', desc: 'Green building and eco-friendly design solutions' },
      { title: '3D Visualization', desc: 'Advanced rendering and virtual reality presentations' },
      { title: 'Regulatory Compliance', desc: 'Full compliance with local building codes' }
    ],
    stats: [
      { value: '150+', label: 'Designs Completed' },
      { value: '$3B+', label: 'Projects Designed' },
      { value: '25+', label: 'Awards Won' },
      { value: '18', label: 'Countries' }
    ],
    process: [
      { step: '01', title: 'Concept Development', desc: 'Initial design concepts and vision' },
      { step: '02', title: 'Schematic Design', desc: 'Detailed architectural drawings' },
      { step: '03', title: 'Design Development', desc: 'Refined designs and specifications' },
      { step: '04', title: 'Documentation', desc: 'Complete construction documents' },
      { step: '05', title: 'Approvals', desc: 'Regulatory submissions and approvals' },
      { step: '06', title: 'Construction Support', desc: 'On-site design coordination' }
    ],
    relatedProjects: []
  },
  'hospitality-consultancy': {
    id: 'hospitality-consultancy',
    number: '03',
    title: 'Hospitality Consultancy',
    subtitle: 'Luxury & Excellence',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop',
    description: 'Strategic advisory services for luxury hotels, resorts, and hospitality ventures in the MENA region.',
    longDescription: `Our hospitality consultancy services help clients navigate the complex world of luxury hospitality development. From boutique hotels to grand resorts, we provide strategic guidance at every stage.\n\nWith deep expertise in the MENA hospitality market, we help clients identify opportunities, develop brands, and create exceptional guest experiences that drive revenue and reputation.`,
    features: [
      { title: 'Brand Positioning', desc: 'Strategic brand development and positioning' },
      { title: 'Operational Excellence', desc: 'Best-in-class operational frameworks' },
      { title: 'Experience Design', desc: 'Creating memorable guest experiences' },
      { title: 'Revenue Optimization', desc: 'Maximizing profitability and yield' },
      { title: 'Market Analysis', desc: 'Comprehensive market research and feasibility' },
      { title: 'Operator Selection', desc: 'Finding the right management partner' }
    ],
    stats: [
      { value: '50+', label: 'Hotels Consulted' },
      { value: '15K+', label: 'Room Keys' },
      { value: '95%', label: 'Client Retention' },
      { value: '12', label: 'Countries' }
    ],
    process: [
      { step: '01', title: 'Market Study', desc: 'Comprehensive market analysis' },
      { step: '02', title: 'Concept Creation', desc: 'Brand and concept development' },
      { step: '03', title: 'Financial Modeling', desc: 'Detailed pro-forma analysis' },
      { step: '04', title: 'Design Brief', desc: 'Hospitality-specific design requirements' },
      { step: '05', title: 'Operator Selection', desc: 'Management company negotiation' },
      { step: '06', title: 'Pre-Opening', desc: 'Launch preparation and support' }
    ],
    relatedProjects: []
  },
  'cost-management': {
    id: 'cost-management',
    number: '04',
    title: 'Cost Management & Consultancy',
    subtitle: 'Value Engineering',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
    description: 'Optimize project costs while maximizing value through systematic analysis and innovative engineering solutions.',
    longDescription: `Our cost management services ensure your projects deliver maximum value within budget constraints. We combine rigorous financial analysis with deep construction knowledge to optimize every aspect of project spending.\n\nFrom early-stage budgeting to final account settlement, our team provides transparent, accurate cost advice that protects your investment and enhances project outcomes.`,
    features: [
      { title: 'Budget Optimization', desc: 'Strategic cost planning and control' },
      { title: 'Value Analysis', desc: 'Maximizing value at every project stage' },
      { title: 'Cost Modeling', desc: 'Accurate cost forecasting and tracking' },
      { title: 'Procurement Strategy', desc: 'Optimized contractor and supplier selection' },
      { title: 'Change Management', desc: 'Controlling scope and cost changes' },
      { title: 'Final Accounts', desc: 'Accurate project close-out and settlement' }
    ],
    stats: [
      { value: '$2B+', label: 'Costs Managed' },
      { value: '15%', label: 'Avg. Savings' },
      { value: '100+', label: 'Projects' },
      { value: '99%', label: 'Budget Accuracy' }
    ],
    process: [
      { step: '01', title: 'Cost Planning', desc: 'Initial budget development' },
      { step: '02', title: 'Value Engineering', desc: 'Cost optimization without compromise' },
      { step: '03', title: 'Procurement', desc: 'Tender management and evaluation' },
      { step: '04', title: 'Cost Control', desc: 'Ongoing monitoring and reporting' },
      { step: '05', title: 'Change Control', desc: 'Managing variations and claims' },
      { step: '06', title: 'Final Account', desc: 'Project financial close-out' }
    ],
    relatedProjects: []
  },
  'pm-training': {
    id: 'pm-training',
    number: '05',
    title: 'PM Training Services',
    subtitle: 'Professional Development',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    description: 'Professional development programs designed to elevate project management capabilities across your organization.',
    longDescription: `Our PM Training Services empower professionals with the skills and knowledge needed to excel in project management. We offer comprehensive programs aligned with international standards and best practices.\n\nFrom PMP certification preparation to specialized workshops in construction management, our training programs are designed to deliver practical skills that drive immediate results.`,
    features: [
      { title: 'Certification Programs', desc: 'PMP, PRINCE2, and other certifications' },
      { title: 'Custom Workshops', desc: 'Tailored training for your organization' },
      { title: 'Best Practices', desc: 'Industry-leading methodologies' },
      { title: 'Primavera Training', desc: 'Expert scheduling software training' },
      { title: 'Soft Skills', desc: 'Leadership and communication training' },
      { title: 'Continuous Learning', desc: 'Ongoing professional development' }
    ],
    stats: [
      { value: '2000+', label: 'Professionals Trained' },
      { value: '95%', label: 'Pass Rate' },
      { value: '50+', label: 'Corporate Clients' },
      { value: '4.9', label: 'Avg. Rating' }
    ],
    process: [
      { step: '01', title: 'Needs Assessment', desc: 'Understanding training requirements' },
      { step: '02', title: 'Program Design', desc: 'Customized curriculum development' },
      { step: '03', title: 'Delivery', desc: 'Expert-led training sessions' },
      { step: '04', title: 'Assessment', desc: 'Knowledge testing and evaluation' },
      { step: '05', title: 'Certification', desc: 'Exam preparation and support' },
      { step: '06', title: 'Follow-up', desc: 'Post-training support and resources' }
    ],
    relatedProjects: []
  },
  'consultancy': {
    id: 'consultancy',
    number: '06',
    title: 'General Consultancy',
    subtitle: 'Expert Advisory',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
    description: 'Strategic consulting services to help businesses navigate complex challenges and achieve their goals.',
    longDescription: `Our consultancy services provide strategic guidance across all aspects of business and project development. We combine deep industry expertise with analytical rigor to deliver actionable insights.\n\nWhether you need help with market entry, organizational transformation, or strategic planning, our consultants bring the experience and perspective to drive results.`,
    features: [
      { title: 'Strategic Planning', desc: 'Long-term business strategy development' },
      { title: 'Market Entry', desc: 'MENA market expansion support' },
      { title: 'Due Diligence', desc: 'Comprehensive project assessment' },
      { title: 'Process Optimization', desc: 'Operational efficiency improvements' },
      { title: 'Risk Assessment', desc: 'Identifying and mitigating business risks' },
      { title: 'Change Management', desc: 'Organizational transformation support' }
    ],
    stats: [
      { value: '100+', label: 'Clients Served' },
      { value: '15+', label: 'Years Experience' },
      { value: '90%', label: 'Repeat Clients' },
      { value: '25', label: 'Industries' }
    ],
    process: [
      { step: '01', title: 'Discovery', desc: 'Understanding your challenges' },
      { step: '02', title: 'Analysis', desc: 'Deep-dive research and assessment' },
      { step: '03', title: 'Strategy', desc: 'Developing recommendations' },
      { step: '04', title: 'Planning', desc: 'Implementation roadmap' },
      { step: '05', title: 'Execution', desc: 'Supporting implementation' },
      { step: '06', title: 'Review', desc: 'Measuring outcomes and refining' }
    ],
    relatedProjects: []
  }
};

// ============================================
// SUB-COMPONENTS (THEME AWARE)
// ============================================

const ServiceHero = ({ service, theme }) => {
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]); 

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-end md:justify-center bg-black overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-black">
        <motion.div 
            style={{ 
                scale: isMobile ? 1 : scale,
                y: isMobile ? 0 : y
            }} 
            className="absolute inset-0 w-full h-full"
        >
          <motion.img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-12 md:py-0">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl"
        >
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/services" className="hover:text-white transition-colors duration-300">Services</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{service.title}</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#ed1b24]">
              {service.number}
            </span>
            <div className="h-px w-8 md:w-12 bg-white/30"></div>
            <span className="text-white/70 uppercase tracking-widest text-xs md:text-sm">
              {service.subtitle}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.15] mb-4 md:mb-6">
            {service.title}
          </h1>

          <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed mb-6 md:mb-10">
            {service.description}
          </p>

          <div>
            <Link href="/contact">
              <button className="px-6 md:px-8 py-3 md:py-4 bg-[#ed1b24] text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2 md:gap-3 active:scale-95 hover:bg-[#c41119]">
                <span className="text-sm md:text-base">Get Started</span>
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1 bg-[#ed1b24] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const OverviewSection = ({ service, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-24 lg:py-32 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#050505]' : 'bg-gray-50'
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ed1b24]/5 to-transparent pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm"
            >
              Overview
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`text-3xl sm:text-4xl lg:text-5xl font-light mt-4 mb-8 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              About This
              <span className="font-normal text-[#ed1b24]"> Service</span>
            </motion.h2>

            <div className={`prose prose-lg ${isDark ? 'prose-invert text-gray-400' : 'text-gray-600'}`}>
              {service.longDescription.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#ed1b24] text-white font-semibold rounded-full transition-all duration-500 flex items-center gap-3"
                >
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-6 content-start"
          >
            {service.stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`p-8 rounded-2xl border transition-all duration-500 group ${
                  isDark 
                    ? 'bg-white/[0.02] border-white/5 hover:border-[#ed1b24]/40' 
                    : 'bg-white border-gray-200 hover:border-red-200 hover:shadow-lg'
                }`}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1, type: "spring" }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ed1b24] mb-3 group-hover:scale-110 transition-transform duration-500"
                >
                  {stat.value}
                </motion.div>
                <div className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = ({ service, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-24 lg:py-32 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-light mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Key <span className="font-normal text-[#ed1b24]">Features</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {service.features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className={`group p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                isDark 
                  ? 'bg-white/[0.02] border-white/5 hover:border-[#ed1b24]/40' 
                  : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-red-200 hover:shadow-xl'
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08, type: "spring" }}
                className={`text-5xl font-bold transition-all duration-500 mb-6 ${
                  isDark 
                    ? 'text-[#ed1b24]/20 group-hover:text-[#ed1b24]/50' 
                    : 'text-gray-200 group-hover:text-[#ed1b24]/30'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>

              <h3 className={`text-xl font-bold mb-3 group-hover:text-[#ed1b24] transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.desc}</p>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="mt-6 flex items-center gap-2 text-[#ed1b24] opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <span className="text-sm font-semibold">Learn More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProcessSection = ({ service, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-24 lg:py-32 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#050505]' : 'bg-gray-50'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm"
          >
            Methodology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-light mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Our <span className="font-normal text-[#ed1b24]">Process</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ed1b24]/30 to-transparent origin-left"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className={`p-8 rounded-2xl border transition-all duration-500 h-full ${
                    isDark 
                      ? 'bg-black border-white/5 hover:border-[#ed1b24]/40' 
                      : 'bg-white border-gray-200 hover:border-red-200 hover:shadow-xl'
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ed1b24] to-[#c41119] flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg"
                  >
                    {step.step}
                  </motion.div>

                  <h3 className={`text-xl font-bold mb-3 group-hover:text-[#ed1b24] transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{step.desc}</p>
                </motion.div>

                {index % 3 !== 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-[#ed1b24]/30 origin-left"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AllProjectsSection = ({ theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';
  const projects = dummyProjects;

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-24 lg:py-32 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-light mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Our <span className="font-normal text-[#ed1b24]">Projects</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              variants={staggerItem}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={`/projects/${project.id}`}>
                <div className={`relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg ${isDark ? 'bg-[#111]' : 'bg-gray-100'}`}>
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={isInView ? { scale: 1 } : {}}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-sm font-bold">
                    {project.value}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-[#ed1b24] text-white text-xs font-bold uppercase tracking-wider rounded mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#ed1b24] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {project.location}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 left-4 w-10 h-10 bg-[#ed1b24] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg className="w-5 h-5 text-white -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16"
        >
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#ed1b24" }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-5 bg-transparent border-2 font-semibold rounded-full transition-all duration-500 hover:bg-[#ed1b24] hover:text-white ${
                isDark 
                  ? 'border-white/20 text-white' 
                  : 'border-gray-300 text-gray-900 hover:border-[#ed1b24]'
              }`}
            >
              View All Projects
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = ({ theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#ed1b24] via-[#c41119] to-[#8b0000]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
      />

      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full"
      />
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 w-24 h-24 border border-white/10 rounded-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-12"
          >
            Let's discuss how our expertise can help your project succeed
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-[#ed1b24] font-bold text-lg rounded-full hover:bg-black hover:text-white transition-all duration-500"
              >
                Contact Us
              </motion.button>
            </Link>
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#ed1b24" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full transition-all duration-500"
              >
                All Services
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const OtherServices = ({ currentServiceId, theme }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isDark = theme === 'dark';

  const otherServices = Object.values(staticServicesData).filter(s => s.id !== currentServiceId).slice(0, 3);

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-24 lg:py-32 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#050505]' : 'bg-gray-50'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm"
          >
            Explore More
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-light mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Other <span className="font-normal text-[#ed1b24]">Services</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {otherServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover={{ y: -10 }}
            >
              <Link href={`/services/${service.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className={`group p-8 rounded-2xl border transition-all duration-500 h-full cursor-pointer ${
                    isDark 
                      ? 'bg-black border-white/5 hover:border-[#ed1b24]/40' 
                      : 'bg-white border-gray-200 hover:border-red-200 hover:shadow-xl'
                  }`}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: "spring" }}
                    className={`text-5xl font-bold transition-colors duration-500 block ${
                      isDark 
                        ? 'text-white/10 group-hover:text-[#ed1b24]/30' 
                        : 'text-gray-200 group-hover:text-[#ed1b24]/30'
                    }`}
                  >
                    {service.number}
                  </motion.span>
                  <h3 className={`text-xl font-bold mt-6 mb-3 group-hover:text-[#ed1b24] transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{service.subtitle}</p>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mt-6 flex items-center gap-2 text-[#ed1b24] opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <span className="text-sm font-semibold">Explore</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function ServiceDetailPage() {
  const { theme } = useTheme();
  const params = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [params.id]);

  useEffect(() => {
    setLoading(true);

    // Use static data only
    if (staticServicesData[params.id]) {
      setService(staticServicesData[params.id]);
    } else {
      setService(null);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <main className={`w-full min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="w-12 h-12 border-4 border-[#ed1b24] border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className={`w-full min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Service Not Found</h1>
          <Link href="/services" className="text-[#ed1b24] hover:underline">
            View All Services
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className={`w-full selection:bg-[#ed1b24] selection:text-white transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`} style={{ fontFamily: "'Archivo', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme === 'dark' ? '#0a0a0a' : '#f3f4f6'}; }
        ::-webkit-scrollbar-thumb { background: #ed1b24; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #c41119; }
      `}</style>

      <Header />
      <ServiceHero service={service} theme={theme} />
      <OverviewSection service={service} theme={theme} />
      <FeaturesSection service={service} theme={theme} />
      <ProcessSection service={service} theme={theme} />
      <AllProjectsSection theme={theme} />
      <CTASection theme={theme} />
      <OtherServices currentServiceId={service.id} theme={theme} />
      <Footer />
    </main>
  );
}