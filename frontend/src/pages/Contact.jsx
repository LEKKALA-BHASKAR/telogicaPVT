import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight, Sparkles, Target, Users, Zap, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);
  const formRef = useRef(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Empire Square, Plot No 233-A, 234 & 235', '3rd Fl, Rd No 36, Jubilee Hills', 'Hyderabad-500 033, Telangana, India'],
      color: 'from-cyan-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 9396610682', '+91-40-27531324 to 26', '+91-40-27535423'],
      color: 'from-emerald-500 to-green-600',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['sales@telogica.com', 'support@telogica.com', 'info@telogica.com'],
      color: 'from-violet-500 to-purple-600',
      image: 'https://icon-library.com/images/email-us-icon/email-us-icon-4.jpg',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed'],
      color: 'from-orange-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  const offices = [
    {
      city: 'Hyderabad (Head Office)',
      address: 'Empire Square, Plot No 233-A, 234 & 235, 3rd Fl, Rd No 36, Jubilee Hills',
      phone: '+91 9396610682',
      email: 'sales@telogica.com',
      color: 'from-cyan-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      city: 'Ahmedabad',
      address: 'M/s. TELOGICA LIMITED',
      phone: '+91-9396610682',
      email: 'sales@telogica.com',
      color: 'from-emerald-500 to-green-600',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      city: 'Chennai',
      address: 'M/s. TELOGICA LIMITED No: 28/6, New Street, T.Nagar, Chennai - 600 017',
      phone: '+91 9396610682',
      email: 'sales@telogica.com',
      color: 'from-violet-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1516321310763-38126d86a86c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      city: 'Bangalore',
      address: 'M/s. TELOGICA LIMITED #176, Sector 2, Nabonagar, Bannerugatta Road, Bangalore-560076, Karnataka, INDIA',
      phone: '+91 9396610682',
      email: 'sales@telogica.com',
      color: 'from-orange-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      city: 'Kolkata',
      address: 'M/s. TELOGICA LIMITED 14B, Bhupen Bose Avenue, Shyam Bazar, Kolkata-700004, INDIA',
      phone: '+91-9396610682',
      email: 'sales@telogica.com',
      color: 'from-cyan-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1558499932-9609acb6f0ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      city: 'Mumbai',
      address: 'M/s. TELOGICA LIMITED #48/405, Unnat Nagar 2, S V Road, Near Venus Garden, Goregaon (W), Mumbai-400 062, INDIA',
      phone: '+91 9396610682',
      email: 'sales@telogica.com',
      color: 'from-emerald-500 to-green-600',
      image: 'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      city: 'Delhi',
      address: 'M/s. TELOGICA LIMITED 12/26, (Ground Floor), West Patel Nagar, Near Arya Samaj Mandir',
      phone: '+91-11-42488098 +91-9396610682',
      email: 'sales@telogica.com',
      color: 'from-violet-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
    {
      city: 'Registered Office',
      address: 'Empire Square, Plot No 233-A, 234 & 235, 3rd Fl, Rd No 36, Jubilee Hills, Hyderabad-500 033, Telangana, India',
      phone: '+91-40-27531324 to 26 +91 9396610682',
      email: 'marketing@telogica.com, sales@telogica.com, support@telogica.com',
      color: 'from-orange-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  const stats = [
    { number: '24h', label: 'Response Time', icon: Clock },
    { number: '15+', label: 'Years Experience', icon: Target },
    { number: '50+', label: 'Expert Engineers', icon: Users },
    { number: '500+', label: 'Projects Completed', icon: Zap },
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


      {/* Contact Information */}
      <section className="relative py-20" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
              Get In <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with us through multiple channels for prompt and personalized support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="group relative">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={info.image}
                    alt={info.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                </div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 mt-4 border border-gray-700 group-hover:border-cyan-500/30 transition-all duration-300">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4 text-center">{info.title}</h3>
                  <div className="space-y-2 text-center">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="relative py-20" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div ref={formRef}>
              <div className="mb-12">
                <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
                  Send <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Message</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Have a project in mind? Let's discuss how we can help transform your telecommunications and defense capabilities.
                </p>
              </div>
              {submitted ? (
                <div className="text-center py-16" data-testid="contact-success">
                  <div className="relative inline-flex mb-6">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                    <CheckCircle className="relative h-20 w-20 text-green-400 mx-auto" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                  <p className="text-gray-300 text-lg mb-8">
                    Thank you for contacting Telogica. Our experts will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 group"
                  >
                    Send Another Message
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-3">FULL NAME *</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                        placeholder="Enter your full name"
                        data-testid="contact-name"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-3">EMAIL ADDRESS *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                        placeholder="your.email@company.com"
                        data-testid="contact-email"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3">SUBJECT *</label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                      placeholder="Brief description of your inquiry"
                      data-testid="contact-subject"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3">MESSAGE *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 resize-none"
                      placeholder="Please provide details about your requirements..."
                      data-testid="contact-message"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="contact-submit"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-5 w-5 mr-3" />
                        Send Message
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map Section */}
            <div>
              <div className="mb-12">
                <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
                  Our <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Location</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Visit our head office in Hyderabad or connect with our regional offices across India.
                </p>
              </div>
              <div className="relative rounded-3xl overflow-hidden border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.047545197043!2d78.4117765759369!3d17.42836350244475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9133bf9c894d%3A0xd7b13a6084ea8a26!2sEmpire%20Square!5e0!3m2!1sen!2sin!4v1730720809254!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Telogica Head Office Location"
                  className="relative z-10"
                ></iframe>
                <div className="absolute bottom-6 left-6 bg-gray-900/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-700">
                  <p className="text-white text-sm font-medium">Head Office - Hyderabad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Offices */}
      <section className="relative py-20" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
              Branch <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Offices</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Strategic locations across India to provide localized support and rapid response.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="group relative">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={office.image}
                    alt={office.city}
                    className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                </div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 mt-4 border border-gray-700 group-hover:border-cyan-500/30 transition-all duration-300">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${office.color} mb-4`}></div>
                  <h3 className="text-lg font-bold text-white mb-4">{office.city}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-300 leading-relaxed">{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-cyan-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{office.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-cyan-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{office.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

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

export default Contact;