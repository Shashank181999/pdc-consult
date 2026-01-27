'use client';

import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { 
      name: 'Who We Are', 
      href: '#about',
      dropdown: [
        { name: 'Our Story', href: '#story' },
        { name: 'Our Team', href: '#team' },
        { name: 'Mission & Vision', href: '#mission' },
        { name: 'Careers', href: '#careers' }
      ]
    },
    { 
      name: 'Projects', 
      href: '#projects',
      dropdown: [
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Case Studies', href: '#case-studies' },
        { name: 'Success Stories', href: '#success' },
        { name: 'Industries', href: '#industries' }
      ]
    },
    { 
      name: 'Services', 
      href: '#services',
      dropdown: [
        { name: 'Business Strategy', href: '#strategy' },
        { name: 'Management Consulting', href: '#management' },
        { name: 'Market Analysis', href: '#market' },
        { name: 'Digital Transformation', href: '#digital' },
        { name: 'Financial Advisory', href: '#financial' }
      ]
    },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-600/10 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-red-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl leading-none">PDC</span>
              <span className="text-red-600 font-semibold text-sm leading-none">Consult</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
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
                </a>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-lg border border-red-600/20 shadow-xl overflow-hidden transition-all duration-300 ${
                      activeDropdown === item.name
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-red-600/20 transition-all duration-200 border-l-2 border-transparent hover:border-red-600"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="px-6 py-3 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white focus:outline-none"
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

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-screen mt-6' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col gap-2 pb-6">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a
                  href={item.href}
                  className="block px-4 py-3 text-white hover:bg-red-600/20 hover:text-red-600 transition-all duration-200"
                  onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
                {item.dropdown && (
                  <div className="pl-4 bg-black/50">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-red-600/10 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="#contact"
              className="mt-4 mx-4 px-6 py-3 bg-red-600 text-white font-semibold text-center hover:bg-white hover:text-red-600 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;