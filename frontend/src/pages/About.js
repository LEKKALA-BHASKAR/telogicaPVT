import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Satellite, 
  Shield, 
  Network,
  ArrowRight,
  Play,
  Factory,
  Users,
  Radio,
  ChevronRight,
  Target,
  Zap,
  Eye,
  Calendar,
  BarChart3,
  CheckCircle,
  Lightbulb,
  Layers,
  Globe
} from 'lucide-react';

function About() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Company Evolution Timeline
  const evolution = [
    {
      year: '2008',
      title: 'Foundation Era',
      description: 'Established as Aishwarya Technologies with focus on telecommunications testing equipment',
      icon: Network,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      year: '2012',
      title: 'Defense Integration',
      description: 'Began supplying advanced testing equipment to Indian defense organizations',
      icon: Shield,
      color: 'from-green-500 to-emerald-500'
    },
    {
      year: '2018',
      title: 'Technology Expansion',
      description: 'Expanded into RF and Microwave technology with state-of-the-art manufacturing',
      icon: Satellite,
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2023',
      title: 'Strategic Rebranding',
      description: 'Rebranded to Telogica Limited, marking a new era of technological innovation',
      icon: Cpu,
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Core Technology Pillars
  const pillars = [
    {
      icon: Radio,
      title: 'RF & Microwave',
      description: 'Advanced radio frequency and microwave testing solutions for defense and telecom applications',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Spectrum Analysis', 'Signal Testing', 'Frequency Measurement']
    },
    {
      icon: Network,
      title: 'Network Systems',
      description: 'Comprehensive network testing equipment for fiber optic and copper cable infrastructure',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Fiber Optic Testing', 'Cable Fault Location', 'Network Analysis']
    },
    {
      icon: Factory,
      title: 'Precision Manufacturing',
      description: 'State-of-the-art manufacturing facilities with rigorous quality control processes',
      gradient: 'from-green-500 to-emerald-500',
      features: ['SMT Technology', 'Quality Assurance', 'Custom Solutions']
    }
  ];

  // Key Statistics
  const statistics = [
    { value: '15+', label: 'Years of Technological Excellence', icon: Calendar },
    { value: '500+', label: 'Defense & Telecom Clients', icon: Users },
    { value: '50+', label: 'Advanced Product Variants', icon: BarChart3 },
    { value: '1000+', label: 'Systems Deployed Nationwide', icon: CheckCircle }
  ];

  // Leadership Philosophy
  const philosophy = [
    {
      icon: Target,
      title: 'Mission',
      content: 'To design and manufacture cutting-edge test and measurement equipment that sets new standards in telecommunications and defense sectors, ensuring reliability and precision in every deployment.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Eye,
      title: 'Vision',
      content: 'To be the foremost technology partner for defense and telecommunications organizations globally, recognized for innovation, quality, and unwavering commitment to technological advancement.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      content: 'Continuous research and development drives our evolution, ensuring we remain at the forefront of testing technology for next-generation communication systems.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" ref={containerRef}>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: `${mousePosition.x * 0.02}px ${mousePosition.y * 0.02}px`
          }}
        />
      </div>

      {/* Floating Tech Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[Cpu, Satellite, Network, Play].map((Icon, i) => (
          <Icon
            key={i}
            className="absolute text-blue-500/10 animate-float"
            size={60}
            style={{
              top: `${20 + (i * 25) % 70}%`,
              left: `${10 + (i * 30) % 80}%`,
              animationDelay: `${i * 5}s`,
              animationDuration: `${20 + i * 10}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Cpu className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Telogica
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Pioneering advanced test and measurement solutions for defense and telecommunications sectors. 
              Formerly Aishwarya Technologies, now leading technological innovation since 2008.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold flex items-center justify-center transition-transform hover:scale-105">
              Explore Our Technology
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="px-8 py-4 border border-gray-600 rounded-lg font-semibold hover:border-blue-400 transition-colors">
              View Product Portfolio
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className="text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm leading-relaxed">{stat.label}</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Pillars */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Core Technology Domains
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Specialized solutions driving innovation in defense and telecommunications infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 group-hover:border-blue-500/50 transition-all duration-500 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${pillar.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{pillar.description}</p>
                  
                  <div className="space-y-2">
                    {pillar.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className={`absolute inset-0 bg-gradient-to-r ${pillar.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Philosophy */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {philosophy.map((item, index) => (
              <div key={index} className="group">
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-6`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.content}</p>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Evolution
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              A journey of technological advancement and strategic growth
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform lg:-translate-x-1/2" />
            
            <div className="space-y-12">
              {evolution.map((era, index) => (
                <div 
                  key={index}
                  className={`flex items-start lg:items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } lg:gap-16`}
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  {/* Content */}
                  <div className={`flex-1 ${
                    index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:pl-16'
                  }`}>
                    <div className={`bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 transition-all duration-300 ${
                      activeTimeline === index ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : ''
                    }`}>
                      <div className={`text-2xl font-bold mb-2 bg-gradient-to-r ${era.color} bg-clip-text text-transparent`}>
                        {era.year}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{era.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{era.description}</p>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${era.color} ${
                      activeTimeline === index ? 'animate-pulse' : ''
                    }`} />
                    <div className="relative w-12 h-12 bg-black rounded-full border-2 border-gray-800 flex items-center justify-center">
                      <era.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 lg:block hidden" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-gray-800">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Globe className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Nationwide Technological Impact
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Serving defense and telecommunications sectors across India with reliable, 
              cutting-edge testing solutions that ensure communication infrastructure integrity.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">Defense</div>
                <div className="text-gray-400">Strategic Partner</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-2">Telecom</div>
                <div className="text-gray-400">Infrastructure Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400 mb-2">Research</div>
                <div className="text-gray-400">R&D Innovation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 mb-2">Quality</div>
                <div className="text-gray-400">ISO Certified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-gray-800">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Advance Your Technology Infrastructure?
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Partner with Telogica for cutting-edge testing solutions that drive reliability and performance in your communication systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold flex items-center justify-center transition-transform hover:scale-105">
                Start Conversation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="px-8 py-4 border border-gray-600 rounded-lg font-semibold hover:border-blue-400 transition-colors">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 20s infinite linear;
        }
      `}</style>
    </div>
  );
}

export default About;