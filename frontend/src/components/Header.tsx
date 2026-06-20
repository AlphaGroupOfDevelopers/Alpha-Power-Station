'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <div className="text-2xl font-bold text-blue-900">
              Alpha Power Station
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 items-center text-sm">
            <li><Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link></li>
            <li><Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About Us</Link></li>
            <li><Link href="/team" className="text-gray-700 hover:text-blue-600 font-medium transition">Our Team</Link></li>
            <li><Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium transition">Projects</Link></li>
            <li><Link href="/student-programs" className="text-gray-700 hover:text-blue-600 font-medium transition">Student Programs</Link></li>
            <li><Link href="/partnerships" className="text-gray-700 hover:text-blue-600 font-medium transition">Partnerships</Link></li>
            <li><Link href="/news" className="text-gray-700 hover:text-blue-600 font-medium transition">News & Insights</Link></li>
            <li><Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link></li>
            <li>
              <Link 
                href="/student-programs/apply" 
                className="bg-yellow-400 text-blue-900 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Apply Now
              </Link>
            </li>
          </ul>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition py-2"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition py-2"
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/team" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition py-2"
                  onClick={closeMobileMenu}
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition py-2"
                  onClick={closeMobileMenu}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/student-programs" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition py-2"
                  onClick={closeMobileMenu}
                >
                  Student Programs
                </Link>
              </li>
              <li>
                <Link 
                  href="/partnerships" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition py-2"
                  onClick={closeMobileMenu}
                >
                  Partnerships
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition py-2"
                  onClick={closeMobileMenu}
                >
                  News & Insights
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition py-2"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  href="/student-programs/apply" 
                  className="block bg-yellow-400 text-blue-900 px-5 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition text-center"
                  onClick={closeMobileMenu}
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
