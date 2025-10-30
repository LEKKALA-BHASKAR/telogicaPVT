import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

const GlobalContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black rounded-2xl border border-gray-800 p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Head Office</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Empire Square, Plot No 233-A, 234 & 235,<br />
                  3rd Fl, Rd No 36, Jubilee Hills,<br />
                  Hyderabad- 500 033, Telangana, India
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Phone Numbers</h4>
                <p className="text-gray-300 text-sm">
                  +91- 40-27531324 to 26<br />
                  +91 9396610682
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Email Addresses</h4>
                <p className="text-gray-300 text-sm">
                  marketing@telogica.com<br />
                  sales@telogica.com<br />
                  support@telogica.com
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your full name"
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
                className="bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your.email@company.com"
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
                rows={5}
                className="bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Please provide details about your requirements..."
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GlobalContactForm;