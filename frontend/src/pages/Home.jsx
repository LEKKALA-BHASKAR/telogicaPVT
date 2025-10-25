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
  Activity,
  Sun,
  Moon
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

  // Premium color scheme
  const bgColor = 'bg-white';
  const textColor = 'text-gray-900';
  const secondaryTextColor = 'text-gray-600';
  const cardBg = 'bg-white/90';
  const cardHoverBg = 'hover:bg-white';
  const borderClass = 'border-gray-200/80';
  const buttonPrimaryBg = 'from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700';
  const buttonSecondaryBg = 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white';
  const gradientText = 'from-purple-600 to-pink-600';
  const heroGradient = 'from-white/95 via-white/90 to-white/95';
  const heroTextClass = 'text-gray-900';
  const heroSubtitleClass = 'text-gray-600';
  const mouseFollowBg = 'bg-purple-100/30';
  const floatingBg = 'bg-gradient-to-r from-purple-600 to-pink-600';
  const floatingTextClass = 'text-white';
  const floatingSubTextClass = 'text-purple-100';
  const statNumberClass = 'text-gray-900';
  const statLabelClass = 'text-gray-600';
  const featureIconBg = 'from-purple-600 to-pink-600';
  const featureIconText = 'text-white';
  const progressBarBg = 'bg-gray-200';
  const progressBarFill = 'from-purple-500 to-pink-500';
  const testimonialRoleClass = 'text-gray-500';
  const contactLabelClass = 'text-gray-900';
  const contactValueClass = 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} overflow-x-hidden`}>
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse-slow"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float-reverse"></div>
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
              <div className={`absolute inset-0 bg-gradient-to-br ${heroGradient}`}></div>
            </div>
          ))}
        </div>

        {/* Enhanced Mouse Follow Effect */}
        <div 
          className={`absolute w-96 h-96 rounded-full ${mouseFollowBg} blur-3xl pointer-events-none transition-all duration-200`}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={heroTextClass}>
              
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${heroTextClass}`}>
                {heroImages[currentSlide].title}
                <div className={`h-1 w-0 bg-gradient-to-r from-purple-600 to-pink-600 mt-4 group-hover:w-full transition-all duration-1000`}></div>
              </h1>
              
              <p className={`text-xl ${heroSubtitleClass} mb-8 leading-relaxed max-w-2xl`}>
                {heroImages[currentSlide].subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/products">
                  <Button size="lg" className={`bg-gradient-to-r ${buttonPrimaryBg} font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden hover:scale-105`}>
                    <span className="relative z-10">Explore Our Products</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className={`${buttonSecondaryBg} px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-500 group relative overflow-hidden hover:scale-105 border-2`}>
                    <span className="relative z-10">Get Consultation</span>
                    <div className={`absolute inset-0 bg-purple-50 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-8">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className={`text-3xl font-bold ${statNumberClass} mb-1 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.number}
                    </div>
                    <div className={`${statLabelClass} text-sm group-hover:text-gray-900 transition-colors duration-300`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Hero Image Side */}
            <div className="relative hidden lg:block">
              <div className={`relative ${cardBg} backdrop-blur-sm rounded-2xl p-8 ${borderClass} shadow-2xl group ${cardHoverBg} transition-all duration-500 border`}>
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
                  alt="Technology Equipment"
                  className="rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg group/float hover:-translate-y-1 transition-transform duration-300 border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover/float:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className={`font-bold text-gray-900`}>ISO Certified</div>
                      <div className={`text-sm text-gray-600`}>Quality Assured</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 shadow-lg group/float hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover/float:scale-110 transition-transform duration-300">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold">25+ Years</div>
                      <div className="text-sm text-purple-100">Experience</div>
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
                index === currentSlide ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-full h-full rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'group-hover:bg-gray-400'
              }`}></div>
            </button>
          ))}
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce group">
          <ChevronRight className={`h-6 w-6 text-gray-600 rotate-90 group-hover:text-gray-900 transition-colors duration-300`} />
        </div>
      </section>

{/* Enhanced Features Section */}
<section className="py-20 relative overflow-hidden bg-white">
  {/* Background Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
    <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-reverse"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm border border-purple-200 mb-6">
        <Sparkles className="h-4 w-4 text-purple-600 mr-2" />
        <span className="text-sm font-medium text-purple-600">Why Choose Us</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Telogica?</span>
      </h2>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        We combine decades of expertise with innovative technology to deliver exceptional solutions
        for telecommunications and defense sectors.
      </p>
    </div>
    
    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="bg-white/80 backdrop-blur-md rounded-2xl p-8 hover:bg-white transition-all duration-500 hover:-translate-y-2 border border-gray-200 shadow-lg group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
          </div>
          
          {/* Icon Container */}
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
            <feature.icon className="h-8 w-8 text-white relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
            {feature.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-6">
            {feature.description}
          </p>
          
          {/* Learn More Link */}
          <div className="flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Learn More</span>
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-br from-purple-200 to-transparent transform translate-x-5 -translate-y-5 rotate-45"></div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Additional Features Section */}
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Competitive Advantages</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          What sets us apart from the competition in the telecommunications and defense industry
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {[
            {
              icon: Shield,
              title: "Military-Grade Security",
              description: "Our defense equipment meets the highest security standards with encrypted communication channels and tamper-proof hardware.",
              stats: "99.9% Uptime"
            },
            {
              icon: TrendingUp,
              title: "Continuous Innovation",
              description: "Dedicated R&D team constantly developing new technologies to stay ahead of industry trends and client needs.",
              stats: "20+ Patents"
            },
            {
              icon: Clock,
              title: "24/7 Support",
              description: "Round-the-clock technical support team ready to assist with any issues or queries for complete peace of mind.",
              stats: "<2hr Response"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 hover:bg-white transition-all duration-500 border border-gray-200 shadow-lg group relative overflow-hidden flex items-start space-x-4"
              onMouseEnter={() => setHoveredCard(`advantage-left-${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-3">
                  {item.description}
                </p>
                <div className="flex items-center">
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                    {item.stats}
                  </div>
                </div>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {[
            {
              icon: Target,
              title: "Custom Solutions",
              description: "Tailored equipment and systems designed to meet specific client requirements and operational environments.",
              stats: "100% Customizable"
            },
            {
              icon: Award,
              title: "Industry Certifications",
              description: "Fully compliant with international standards including ISO, defense quality specifications, and telecom regulations.",
              stats: "15+ Certifications"
            },
            {
              icon: Globe,
              title: "Global Supply Chain",
              description: "Robust distribution network ensuring timely delivery and availability of spare parts across all operational regions.",
              stats: "50+ Countries"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 hover:bg-white transition-all duration-500 border border-gray-200 shadow-lg group relative overflow-hidden flex items-start space-x-4"
              onMouseEnter={() => setHoveredCard(`advantage-right-${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-3">
                  {item.description}
                </p>
                <div className="flex items-center">
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    {item.stats}
                  </div>
                </div>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* CTA Section */}
    <div className="mt-20 text-center">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 border border-gray-200 shadow-xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience the Telogica Difference?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join hundreds of satisfied clients who have transformed their operations with our cutting-edge telecommunications and defense solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-500 group relative overflow-hidden hover:scale-105">
                <span className="relative z-10">Schedule a Consultation</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-500 group relative overflow-hidden hover:scale-105">
                <span className="relative z-10">Browse Products</span>
                <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        </div>
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
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.15; transform: scale(1.05); }
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

      {/* Enhanced Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}>Our Core Services</h2>
            <p className={`text-xl ${secondaryTextColor} max-w-3xl mx-auto`}>
              Comprehensive solutions tailored to meet the evolving needs of modern telecommunications and defense industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group ${cardBg} backdrop-blur-md rounded-2xl ${cardHoverBg} transition-all duration-500 overflow-hidden ${borderClass} hover:-translate-y-2 relative border shadow-lg`}
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
                  <p className={`${secondaryTextColor} mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300`}>
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className={`font-semibold ${textColor} mb-3`}>Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 group/feature">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-300" />
                          <span className={`text-sm ${secondaryTextColor} group-hover/feature:text-gray-900 transition-colors duration-300`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    to={service.link}
                    className={`inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300 group/link`}
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
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}>Our Process</h2>
            <p className={`text-xl ${secondaryTextColor} max-w-3xl mx-auto`}>
              A streamlined approach to delivering exceptional solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className={`${cardBg} backdrop-blur-md rounded-2xl p-8 h-full ${borderClass} ${cardHoverBg} transition-all duration-500 hover:-translate-y-2 relative overflow-hidden border shadow-lg`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${featureIconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon className={`h-8 w-8 ${featureIconText}`} />
                  </div>
                  <h3 className={`text-xl font-bold ${textColor} mb-4 group-hover:text-gray-700 transition-colors duration-300`}>
                    {step.title}
                  </h3>
                  <p className={`${secondaryTextColor} group-hover:text-gray-700 transition-colors duration-300`}>
                    {step.description}
                  </p>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 group-hover:scale-110 transition-transform duration-300">
                    <ChevronRight className={`h-8 w-8 text-purple-600`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Enhanced Stats Section */}
<section className="py-20 relative bg-white overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
    <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float-reverse"></div>
    <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse-slow"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm border border-purple-200 mb-6">
        <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
        <span className="text-sm font-medium text-purple-600">Our Achievements</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Our Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Numbers</span>
      </h2>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Decades of excellence reflected through our achievements and client satisfaction
      </p>
    </div>
    
    {/* Stats Card */}
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 border border-gray-200 shadow-xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group/stat relative">
              {/* Background Circle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${
                  index === 0 ? 'from-purple-100 to-purple-50' : 
                  index === 1 ? 'from-blue-100 to-blue-50' : 
                  index === 2 ? 'from-cyan-100 to-cyan-50' : 
                  'from-indigo-100 to-indigo-50'
                } opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 scale-75 group-hover/stat:scale-100 transition-transform duration-500`}></div>
              </div>
              
              {/* Stat Number */}
              <div className="relative">
                <div className="text-5xl md:text-6xl font-bold mb-3 text-gray-900 group-hover/stat:scale-110 transition-transform duration-500">
                  {stat.number}
                </div>
                
                {/* Decorative Line */}
                <div className={`h-1 w-16 mx-auto mb-3 bg-gradient-to-r ${
                  index === 0 ? 'from-purple-400 to-purple-600' : 
                  index === 1 ? 'from-blue-400 to-blue-600' : 
                  index === 2 ? 'from-cyan-400 to-cyan-600' : 
                  'from-indigo-400 to-indigo-600'
                } rounded-full transform scale-x-0 group-hover/stat:scale-x-100 transition-transform duration-500 origin-left`}></div>
                
                {/* Stat Label */}
                <div className="text-gray-600 text-lg font-medium group-hover/stat:text-gray-900 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
              
              {/* Icon */}
              <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 ${
                index === 0 ? 'bg-purple-100 text-purple-600' : 
                index === 1 ? 'bg-blue-100 text-blue-600' : 
                index === 2 ? 'bg-cyan-100 text-cyan-600' : 
                'bg-indigo-100 text-indigo-600'
              }`}>
                {index === 0 && <Award className="h-4 w-4" />}
                {index === 1 && <Users className="h-4 w-4" />}
                {index === 2 && <CheckCircle className="h-4 w-4" />}
                {index === 3 && <Globe className="h-4 w-4" />}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Certifications */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Certifications & Standards</h3>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-500 group/cert hover:-translate-y-1 hover:shadow-md relative overflow-hidden"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/cert:translate-x-[100%] transition-transform duration-1000"></div>
                
                <span className="text-gray-900 font-medium group-hover/cert:text-purple-700 transition-colors duration-300 relative z-10">
                  {cert}
                </span>
              </div>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            
            <h4 className="text-xl font-bold text-gray-900 mb-3">Quality Assurance</h4>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence is reflected in our rigorous quality control processes and adherence to international standards. Every product undergoes extensive testing to ensure reliability and performance.
            </p>
            
            <div className="flex justify-center mt-6">
              <Link to="/about">
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition-all duration-300 group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
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
    50% { opacity: 0.1; transform: scale(1.05); }
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

{/* Enhanced Technology Expertise Section */}
<section className="py-20 relative bg-white overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 right-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
    <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float-reverse"></div>
    <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse-slow"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm border border-purple-200 mb-6">
        <Cpu className="h-4 w-4 text-purple-600 mr-2" />
        <span className="text-sm font-medium text-purple-600">Our Expertise</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Expertise</span>
      </h2>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Our proficiency in cutting-edge technologies ensures we deliver the best solutions
      </p>
    </div>
    
    {/* Main Content Card */}
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 border border-gray-200 shadow-xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Technology Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {techStack.map((tech, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-500 group relative overflow-hidden"
              onMouseEnter={() => setHoveredCard(`tech-${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${
                index === 0 ? 'from-purple-50 to-transparent' : 
                index === 1 ? 'from-blue-50 to-transparent' : 
                index === 2 ? 'from-cyan-50 to-transparent' : 
                'from-indigo-50 to-transparent'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Header */}
              <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                  {tech.name}
                </h3>
                <span className="text-gray-900 font-bold group-hover:scale-110 transition-transform duration-500 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 rounded-full">
                  {tech.level}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-4 relative z-10">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                    index === 0 ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 
                    index === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 
                    index === 2 ? 'bg-gradient-to-r from-cyan-500 to-cyan-600' : 
                    'bg-gradient-to-r from-indigo-500 to-indigo-600'
                  }`}
                  style={{ width: `${tech.level}%` }}
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-purple-500' : 
                    index === 1 ? 'bg-blue-500' : 
                    index === 2 ? 'bg-cyan-500' : 
                    'bg-indigo-500'
                  }`}></div>
                  <span className="text-sm text-gray-600">
                    {tech.level >= 90 ? 'Expert' : tech.level >= 70 ? 'Advanced' : 'Proficient'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {tech.level >= 90 ? 'Industry Leading' : tech.level >= 70 ? 'Above Average' : 'Competent'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Technology Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Technology Focus Areas */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Technology Focus</h3>
            
            <div className="space-y-4">
              {[
                {
                  icon: Radio,
                  title: "Telecommunications",
                  description: "Advanced solutions for modern communication networks including 5G, fiber optics, and satellite systems.",
                  color: "purple"
                },
                {
                  icon: Shield,
                  title: "Security Systems",
                  description: "Cutting-edge encryption and security protocols for defense and critical infrastructure.",
                  color: "blue"
                },
                {
                  icon: Activity,
                  title: "Network Optimization",
                  description: "AI-powered tools for network performance analysis and optimization.",
                  color: "cyan"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${
                    item.color === 'purple' ? 'from-purple-500 to-purple-600' : 
                    item.color === 'blue' ? 'from-blue-500 to-blue-600' : 
                    'from-cyan-500 to-cyan-600'
                  } text-white group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Innovation Highlights */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Innovation Highlights</h3>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mr-4">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">R&D Excellence</h4>
              </div>
              
              <p className="text-gray-600 mb-6">
                Our dedicated research and development team continuously explores emerging technologies to create innovative solutions that address the evolving needs of the telecommunications and defense sectors.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Patents Filed", value: "20+" },
                  { label: "R&D Investment", value: "15% of Revenue" },
                  { label: "New Products/Year", value: "5-8" },
                  { label: "Tech Partnerships", value: "12+" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Leverage Our Expertise?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Partner with us to implement cutting-edge technology solutions tailored to your specific requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-500 group relative overflow-hidden hover:scale-105">
                <span className="relative z-10">Discuss Your Project</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-8 py-3 rounded-xl transition-all duration-500">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
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
    50% { opacity: 0.1; transform: scale(1.05); }
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

{/* Enhanced Testimonials Section */}
<section className="py-20 relative bg-white overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
    <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float-reverse"></div>
    <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse-slow"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm border border-purple-200 mb-6">
        <Star className="h-4 w-4 text-purple-600 mr-2" />
        <span className="text-sm font-medium text-purple-600">Client Success Stories</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Clients Say</span>
      </h2>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Hear what our valued clients have to say about their experience with Telogica
      </p>
    </div>
    
    {/* Testimonials Container */}
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 rounded-3xl opacity-50 blur-3xl"></div>
      
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="group relative"
            onMouseEnter={() => setHoveredCard(`testimonial-${index}`)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
              </div>
              
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              {/* Avatar Placeholder with Initials */}
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-4 bg-gradient-to-br ${
                  index === 0 ? 'from-purple-500 to-purple-600' : 
                  index === 1 ? 'from-blue-500 to-blue-600' : 
                  'from-cyan-500 to-cyan-600'
                } group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors duration-300">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="relative">
                    <Star 
                      className="h-5 w-5 text-yellow-400 fill-current transition-all duration-300" 
                      style={{ 
                        transitionDelay: `${i * 100}ms`,
                        transform: hoveredCard === `testimonial-${index}` ? 'scale(1.2) rotate(72deg)' : 'scale(1) rotate(0deg)'
                      }}
                    />
                    {hoveredCard === `testimonial-${index}` && (
                      <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50 animate-ping"></div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-700 italic leading-relaxed mb-6 group-hover:text-gray-900 transition-colors duration-300">
                "{testimonial.comment}"
              </p>
              
              {/* Decorative Elements */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                        index === 0 ? 'bg-purple-400' : 
                        index === 1 ? 'bg-blue-400' : 
                        'bg-cyan-400'
                      }`}
                      style={{ 
                        transitionDelay: `${dot * 100}ms`,
                        transform: hoveredCard === `testimonial-${index}` ? 'translateY(0)' : 'translateY(10px)'
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                  index === 0 ? 'bg-purple-100 text-purple-600' : 
                  index === 1 ? 'bg-blue-100 text-blue-600' : 
                  'bg-cyan-100 text-cyan-600'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                  Verified Client
                </div>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className={`absolute top-0 right-0 w-10 h-10 bg-gradient-to-br ${
                  index === 0 ? 'from-purple-200 to-transparent' : 
                  index === 1 ? 'from-blue-200 to-transparent' : 
                  'from-cyan-200 to-transparent'
                } transform translate-x-5 -translate-y-5 rotate-45`}></div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className={`absolute -top-3 -right-3 w-20 h-20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ${
              index === 0 ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 
              index === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 
              'bg-gradient-to-br from-cyan-500 to-cyan-600'
            } text-white shadow-lg transform scale-0 group-hover:scale-100`}>
              <div className="text-center">
                <div className="text-2xl font-bold">{testimonial.rating}</div>
                <div className="text-xs">Stars</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Additional Stats Section */}
    <div className="mt-20">
      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 rounded-3xl p-12 border border-purple-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        </div>
        
        <div className="relative z-10 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Client Satisfaction Metrics</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "98%", label: "Satisfaction Rate", icon: "😊" },
              { value: "95%", label: "Would Recommend", icon: "👍" },
              { value: "92%", label: "Repeat Business", icon: "🔄" },
              { value: "4.9/5", label: "Average Rating", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="text-5xl mb-2 transform transition-transform duration-300 group-hover:scale-110">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {stat.label}
                </div>
                
                {/* Animated Circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 rounded-full border-2 border-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
    {/* CTA Section */}
    <div className="mt-16 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Satisfied Clients</h3>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Experience the same level of excellence and service that our clients rave about
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/contact">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-500 group relative overflow-hidden hover:scale-105">
            <span className="relative z-10">Start Your Journey</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </Button>
        </Link>
        <Link to="/about">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-8 py-3 rounded-xl transition-all duration-500">
            More Success Stories
          </Button>
        </Link>
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
    50% { opacity: 0.1; transform: scale(1.05); }
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

      {/* Enhanced CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${cardBg} backdrop-blur-md rounded-3xl p-12 text-center ${borderClass} group ${cardHoverBg} transition-all duration-500 border shadow-2xl`}>
            <Sparkles className={`h-12 w-12 text-purple-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`} />
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-6`}>Ready to Transform Your Operations?</h2>
            <p className={`text-xl ${secondaryTextColor} mb-8 max-w-3xl mx-auto leading-relaxed group-hover:text-gray-700 transition-colors duration-300`}>
              Partner with Telogica for cutting-edge telecommunications and defense solutions. 
              Let's discuss how we can help you achieve your goals with our innovative technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/products">
                <Button size="lg" className={`bg-gradient-to-r ${buttonPrimaryBg} font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 group/btn relative overflow-hidden hover:scale-105`}>
                  <ShoppingCart className="mr-3 h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  <span className="relative z-10">Explore Products</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className={`${buttonSecondaryBg} px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-500 group/btn relative overflow-hidden hover:scale-105 border-2`}>
                  <Phone className="mr-3 h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  <span className="relative z-10">Contact Us Today</span>
                  <div className={`absolute inset-0 bg-purple-50 backdrop-blur-sm rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
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
                  <item.icon className={`h-6 w-6 text-purple-600 group-hover/info:scale-110 transition-transform duration-300`} />
                  <div className="text-left">
                    <div className={`font-semibold ${contactLabelClass} group-hover/info:text-gray-700 transition-colors duration-300`}>
                      {item.label}
                    </div>
                    <div className={`${contactValueClass} group-hover/info:text-gray-700 transition-colors duration-300`}>
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
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
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