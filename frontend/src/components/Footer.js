import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white border-gray-700' 
        : 'bg-gray-50 text-gray-900 border-gray-200'
    }`}>
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/logohead.png" 
                alt="Telogica Ltd" 
                className="w-12 h-12 mr-3"
              />
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Telogica Ltd
              </span>
            </div>
            <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Leading manufacturer of advanced Test & Measuring Equipment for Defence 
              and Telecom sectors. Delivering reliability, innovation, and unmatched performance.
            </p>
            <div className={`flex items-center space-x-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-blue-500' : 'bg-indigo-500'}`}></div>
              <span>Trusted by industry leaders</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/about', label: 'About Us' },
                { path: '/services', label: 'Services' },
                { path: '/products', label: 'Products' },
                { path: '/contact', label: 'Contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`transition-colors duration-300 flex items-center group ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isDarkMode ? 'bg-blue-500' : 'bg-indigo-500'
                    }`}></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 flex-shrink-0 mt-1 ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Corporate</div>
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TELOGICA LIMITED</div>
                  <div>Empire Square, Plot No 233-A, 234 & 235,</div>
                  <div>3rd Fl, Rd No 36, Jubilee Hills,</div>
                  <div>Hyderabad- 500 033, Telangana, India</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-2">
                    <span>+91 9396610682</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span>+91- 40-27531324 to 26</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span>+91-40-27535423</span>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-2">
                    <span>sales@telogica.com</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span>support@telogica.com</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Additional */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Connect With Us
            </h3>
            <div className="flex gap-4 mb-6">
              {[
                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/aishwaryatechtele', color: 'text-blue-600' },
                { icon: Twitter, label: 'Twitter', href: '#', color: 'text-blue-400' },
                { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'text-blue-700' },
                { icon: Instagram, label: 'Instagram', href: '#', color: 'text-pink-500' },
                { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/user/aishwaryatechtele', color: 'text-red-600' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} hover:opacity-80 transition-opacity duration-300`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            
            {/* Trust Badge */}
            <div className={`p-4 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <p className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                ISO Certified • 15+ Years Experience
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t mt-12 pt-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2024 Aishwarya Tech Tele. All rights reserved.
            </p>
            
            <div className="flex gap-6 text-sm">
              <Link 
                to="/privacy" 
                className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                Terms of Service
              </Link>
              <Link 
                to="/sitemap" 
                className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;