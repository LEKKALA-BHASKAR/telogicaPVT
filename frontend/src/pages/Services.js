import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Settings, Headphones, Award, TrendingUp } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: 'Telecommunication Solutions',
      description: 'Comprehensive test and measuring equipment for telecom infrastructure, including OTDR, Spectrum Analyzers, and Site Analyzers.',
      features: ['Fiber Testing Equipment', 'Network Analyzers', 'Signal Generators', 'BTS Testers']
    },
    {
      icon: Shield,
      title: 'Defence Technology',
      description: 'Specialized equipment for defence applications with highest standards of reliability and precision.',
      features: ['Military Grade Equipment', 'Secure Communication Tools', 'Field Testing Devices', 'Electronic Warfare Solutions']
    },
    {
      icon: Settings,
      title: 'Manufacturing Excellence',
      description: 'Design and manufacturing of Cable Fault Locators, Splicing Machines, and precision instruments.',
      features: ['Custom Design', 'Quality Assurance', 'ISO Certified', 'In-house R&D']
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      description: '24/7 technical support and training for all our products with expert engineers.',
      features: ['On-site Training', '24/7 Support', 'Remote Assistance', 'Regular Updates']
    },
    {
      icon: Award,
      title: 'Calibration Services',
      description: 'NABL accredited calibration services for precise measurements and equipment accuracy.',
      features: ['NABL Certified', 'Regular Calibration', 'Certification', 'Traceable Standards']
    },
    {
      icon: TrendingUp,
      title: 'Consulting Services',
      description: 'Expert consultation for technology implementation and infrastructure planning.',
      features: ['Network Planning', 'Equipment Selection', 'Cost Optimization', 'Implementation Support']
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 py-20 bg-gradient-to-br from-violet-50 via-white to-orange-50">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold mb-6"
          >
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Comprehensive solutions for Defence and Telecom sectors
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-20 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-violet-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
                  data-testid={`service-card-${index}`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-violet-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
