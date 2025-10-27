import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Cable, 
  Cpu, 
  Satellite, 
  Network, 
  Zap,
  ArrowRight,
  CheckCircle,
  Shield,
  Radio,
  Factory,
  Users
} from 'lucide-react';

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const productCategories = [
    {
      id: 'splicing',
      name: 'Splicing Machines',
      icon: Cpu,
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 'copper',
      name: 'Copper Testers',
      icon: Cable,
      color: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      id: 'data',
      name: 'Data Testers',
      icon: Network,
      color: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 'optical',
      name: 'Optical Testers',
      icon: Wifi,
      color: 'from-orange-500 to-red-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      id: 'rf',
      name: 'RF Test Instruments',
      icon: Satellite,
      color: 'from-indigo-500 to-purple-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    }
  ];

  const products = {
    splicing: [
      {
        id: 1,
        name: 'Fusion Splicer Pro',
        description: 'Compact automatic optical fiber fusion splicer with core-to-core alignment technology',
        features: ['PAS Fiber Adjustment', 'Quad-core 1.4GHz CPU', 'Low Loss Splicing', 'Long Battery Life'],
        specs: ['0.02dB Typical Loss', '8-Second Splice Time', 'IP52 Protection', 'Pluggable Lithium Battery'],
        applications: ['FTTH Networks', 'Data Centers', 'Telecom Backbone'],
        image: '/api/placeholder/400/300'
      },
      {
        id: 2,
        name: 'Smart Splicer Mini',
        description: 'Lightweight field fusion splicer with active V-groove technology',
        features: ['Ergonomic Design', 'Vivid Imaging System', 'High Precision Alignment', 'Auto Fiber Detection'],
        specs: ['0.03dB Maximum Loss', '6-Second Heat Time', 'Compact & Portable', '8 Hours Battery'],
        applications: ['Field Maintenance', 'Emergency Repairs', 'LAN Installations'],
        image: '/api/placeholder/400/300'
      }
    ],
    copper: [
      {
        id: 1,
        name: 'TDR Cable Analyzer',
        description: 'Advanced Time Domain Reflectometer for copper cable testing up to 20km range',
        features: ['20km Fault Detection', 'Jelly Filled Cable Support', 'Auto Fault Location', 'Graphical Display'],
        specs: ['0.1m Resolution', 'Pulse Width Adjustable', 'Data Logging', 'RS-232 Interface'],
        applications: ['Telecom Cables', 'Data Cables', 'Network Infrastructure'],
        image: '/api/placeholder/400/300'
      },
      {
        id: 2,
        name: 'Copper Line Tester',
        description: 'Comprehensive two-wire communication cable tester for all copper types',
        features: ['Multi-Cable Support', 'Continuity Testing', 'Resistance Measurement', 'Noise Detection'],
        specs: ['0-1000Ω Range', '±1% Accuracy', 'Built-in Speaker', 'Field Portable'],
        applications: ['Telephone Lines', 'ISDN Networks', 'Broadband Testing'],
        image: '/api/placeholder/400/300'
      }
    ],
    data: [
      {
        id: 1,
        name: 'Ethernet Certifier Pro',
        description: 'Layer-1 network certification tester for Ethernet transmission validation',
        features: ['Cable Verification', 'Performance Proof', 'Fault Pinpointing', 'Auto Testing'],
        specs: ['10/100/1000Base-T', 'PoE Testing', 'Wire Map', 'Length Measurement'],
        applications: ['LAN Certification', 'Network Installation', 'Troubleshooting'],
        image: '/api/placeholder/400/300'
      },
      {
        id: 2,
        name: 'Network Analyzer Plus',
        description: 'Unique network tester for quick issue resolution and connectivity analysis',
        features: ['Root Cause Analysis', 'Connectivity Testing', 'Port Identification', 'Speed Testing'],
        specs: ['RJ45/RJ11 Support', 'LCD Display', 'Auto MDI/MDIX', 'Ping Testing'],
        applications: ['IT Maintenance', 'Network Audits', 'Field Service'],
        image: '/api/placeholder/400/300'
      }
    ],
    optical: [
      {
        id: 1,
        name: 'Fiber OTDR Master',
        description: 'Optical Time Domain Reflectometer for fiber optic cable analysis and fault location',
        features: ['High Data Throughput', 'EMI Resistance', 'Long Distance Capable', 'Safety Certified'],
        specs: ['1310/1550nm', '40dB Dynamic Range', '0.1m Resolution', 'USB Data Export'],
        applications: ['Fiber Networks', 'LAN/WAN Testing', 'Cable Manufacturing'],
        image: '/api/placeholder/400/300'
      },
      {
        id: 2,
        name: 'Optical Power Meter',
        description: 'Precision power measurement for fiber optic systems and network validation',
        features: ['Dual Wavelength', 'Auto Power Measurement', 'Relative Loss', 'Data Logging'],
        specs: ['-50 to +26dBm', '±0.2dB Accuracy', 'InGaAs Detector', 'Rechargeable Battery'],
        applications: ['Network Installation', 'Fiber Characterization', 'Quality Assurance'],
        image: '/api/placeholder/400/300'
      }
    ],
    rf: [
      {
        id: 1,
        name: 'Vector Network Analyzer',
        description: 'High-frequency VNA covering DC to 40GHz for comprehensive RF testing',
        features: ['40GHz Frequency Range', 'S-Parameter Measurement', 'Time Domain Analysis', 'Advanced Calibration'],
        specs: ['120dB Dynamic Range', '<0.1dB Accuracy', 'Touchscreen Display', 'GPIB/USB/Ethernet'],
        applications: ['Component Testing', 'Antenna Design', 'R&D Laboratories'],
        image: '/api/placeholder/400/300'
      },
      {
        id: 2,
        name: 'Signal Generator Pro',
        description: 'Precision RF signal generator with wide frequency coverage and modulation capabilities',
        features: ['Multi-Modulation Support', 'High Stability', 'Low Phase Noise', 'Digital Modulation'],
        specs: ['9kHz-40GHz', '±0.1ppm Accuracy', 'AM/FM/PM/QM', '1000-Step Memory'],
        applications: ['System Testing', 'Education', 'Manufacturing'],
        image: '/api/placeholder/400/300'
      }
    ]
  };

  const filteredProducts = activeCategory === 'all' 
    ? Object.values(products).flat()
    : products[activeCategory] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, #ffffff 1px, transparent 1px),
                            radial-gradient(circle at 80% 80%, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 25px 25px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <Zap className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm font-medium">Complete Test Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Advanced Test & Measuring
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Equipment
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Telogica Ltd provides comprehensive test equipment solutions across copper, optical, digital, 
            and RF technologies. From in-house developed instruments to top-class manufacturer selections, 
            we deliver complete testing solutions under one roof.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-16">
            {[
              { label: 'Product Categories', value: '5+' },
              { label: 'Years Experience', value: '15+' },
              { label: 'Projects Completed', value: '50+' },
              { label: 'Technologies', value: '4' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-8 px-6 lg:px-8 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              All Products
            </button>
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? `${category.bgColor} text-white border ${category.borderColor} shadow-lg`
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-gray-600 overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-blue-400/20" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                      New
                    </div>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h4>
                    <div className="space-y-1">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Applications</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors group/btn">
                      <span className="font-semibold">View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Products Found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We're constantly expanding our product range. Please check back soon for new additions in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Need Custom Test Solutions?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Our qualified application engineers are ready to help you select the perfect instruments 
            for your specific requirements and ensure efficient real-time application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25">
              Contact Our Experts
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300">
              Download Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;