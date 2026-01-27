'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
                TiloLive
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-sky-500 transition-colors">
              Home
            </Link>
            <Link href="/salary" className="text-gray-700 hover:text-sky-500 transition-colors">
              Salary
            </Link>
            <Link href="/rules" className="text-gray-700 hover:text-sky-500 transition-colors">
              Rules
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-sky-500 transition-colors">
              Contact
            </Link>
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-sky-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-sky-500 hover:bg-sky-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/salary"
              className="block px-3 py-2 text-gray-700 hover:text-sky-500 hover:bg-sky-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Salary
            </Link>
            <Link
              href="/rules"
              className="block px-3 py-2 text-gray-700 hover:text-sky-500 hover:bg-sky-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Rules
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-sky-500 hover:bg-sky-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="block mx-3 mt-2 text-center bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-2 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
