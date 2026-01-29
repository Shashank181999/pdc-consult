'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// ============================================
// SERVICES DATA
// ============================================
const servicesData = {
  'project-development': {
    id: 'project-development',
    number: '01',
    title: 'Projects Development & Management',
    subtitle: 'From Vision to Reality',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop',
    description: 'Comprehensive project lifecycle management from conception to completion, ensuring timely delivery and optimal resource allocation across residential, commercial, and mixed-use developments.',
    longDescription: `Our Project Development & Management service provides end-to-end oversight of complex construction and development projects. With over 15 years of experience in the UAE and MENA region, we bring unparalleled expertise to every phase of your project.

From initial feasibility studies to final handover, our team ensures that every milestone is met with precision and excellence. We coordinate with architects, contractors, and stakeholders to deliver projects that exceed expectations while staying within budget and timeline.`,
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
    subtitle: 'Shaping Skylines',
    heroImage: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000&auto=format&fit=crop',
    description: 'Official representatives of Carlos Ott in U.A.E., GCC & Middle East. World-class architectural excellence and innovative urban solutions that define skylines.',
    longDescription: `As the official representatives of the legendary architect Carlos Ott in the UAE, GCC, and Middle East, we bring world-class architectural vision to every project. Our design philosophy combines aesthetic brilliance with functional excellence.

Our team of architects and urban planners work collaboratively to create spaces that inspire, engage, and endure. From iconic towers to master-planned communities, we shape environments that enhance quality of life.`,
    features: [
      { title: 'Carlos Ott Partnership', desc: 'Exclusive regional representation of world-renowned architect' },
      { title: 'Iconic Design', desc: 'Creating landmark buildings that define skylines' },
      { title: 'Urban Masterplanning', desc: 'Comprehensive planning for communities and districts' },
      { title: 'Sustainable Development', desc: 'Eco-friendly design principles and LEED certification' },
      { title: '3D Visualization', desc: 'State-of-the-art rendering and virtual tours' },
      { title: 'Regulatory Compliance', desc: 'Expert navigation of local building codes' }
    ],
    stats: [
      { value: '50+', label: 'Landmark Buildings' },
      { value: '10M+', label: 'Sq.Ft Designed' },
      { value: '12', label: 'Countries' },
      { value: '25+', label: 'Design Awards' }
    ],
    process: [
      { step: '01', title: 'Concept Development', desc: 'Initial design vision and inspiration' },
      { step: '02', title: 'Schematic Design', desc: 'Preliminary layouts and spatial planning' },
      { step: '03', title: 'Design Development', desc: 'Detailed architectural documentation' },
      { step: '04', title: 'Visualization', desc: '3D rendering and virtual walkthroughs' },
      { step: '05', title: 'Documentation', desc: 'Construction-ready drawings and specs' },
      { step: '06', title: 'Construction Support', desc: 'On-site design coordination' }
    ],
    relatedProjects: [
      { title: 'Palm Tower', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop', value: '$750M' },
      { title: 'Downtown Complex', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', value: '$500M' },
      { title: 'Waterfront Residences', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop', value: '$320M' }
    ]
  },
  'hospitality-consultancy': {
    id: 'hospitality-consultancy',
    number: '03',
    title: 'Hospitality Consultancy',
    subtitle: 'Luxury Redefined',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop',
    description: 'Strategic advisory services for luxury hotels, resorts, and hospitality ventures in the MENA region, from concept to operational excellence.',
    longDescription: `Our Hospitality Consultancy service brings together decades of experience in luxury hotel development and operations. We understand the unique demands of the hospitality industry and deliver solutions that create memorable guest experiences.

From boutique hotels to large-scale resorts, we provide comprehensive guidance on brand positioning, operational setup, and revenue optimization strategies that ensure long-term success.`,
    features: [
      { title: 'Brand Positioning', desc: 'Strategic brand development and market positioning' },
      { title: 'Operational Excellence', desc: 'SOPs and service standards development' },
      { title: 'Experience Design', desc: 'Creating memorable guest journeys' },
      { title: 'Revenue Optimization', desc: 'Pricing strategies and yield management' },
      { title: 'Staff Training', desc: 'Comprehensive hospitality training programs' },
      { title: 'Pre-Opening Services', desc: 'Complete pre-opening planning and execution' }
    ],
    stats: [
      { value: '30+', label: 'Hotels Launched' },
      { value: '5000+', label: 'Rooms Managed' },
      { value: '4.8', label: 'Avg Guest Rating' },
      { value: '15+', label: 'Hotel Brands' }
    ],
    process: [
      { step: '01', title: 'Market Analysis', desc: 'Comprehensive market research and positioning' },
      { step: '02', title: 'Concept Development', desc: 'Brand identity and experience design' },
      { step: '03', title: 'Operational Setup', desc: 'SOPs, systems, and processes' },
      { step: '04', title: 'Recruitment', desc: 'Key personnel hiring and training' },
      { step: '05', title: 'Pre-Opening', desc: 'Final preparations and soft launch' },
      { step: '06', title: 'Operations Support', desc: 'Ongoing operational guidance' }
    ],
    relatedProjects: [
      { title: 'Luxury Beach Resort', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop', value: '$200M' },
      { title: 'Boutique Hotel', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop', value: '$80M' },
      { title: 'Desert Resort', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop', value: '$150M' }
    ]
  },
  'cost-management': {
    id: 'cost-management',
    number: '04',
    title: 'Consultancy',
    subtitle: 'Strategic Advisory',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
    description: 'Optimize project costs while maximizing value through systematic analysis and innovative engineering solutions that deliver exceptional ROI.',
    longDescription: `Our Cost Management & Value Engineering service ensures that every project delivers maximum value within budget constraints. We employ sophisticated cost modeling and analysis techniques to identify savings opportunities without compromising quality.

Through value engineering, we optimize designs and specifications to achieve the best possible outcomes while maintaining or enhancing project functionality and aesthetics.`,
    features: [
      { title: 'Budget Optimization', desc: 'Strategic cost planning and control' },
      { title: 'Value Analysis', desc: 'Function-cost optimization studies' },
      { title: 'Cost Modeling', desc: 'Predictive cost analysis and forecasting' },
      { title: 'Procurement Strategy', desc: 'Strategic sourcing and vendor management' },
      { title: 'Change Management', desc: 'Cost impact analysis for changes' },
      { title: 'Final Accounting', desc: 'Project closeout and reconciliation' }
    ],
    stats: [
      { value: '15%', label: 'Avg Cost Savings' },
      { value: '$500M+', label: 'Savings Delivered' },
      { value: '100+', label: 'Value Studies' },
      { value: '99%', label: 'Budget Accuracy' }
    ],
    process: [
      { step: '01', title: 'Cost Planning', desc: 'Initial budget development and benchmarking' },
      { step: '02', title: 'Value Engineering', desc: 'Design optimization workshops' },
      { step: '03', title: 'Procurement', desc: 'Strategic tender management' },
      { step: '04', title: 'Cost Control', desc: 'Ongoing monitoring and reporting' },
      { step: '05', title: 'Change Management', desc: 'Variation assessment and control' },
      { step: '06', title: 'Final Account', desc: 'Project financial closeout' }
    ],
    relatedProjects: [
      { title: 'Commercial Tower', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', value: '12% Savings' },
      { title: 'Residential Complex', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop', value: '18% Savings' },
      { title: 'Mixed-Use Development', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop', value: '15% Savings' }
    ]
  },
  'pm-training': {
    id: 'pm-training',
    number: '05',
    title: 'Organisation Facilities - PM',
    subtitle: 'Facility Excellence',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    description: 'Professional development programs designed to elevate project management capabilities across your organization with certified trainers.',
    longDescription: `Our PM Training Services develop world-class project management capabilities within your organization. Led by certified professionals with extensive field experience, our programs combine theoretical knowledge with practical application.

From PMP certification prep to customized corporate training, we equip teams with the skills needed to deliver successful projects consistently.`,
    features: [
      { title: 'Certification Programs', desc: 'PMP, PRINCE2, and Agile certifications' },
      { title: 'Custom Workshops', desc: 'Tailored training for your organization' },
      { title: 'Best Practices', desc: 'Industry-leading methodologies' },
      { title: 'Continuous Learning', desc: 'Ongoing professional development' },
      { title: 'Practical Exercises', desc: 'Hands-on project simulations' },
      { title: 'Mentorship', desc: 'One-on-one coaching sessions' }
    ],
    stats: [
      { value: '500+', label: 'Professionals Trained' },
      { value: '95%', label: 'Pass Rate' },
      { value: '4.9/5', label: 'Satisfaction Score' },
      { value: '20+', label: 'Corporate Clients' }
    ],
    process: [
      { step: '01', title: 'Assessment', desc: 'Skills gap analysis and learning needs' },
      { step: '02', title: 'Program Design', desc: 'Customized curriculum development' },
      { step: '03', title: 'Delivery', desc: 'Interactive training sessions' },
      { step: '04', title: 'Practice', desc: 'Hands-on exercises and simulations' },
      { step: '05', title: 'Assessment', desc: 'Knowledge validation and testing' },
      { step: '06', title: 'Certification', desc: 'Exam preparation and support' }
    ],
    relatedProjects: [
      { title: 'Government Agency', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop', value: '150 Trained' },
      { title: 'Developer Corp', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop', value: '80 Certified' },
      { title: 'Contractor Group', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop', value: '200 Trained' }
    ]
  },
  'interior-design': {
    id: 'interior-design',
    number: '06',
    title: 'Interior Design & FF&E',
    subtitle: 'Spaces that Inspire',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    description: 'Comprehensive interior design and furniture, fixtures & equipment services for luxury residential, commercial, and hospitality projects.',
    longDescription: `Our Interior Design & FF&E service creates stunning interiors that reflect your vision and brand identity. From concept to installation, we manage every aspect of interior development with meticulous attention to detail.

Our experienced designers work with the finest materials and craftsmen to deliver spaces that are both beautiful and functional, creating environments that inspire and delight.`,
    features: [
      { title: 'Space Planning', desc: 'Optimized layouts for functionality and flow' },
      { title: 'Material Selection', desc: 'Premium finishes and specifications' },
      { title: 'FF&E Procurement', desc: 'Global sourcing of furniture and fixtures' },
      { title: 'Installation Oversight', desc: 'Quality control during fit-out' },
      { title: 'Custom Fabrication', desc: 'Bespoke furniture and millwork' },
      { title: 'Art Curation', desc: 'Art selection and placement' }
    ],
    stats: [
      { value: '100+', label: 'Interiors Completed' },
      { value: '2M+', label: 'Sq.Ft Designed' },
      { value: '50+', label: 'Luxury Residences' },
      { value: '15+', label: 'Hotels Furnished' }
    ],
    process: [
      { step: '01', title: 'Concept Design', desc: 'Design direction and mood boards' },
      { step: '02', title: 'Space Planning', desc: 'Layouts and circulation planning' },
      { step: '03', title: 'Specifications', desc: 'Materials and finishes selection' },
      { step: '04', title: 'FF&E Selection', desc: 'Furniture and fixture sourcing' },
      { step: '05', title: 'Procurement', desc: 'Ordering and logistics management' },
      { step: '06', title: 'Installation', desc: 'On-site installation and styling' }
    ],
    relatedProjects: [
      { title: 'Penthouse Suite', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop', value: '$2M FF&E' },
      { title: 'Hotel Lobby', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop', value: '$5M FF&E' },
      { title: 'Corporate HQ', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', value: '$3M FF&E' }
    ]
  }
};

// ============================================
// HERO SECTION
// ============================================
const ServiceHero = ({ service }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={heroRef} className="relative h-[85vh] min-h-[600px] flex items-center justify-center bg-black overflow-hidden">
      {/* Background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={service.heroImage}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          >
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </motion.div>

          {/* Number Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="text-5xl font-bold text-[#ed1b24]">
              {service.number}
            </span>
            <div className="h-px w-12 bg-white/30"></div>
            <span className="text-white/70 uppercase tracking-widest text-sm">{service.subtitle}</span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight"
            >
              {service.title}
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed"
          >
            {service.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// OVERVIEW SECTION
// ============================================
const OverviewSection = ({ service }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Overview</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mt-4 mb-6 leading-tight">
              About This
              <span className="font-normal text-[#ed1b24]"> Service</span>
            </h2>

            <div className="prose prose-lg prose-invert">
              {service.longDescription.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  className="text-gray-400 leading-relaxed mb-4"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#ed1b24] text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-3 hover:bg-[#c41119]"
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
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-6">
              {service.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-[#ed1b24]/30 transition-all"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-[#ed1b24] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
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
// FEATURES SECTION
// ============================================
const FeaturesSection = ({ service }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ed1b24] rounded-full blur-[300px] opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Capabilities</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mt-4">
            Key <span className="font-normal text-[#ed1b24]">Features</span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group p-6 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-[#ed1b24]/30 transition-all duration-300"
            >
              {/* Number */}
              <div className="text-4xl font-bold text-[#ed1b24]/20 group-hover:text-[#ed1b24]/40 transition-opacity mb-4">
                {String(index + 1).padStart(2, '0')}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ed1b24] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROCESS SECTION
// ============================================
const ProcessSection = ({ service }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Methodology</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mt-4">
            Our <span className="font-normal text-[#ed1b24]">Process</span>
          </h2>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 bg-black rounded-2xl border border-white/5 hover:border-[#ed1b24]/30 transition-all h-full">
                  {/* Step Number */}
                  <div className="w-14 h-14 rounded-xl bg-[#ed1b24] flex items-center justify-center text-white font-bold text-lg mb-4">
                    {step.step}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// RELATED PROJECTS
// ============================================
const RelatedProjects = ({ service }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Portfolio</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mt-4">
            Related <span className="font-normal text-[#ed1b24]">Projects</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {service.relatedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                {/* Value Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#ed1b24] text-white text-sm font-bold">
                  {project.value}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ed1b24] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-[#ed1b24] hover:border-[#ed1b24] transition-all duration-300"
            >
              View All Projects
            </motion.button>
          </Link>
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#ed1b24] via-[#c41119] to-[#8b0000]">
      {/* Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Let's discuss how our expertise can help your project succeed
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-[#ed1b24] font-bold text-lg rounded-full hover:bg-black hover:text-white transition-colors duration-300"
              >
                Contact Us
              </motion.button>
            </Link>
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-[#ed1b24] transition-colors duration-300"
              >
                All Services
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// OTHER SERVICES
// ============================================
const OtherServices = ({ currentServiceId }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const otherServices = Object.values(servicesData).filter(s => s.id !== currentServiceId).slice(0, 3);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">Explore More</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mt-4">
            Other <span className="font-normal text-[#ed1b24]">Services</span>
          </h2>
        </motion.div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-6">
          {otherServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/services/${service.id}`}>
                <div className="group p-6 bg-black rounded-2xl border border-white/5 hover:border-[#ed1b24]/30 transition-all h-full">
                  <span className="text-4xl font-bold text-white/10 group-hover:text-[#ed1b24]/20 transition-colors">
                    {service.number}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-4 mb-2 group-hover:text-[#ed1b24] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{service.subtitle}</p>
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
// MAIN PAGE
// ============================================
export default function ServiceDetailPage() {
  const params = useParams();
  const service = servicesData[params.id];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  if (!service) {
    return (
      <main className="w-full bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-[#ed1b24] hover:underline">
            View All Services
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
      <ServiceHero service={service} />
      <OverviewSection service={service} />
      <FeaturesSection service={service} />
      <ProcessSection service={service} />
      <RelatedProjects service={service} />
      <CTASection />
      <OtherServices currentServiceId={service.id} />
      <Footer />
    </main>
  );
}
