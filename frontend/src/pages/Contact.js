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
      city: 'Mumbai (Regional Office)',
      address: 'Business Center, Andheri East, Mumbai - 400069',
      phone: '+91 22-28261234',
      email: 'mumbai@telogica.com'
    },
    {
      city: 'Delhi (Regional Office)',
      address: 'Connaught Place, New Delhi - 110001',
      phone: '+91 11-41524567',
      email: 'delhi@telogica.com'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-violet-900 via-purple-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
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
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow duration-300" data-testid={`contact-info-${index}`}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-orange-500 flex items-center justify-center">
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                <p className="text-lg text-gray-600">
                  Have a question or need a quote? Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12" data-testid="contact-success">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-primary"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="Your full name"
                        data-testid="contact-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="your.email@company.com"
                        data-testid="contact-email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Brief description of your inquiry"
                      data-testid="contact-subject"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="form-textarea"
                      placeholder="Please provide details about your requirements, including specific products or services you're interested in..."
                      data-testid="contact-message"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary"
                    data-testid="contact-submit"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="loading-spinner h-4 w-4 mr-2"></div>
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

            {/* Map and Office Locations */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Offices</h2>
                <p className="text-lg text-gray-600">
                  We have offices across India to better serve our customers. Visit us at any of our locations.
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl h-64 mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-orange-500/20"></div>
                <div className="text-center z-10">
                  <MapPin className="h-12 w-12 text-violet-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-semibold">Interactive Map</p>
                  <p className="text-sm text-gray-600">Hyderabad Head Office Location</p>
                </div>
              </div>

              {/* Office Locations */}
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100" data-testid={`office-${index}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{office.city}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-violet-500 mr-2 mt-1 flex-shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{office.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
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
              <div key={index} className="bg-gray-50 p-6 rounded-2xl" data-testid={`faq-${index}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-violet-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss your requirements and find the perfect solution for your needs.
            Our experts are standing by to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-100" data-testid="schedule-call-btn">
              Schedule a Call
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-violet-600">
              Request Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;