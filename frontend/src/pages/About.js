import React from 'react';
import { Award, Users, Globe, Zap, Target, Eye } from 'lucide-react';

function About() {
  const milestones = [
    {
      year: '1999',
      title: 'Company Founded',
      description: 'Aishwarya Technologies and Telecom Ltd (ATTL) was established with a vision to serve the telecommunications sector.'
    },
    {
      year: '2005',
      title: 'Defense Partnership',
      description: 'Expanded into defense sector, becoming a trusted supplier of testing equipment to Indian Armed Forces.'
    },
    {
      year: '2012',
      title: 'ISO Certification',
      description: 'Achieved ISO 9001:2008 certification for quality management systems and manufacturing processes.'
    },
    {
      year: '2018',
      title: 'Technology Upgrade',
      description: 'Major technology upgrade with state-of-the-art manufacturing facility and R&D capabilities.'
    },
    {
      year: '2020',
      title: 'Rebranding',
      description: 'Rebranded to Telogica Limited, reflecting our commitment to technological excellence and innovation.'
    },
    {
      year: '2024',
      title: 'Digital Transformation',
      description: 'Launched comprehensive digital platform and expanded e-commerce capabilities for global reach.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We deliver precise, accurate, and reliable testing solutions that meet the highest industry standards.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuous innovation drives our product development, keeping us at the forefront of technology.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build long-term partnerships with our clients, understanding their unique requirements and challenges.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Commitment to excellence in every aspect of our business, from manufacturing to customer service.'
    }
  ];

  const leadership = [
    {
      name: 'Mr. Rajesh Agarwal',
      role: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1760346546767-95b89356a6bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MTI4OTU2Nnww&ixlib=rb-4.1.0&q=85',
      description: 'With over 25 years of experience in telecommunications and defense sectors, Mr. Agarwal leads our strategic vision and business development.'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1535448674466-81707cbfe0f7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MTI4OTU2Nnww&ixlib=rb-4.1.0&q=85',
      description: 'Dr. Sharma brings cutting-edge technical expertise and innovation leadership, driving our R&D initiatives and product development.'
    },
    {
      name: 'Mr. Amit Kumar',
      role: 'Chief Operations Officer',
      image: 'https://images.pexels.com/photos/1181319/pexels-photo-1181319.jpeg',
      description: 'Leading our manufacturing and quality operations, Mr. Kumar ensures excellence in production and delivery of our products.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-violet-900 via-purple-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="about-hero-title">
              About Telogica
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Formerly Aishwarya Technologies and Telecom Ltd (ATTL), we are synonymous with Indian Defence and Telecom sector. 
              We design and manufacture Test and Measuring Equipment for Fiber, Data and Copper Cable Fault Locators.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-violet-600 mr-4" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be the leading provider of innovative testing and measuring equipment for telecommunications and defense sectors, 
                  delivering superior quality products that enable our clients to build and maintain robust communication networks.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-6">
                  <Eye className="h-8 w-8 text-orange-500 mr-4" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become a globally recognized technology company that shapes the future of telecommunications through 
                  continuous innovation, exceptional quality, and unwavering commitment to customer success.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1665936653831-211c14d123ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MTI4OTU2Nnww&ixlib=rb-4.1.0&q=85"
                alt="Telogica Office Building"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-violet-600/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every product we create
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group" data-testid={`value-${value.title.toLowerCase()}`}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Over two decades of innovation and growth in telecommunications technology
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-violet-500 to-orange-500 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} data-testid={`milestone-${milestone.year}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                      <div className="text-2xl font-bold text-violet-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-violet-500 to-orange-500 rounded-full border-4 border-white shadow-lg z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Meet the visionaries driving Telogica's success and innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg text-center group hover:shadow-2xl transition-shadow duration-300" data-testid={`leader-${index}`}>
                <div className="relative mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-gray-100 group-hover:border-violet-500 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                <p className="text-violet-600 font-semibold mb-4">{leader.role}</p>
                <p className="text-gray-600 leading-relaxed">{leader.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications and Awards */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Recognition</h2>
            <p className="text-xl text-gray-600">
              Our commitment to quality and excellence is recognized by industry standards
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: 'ISO 9001:2015', subtitle: 'Quality Management' },
              { title: 'ISO 14001', subtitle: 'Environmental Management' },
              { title: 'OHSAS 18001', subtitle: 'Safety Management' },
              { title: 'CE Marking', subtitle: 'European Compliance' }
            ].map((cert, index) => (
              <div key={index} className="text-center p-6 rounded-2xl border border-gray-200 hover:border-violet-500 hover:shadow-lg transition-all duration-300" data-testid={`certification-${index}`}>
                <Award className="h-12 w-12 text-violet-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-1">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-r from-violet-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Build the Future Together</h2>
          <p className="text-xl text-white/90 mb-8">
            Ready to partner with us? Get in touch to discuss your telecommunications and defense equipment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-4 bg-white text-violet-600 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
              Contact Us Today
            </a>
            <a href="/products" className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-violet-600 transition-colors">
              View Our Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;