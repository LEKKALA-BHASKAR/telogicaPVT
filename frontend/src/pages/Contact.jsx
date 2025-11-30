import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, ArrowRight, Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import GlobalContactForm from '../components/GlobalContactForm';

const Contact = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const offices = [
    {
      city: 'Hyderabad (Head Office)',
      address: 'Empire Square, Plot No 233-A, 234 & 235, 3rd Fl, Rd No 36, Jubilee Hills, Hyderabad-500 033',
      phone: '+91 9396610682',
      email: 'sales@telogica.com',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      color: 'blue'
    },
    {
      city: 'Ahmedabad',
      address: 'M/s. TELOGICA LIMITED',
      phone: '+91-9396610682',
      email: 'sales@telogica.com',
      image: 'https://images.unsplash.com/photo-1580993553159-fc0020d934f4?q=80&w=2071&auto=format&fit=crop',
      color: 'green'
    },
    {
      city: 'Chennai',
      address: 'M/s. TELOGICA LIMITED No: 28/6, New Street, T.Nagar, Chennai - 600 017',
      phone: '+91 9396610682',
      email: 'sales@telogica.com',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1974&auto=format&fit=crop',
      color: 'purple'
    },
    {
      city: 'Bangalore',
      address: 'M/s. TELOGICA LIMITED #176, Sector 2, Nabonagar, Bannerugatta Road, Bangalore-560076',
      phone: '+91 9396610682',
      email: 'sales@telogica.com',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2127&auto=format&fit=crop',
      color: 'orange'
    },
    {
      city: 'Kolkata',
      address: 'M/s. TELOGICA LIMITED 14B, Bhupen Bose Avenue, Shyam Bazar, Kolkata-700004',
      phone: '+91-9396610682',
      email: 'sales@telogica.com',
      image: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=2074&auto=format&fit=crop',
      color: 'cyan'
    },
    {
      city: 'Mumbai',
      address: 'M/s. TELOGICA LIMITED #48/405, Unnat Nagar 2, S V Road, Goregaon (W), Mumbai-400 062',
      phone: '+91 9396610682',
      email: 'sales@telogica.com',
      image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=2165&auto=format&fit=crop',
      color: 'pink'
    },
    {
      city: 'Delhi',
      address: 'M/s. TELOGICA LIMITED 12/26, (Ground Floor), West Patel Nagar, Near Arya Samaj Mandir',
      phone: '+91-11-42488098',
      email: 'sales@telogica.com',
      image: 'https://images.unsplash.com/photo-1587474265402-9e2b74b776ce?q=80&w=2000&auto=format&fit=crop',
      color: 'indigo'
    }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f142fcb9631f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 ${
            isDarkMode ? 'mix-blend-overlay' : 'mix-blend-multiply'
          }`} />
          <div className={`absolute inset-0 bg-gradient-to-b ${
            isDarkMode ? 'from-black via-black/90 to-black' : 'from-white via-white/90 to-slate-50'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full mb-8 border backdrop-blur-sm bg-white/5 border-white/10"
          >
            <Globe className="w-4 h-4 mr-2 text-blue-400" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Global Presence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Let's Start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Conversation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl max-w-3xl mx-auto leading-relaxed mb-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Whether you have a question about our products, need technical support, or want to discuss a partnership, our team is ready to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlobalContactForm />
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`rounded-3xl overflow-hidden border h-[400px] md:h-[500px] relative group ${
              isDarkMode ? 'border-white/10' : 'border-gray-200 shadow-xl'
            }`}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.047545197043!2d78.4117765759369!3d17.42836350244475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9133bf9c894d%3A0xd7b13a6084ea8a26!2sEmpire%20Square!5e0!3m2!1sen!2sin!4v1730720809254!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: isDarkMode ? 'grayscale(100%) invert(92%) hue-rotate(180deg)' : 'grayscale(0%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Telogica Head Office Location"
              className="relative z-10"
            ></iframe>
            
            <div className={`absolute bottom-6 left-6 z-20 px-6 py-4 rounded-2xl backdrop-blur-xl border ${
              isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/90 border-gray-200 shadow-lg'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Head Office</h4>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hyderabad, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Regional Offices Grid */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Locations</h2>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              With offices across major cities in India, we are positioned to serve our clients effectively and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:border-blue-500/50' 
                    : 'bg-white border-gray-200 hover:shadow-xl hover:border-blue-500/30'
                }`}
              >
                {/* Image Header */}
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src={office.image} 
                    alt={office.city}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-white font-bold text-lg">{office.city}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`text-sm leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {office.address}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className={`w-5 h-5 flex-shrink-0 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {office.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className={`w-5 h-5 flex-shrink-0 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {office.email}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;