import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg mr-3">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold text-white">
                Aishwarya Tech Tele
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
                <span className="text-gray-300 text-sm">
                  Empire Square, Plot No 233-A, 234 & 235, 3rd Fl, Rd No 36,<br />
                  Jubilee Hills, Hyderabad-500033
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  +91 9396610682
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  sales@telogica.com
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Additional */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              Connect With Us
            </h3>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-300 border border-gray-600 hover:border-blue-500"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-gray-300" />
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