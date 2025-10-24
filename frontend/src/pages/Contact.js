import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="px-4 py-20 bg-gradient-to-br from-violet-50 to-orange-50">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold mb-6 text-center"
          >
            Contact <span className="gradient-text">Us</span>
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-gray-600">
                      Empire Square, Plot No 233-A, 234 & 235,<br />
                      3rd Fl, Rd No 36, Jubilee Hills,<br />
                      Hyderabad- 500 033, Telangana, India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-violet-600" />
                  <div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-gray-600">+91 9396610682</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-violet-600" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-gray-600">sales@telogica.com</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl" data-testid="contact-form">
              <div className="space-y-6">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="contact-name-input"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  data-testid="contact-email-input"
                />
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  data-testid="contact-message-input"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-orange-500 text-white"
                  data-testid="contact-submit-btn"
                >
                  <Send className="mr-2 w-4 h-4" />
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
