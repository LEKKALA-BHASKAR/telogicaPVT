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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-900 to-gray-900 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
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
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-violet-900/90 to-gray-900/90"></div>
            </div>
          ))}
        </div>

        {/* Mouse Follow Effect */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-violet-500/10 blur-3xl pointer-events-none"
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
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Leading Technology Provider Since 1998
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200">
                {heroImages[currentSlide].title}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                {heroImages[currentSlide].subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Explore Our Products
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold rounded-lg backdrop-blur-sm">
                    Get Consultation
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-8">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Side */}
            <div className="relative hidden lg:block">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
                  alt="Technology Equipment"
                  className="rounded-xl shadow-2xl"
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">ISO Certified</div>
                      <div className="text-sm text-gray-600">Quality Assured</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
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

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-violet-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-white/70 rotate-90" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Telogica?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine decades of expertise with innovative technology to deliver exceptional solutions
              for telecommunications and defense sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              <div key={index} className="group bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/15 transition-all duration-500 overflow-hidden border border-white/20 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center">
                    <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mr-3">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-violet-400 hover:text-violet-300 font-semibold transition-colors group/link"
                  >
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 h-full border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="h-8 w-8 text-violet-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Journey in Numbers</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Decades of excellence reflected through our achievements and client satisfaction
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-5xl md:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-8 text-white">Certifications & Standards</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                    <span className="text-white font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Expertise Section */}
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
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-white">{tech.name}</h3>
                  <span className="text-violet-400 font-bold">{tech.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 border border-white/20">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 italic leading-relaxed">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-12 text-center border border-white/20">
            <Sparkles className="h-12 w-12 text-violet-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Operations?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with Telogica for cutting-edge telecommunications and defense solutions. 
              Let's discuss how we can help you achieve your goals with our innovative technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <ShoppingCart className="mr-3 h-5 w-5" />
                  Explore Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold rounded-lg">
                  <Phone className="mr-3 h-5 w-5" />
                  Contact Us Today
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6 text-violet-400" />
                <div className="text-left">
                  <div className="font-semibold text-white">Call Us</div>
                  <div className="text-gray-300">+91-9876543210</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6 text-violet-400" />
                <div className="text-left">
                  <div className="font-semibold text-white">Email Us</div>
                  <div className="text-gray-300">info@telogica.com</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6 text-violet-400" />
                <div className="text-left">
                  <div className="font-semibold text-white">Visit Us</div>
                  <div className="text-gray-300">Hyderabad, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;