import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Shield, Zap, Users, Phone, Mail } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Telecommunication',
      description: 'We provide services nation-wide to organizations in business, industry & government.',
      icon: Zap,
      color: 'from-violet-500 to-purple-600'
    },
    {
      title: 'Defence',
      description: 'We are a pioneer in Electronics & communication Technology with proven track record.',
      icon: Shield,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Manufacturing',
      description: 'We provide services nation-wide to organizations in business, industry & government.',
      icon: Users,
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-violet-50 via-white to-orange-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Telogica Limited</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Leading provider of Test and Measuring Equipment for Indian Defence and Telecom sectors. 
                Manufacturing excellence in Fiber, Data and Copper Cable Fault Locators.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/products')}
                  className="bg-gradient-to-r from-violet-600 to-orange-500 text-white hover:opacity-90 rounded-full px-8"
                  data-testid="hero-explore-products-btn"
                >
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="border-violet-600 text-violet-600 hover:bg-violet-50 rounded-full px-8"
                  data-testid="hero-contact-btn"
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 float-animation">
                <img
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
                  alt="Technology Equipment"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-br from-violet-400 to-orange-400 rounded-full blur-3xl opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white" id="about">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              About <span className="gradient-text">Telogica</span>
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Synonymous with Indian Defence and Telecom sector
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
                alt="About Telogica"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6">Our Story</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Telogica Ltd (Formerly Aishwarya Technologies and Telecom Ltd - ATTL) is a designing and 
                Manufacturing Company producing Test and Measuring Equipment like Fiber, Data and Copper Cable 
                Fault Locators in India.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We trade Spectrum Analyzers, Vector Network Analyzers, Signal Generators, Site Analyzers, 
                BTS Testers, SDH Analyzers, Splicing Machines, OTDR's, Cable Fault Locators, Cable Route 
                Locators and Electronic Markers and Locating Systems.
              </p>
              <Button
                onClick={() => navigate('/about')}
                className="bg-violet-600 hover:bg-violet-700 text-white rounded-full"
                data-testid="learn-more-btn"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-violet-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              Our <span className="gradient-text">Products</span>
            </motion.h2>
            <p className="text-lg text-gray-600">Comprehensive solutions for your industry needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => navigate('/products')}
                  data-testid={`category-card-${category.title.toLowerCase()}`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <Button
                    variant="link"
                    className="text-violet-600 p-0 h-auto font-semibold"
                    data-testid={`view-category-btn-${category.title.toLowerCase()}`}
                  >
                    View More Products
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-violet-600 to-orange-500">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Best Choice to Grow Your Business With Us
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Partner with Telogica for cutting-edge technology solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/contact')}
                className="bg-white text-violet-600 hover:bg-gray-100 rounded-full px-8"
                data-testid="cta-contact-btn"
              >
                <Mail className="mr-2 w-5 h-5" />
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => (window.location.href = 'tel:+919396610682')}
                className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8"
                data-testid="cta-call-btn"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
