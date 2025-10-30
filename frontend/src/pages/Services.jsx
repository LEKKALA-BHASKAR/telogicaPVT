import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Zap, Shield, Cog, Phone, Satellite, Wrench, Sparkles, Star, TrendingUp, Award, Clock, Users, BarChart3, Target, Lightbulb, Globe, Radio, Activity, Layers, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Footer from '@/components/Footer';

function Services() {
  const [activeService, setActiveService] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // GSAP Animations for Hero Section
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );

    // GSAP Animations for Sections
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
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
      description: 'Comprehensive solutions for telecom infrastructure, including fiber optic testing and network analysis.',
      features: [
        'Fiber Optic Test Equipment (OTDR)',
        'Cable Fault Locators',
        'Spectrum Analyzers',
        'Vector Network Analyzers',
      ],
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'rgba(6, 182, 212, 0.1)',
      stats: { number: '500+', label: 'Telecom Projects' },
      image: 'https://media.istockphoto.com/id/1602617670/photo/satellite-dish-antenna-communication-technology-concept.jpg?s=612x612&w=0&k=20&c=XjMfP8m2WEykJGAcWOMAmIJI3MWvFBnxDdKXI6ufYVE=',
    },
    {
      id: 'defense',
      icon: Shield,
      title: 'Defense Solutions',
      subtitle: 'Specialized Equipment for Defense',
      description: 'Military-grade testing equipment for stringent defense requirements.',
      features: [
        'Ruggedized Testing Equipment',
        'Military Communication Systems',
        'Radar Testing Equipment',
        'EMI/EMC Testing Solutions',
      ],
      color: 'from-emerald-500 to-green-600',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      stats: { number: '200+', label: 'Defense Contracts' },
      image: 'https://images.unsplash.com/photo-1717749789408-f6f73c9e6aac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    },
    {
      id: 'manufacturing',
      icon: Cog,
      title: 'Manufacturing Services',
      subtitle: 'Custom Manufacturing & Design',
      description: 'End-to-end manufacturing from concept to production.',
      features: [
        'Custom Equipment Design',
        'Prototype Development',
        'Mass Production',
        'Quality Assurance',
      ],
      color: 'from-violet-500 to-purple-600',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      stats: { number: '1000+', label: 'Custom Products' },
      image: 'https://media.istockphoto.com/id/2155877725/photo/male-and-female-engineers-in-neat-work-clothes-prepare-and-control-the-production-system-of.jpg?s=612x612&w=0&k=20&c=6E6nQfie8dZIROGrqe9vO4ADz68Sw67LIjC_neaDg6Q=',
    },
  ];

  const stats = [
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '500+', label: 'Projects Completed', icon: Target },
    { number: '50+', label: 'Global Clients', icon: Globe },
    { number: '24/7', label: 'Support', icon: Clock },
  ];

  return (
    <div className="bg-gray-950 text-white" ref={containerRef}>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center transition-transform duration-1000"
          style={{
            transform: `translate(${scrollProgress * 0.5}px, ${scrollProgress * 0.5}px)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 to-black/80" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
            Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Precision-engineered solutions for{' '}
            <span className="text-cyan-400 font-medium">telecommunications</span>,{' '}
            <span className="text-emerald-400 font-medium">defense</span>, and{' '}
            <span className="text-purple-400 font-medium">manufacturing</span> sectors.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-md group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-gray-900/50 border border-gray-700 flex items-center justify-center group-hover:border-cyan-500/30 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="relative py-20" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Delivering cutting-edge solutions with precision and reliability.
            </p>
          </div>
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-2">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-500 ${
                    activeService === index
                      ? `bg-gradient-to-r ${service.color} text-white shadow-2xl`
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 transition-all duration-700 ${
                  activeService === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 absolute inset-0 pointer-events-none'
                }`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 text-left">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-2">{service.title}</h3>
                      <p className={`text-xl font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">{service.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 group">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-6 pt-8">
                    <Link to={`/products?category=${service.id}`}>
                      <button className={`px-8 py-4 bg-gradient-to-r ${service.color} text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 group`}>
                        Explore Solutions
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </button>
                    </Link>
                    <div className="flex items-center space-x-3">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white font-bold text-lg`}>
                        {service.stats.number}
                      </div>
                      <span className="text-gray-400 text-sm">{service.stats.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-20" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
              Our <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A systematic approach to delivering exceptional solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-20 left-20 right-20 h-0.5 bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-purple-500/20"></div>
            {[
              { step: '01', title: 'Consultation', desc: 'Deep dive into requirements', icon: Target, color: 'from-cyan-500 to-blue-500' },
              { step: '02', title: 'Design', desc: 'Custom solution architecture', icon: Layers, color: 'from-emerald-500 to-green-500' },
              { step: '03', title: 'Implementation', desc: 'Precision execution', icon: Activity, color: 'from-violet-500 to-purple-500' },
              { step: '04', title: 'Support', desc: 'Continuous optimization', icon: Users, color: 'from-orange-500 to-red-500' },
            ].map((process, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-lg group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                  <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gray-900/50 border border-gray-700 flex items-center justify-center group-hover:border-cyan-500/30 transition-all duration-300">
                    <span className="text-2xl font-extrabold text-white">{process.step}</span>
                  </div>
                </div>
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${process.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                  <process.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{process.title}</h3>
                <p className="text-gray-300">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Services;