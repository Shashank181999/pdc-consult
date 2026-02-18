'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HomeBanner from './components/Homebanner';
import Header from './components/Header';
import Services from './components/Services';
import OrgDiagram from './components/OrgDiagram'
import FounderSection from './components/FounderSection'
import OrganizationalChart from './components/Organizationalchart'
import VisionSection from './components/VisionSection'
import ProjectShowcase from './components/ProjectShowcase'
import ProjectBrochure from './components/projectbrochure'
import Footer from './components/Footer'
import { useTheme } from './context/ThemeContext';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const { theme } = useTheme();

  // --- DATA: About Features ---
  const features = [
    {
      title: 'Strategic Vision',
      description: 'We decode complex market dynamics to build roadmaps that ensure long-term sustainability.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Regional Expertise',
      description: 'Deep-rooted understanding of the Middle East business landscape, regulations, and culture.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // --- DATA: Projects ---
  const projects = [
    {
      id: 1,
      title: 'The Royal Atlantis',
      category: 'Luxury Hotel',
      location: 'Palm Jumeirah',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
      size: 'large'
    },
    {
      id: 2,
      title: 'Marina Heights',
      category: 'Residential Tower',
      location: 'Dubai Marina',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
      size: 'small'
    },
    {
      id: 4,
      title: 'Emirates Hills Estate',
      category: 'Private Villa',
      location: 'Emirates Hills',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop',
      size: 'small'
    },
    {
      id: 5,
      title: 'Downtown Views',
      category: 'Luxury Apartments',
      location: 'Downtown Dubai',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      size: 'large'
    }
  ];

  return (
    // MAIN CONTAINER: Theme-aware background
    <main className={`w-full selection:bg-[#ed1b24] selection:text-white transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#050505]' : 'bg-white'
    }`}>
      <Header />
      <HomeBanner />
     

      {/* =================================================================
          1. ABOUT SECTION
          Theme: Adaptive
      ================================================================= */}
    <section className={`relative py-20 lg:py-32 overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
  {/* Subtle Background Accent */}
  <div className={`absolute top-0 right-0 w-1/3 h-full skew-x-12 translate-x-20 pointer-events-none opacity-50 ${
    theme === 'dark' ? 'bg-[#111]' : 'bg-gray-100'
  }`} />
  
  <div className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      
      {/* Left Column: Text Content */}
      <div className="order-2 lg:order-1">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-[#ed1b24]"></span>
          <span className="text-[#ed1b24] font-bold uppercase tracking-widest text-xs">Who We Are</span>
        </div>
        
        <h2 className={`text-4xl lg:text-5xl font-bold leading-[1.1] mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Architecting Growth beyond <br className="hidden lg:block"/>
          <span className="relative inline-block">
            <span className="relative z-10">Boundaries.</span>
            {/* Underline effect */}
            <span className="absolute bottom-2 left-0 w-full h-3 bg-red-900/30 -z-0"></span>
          </span>
        </h2>

        <p className={`text-lg leading-relaxed mb-10 font-light ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          At PDC Consult, we don't just offer advice; we deliver transformation.
          Since 2009, we have partnered with industry leaders in Dubai and the MENA
          region to navigate complexity and unlock new value streams.
        </p>

        {/* Interactive Feature List - Theme Adaptive */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 border transition-all duration-300 cursor-pointer rounded-lg ${
                activeFeature === index
                  ? 'border-[#ed1b24] bg-red-900/10 shadow-sm'
                  : theme === 'dark'
                    ? 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100/50'
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="flex items-start gap-5">
                <div className={`mt-1 p-2 rounded-lg transition-colors duration-300 ${
                  activeFeature === index
                    ? 'bg-[#ed1b24] text-white'
                    : theme === 'dark'
                      ? 'bg-[#1a1a1a] text-gray-400 group-hover:bg-[#222]'
                      : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                }`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    activeFeature === index
                      ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                      : theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Image Composition */}
      <div className="order-1 lg:order-2 relative">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10 aspect-[4/5] lg:aspect-square group border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop" 
            alt="Corporate Meeting Dubai" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
          />
        </div>
        
        {/* Red Border Decoration */}
        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#ed1b24]/20 rounded-2xl -z-0 hidden lg:block"></div>
        
        {/* Floating Stat Card - Theme Adaptive */}
        <div className={`absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 p-6 sm:p-8 rounded-xl z-20 max-w-[240px] border-l-4 border-[#ed1b24] ${
          theme === 'dark'
            ? 'bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-r border-white/10'
            : 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-t border-r border-gray-200'
        }`}>
          <div className="flex items-end gap-2 mb-2">
            <span className={`text-4xl sm:text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>15</span>
            <span className="text-3xl font-bold text-[#ed1b24] mb-1">+</span>
          </div>
          <p className={`font-medium text-xs sm:text-sm uppercase tracking-wider leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Years of Strategic Excellence
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

{/* PASSING THEME HERE */}
<ProjectShowcase theme={theme} />
<ProjectBrochure theme={theme} />

      {/* =================================================================
          2. SERVICES SECTION
      ================================================================= */}
     
  <Services />
      {/* =================================================================
          3. PROJECTS SECTION
          Theme: Adaptive
      ================================================================= */}
<section 
  id="projects" 
  className={`py-24 transition-colors duration-300 ${
    theme === 'dark' ? 'bg-black' : 'bg-white'
  }`}
>
  <div className="container mx-auto px-6 sm:px-8 lg:px-16">

    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
      <div className="max-w-2xl">
        <span className="text-[#ed1b24] font-bold uppercase tracking-widest text-xs mb-3 block">
          Our Portfolio
        </span>
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Delivering Iconic <br/>
          <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
            Developments.
          </span>
        </h2>
        <p className={`text-lg font-light ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          From luxury hotels to private villas, our project portfolio represents
          the pinnacle of design, construction, and strategic planning.
        </p>
      </div>
      
      {/* Desktop View All Button - Theme Adaptive */}
      <div className="hidden md:block">
        <Link href="/projects" className={`flex items-center gap-3 px-8 py-4 bg-transparent border transition-all duration-300 font-semibold group rounded-full hover:border-[#ed1b24] hover:bg-[#ed1b24] hover:text-white ${
          theme === 'dark'
            ? 'border-white/30 text-white'
            : 'border-black/20 text-black'
        }`}>
          <span>View All Projects</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>
    </div>

    {/* Projects Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {projects.map((project, index) => (
        <Link
          href={`/projects/${project.id}`}
          key={index}
          className={`group relative overflow-hidden rounded-xl cursor-pointer shadow-lg h-[280px] sm:h-[350px] lg:h-[400px] border block ${
            project.size === 'large' ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
          } ${
            theme === 'dark' ? 'border-white/10' : 'border-black/5'
          }`}
        >
          {/* Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={project.image}
              alt={`${project.category} in Dubai - ${project.title}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            />
            {/* Gradient Overlay - Kept dark to ensure text readability over images */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="inline-block px-3 py-1 bg-[#ed1b24] text-white text-[10px] font-bold uppercase tracking-wider mb-3 rounded-sm">
                {project.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-white/70 text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <svg className="w-4 h-4 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {project.location}
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 border border-white/10">
              <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        </Link>
      ))}
    </div>

    {/* Mobile View All Button - Theme Adaptive */}
    <div className="mt-12 text-center md:hidden">
      <Link href="/projects" className={`w-full flex items-center justify-center gap-3 px-8 py-4 bg-transparent border font-semibold rounded-lg hover:bg-[#ed1b24] hover:border-[#ed1b24] hover:text-white transition-colors duration-300 ${
        theme === 'dark'
          ? 'border-white/30 text-white'
          : 'border-black/20 text-black'
      }`}>
        <span>View All Projects</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </Link>
    </div>

  </div>
</section>

      {/* =================================================================
          4. WHY CHOOSE US SECTION
          Theme: Adaptive
      ================================================================= */}
      <section className={`py-24 relative overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        {/* Background Dot Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(#ed1b24 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Why Choose <span className="text-[#ed1b24]">PDC Consult?</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              We bring decades of expertise and a proven track record of delivering
              exceptional results for businesses across the Middle East.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Service 1 */}
            <Link href="/services/project-development" className={`p-6 sm:p-8 lg:p-10 border hover:border-[#ed1b24] transition-all duration-300 group hover:-translate-y-2 rounded-xl block ${
              theme === 'dark' ? 'bg-[#111] border-white/5' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#ed1b24] text-white flex items-center justify-center mb-6 sm:mb-8 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-900/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Business Strategy</h3>
              <p className={`leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Strategic planning and execution to help your business achieve sustainable growth.</p>
            </Link>

            {/* Service 2 */}
            <Link href="/services/consultancy" className={`p-6 sm:p-8 lg:p-10 border hover:border-[#ed1b24] transition-all duration-300 group hover:-translate-y-2 rounded-xl block ${
              theme === 'dark' ? 'bg-[#111] border-white/5' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#ed1b24] text-white flex items-center justify-center mb-6 sm:mb-8 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-900/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Management Consulting</h3>
              <p className={`leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Expert guidance on organizational development and change management.</p>
            </Link>

            {/* Service 3 */}
            <Link href="/services/architectural-design" className={`p-6 sm:p-8 lg:p-10 border hover:border-[#ed1b24] transition-all duration-300 group hover:-translate-y-2 rounded-xl sm:col-span-2 lg:col-span-1 block ${
              theme === 'dark' ? 'bg-[#111] border-white/5' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#ed1b24] text-white flex items-center justify-center mb-6 sm:mb-8 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-900/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Market Analysis</h3>
              <p className={`leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>In-depth market research and analysis to identify opportunities and mitigate risks.</p>
            </Link>
          </div>
        </div>
      </section>
        <VisionSection />
  <OrgDiagram theme={theme}/>
  <FounderSection />
      {/* =================================================================
          5. CTA SECTION
          Theme: Brand Red | Minimalist
      ================================================================= */}
      <section className="bg-gradient-to-br from-[#ed1b24] to-[#c41119] py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute -left-20 -top-20 w-48 sm:w-64 h-48 sm:h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 w-64 sm:w-80 h-64 sm:h-80 bg-black opacity-10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-white/90 text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Let's discuss how PDC Consult can help you achieve your business goals and drive sustainable growth.
          </p>
          <Link href="/contact" className="w-full sm:w-auto inline-block bg-white text-[#ed1b24] px-8 sm:px-10 py-4 sm:py-5 font-bold text-base sm:text-lg hover:bg-black hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 rounded-xl">
            Schedule a Consultation
          </Link>
        </div>

      </section>
     <OrganizationalChart theme={theme} />

      <Footer />
    
      
    </main>
    
  );
}