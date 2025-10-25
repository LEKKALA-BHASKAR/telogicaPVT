import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Zap, Shield, Cog, Phone, Satellite, Wrench, Sparkles, Star, TrendingUp, Award, Clock, Users, BarChart3, Target, Lightbulb, Globe, Radio, Activity, Layers, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

function Services() {
  const [activeService, setActiveService] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 'telecommunications',
      icon: Phone,
      title: 'Telecommunications',
      subtitle: 'Advanced Testing & Measuring Equipment',
      description: 'We provide comprehensive solutions for telecom infrastructure testing, including fiber optic testing, cable fault location, and network analysis equipment.',
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
      ],
      color: 'from-red-500 via-orange-500 to-yellow-500',
      stats: { number: '500+', label: 'Telecom Projects' }
    },
    {
      id: 'defense',
      icon: Shield,
      title: 'Defense Solutions',
      subtitle: 'Specialized Equipment for Defense Applications',
      description: 'Military-grade testing and communication equipment designed to meet the stringent requirements of defense and security applications.',
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
      ],
      color: 'from-green-500 via-teal-500 to-blue-500',
      stats: { number: '200+', label: 'Defense Contracts' }
    },
    {
      id: 'manufacturing',
      icon: Cog,
      title: 'Manufacturing Services',
      subtitle: 'Custom Manufacturing & Design',
      description: 'End-to-end manufacturing services from concept to production, including custom design and development of specialized testing equipment.',
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
      ],
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      stats: { number: '1000+', label: 'Custom Products' }
    }
  ];

  const additionalServices = [
    {
      icon: Wrench,
      title: 'Installation & Commissioning',
      description: 'Professional installation and commissioning services for all our equipment with on-site support and training.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Maintenance & Support',
      description: 'Comprehensive maintenance programs and 24/7 technical support to ensure optimal equipment performance.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Satellite,
      title: 'System Integration',
      description: 'Complete system integration services to seamlessly incorporate our solutions into existing infrastructure.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const industries = [
    {
      name: 'Telecommunications',
      clients: ['BSNL', 'Airtel', 'Vodafone', 'Reliance Jio', 'Tata Communications'],
      description: 'Serving major telecom operators across India with cutting-edge testing solutions.',
      color: 'from-red-500 via-orange-500 to-yellow-500',
      icon: Radio
    },
    {
      name: 'Defense & Aerospace',
      clients: ['Indian Navy', 'Indian Army', 'DRDO', 'HAL', 'ISRO'],
      description: 'Trusted partner for defense organizations with mission-critical communication systems.',
      color: 'from-green-500 via-teal-500 to-blue-500',
      icon: Shield
    },
    {
      name: 'Government Sector',
      clients: ['Indian Railways', 'NTPC', 'PGCIL', 'BEL', 'ECIL'],
      description: 'Supporting government infrastructure projects with reliable testing equipment.',
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      icon: Globe
    },
    {
      name: 'Private Enterprises',
      clients: ['Huawei', 'Nokia', 'Ericsson', 'ZTE', 'Alcatel'],
      description: 'Partnering with global technology companies for advanced testing solutions.',
      color: 'from-purple-500 via-pink-500 to-red-500',
      icon: Users
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Understanding your specific requirements and challenges',
      icon: Target,
      color: 'from-red-500 to-pink-500'
    },
    {
      step: '02',
      title: 'Design',
      description: 'Creating customized solutions tailored to your needs',
      icon: Layers,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Professional installation and system integration',
      icon: Activity,
      color: 'from-green-500 to-teal-500'
    },
    {
      step: '04',
      title: 'Support',
      description: 'Ongoing maintenance and technical assistance',
      icon: Users,
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-red-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-reverse"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-green-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-reverse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Rainbow Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-indigo-500 to-purple-500 opacity-90"></div>
        
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/10 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-10 right-1/4 w-28 h-28 bg-white/10 rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <Sparkles className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">Our Services</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white" data-testid="services-hero-title">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">Services</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Comprehensive solutions for telecommunications, defense, and manufacturing sectors
            </p>
            
            <div className="mt-10 flex justify-center">
              <a href="#main-services" className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 group">
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      {/* Service Navigation */}
      <section className="py-12 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeService === index
                    ? 'bg-gradient-to-r ' + service.color + ' text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section id="main-services" className="py-20 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
                  activeService === index ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'
                } ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900" data-testid={`service-${service.id}-title`}>
                        {service.title}
                      </h2>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-2`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        Benefits:
                      </h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-2`}></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex items-center space-x-4">
                    <Link to={`/products?category=${service.id}`}>
                      <Button className={`bg-gradient-to-r ${service.color} text-white hover:shadow-lg transition-all duration-300 group`} data-testid={`${service.id}-products-btn`}>
                        View Products
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white font-bold`}>
                        {service.stats.number}
                      </div>
                      <span className="text-sm text-gray-600">{service.stats.label}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <div className={`aspect-w-16 aspect-h-9 bg-gradient-to-br ${service.color} rounded-3xl p-8 flex items-center justify-center`}>
                      <div className="text-center text-white">
                        <service.icon className="h-24 w-24 mx-auto mb-4" />
                        <div className="text-3xl font-bold mb-2">{service.title}</div>
                        <div className="text-xl">{service.subtitle}</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                  </div>
                  
                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.stats.number}
                      </div>
                      <div className="text-sm text-gray-600">{service.stats.label}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 via-orange-100 via-yellow-100 via-green-100 via-teal-100 via-blue-100 via-indigo-100 to-purple-100 backdrop-blur-sm border border-gray-200 mb-6">
              <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Additional Services</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive support services to maximize your investment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="group relative" data-testid={`additional-service-${index}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2"></div>
                <div className="relative bg-white rounded-3xl p-8 border border-gray-100 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-6 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-indigo-500 to-purple-500 font-medium">
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 via-orange-100 via-yellow-100 via-green-100 via-teal-100 via-blue-100 via-indigo-100 to-purple-100 backdrop-blur-sm border border-gray-200 mb-6">
              <Globe className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Industries</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">
              Trusted by leading organizations across various sectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group relative" data-testid={`industry-${index}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 h-full">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <industry.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{industry.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{industry.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Notable Clients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.clients.map((client, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Rainbow Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-indigo-500 to-purple-500"></div>
        
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/10 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-10 right-1/4 w-28 h-28 bg-white/10 rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <Clock className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">Our Process</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-xl text-white/90">
              A systematic approach to delivering exceptional solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((process, index) => (
              <div key={index} className="text-center group" data-testid={`process-${index}`}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {process.step}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${process.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <process.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{process.title}</h3>
                <p className="text-white/90">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border border-gray-100 shadow-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 via-orange-100 via-yellow-100 via-green-100 via-teal-100 via-blue-100 via-indigo-100 to-purple-100 backdrop-blur-sm border border-gray-200 mb-6">
                <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Get Started</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss how our services can address your specific requirements.
                Contact our experts for a personalized consultation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-indigo-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300 group" data-testid="contact-cta-btn">
                    Get Consultation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 25s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Services;