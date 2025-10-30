import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700">
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
              <span className="text-2xl font-bold text-white">
                Telogica Ltd
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading manufacturer of advanced Test & Measuring Equipment for Defence 
              and Telecom sectors. Delivering reliability, innovation, and unmatched performance.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Trusted by industry leaders</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
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
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div className="text-gray-300 text-sm">
                  <div className="font-semibold text-white">Corporate</div>
                  <div className="font-semibold text-white">TELOGICA LIMITED</div>
                  <div>Empire Square, Plot No 233-A, 234 & 235,</div>
                  <div>3rd Fl, Rd No 36, Jubilee Hills,</div>
                  <div>Hyderabad- 500 033, Telangana, India</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
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
                <Mail className="w-5 h-5 text-blue-400" />
                <div className="text-gray-300 text-sm">
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
            <h3 className="text-lg font-bold mb-6 text-white">
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
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300 text-center">
                ISO Certified • 15+ Years Experience
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Aishwarya Tech Tele. All rights reserved.
            </p>
            
            <div className="flex gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link 
                to="/sitemap" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
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