import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API}/settings`);
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const socialLinks = [
    { icon: Facebook, url: settings?.socialMedia?.facebook, name: 'Facebook' },
    { icon: Instagram, url: settings?.socialMedia?.instagram, name: 'Instagram' },
    { icon: Twitter, url: settings?.socialMedia?.twitter, name: 'Twitter' },
    { icon: Youtube, url: settings?.socialMedia?.youtube, name: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_9f71c832-32c0-4e43-a54d-148da0bec377/artifacts/rv69rtzr_Firefly_Gemini_Flash_remove_background_389106-removebg-preview%20%281%29.png" 
              alt="Tilo Live" 
              className="h-10 mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm">
              Professional live streaming platform connecting hosts and audiences worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <Link to="/" className="text-gray-400 hover:text-sky-400 transition-colors block" data-testid="footer-home-link">Home</Link>
              <Link to="/salary" className="text-gray-400 hover:text-sky-400 transition-colors block" data-testid="footer-salary-link">Salary Structure</Link>
              <Link to="/rules" className="text-gray-400 hover:text-sky-400 transition-colors block" data-testid="footer-rules-link">Rules</Link>
              <Link to="/contact" className="text-gray-400 hover:text-sky-400 transition-colors block" data-testid="footer-contact-link">Contact</Link>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                social.url && (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-sky-400 transition-colors"
                    data-testid={`footer-${social.name.toLowerCase()}-link`}
                  >
                    <social.icon size={24} />
                  </a>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p data-testid="footer-copyright">{settings?.footerText || '© 2025 Tilo Live. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
