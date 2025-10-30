import React, { useState ,useEffect} from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
    useEffect(()=>{
      window.scrollTo(0,0);
    },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      await api.post('/contact', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        'Empire Square, Plot No 233-A, 234 & 235',
        '3rd Fl, Rd No 36, Jubilee Hills',
        'Hyderabad- 500 033, Telangana, India'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+91 9396610682',
        '+91- 40-27531324 to 26',
        '+91-40-27535423'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'sales@telogica.com',
        'support@telogica.com',
        'info@telogica.com'
      ]
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 1:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  const offices = [
    {
      city: 'Hyderabad (Head Office)',
      address: 'Empire Square, Plot No 233-A, 234 & 235, 3rd Fl, Rd No 36, Jubilee Hills',
      phone: '+91 9396610682',
      email: 'sales@telogica.com'
    },
    {
      city: 'Ahmedabad',
      address: 'M/s. TELOGICA LIMITED',
      phone: '+91-9396610682',
      email: 'sales@telogica.com'
    },
    {
      city: 'Chennai',
      address: 'M/s. TELOGICA LIMITED No : 28/6 , New Street, T.Nagar, Chennai - 600 017',
      phone: '+91 9396610682',
      email: 'sales@telogica.com'
    },
    {
      city: 'Bangalore',
      address: 'M/s. TELOGICA LIMITED # 176, Sector 2 , Nabonagar,Bannerugatta Road Bangalore-560076, Karnataka, INDIA',
      phone: '+91 9396610682',
      email: 'sales@telogica.com'
    },
    {
      city: 'Kolkata',
      address: 'M/s. TELOGICA LIMITED 14B ,Bhupen Bose Avenue, Shyam Bazar, Kolkata-700004, INDIA',
      phone: '+91-9396610682',
      email: 'sales@telogica.com'
    },
    {
      city: 'Mumbai',
      address: 'M/s. TELOGICA LIMITED # 48/405, Unnat Nagar2, S V Road, Near Venus Garden,Goregaon (W), Mumbai- 400 062. INDIA',
      phone: '+91 9396610682',
      email: 'sales@telogica.com'
    },
    {
      city: 'Delhi',
      address: 'M/s. TELOGICA LIMITED 12/26, (Ground Floor), West Patel Nagar,Near Arya Samaj Mandir',
      phone: '+91-11-42488098  +91-9396610682',
      email: 'sales@telogica.com'
    },
    {
      city: 'Registered Office',
      address: 'Empire Square, Plot No 233-A, 234 & 235, 3rd Fl, Rd No 36, Jubilee Hills, Hyderabad- 500 033, Telangana, India',
      phone: '+91- 40-27531324 to 26  +91 9396610682',
      email: 'marketing@telogica.com, sales@telogica.com, support@telogica.com'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-purple-900 via-violet-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="contact-hero-title">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Get in touch with our experts for all your telecommunications and defense equipment needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="section-padding bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300" data-testid={`contact-info-${index}`}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section-padding bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Send us a Message</h2>
                <p className="text-lg text-gray-300">
                  Have a question or need a quote? Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12" data-testid="contact-success">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for contacting us. We'll get back to you soon.</p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="form-input bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your full name"
                        data-testid="contact-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="form-input bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="your.email@company.com"
                        data-testid="contact-email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="form-input bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Brief description of your inquiry"
                      data-testid="contact-subject"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="form-textarea bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Please provide details about your requirements, including specific products or services you're interested in..."
                      data-testid="contact-message"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                    data-testid="contact-submit"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="loading-spinner h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Map Placeholder */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Our Location</h2>
                <p className="text-lg text-gray-300">
                  Visit our head office or reach out to our regional offices across India.
                </p>
              </div>

              <div className="bg-gray-900 rounded-2xl h-96 mb-8 flex items-center justify-center relative overflow-hidden border border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10"></div>
                <div className="text-center z-10">
                  <MapPin className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-white font-semibold text-xl">Interactive Map</p>
                  <p className="text-sm text-gray-400">Hyderabad Head Office Location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Offices Section */}
      <section className="section-padding bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Branch Offices</h2>
            <p className="text-xl text-gray-300">
              We have offices across India to better serve our customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-colors" data-testid={`office-${index}`}>
                <h3 className="text-lg font-bold text-white mb-3">{office.city}</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                    <span>{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Quick answers to common questions about our products and services
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                question: 'What is your typical lead time for equipment delivery?',
                answer: 'Standard equipment typically ships within 2-3 weeks. Custom or specialized equipment may take 4-6 weeks depending on specifications. We provide detailed timelines with every quote.'
              },
              {
                question: 'Do you provide installation and training services?',
                answer: 'Yes, we offer comprehensive installation, commissioning, and training services for all our equipment. Our certified technicians ensure proper setup and provide hands-on training for your team.'
              },
              {
                question: 'What warranty and support do you offer?',
                answer: 'All our equipment comes with a standard 1-2 year warranty. We also offer extended warranty options and comprehensive maintenance contracts with 24/7 technical support.'
              },
              {
                question: 'Can you customize equipment for specific requirements?',
                answer: 'Absolutely! We specialize in custom solutions. Our engineering team can modify existing products or develop entirely new solutions to meet your specific technical requirements.'
              },
              {
                question: 'Do you provide financing options for large orders?',
                answer: 'Yes, we offer flexible financing and leasing options for large orders and long-term projects. Contact our sales team to discuss terms that work for your budget and timeline.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-2xl border border-gray-800" data-testid={`faq-${index}`}>
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-purple-900 to-violet-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss your requirements and find the perfect solution for your needs.
            Our experts are standing by to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold">
              Schedule a Call
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900 px-6 py-3 rounded-xl font-semibold">
              Request Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;