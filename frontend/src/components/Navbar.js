import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Salary', path: '/salary' },
    { name: 'Rules', path: '/rules' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full top-0 z-50 glass-effect" data-testid="main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3" data-testid="nav-logo-link">
            <img 
              src="https://customer-assets.emergentagent.com/job_9f71c832-32c0-4e43-a54d-148da0bec377/artifacts/rv69rtzr_Firefly_Gemini_Flash_remove_background_389106-removebg-preview%20%281%29.png" 
              alt="Tilo Live Logo" 
              className="h-12"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.name.toLowerCase()}-link`}
                className={`text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-sky-500'
                    : 'text-gray-700 hover:text-sky-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-sky-500"
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                data-testid={`mobile-nav-${link.name.toLowerCase()}-link`}
                className={`block text-base font-medium py-2 ${
                  isActive(link.path)
                    ? 'text-sky-500'
                    : 'text-gray-700 hover:text-sky-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
