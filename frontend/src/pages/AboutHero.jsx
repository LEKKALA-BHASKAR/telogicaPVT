import React from 'react';
import { ArrowRight, Play, Shield, Radio, Factory } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const AboutHero = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleKnowMore = () => {
    navigate('/about');
  };

  return (
    <section className={`min-h-screen overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-gray-900 to-black text-white'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Background Elements */}
        <div className={`absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl ${
          isDarkMode ? 'bg-pink-500/10' : 'bg-blue-500/10'
        }`}></div>
        <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-indigo-500/10'
        }`}></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <div className="relative group">
            <div className={`absolute -inset-4 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }`}></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://scontent.fcdp1-1.fna.fbcdn.net/v/t39.30808-6/454947021_825253096373273_2071655228525396527_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VZsYBnhZWbEQ7kNvwHUXctN&_nc_oc=AdlFU0ypLkXz1Th7UL2rssIG_2YHA5dzc3Up8L3onVX0T44Vfvu1dyUwzIsy0Dcv9SB5LskDd_dKMSGJEVxYZJY-&_nc_zt=23&_nc_ht=scontent.fcdp1-1.fna&_nc_gid=2QGYrn6H2j63nsTNampbVw&oh=00_AfePAldZXxPo60rMIX_9-dOvoW2i6CCO4ygUr7pGwvAWqA&oe=69052E82"
                alt="Telogica Advanced Technology"
                className="w-full h-96 lg:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className={`absolute inset-0 ${
                isDarkMode ? 'bg-gradient-to-t from-black/50 to-transparent' : 'bg-gradient-to-t from-gray-900/30 to-transparent'
              }`}></div>
              
              {/* Floating Tech Icons */}
              <div className="absolute top-6 left-6 flex gap-3">
                <div className={`w-12 h-12 backdrop-blur-sm rounded-xl flex items-center justify-center border ${
                  isDarkMode 
                    ? 'bg-pink-500/20 border-pink-500/30'
                    : 'bg-blue-500/20 border-blue-500/30'
                }`}>
                  <Shield className={`w-6 h-6 ${
                    isDarkMode ? 'text-pink-400' : 'text-blue-600'
                  }`} />
                </div>
                <div className={`w-12 h-12 backdrop-blur-sm rounded-xl flex items-center justify-center border ${
                  isDarkMode 
                    ? 'bg-purple-500/20 border-purple-500/30'
                    : 'bg-indigo-500/20 border-indigo-500/30'
                }`}>
                  <Radio className={`w-6 h-6 ${
                    isDarkMode ? 'text-purple-400' : 'text-indigo-600'
                  }`} />
                </div>
                <div className={`w-12 h-12 backdrop-blur-sm rounded-xl flex items-center justify-center border ${
                  isDarkMode 
                    ? 'bg-blue-500/20 border-blue-500/30'
                    : 'bg-cyan-500/20 border-cyan-500/30'
                }`}>
                  <Factory className={`w-6 h-6 ${
                    isDarkMode ? 'text-blue-400' : 'text-cyan-600'
                  }`} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Company Badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm border ${
              isDarkMode 
                ? 'bg-white/5 border-white/10'
                : 'bg-gray-100/50 border-gray-200/50'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500'
              }`}></div>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Technology Innovators Since 2008</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className={`text-4xl lg:text-6xl font-bold leading-tight ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                About <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-pink-500 via-purple-500 to-blue-500'
                    : 'from-blue-600 via-indigo-600 to-cyan-600'
                }`}>Telogica</span>
              </h1>
              <div className={`inline-flex items-center px-3 py-1 rounded-full border ${
                isDarkMode 
                  ? 'bg-yellow-500/20 border-yellow-500/30'
                  : 'bg-amber-100/50 border-amber-200/50'
              }`}>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-yellow-400' : 'text-amber-700'
                }`}>
                  Formerly Aishwarya Technologies and Telecom Ltd (ATTL)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className={`text-lg lg:text-xl leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Telogica Ltd</span> is synonymous with Indian Defence and Telecom sector. We are a premier designing and manufacturing company producing Test and Measuring Equipment like Fiber, Data and Copper Cable Fault Locators in India.
              </p>
            

              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Apart from being a prominent player in the domestic telecom industry, we are a trend-setter in the Indian Telecom Industry in qualitative terms, driving innovation and excellence.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleKnowMore}
                className={`group relative px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-pink-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/25'
                }`}
              >
                <span className="relative z-10 flex items-center">
                  Know More About Us
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600'
                }`}></div>
              </button>
              
              {/* Stats */}
              <div className="flex items-center gap-6 text-center">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>15+</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Years Excellence</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>50+</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Products</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>24/7</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          isDarkMode ? 'border-gray-400' : 'border-gray-500'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 ${
            isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
          }`}></div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;