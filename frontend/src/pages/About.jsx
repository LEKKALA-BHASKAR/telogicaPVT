import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Satellite, 
  Shield, 
  Network, 
  ArrowRight, 
  Globe, 
  Radio, 
  Factory, 
  Users, 
  Calendar, 
  BarChart3, 
  CheckCircle, 
  Target, 
  Eye, 
  Zap 
} from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

function About() {
  const [activeTimeline, setActiveTimeline] = useState(0);
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

  // Company Evolution Timeline
  const evolution = [
    {
      year: '2008',
      title: 'Foundation Era',
      description: 'Established as Aishwarya Technologies, focusing on telecommunications testing equipment.',
      icon: Network,
      color: 'from-blue-600 to-cyan-600',
      image: 'https://www.aishwaryatechtele.com/images/gallery/IMAG0038.jpg',
    },
    {
      year: '2012',
      title: 'Defense Integration',
      description: 'Supplied advanced testing equipment to Indian defense organizations.',
      icon: Shield,
      color: 'from-green-600 to-emerald-600',
      image: 'https://www.aishwaryatechtele.com/images/gallery/5h2mZm_8.jpg',
    },
    {
      year: '2018',
      title: 'Technology Expansion',
      description: 'Expanded into RF and Microwave technology with advanced manufacturing.',
      icon: Satellite,
      color: 'from-purple-600 to-pink-600',
      image: 'https://www.aishwaryatechtele.com/images/gallery/IMG-20190204-WA0000.jpg',
    },
    {
      year: '2023',
      title: 'Strategic Rebranding',
      description: 'Rebranded to Telogica Limited, ushering in a new era of innovation.',
      icon: Cpu,
      color: 'from-orange-600 to-red-600',
      image: 'https://digitalbrandblueprint.com/wp-content/uploads/2019/03/Rebrand-Strategy-Cover-01.png',
    },
  ];

  // Core Technology Pillars
  const pillars = [
    {
      icon: Radio,
      title: 'RF & Microwave',
      description: 'Advanced solutions for defense and telecom applications.',
      gradient: 'from-blue-600 to-cyan-600',
      image: 'https://www.rfelectronics.net/Upload/BlogImages/rf-microwave-for-5g-market.jpg',
    },
    {
      icon: Network,
      title: 'Network Systems',
      description: 'Comprehensive testing for fiber optic and copper infrastructure.',
      gradient: 'from-purple-600 to-pink-600',
      image: 'https://94fa3c88.delivery.rocketcdn.me/en/files/2024/06/Network-Operating-System-datascientest-1024x585.jpg',
    },
    {
      icon: Factory,
      title: 'Precision Manufacturing',
      description: 'State-of-the-art facilities with rigorous quality control.',
      gradient: 'from-green-600 to-emerald-600',
      image: 'https://robersontool.com/wp-content/uploads/2024/01/Precision-Manufacturing-in-Bland-Missouri.jpg',
    },
  ];

  // Key Statistics
  const statistics = [
    { value: '15+', label: 'Years of Excellence', icon: Calendar },
    { value: '500+', label: 'Clients Served', icon: Users },
    { value: '50+', label: 'Product Variants', icon: BarChart3 },
    { value: '1000+', label: 'Systems Deployed', icon: CheckCircle },
  ];

  // Leadership Philosophy
  const philosophy = [
    {
      icon: Target,
      title: 'Mission',
      content: 'To deliver cutting-edge test equipment ensuring reliability and precision.',
      gradient: 'from-blue-600 to-cyan-600',
      image: 'https://pilotindustries.co.in/wp-content/uploads/2019/06/our-mission.jpg',
    },
    {
      icon: Eye,
      title: 'Vision',
      content: 'To be a global leader in defense and telecom technology innovation.',
      gradient: 'from-purple-600 to-pink-600',
      image: 'https://pilotindustries.co.in/wp-content/uploads/2019/06/our-vision.jpg',
    },
    {
      icon: Zap,
      title: 'Innovation',
      content: 'Driving advancements through continuous R&D.',
      gradient: 'from-orange-600 to-red-600',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden" ref={containerRef}>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
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
<section className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-8" ref={heroRef}>
  {/* Background with gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-purple-950/30" />
  
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="text-left space-y-8">
        {/* Logo/Badge */}
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Cpu className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Telogica
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
            Pioneering advanced test and measurement solutions for 
            <span className="text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text font-semibold"> defense </span>
            and 
            <span className="text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-semibold"> telecommunications </span>
            since 2008.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 py-4">
          <div className="text-left">
            <div className="text-2xl font-bold text-white">15+</div>
            <div className="text-gray-400 text-sm">Years Experience</div>
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-gray-400 text-sm">Projects Delivered</div>
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-gray-400 text-sm">Global Clients</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/services"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative">Explore Our Technology</span>
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
          </Link>
          <Link
            to="/products"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative">Explore Our Products</span>
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
          </Link>
          
         </div>
      </div>

 {/* Left Side - Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://scontent.fcdp1-1.fna.fbcdn.net/v/t39.30808-6/454947021_825253096373273_2071655228525396527_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VZsYBnhZWbEQ7kNvwHUXctN&_nc_oc=AdlFU0ypLkXz1Th7UL2rssIG_2YHA5dzc3Up8L3onVX0T44Vfvu1dyUwzIsy0Dcv9SB5LskDd_dKMSGJEVxYZJY-&_nc_zt=23&_nc_ht=scontent.fcdp1-1.fna&_nc_gid=2QGYrn6H2j63nsTNampbVw&oh=00_AfePAldZXxPo60rMIX_9-dOvoW2i6CCO4ygUr7pGwvAWqA&oe=69052E82"
                alt="Telogica Advanced Technology"
                className="w-full h-96 lg:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Floating Tech Icons */}
              <div className="absolute top-6 left-6 flex gap-3">
                <div className="w-12 h-12 bg-pink-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-pink-500/30">
                  <Shield className="w-6 h-6 text-pink-400" />
                </div>
                <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-500/30">
                  <Radio className="w-6 h-6 text-purple-400" />
                </div>
                <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-500/30">
                  <Factory className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
      <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
    </div>
  </div>
</section>

      {/* Statistics Section */}
      <section className="py-20 relative" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {statistics.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
                <stat.icon className="mx-auto mt-4 h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Pillars */}
      <section className="py-20 relative" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Core Technology Domains
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Innovative solutions for defense and telecommunications infrastructure.
          </p>
          <div className="space-y-16">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 text-left">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${pillar.gradient} flex items-center justify-center mb-6`}>
                    <pillar.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{pillar.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Philosophy */}
      <section className="py-20 relative" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {philosophy.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
              >
                <div className="w-full lg:w-1/2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-left">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-6`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-20 relative" ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Evolution
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            A journey of innovation and strategic growth.
          </p>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 transform -translate-x-1/2" />
            <div className="space-y-16">
              {evolution.map((era, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  <div className="w-full lg:w-1/2">
                    <img
                      src={era.image}
                      alt={era.title}
                      className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 text-left relative">
                    <div className="absolute -left-4 lg:left-auto lg:-right-4 top-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-y-1/2" />
                    <div
                      className={`p-6 transition-all duration-300 ${
                        activeTimeline === index ? 'bg-gradient-to-r from-gray-900/50 to-black/50' : ''
                      }`}
                    >
                      <div className={`text-2xl font-bold mb-2 bg-gradient-to-r ${era.color} bg-clip-text text-transparent`}>
                        {era.year}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{era.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{era.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-20 relative" ref={(el) => (sectionsRef.current[4] = el)}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Nationwide Technological Impact</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Empowering India's defense and telecom sectors with reliable, cutting-edge solutions.
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


      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default About;