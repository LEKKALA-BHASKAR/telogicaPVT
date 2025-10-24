import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
    { icon: TrendingUp, label: 'Years Experience', value: '15+' },
    { icon: Target, label: 'Projects Done', value: '1000+' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 py-20 bg-gradient-to-br from-violet-50 to-orange-50">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold mb-6"
          >
            About <span className="gradient-text">Telogica</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Synonymous with Indian Defence and Telecom sector since 2008
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 py-20 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Telogica Ltd (Formerly Aishwarya Technologies and Telecom Ltd - ATTL) is synonymous with 
                  Indian Defence and Telecom sector. We are a designing and Manufacturing Company producing 
                  Test and Measuring Equipment like Fiber, Data and Copper Cable Fault Locators in India.
                </p>
                <p>
                  We trade Spectrum Analyzers, Vector Network Analyzers, Signal Generators, Site Analyzers, 
                  BTS Testers, SDH Analyzers, Splicing Machines, OTDR's, Cable Fault Locators, Cable Route 
                  Locators and Electronic Markers and Locating Systems.
                </p>
                <p>
                  Apart from being a prominent player in the domestic telecom industry, we are a trend-setter 
                  in the Indian Telecom Industry in qualitative terms.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                alt="Telogica Office"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-20 bg-gradient-to-br from-violet-600 to-orange-500">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/90">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-20 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-violet-50 to-violet-100 p-10 rounded-3xl"
            >
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide cutting-edge test and measuring equipment solutions that empower the Defence and 
                Telecom sectors with reliability, precision, and innovation. We strive to be the trusted partner 
                for organizations seeking world-class technology and exceptional service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-10 rounded-3xl"
            >
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the leading provider of technological solutions in the Indian Defence and Telecom sectors, 
                recognized globally for our commitment to quality, innovation, and customer satisfaction. We envision 
                a future where our products set industry standards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
