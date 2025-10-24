import React from 'react';
import { ArrowRight, CheckCircle, Zap, Shield, Cog, Phone, Satellite, Wrench } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

function Services() {
  const services = [
    {
      id: 'telecommunications',
      icon: Phone,
      title: 'Telecommunications',
      subtitle: 'Advanced Testing & Measuring Equipment',
      description: 'We provide comprehensive solutions for telecom infrastructure testing, including fiber optic testing, cable fault location, and network analysis equipment.',
      image: 'https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHx0ZWxlY29tJTIwZXF1aXBtZW50fGVufDB8fHx8MTc2MTI4OTU3M3ww&ixlib=rb-4.1.0&q=85',
      features: [
        'Fiber Optic Test Equipment (OTDR)',
        'Cable Fault Locators',
        'Spectrum Analyzers',
        'Vector Network Analyzers',
        'Signal Generators',
        'Site Analyzers',
        'BTS Testers',
        'SDH Analyzers'
      ],
      benefits: [
        'Accurate fault detection and location',
        'Reduced network downtime',
        'Improved network performance',
        'Cost-effective maintenance'
      ]
    },
    {
      id: 'defense',
      icon: Shield,
      title: 'Defense Solutions',
      subtitle: 'Specialized Equipment for Defense Applications',
      description: 'Military-grade testing and communication equipment designed to meet the stringent requirements of defense and security applications.',
      image: 'https://images.unsplash.com/photo-1760013767150-da8e4ded6286?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHx0ZWxlY29tJTIwZXF1aXBtZW50fGVufDB8fHx8MTc2MTI4OTU3M3ww&ixlib=rb-4.1.0&q=85',
      features: [
        'Ruggedized Testing Equipment',
        'Military Communication Systems',
        'Electronic Warfare Solutions',
        'Radar Testing Equipment',
        'Tactical Communication Gear',
        'Security and Surveillance Systems',
        'Field Portable Test Sets',
        'EMI/EMC Testing Solutions'
      ],
      benefits: [
        'Military-grade reliability',
        'Harsh environment operation',
        'Advanced security features',
        'Compliance with defense standards'
      ]
    },
    {
      id: 'manufacturing',
      icon: Cog,
      title: 'Manufacturing Services',
      subtitle: 'Custom Manufacturing & Design',
      description: 'End-to-end manufacturing services from concept to production, including custom design and development of specialized testing equipment.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxtYW51ZmFjdHVyaW5nfGVufDB8fHx8MTc2MTI4OTU3OXww&ixlib=rb-4.1.0&q=85',
      features: [
        'Custom Equipment Design',
        'Prototype Development',
        'Mass Production Capabilities',
        'Quality Assurance Testing',
        'Supply Chain Management',
        'Technical Documentation',
        'After-sales Support',
        'Training and Consultation'
      ],
      benefits: [
        'Tailored solutions for specific needs',
        'Rapid prototyping capabilities',
        'ISO certified manufacturing',
        'Comprehensive quality control'
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Wrench,
      title: 'Installation & Commissioning',
      description: 'Professional installation and commissioning services for all our equipment with on-site support and training.'
    },
    {
      icon: Zap,
      title: 'Maintenance & Support',
      description: 'Comprehensive maintenance programs and 24/7 technical support to ensure optimal equipment performance.'
    },
    {
      icon: Satellite,
      title: 'System Integration',
      description: 'Complete system integration services to seamlessly incorporate our solutions into existing infrastructure.'
    }
  ];

  const industries = [
    {
      name: 'Telecommunications',
      clients: ['BSNL', 'Airtel', 'Vodafone', 'Reliance Jio', 'Tata Communications'],
      description: 'Serving major telecom operators across India with cutting-edge testing solutions.'
    },
    {
      name: 'Defense & Aerospace',
      clients: ['Indian Navy', 'Indian Army', 'DRDO', 'HAL', 'ISRO'],
      description: 'Trusted partner for defense organizations with mission-critical communication systems.'
    },
    {
      name: 'Government Sector',
      clients: ['Indian Railways', 'NTPC', 'PGCIL', 'BEL', 'ECIL'],
      description: 'Supporting government infrastructure projects with reliable testing equipment.'
    },
    {
      name: 'Private Enterprises',
      clients: ['Huawei', 'Nokia', 'Ericsson', 'ZTE', 'Alcatel'],
      description: 'Partnering with global technology companies for advanced testing solutions.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-violet-900 via-purple-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="services-hero-title">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Comprehensive solutions for telecommunications, defense, and manufacturing sectors
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900" data-testid={`service-${service.id}-title`}>
                        {service.title}
                      </h2>
                      <p className="text-lg text-violet-600 font-semibold">{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Benefits:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-violet-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <Link to={`/products?category=${service.id}`}>
                      <Button className="btn-primary group" data-testid={`${service.id}-products-btn`}>
                        View Products
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-violet-600">500+</div>
                      <div className="text-sm text-gray-600">Successful Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive support services to maximize your investment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group" data-testid={`additional-service-${index}`}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">
              Trusted by leading organizations across various sectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow duration-300" data-testid={`industry-${index}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{industry.name}</h3>
                <p className="text-gray-600 mb-6">{industry.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Notable Clients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {industry.clients.map((client, idx) => (
                      <span key={idx} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gradient-to-br from-violet-900 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-white/90">
              A systematic approach to delivering exceptional solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'Understanding your specific requirements and challenges'
              },
              {
                step: '02',
                title: 'Design',
                description: 'Creating customized solutions tailored to your needs'
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Professional installation and system integration'
              },
              {
                step: '04',
                title: 'Support',
                description: 'Ongoing maintenance and technical assistance'
              }
            ].map((process, index) => (
              <div key={index} className="text-center" data-testid={`process-${index}`}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{process.title}</h3>
                <p className="text-white/90">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how our services can address your specific requirements.
            Contact our experts for a personalized consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="btn-primary" data-testid="contact-cta-btn">
                Get Consultation
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;