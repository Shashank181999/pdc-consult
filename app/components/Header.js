'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setMobileDropdownOpen({});
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { name: 'Home', href: '/' },
    {
      name: 'Who We Are',
      href: '/about',
      dropdown: [
        { name: 'Our Story', href: '/about#story' },
        { name: 'Our Team', href: '/about#team' },
        { name: 'Mission & Vision', href: '/about#mission' }
      ]
    },
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Projects Development & Management', href: '/services/project-development' },
        { name: 'Consultancy', href: '/services/cost-management' },
        { name: 'Architectural Design & Urban Planning', href: '/services/architectural-design' },
        { name: 'Organisation Facilities - PM', href: '/services/pm-training' },
        { name: 'Hospitality Consultancy', href: '/services/hospitality-consultancy' }
      ]
    },
    {
      name: 'Projects',
      href: '/projects',
      dropdown: [
        { name: 'All Projects', href: '/projects' },
        { name: 'Residential Buildings', href: '/projects?category=residential' },
        { name: 'Commercial & Office', href: '/projects?category=commercial' },
        { name: 'Mixed Use Developments', href: '/projects?category=mixed-use' },
        { name: 'Hotels & Hospitality', href: '/projects?category=hospitality' },
        { name: 'Renovations', href: '/projects?category=renovations' }
      ]
    },
    {
      name: 'Sectors',
      href: '/projects#sectors',
      dropdown: [
        { name: 'High Rise Towers', href: '/projects?sector=high-rise' },
        { name: 'Villas & Master Plans', href: '/projects?sector=villas' },
        { name: 'Hospitality', href: '/projects?sector=hospitality' },
        { name: 'Healthcare', href: '/projects?sector=healthcare' },
        { name: 'Infrastructure', href: '/projects?sector=infrastructure' },
        { name: 'Retail & Commercial', href: '/projects?sector=retail' },
        { name: 'Education', href: '/projects?sector=education' }
      ]
    },
    { name: 'Contact', href: '/contact' }
  ];

  const toggleMobileDropdown = (itemName) => {
    setMobileDropdownOpen(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-600/10 py-4'
            : 'bg-transparent py-6'
        }`}
        style={{ fontFamily: "'Archivo', sans-serif" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/pdc-consult-logo.svg"
                alt="PDC Consult"
                className="h-10 md:h-12 lg:h-14 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-white font-medium hover:text-red-600 transition-colors duration-300 flex items-center gap-1 group py-2"
                  >
                    {item.name}
                    {item.dropdown && (
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>

                  {/* Dropdown Menu - Fixed with padding wrapper */}
                  {item.dropdown && (
                    <div
                      className={`absolute top-full left-0 pt-2 transition-all duration-300 ${
                        activeDropdown === item.name
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      {/* Actual dropdown content */}
                      <div className="w-64 bg-black/95 backdrop-blur-lg border border-red-600/20 shadow-xl overflow-hidden rounded-md">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-red-600/20 transition-all duration-200 border-l-2 border-transparent hover:border-red-600"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Theme Toggle & CTA Button Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              <Link
                href="/contact"
                className="px-6 py-3 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 rounded-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Theme Toggle Button Mobile */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Full Screen Overlay */}
          <div
            className={`lg:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black/98 backdrop-blur-xl z-50 transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{ height: '100dvh' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-4 sm:right-6 w-12 h-12 flex items-center justify-center text-white hover:text-red-600 transition-colors z-50"
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Content */}
            <nav className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto hide-scrollbar">
              <div className="flex-1 space-y-2">
                {menuItems.map((item, index) => (
                  <div key={index} className="border-b border-white/10 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex-1 block py-4 text-xl font-medium text-white hover:text-red-600 transition-all duration-200"
                        onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <button
                          onClick={() => toggleMobileDropdown(item.name)}
                          className="p-4 text-white hover:text-red-600 transition-colors"
                          aria-label={`Toggle ${item.name} dropdown`}
                        >
                          <svg
                            className={`w-5 h-5 transition-transform duration-300 ${
                              mobileDropdownOpen[item.name] ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {item.dropdown && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          mobileDropdownOpen[item.name] ? 'max-h-[500px] pb-4' : 'max-h-0'
                        }`}
                      >
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-3 text-base text-gray-400 hover:text-white hover:bg-red-600/10 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-red-600"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-6 mt-auto">
                <Link
                  href="/contact"
                  className="block w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-center text-lg rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-900/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-gray-500 text-sm mb-2">Need help?</p>
                  <a href="tel:+97142775734" className="text-white hover:text-red-600 transition-colors">
                    +971 4 277 5734
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
