import React, { useState, useEffect } from 'react';
import { Award, Users, Globe, Zap, Target, Eye, Calendar, ChevronRight, Sparkles, ArrowRight, CheckCircle, Star, TrendingUp, Lightbulb, Shield, Clock, Award as AwardIcon, BarChart3, Heart, MessageSquare } from 'lucide-react';

function About() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const milestones = [
    {
      year: '1999',
      title: 'Company Founded',
      description: 'Aishwarya Technologies and Telecom Ltd (ATTL) was established with a vision to serve the telecommunications sector.',
      color: 'from-red-500 to-pink-500'
    },
    {
      year: '2005',
      title: 'Defense Partnership',
      description: 'Expanded into defense sector, becoming a trusted supplier of testing equipment to Indian Armed Forces.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      year: '2012',
      title: 'ISO Certification',
      description: 'Achieved ISO 9001:2008 certification for quality management systems and manufacturing processes.',
      color: 'from-yellow-500 to-green-500'
    },
    {
      year: '2018',
      title: 'Technology Upgrade',
      description: 'Major technology upgrade with state-of-the-art manufacturing facility and R&D capabilities.',
      color: 'from-green-500 to-teal-500'
    },
    {
      year: '2020',
      title: 'Rebranding',
      description: 'Rebranded to Telogica Limited, reflecting our commitment to technological excellence and innovation.',
      color: 'from-teal-500 to-blue-500'
    },
    {
      year: '2024',
      title: 'Digital Transformation',
      description: 'Launched comprehensive digital platform and expanded e-commerce capabilities for global reach.',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We deliver precise, accurate, and reliable testing solutions that meet the highest industry standards.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuous innovation drives our product development, keeping us at the forefront of technology.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build long-term partnerships with our clients, understanding their unique requirements and challenges.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Commitment to excellence in every aspect of our business, from manufacturing to customer service.',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const leadership = [
    {
      name: 'Mr. Rajesh Agarwal',
      role: 'Managing Director',
      description: 'With over 25 years of experience in telecommunications and defense sectors, Mr. Agarwal leads our strategic vision and business development.',
      color: 'from-red-500 to-pink-500'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Technology Officer',
      description: 'Dr. Sharma brings cutting-edge technical expertise and innovation leadership, driving our R&D initiatives and product development.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      name: 'Mr. Amit Kumar',
      role: 'Chief Operations Officer',
      description: 'Leading our manufacturing and quality operations, Mr. Kumar ensures excellence in production and delivery of our products.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const stats = [
    { number: '25+', label: 'Years of Excellence', icon: Calendar },
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '1000+', label: 'Projects Completed', icon: CheckCircle },
    { number: '50+', label: 'Product Variants', icon: BarChart3 }
  ];

  const certifications = [
    { title: 'ISO 9001:2015', subtitle: 'Quality Management', icon: Award },
    { title: 'ISO 14001', subtitle: 'Environmental Management', icon: Globe },
    { title: 'OHSAS 18001', subtitle: 'Safety Management', icon: Shield },
    { title: 'CE Marking', subtitle: 'European Compliance', icon: CheckCircle }
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
              <span className="text-sm font-medium text-white">About Our Company</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white" data-testid="about-hero-title">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">Telogica</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Formerly Aishwarya Technologies and Telecom Ltd (ATTL), we are synonymous with Indian Defence and Telecom sector. 
              We design and manufacture Test and Measuring Equipment for Fiber, Data and Copper Cable Fault Locators.
            </p>
            
            <div className="mt-10 flex justify-center">
              <a href="#mission" className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 group">
                Discover Our Story
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

      {/* Stats Section */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                  index === 0 ? 'from-red-500 to-pink-500' :
                  index === 1 ? 'from-orange-500 to-yellow-500' :
                  index === 2 ? 'from-green-500 to-teal-500' :
                  'from-blue-500 to-indigo-500'
                } flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section id="mission" className="py-20 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be the leading provider of innovative testing and measuring equipment for telecommunications and defense sectors, 
                  delivering superior quality products that enable our clients to build and maintain robust communication networks.
                </p>
              </div>
              
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become a globally recognized technology company that shapes the future of telecommunications through 
                  continuous innovation, exceptional quality, and unwavering commitment to customer success.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="aspect-w-16 aspect-h-9 mb-6 rounded-2xl overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-br from-red-500 via-orange-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl font-bold mb-2">Telogica</div>
                      <div className="text-xl">Innovation in Technology</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">25+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 via-orange-100 via-yellow-100 via-green-100 via-teal-100 via-blue-100 via-indigo-100 to-purple-100 backdrop-blur-sm border border-gray-200 mb-6">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Our Values</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every product we create
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative" data-testid={`value-${value.title.toLowerCase()}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2"></div>
                <div className="relative bg-white rounded-2xl p-8 border border-gray-100 h-full">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-center">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 via-orange-100 via-yellow-100 via-green-100 via-teal-100 via-blue-100 via-indigo-100 to-purple-100 backdrop-blur-sm border border-gray-200 mb-6">
              <Clock className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Our Journey</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Over two decades of innovation and growth in telecommunications technology
            </p>
          </div>
          
          {/* Timeline Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {milestones.map((milestone, index) => (
              <button
                key={index}
                onClick={() => setActiveMilestone(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeMilestone === index
                    ? 'bg-gradient-to-r ' + milestone.color + ' text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {milestone.year}
              </button>
            ))}
          </div>
          
          {/* Timeline Content */}
          <div className="relative">
            {/* Rainbow Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-500 via-orange-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-indigo-500 to-purple-500 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} transition-all duration-700 ${
                    activeMilestone === index ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'
                  }`} 
                  data-testid={`milestone-${milestone.year}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                      activeMilestone === index ? 'ring-2 ring-offset-2 ring-' + (index === 0 ? 'red' : index === 1 ? 'orange' : index === 2 ? 'yellow' : index === 3 ? 'green' : index === 4 ? 'blue' : 'indigo') + '-500' : ''
                    }`}>
                      <div className={`text-2xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent mb-2`}>{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-full border-4 border-white shadow-lg z-10">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${milestone.color}`}></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 via-orange-100 via-yellow-100 via-green-100 via-teal-100 via-blue-100 via-indigo-100 to-purple-100 backdrop-blur-sm border border-gray-200 mb-6">
              <Users className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Leadership</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Meet the visionaries driving Telogica's success and innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="group relative" data-testid={`leader-${index}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2"></div>
                <div className="relative bg-white rounded-3xl p-8 border border-gray-100 h-full">
                  <div className="relative mb-6">
                    <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${leader.color} flex items-center justify-center text-white text-4xl font-bold group-hover:scale-110 transition-transform duration-300`}>
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{leader.name}</h3>
                  <p className={`text-transparent bg-clip-text bg-gradient-to-r ${leader.color} font-semibold mb-4 text-center`}>{leader.role}</p>
                  <p className="text-gray-600 leading-relaxed text-center">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications and Awards */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 via-orange-100 via-yellow-100 via-green-100 via-teal-100 via-blue-100 via-indigo-100 to-purple-100 backdrop-blur-sm border border-gray-200 mb-6">
              <Award className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Certifications</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Recognition</h2>
            <p className="text-xl text-gray-600">
              Our commitment to quality and excellence is recognized by industry standards
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="group relative" data-testid={`certification-${index}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2"></div>
                <div className="relative bg-white rounded-2xl p-6 border border-gray-100 h-full text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                    index === 0 ? 'from-red-500 to-pink-500' :
                    index === 1 ? 'from-orange-500 to-yellow-500' :
                    index === 2 ? 'from-green-500 to-teal-500' :
                    'from-blue-500 to-indigo-500'
                  } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <cert.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{cert.title}</h3>
                  <p className="text-sm text-gray-600">{cert.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
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
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">Let's Build the Future Together</h2>
            <p className="text-xl text-white/90 mb-8">
              Ready to partner with us? Get in touch to discuss your telecommunications and defense equipment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 group">
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="/products" className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 group">
                View Our Products
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
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

export default About;