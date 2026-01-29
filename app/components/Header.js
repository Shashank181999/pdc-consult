'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <Image
                src="/pdc-consult-logo.svg"
                alt="PDC Consult"
                width={150}
                height={50}
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
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

            {/* CTA Button Desktop */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="px-6 py-3 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 rounded-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white focus:outline-none"
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

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${
              isMobileMenuOpen ? 'max-h-screen mt-6' : 'max-h-0'
            }`}
          >
            <nav className="flex flex-col gap-2 pb-6">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="flex-1 block px-4 py-3 text-white hover:bg-red-600/20 hover:text-red-600 transition-all duration-200"
                      onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className="px-4 py-3 text-white hover:text-red-600 transition-colors"
                        aria-label={`Toggle ${item.name} dropdown`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
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
                        mobileDropdownOpen[item.name] ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="pl-4 bg-black/50">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-red-600/10 transition-all duration-200 border-l-2 border-transparent hover:border-red-600"
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
              <Link
                href="/contact"
                className="mt-4 mx-4 px-6 py-3 bg-red-600 text-white font-semibold text-center hover:bg-white hover:text-red-600 transition-all duration-300 rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
