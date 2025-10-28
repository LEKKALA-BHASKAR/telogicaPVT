import React from 'react';
import { ArrowRight, Play, Shield, Radio, Factory } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutHero = () => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate('/about');
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Company Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300">Technology Innovators Since 2008</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                About <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Telogica</span>
              </h1>
              <div className="inline-flex items-center px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                <span className="text-yellow-400 text-sm font-medium">
                  Formerly Aishwarya Technologies and Telecom Ltd (ATTL)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                <span className="font-semibold text-white">Telogica Ltd</span> is synonymous with Indian Defence and Telecom sector. We are a premier designing and manufacturing company producing Test and Measuring Equipment like Fiber, Data and Copper Cable Fault Locators in India.
              </p>
            

              <p className="text-lg text-gray-300 leading-relaxed">
                Apart from being a prominent player in the domestic telecom industry, we are a trend-setter in the Indian Telecom Industry in qualitative terms, driving innovation and excellence.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleKnowMore}
                className="group relative bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-xl text-white font-bold text-lg inline-flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/25 hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  Know More About Us
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              {/* Stats */}
              <div className="flex items-center gap-6 text-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-gray-400 text-sm">Years Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-gray-400 text-sm">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-gray-400 text-sm">Support</div>
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
  );
};

export default AboutHero;