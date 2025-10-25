import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-float"></div>
        <div className="absolute -bottom-60 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-float-reverse"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="group">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-white/30 transition-all duration-500 group-hover:scale-105 overflow-hidden relative">
                <span className="text-black font-bold text-xl">T</span>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors duration-300">
                Telogica
              </span>
            </div>
            <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
              Leading provider of test and measuring equipment for Defence and Telecom sectors.
            </p>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h3 className="text-lg font-bold mb-4 text-white group-hover:text-gray-200 transition-colors duration-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/about', label: 'About Us' },
                { path: '/services', label: 'Services' },
                { path: '/products', label: 'Products' },
                { path: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-all duration-300 group/link flex items-center"
                  >
                    <span className="w-2 h-2 bg-white rounded-full opacity-0 group-hover/link:opacity-100 mr-3 transition-all duration-300 transform group-hover/link:scale-110"></span>
                    <span className="group-hover/link:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="group">
            <h3 className="text-lg font-bold mb-4 text-white group-hover:text-gray-200 transition-colors duration-300">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group/item hover:-translate-y-1 transition-transform duration-300">
                <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform duration-300" />
                <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors duration-300">
                  Empire Square, Plot No 233-A, 234 & 235, 3rd Fl, Rd No 36, Jubilee Hills, Hyderabad- 500 033
                </span>
              </li>
              <li className="flex items-center gap-3 group/item hover:-translate-y-1 transition-transform duration-300">
                <Phone className="w-5 h-5 text-white group-hover/item:scale-110 transition-transform duration-300" />
                <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors duration-300">
                  +91 9396610682
                </span>
              </li>
              <li className="flex items-center gap-3 group/item hover:-translate-y-1 transition-transform duration-300">
                <Mail className="w-5 h-5 text-white group-hover/item:scale-110 transition-transform duration-300" />
                <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors duration-300">
                  sales@telogica.com
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="group">
            <h3 className="text-lg font-bold mb-4 text-white group-hover:text-gray-200 transition-colors duration-300">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' }
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-500 group/social hover:-translate-y-1 hover:scale-110 relative overflow-hidden"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white group-hover/social:scale-110 transition-transform duration-300" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/social:translate-x-[100%] transition-transform duration-1000"></div>
                </a>
              ))}
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 group/info hover:bg-white/10 transition-all duration-500">
              <p className="text-sm text-gray-300 group-hover/info:text-white transition-colors duration-300">
                Connect with us for the latest updates and innovations in telecommunications and defense technology.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm hover:text-white transition-colors duration-300 group">
              © 2024 Telogica Limited. All Rights Reserved.
              <span className="block h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500 origin-left"></span>
            </p>
            
            <div className="flex gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-300 hover:text-white transition-all duration-300 group/link"
              >
                Privacy Policy
                <span className="block h-0.5 w-0 bg-white group-hover/link:w-full transition-all duration-500 origin-left"></span>
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-300 hover:text-white transition-all duration-300 group/link"
              >
                Terms of Service
                <span className="block h-0.5 w-0 bg-white group-hover/link:w-full transition-all duration-500 origin-left"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations to global CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-180deg); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 20s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;