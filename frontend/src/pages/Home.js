import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Zap, Globe, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../components/ui/button';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1665936653831-211c14d123ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MTI4OTU2Nnww&ixlib=rb-4.1.0&q=85',
      title: 'Leading Technology Solutions',
      subtitle: 'Innovative telecommunications and defense equipment'
    },
    {
      url: 'https://images.unsplash.com/photo-1594915440248-1e419eba6611?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHx0ZWxlY29tJTIwZXF1aXBtZW50fGVufDB8fHx8MTc2MTI4OTU3M3ww&ixlib=rb-4.1.0&q=85',
      title: 'Advanced Testing Equipment',
      subtitle: 'Precision instruments for fiber and cable diagnostics'
    },
    {
      url: 'https://images.unsplash.com/photo-1717386255773-1e3037c81788?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nfGVufDB8fHx8MTc2MTI4OTU3OXww&ixlib=rb-4.1.0&q=85',
      title: 'Manufacturing Excellence',
      subtitle: 'Quality production for defense and telecommunications'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const features = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving telecommunications and defense sectors across India and beyond'
    },
    {
      icon: Award,
      title: 'Quality Certified',
      description: 'ISO certified manufacturing with stringent quality control processes'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'Cutting-edge technology solutions for modern communication needs'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Highly skilled engineers and technicians with decades of experience'
    }
  ];

  const services = [
    {
      title: 'Telecommunications',
      description: 'Advanced testing and measuring equipment for telecom infrastructure',
      image: 'https://images.unsplash.com/photo-1594915854088-2128db6a8db5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHx0ZWxlY29tJTIwZXF1aXBtZW50fGVufDB8fHx8MTc2MTI4OTU3M3ww&ixlib=rb-4.1.0&q=85',
      link: '/services#telecommunications'
    },
    {
      title: 'Defense',
      description: 'Specialized equipment and solutions for defense applications',
      image: 'https://images.unsplash.com/photo-1760013767150-da8e4ded6286?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHx0ZWxlY29tJTIwZXF1aXBtZW50fGVufDB8fHx8MTc2MTI4OTU3M3ww&ixlib=rb-4.1.0&q=85',
      link: '/services#defense'
    },
    {
      title: 'Manufacturing',
      description: 'Custom manufacturing of test and measurement instruments',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxtYW51ZmFjdHVyaW5nfGVufDB8fHx8MTc2MTI4OTU3OXww&ixlib=rb-4.1.0&q=85',
      link: '/services#manufacturing'
    }
  ];

  const stats = [
    { number: '25+', label: 'Years Experience' },
    { number: '500+', label: 'Satisfied Clients' },
    { number: '1000+', label: 'Projects Completed' },
    { number: '50+', label: 'Product Lines' }
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Engineer, BSNL',
      rating: 5,
      comment: 'Telogica\'s equipment has been instrumental in modernizing our network infrastructure. Their technical support is exceptional.'
    },
    {
      name: 'Cmdr. Priya Singh',
      role: 'Naval Communications',
      rating: 5,
      comment: 'Reliable, precise, and built to last. Telogica understands the demanding requirements of defense applications.'
    },
    {
      name: 'Amit Sharma',
      role: 'Project Manager, Airtel',
      rating: 5,
      comment: 'Outstanding quality and timely delivery. Telogica has been our trusted partner for network testing solutions.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="hero-title text-white mb-6" data-testid="hero-title">
              {heroImages[currentSlide].title}
            </h1>
            <p className="hero-subtitle text-gray-200 mb-8 max-w-3xl mx-auto">
              {heroImages[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <Button size="lg" className="btn-primary group" data-testid="explore-products-btn">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="btn-secondary bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white hover:text-gray-900">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Telogica?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine decades of experience with cutting-edge technology to deliver superior solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions for telecommunications and defense sectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card group cursor-pointer" data-testid={`service-${service.title.toLowerCase()}`}>
                <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <a
                  href={service.link}
                  className="inline-flex items-center text-violet-600 hover:text-orange-500 font-semibold transition-colors"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-white/90">
              Numbers that reflect our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Trusted by leading organizations across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card" data-testid={`testimonial-${index}`}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"${testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
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
            Discover our range of innovative telecommunications and defense solutions.
            Contact us today to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="btn-primary" data-testid="view-products-cta">
                <ShoppingCart className="mr-2 h-5 w-5" />
                View Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;