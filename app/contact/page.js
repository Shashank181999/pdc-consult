'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ============================================
// CONTACT HERO
// ============================================
const ContactHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-black overflow-hidden pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(237,27,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(237,27,36,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ed1b24] rounded-full blur-[400px] opacity-[0.07]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8">
          <span className="w-2 h-2 bg-[#ed1b24] rounded-full"></span>
          <span className="text-white/90 text-sm font-medium tracking-wide">Get in Touch</span>
        </div>

        <div className="mb-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9]">
            Contact
          </h1>
        </div>
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1b24] to-[#ff6b6b]">Us</span>
          </h1>
        </div>

        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Ready to start your next project? We'd love to hear from you and discuss how we can help bring your vision to life.
        </p>
      </div>
    </section>
  );
};

// ============================================
// CONTACT INFO CARDS
// ============================================
const ContactInfoSection = () => {
  const contactInfo = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      details: ['PDC Consult Office', 'Business Bay, Dubai', 'United Arab Emirates'],
      action: 'Get Directions',
      href: '#'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      details: ['info@pdcconsult.ae', 'projects@pdcconsult.ae'],
      action: 'Send Email',
      href: 'mailto:info@pdcconsult.ae'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      details: ['+971 4 123 4567', '+971 50 123 4567'],
      action: 'Call Now',
      href: 'tel:+97141234567'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Working Hours',
      details: ['Sunday - Thursday', '9:00 AM - 6:00 PM', 'Friday - Saturday: Closed'],
      action: 'Schedule Meeting',
      href: '#'
    }
  ];

  return (
    <section className="relative py-20 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group relative p-8 bg-black rounded-2xl border border-white/5 lg:hover:border-[#ed1b24]/30 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-[#ed1b24]/10 rounded-xl flex items-center justify-center text-[#ed1b24] mb-6 lg:group-hover:bg-[#ed1b24] lg:group-hover:text-white transition-colors duration-300">
                {info.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4">{info.title}</h3>
              <div className="space-y-1 mb-6">
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-400 text-sm">{detail}</p>
                ))}
              </div>

              {/* Action Link */}
              <a
                href={info.href}
                className="inline-flex items-center gap-2 text-[#ed1b24] font-medium text-sm"
              >
                {info.action}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CONTACT FORM SECTION
// ============================================
const ContactFormSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const projectTypes = [
    'Residential Development',
    'Commercial Project',
    'Hospitality / Hotel',
    'Mixed-Use Development',
    'Renovation / Fit-out',
    'Consultation Only',
    'Other'
  ];

  const budgetRanges = [
    'Under $1M',
    '$1M - $10M',
    '$10M - $50M',
    '$50M - $100M',
    '$100M - $500M',
    'Over $500M'
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
          alt="Office"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Form */}
          <div
            className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#ed1b24]"></span>
              <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-xs">Send a Message</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4 leading-[1.1]">
              Let's Start a <span className="font-normal text-[#ed1b24]">Conversation</span>
            </h2>

            <p className="text-gray-400 text-lg mb-10">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Phone & Company Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none transition-colors"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                {/* Project Type & Budget Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#ed1b24] focus:outline-none transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                    >
                      <option value="" className="bg-black">Select Project Type</option>
                      {projectTypes.map((type, i) => (
                        <option key={i} value={type} className="bg-black">{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#ed1b24] focus:outline-none transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                    >
                      <option value="" className="bg-black">Select Budget Range</option>
                      {budgetRanges.map((range, i) => (
                        <option key={i} value={range} className="bg-black">{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Project Details *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#ed1b24] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project, goals, and timeline..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-5 bg-[#ed1b24] text-white font-bold text-lg rounded-xl lg:hover:bg-white lg:hover:text-[#ed1b24] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right - Additional Info */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            {/* Why Contact Us */}
            <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 lg:p-10 rounded-2xl border border-white/5 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why Work With Us?</h3>
              <div className="space-y-5">
                {[
                  { title: '15+ Years Experience', desc: 'Proven track record in major developments' },
                  { title: '$5B+ Projects Managed', desc: 'Extensive portfolio across all sectors' },
                  { title: 'End-to-End Solutions', desc: 'From concept to completion' },
                  { title: 'Regional Expertise', desc: 'Deep knowledge of UAE & MENA markets' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#ed1b24] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                  { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { name: 'Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 lg:hover:bg-[#ed1b24] lg:hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAP SECTION
// ============================================
const MapSection = () => {
  return (
    <section className="relative py-20 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-white">
            Find <span className="font-normal text-[#ed1b24]">Us</span>
          </h2>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10">
          {/* Map Container - Better mobile aspect ratio */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] bg-[#111]">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop"
              alt="Map"
              className="w-full h-full object-cover opacity-60"
            />

            {/* Location Pin - Static on mobile */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#ed1b24] rounded-full flex items-center justify-center shadow-2xl shadow-[#ed1b24]/50">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[#ed1b24] rotate-45"></div>
              </div>
            </div>

            {/* Info Card - Repositioned for mobile */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 bg-black/90 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-white/10 sm:max-w-sm">
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">PDC Consult Headquarters</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Business Bay, Dubai, United Arab Emirates</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-[#ed1b24] font-medium text-xs sm:text-sm"
              >
                Open in Google Maps
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FAQ SECTION
// ============================================
const FAQSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What types of projects does PDC Consult handle?',
      answer: 'We specialize in a wide range of projects including residential developments, commercial towers, hospitality and hotels, mixed-use developments, and large-scale infrastructure projects across the UAE and MENA region.'
    },
    {
      question: 'How long does a typical project consultation take?',
      answer: 'Initial consultations typically take 1-2 weeks, during which we assess your project requirements, conduct feasibility studies, and provide preliminary recommendations. Full project timelines vary based on scope and complexity.'
    },
    {
      question: 'Do you work with international clients?',
      answer: 'Yes, we work with clients from around the world. Our team has extensive experience managing projects for international developers, investors, and government entities looking to develop in the UAE and MENA region.'
    },
    {
      question: 'What is your approach to project management?',
      answer: 'We follow a comprehensive project management methodology that includes detailed planning, risk assessment, regular progress monitoring, quality assurance, and transparent communication with all stakeholders throughout the project lifecycle.'
    },
    {
      question: 'Can you help with obtaining necessary permits and approvals?',
      answer: 'Absolutely. Our team has deep expertise in navigating local regulations and can assist with all necessary permits, approvals, and compliance requirements for your project in Dubai and the wider UAE.'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div
          className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-[#ed1b24] font-semibold uppercase tracking-[0.2em] text-sm">FAQ</span>
          <h2 className="text-4xl sm:text-5xl font-light text-white mt-4">
            Frequently Asked <span className="font-normal text-[#ed1b24]">Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 bg-white/5 lg:hover:bg-white/10 rounded-xl border border-white/5 transition-colors duration-300 text-left"
              >
                <span className="text-base sm:text-lg font-medium text-white pr-4 sm:pr-8">{faq.question}</span>
                <div
                  className={`w-8 h-8 bg-[#ed1b24]/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                >
                  <svg className="w-4 h-4 text-[#ed1b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 sm:p-6 text-gray-400 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function ContactPage() {
  return (
    <main className="w-full bg-black selection:bg-[#ed1b24] selection:text-white" style={{ fontFamily: "'Archivo', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      <Header />
      <ContactHero />
      <ContactInfoSection />
      <ContactFormSection />
      <MapSection />
      <FAQSection />
      <Footer />
    </main>
  );
}