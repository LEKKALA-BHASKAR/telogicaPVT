import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Award, 
  Zap, 
  Globe, 
  ShoppingCart, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Play,
  Shield,
  TrendingUp,
  Cpu,
  Radio,
  Layers,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  Clock,
  Target,
  Lightbulb,
  Activity
} from 'lucide-react';
import { Button } from '../components/ui/button';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const heroRef = useRef(null);

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1665936653831-211c14d123ea?ixlib=rb-4.1.0&auto=format&fit=crop&w=2000&q=80',
      title: 'Innovative Technology Solutions',
      subtitle: 'Leading provider of telecommunications and defense equipment with cutting-edge technology'
    },
    {
      url: 'https://images.unsplash.com/photo-1594915440248-1e419eba6611?ixlib=rb-4.1.0&auto=format&fit=crop&w=2000&q=80',
      title: 'Precision Testing Equipment',
      subtitle: 'Advanced instruments for fiber optics and network diagnostics'
    },
    {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.1.0&auto=format&fit=crop&w=2000&q=80',
      title: 'Manufacturing Excellence',
      subtitle: 'Quality-driven production for defense and telecommunications sectors'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Globe,
      title: 'Global Presence',
      description: 'Serving clients across India and international markets with reliable solutions'
    },
    {
      icon: Award,
      title: 'Quality Certified',
      description: 'ISO certified manufacturing with rigorous quality assurance processes'
    },
    {
      icon: Zap,
      title: 'Innovation Driven',
      description: 'Continuous R&D to deliver cutting-edge technology solutions'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Highly skilled professionals with decades of industry experience'
    }
  ];

  const services = [
    {
      title: 'Telecommunications',
      description: 'Advanced testing and measurement equipment for telecom infrastructure including fiber optics, cable networks, and wireless systems.',
      image: 'https://images.unsplash.com/photo-1594915854088-2128db6a8db5?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80',
      features: ['Fiber Optic Testers', 'Cable Analyzers', 'Network Monitoring', 'Installation Tools'],
      link: '/services/telecommunications',
      icon: Radio
    },
    {
      title: 'Defense Equipment',
      description: 'Specialized communication and testing equipment for defense applications with enhanced security and reliability.',
      image: 'https://images.unsplash.com/photo-1760013767150-da8e4ded6286?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80',
      features: ['Military Communication', 'Secure Systems', 'Field Testing', 'Custom Solutions'],
      link: '/services/defense',
      icon: Shield
    },
    {
      title: 'Manufacturing',
      description: 'Custom manufacturing of precision instruments and equipment with strict quality control standards.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80',
      features: ['Custom Design', 'Precision Engineering', 'Quality Control', 'Bulk Manufacturing'],
      link: '/services/manufacturing',
      icon: Cpu
    }
  ];

  const stats = [
    { number: '25+', label: 'Years of Excellence' },
    { number: '500+', label: 'Happy Clients' },
    { number: '1000+', label: 'Projects Completed' },
    { number: '50+', label: 'Product Variants' }
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Engineer, BSNL',
      rating: 5,
      comment: 'Telogica\'s equipment has revolutionized our network testing capabilities. Their technical support is outstanding.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Cmdr. Priya Singh',
      role: 'Naval Communications',
      rating: 5,
      comment: 'Exceptional quality and reliability. Telogica understands defense requirements perfectly.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Amit Sharma',
      role: 'Project Manager, Airtel',
      rating: 5,
      comment: 'Professional team, quality products, and excellent after-sales support. Highly recommended.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&q=80'
    }
  ];

  const certifications = [
    'ISO 9001:2015',
    'ISO 14001:2015',
    'Defense Quality Standards',
    'Telecom Compliance'
  ];

  const processSteps = [
    {
      title: 'Consultation',
      description: 'Understanding your requirements and challenges',
      icon: Lightbulb
    },
    {
      title: 'Solution Design',
      description: 'Creating tailored solutions for your specific needs',
      icon: Layers
    },
    {
      title: 'Implementation',
      description: 'Deploying solutions with minimal disruption',
      icon: Activity
    },
    {
      title: 'Support',
      description: 'Ongoing maintenance and optimization',
      icon: Users
    }
  ];

  const techStack = [
    { name: 'Fiber Optics', level: 95 },
    { name: 'Network Security', level: 90 },
    { name: '5G Technology', level: 85 },
    { name: 'Satellite Communication', level: 80 }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse-slow"></div>
      </div>

      {/* Hero Section with Carousel */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Mouse Follow Effect */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none transition-all duration-200"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
                {heroImages[currentSlide].title}
                <div className="h-1 w-0 bg-white mt-4 group-hover:w-full transition-all duration-1000"></div>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                {heroImages[currentSlide].subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-to-r from-white to-gray-300 text-black hover:from-gray-200 hover:to-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-white/25 transition-all duration-500 group relative overflow-hidden hover:scale-105">
                    <span className="relative z-10">Explore Our Products</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-500 group relative overflow-hidden hover:scale-105">
                    <span className="relative z-10">Get Consultation</span>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-8">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Hero Image Side */}
            <div className="relative hidden lg:block">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl group hover:bg-white/15 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
                  alt="Technology Equipment"
                  className="rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg group/float hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover/float:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">ISO Certified</div>
                      <div className="text-sm text-gray-600">Quality Assured</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-white to-gray-300 rounded-xl p-4 shadow-lg group/float hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 text-black">
                    <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center group-hover/float:scale-110 transition-transform duration-300">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold">25+ Years</div>
                      <div className="text-sm">Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-full transition-all duration-500 group ${
                index === currentSlide ? 'bg-white' : 'bg-white/30'
              }`}
            >
              <div className={`w-full h-full rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-white' : 'group-hover:bg-white/50'
              }`}></div>
            </button>
          ))}
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce group">
          <ChevronRight className="h-6 w-6 text-white/70 rotate-90 group-hover:text-white transition-colors duration-300" />
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Telogica?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine decades of expertise with innovative technology to deliver exceptional solutions
              for telecommunications and defense sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 border border-white/20 group relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions tailored to meet the evolving needs of modern telecommunications and defense industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/15 transition-all duration-500 overflow-hidden border border-white/20 hover:-translate-y-2 relative"
                onMouseEnter={() => setHoveredCard(`service-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 group/feature">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-300" />
                          <span className="text-sm text-gray-300 group-hover/feature:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-white hover:text-gray-300 font-semibold transition-colors duration-300 group/link"
                  >
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A streamlined approach to delivering exceptional solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 h-full border border-white/20 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gray-200 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {step.description}
                  </p>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 group-hover:scale-110 transition-transform duration-300">
                    <ChevronRight className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 group hover:bg-white/15 transition-all duration-500">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Journey in Numbers</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto group-hover:text-gray-200 transition-colors duration-300">
                Decades of excellence reflected through our achievements and client satisfaction
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group/stat">
                  <div className="text-5xl md:text-6xl font-bold mb-3 text-white group-hover/stat:scale-110 transition-transform duration-500">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-lg font-medium group-hover/stat:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Certifications */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-8 text-white">Certifications & Standards</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-500 group/cert hover:-translate-y-1"
                  >
                    <span className="text-white font-medium group-hover/cert:text-gray-200 transition-colors duration-300">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Technology Expertise Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technology Expertise</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our proficiency in cutting-edge technologies ensures we deliver the best solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techStack.map((tech, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group"
                onMouseEnter={() => setHoveredCard(`tech-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors duration-300">
                    {tech.name}
                  </h3>
                  <span className="text-white font-bold group-hover:scale-110 transition-transform duration-300">
                    {tech.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-white to-gray-300 h-3 rounded-full transition-all duration-1000 ease-out group-hover:from-gray-200 group-hover:to-white"
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear what our valued clients have to say about their experience with Telogica
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-500 border border-white/20 hover:-translate-y-2 group"
                onMouseEnter={() => setHoveredCard(`testimonial-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <p className="font-semibold text-white group-hover:text-gray-200 transition-colors duration-300">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" 
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                
                <p className="text-gray-300 italic leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center border border-white/20 group hover:bg-white/15 transition-all duration-500">
            <Sparkles className="h-12 w-12 text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Operations?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              Partner with Telogica for cutting-edge telecommunications and defense solutions. 
              Let's discuss how we can help you achieve your goals with our innovative technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-to-r from-white to-gray-300 text-black hover:from-gray-200 hover:to-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-white/25 transition-all duration-500 group/btn relative overflow-hidden hover:scale-105">
                  <ShoppingCart className="mr-3 h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  <span className="relative z-10">Explore Products</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-500 group/btn relative overflow-hidden hover:scale-105">
                  <Phone className="mr-3 h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  <span className="relative z-10">Contact Us Today</span>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>

            {/* Enhanced Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Phone, label: 'Call Us', value: '+91-9876543210' },
                { icon: Mail, label: 'Email Us', value: 'info@telogica.com' },
                { icon: MapPin, label: 'Visit Us', value: 'Hyderabad, India' }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center space-x-3 group/info hover:-translate-y-1 transition-transform duration-300"
                >
                  <item.icon className="h-6 w-6 text-white group-hover/info:scale-110 transition-transform duration-300" />
                  <div className="text-left">
                    <div className="font-semibold text-white group-hover/info:text-gray-200 transition-colors duration-300">
                      {item.label}
                    </div>
                    <div className="text-gray-300 group-hover/info:text-gray-200 transition-colors duration-300">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add custom animations to global CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.05); }
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
      `}</style>
    </div>
  );
}

export default Home;