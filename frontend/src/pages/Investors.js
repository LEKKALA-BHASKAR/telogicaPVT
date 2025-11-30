import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  Eye, 
  Download, 
  TrendingUp, 
  PieChart, 
  Globe, 
  ArrowRight, 
  Search,
  Briefcase,
  Building2,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Investors = () => {
  const { isDarkMode } = useTheme();
  const [documents, setDocuments] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchSections();
    fetchDocuments();
    window.scrollTo(0, 0);
  }, []);

  const fetchSections = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/sections/public`);
      setSections(res.data.data);
      if (res.data.data.length > 0) {
        setSelectedSection(res.data.data[0]);
      }
    } catch (error) {
      console.error('Failed to load sections', error);
      const defaultSections = [
        { _id: '1', name: 'Annual Reports', category: 'annual_report' },
        { _id: '2', name: 'Financial Statements', category: 'financial_statement' },
        { _id: '3', name: 'Corporate Governance', category: 'corporate_governance' },
        { _id: '4', name: 'Investor Presentations', category: 'investor_presentation' },
        { _id: '5', name: 'Regulatory Filings', category: 'regulatory_filing' }
      ];
      setSections(defaultSections);
      if (defaultSections.length > 0) {
        setSelectedSection(defaultSections[0]);
      }
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/upload`);
      setDocuments(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load documents', error);
      setLoading(false);
    }
  };

  const openDocument = async (fileId) => {
    try {
      const response = await axios.get(`${API_URL}/api/upload/${fileId}`);
      if (response.data.success && response.data.data) {
        window.open(response.data.data.url, '_blank');
      }
    } catch (error) {
      console.error('Failed to open document:', error);
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.category === selectedSection?.category &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Market Presence', value: '15+', suffix: 'Countries', icon: Globe, color: 'blue' },
    { label: 'YoY Growth', value: '24', suffix: '%', icon: TrendingUp, color: 'green' },
    { label: 'Enterprise Clients', value: '500', suffix: '+', icon: Building2, color: 'purple' },
    { label: 'Projects Delivered', value: '1.2', suffix: 'K+', icon: Briefcase, color: 'pink' },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 ${
            isDarkMode ? 'mix-blend-overlay' : 'mix-blend-multiply'
          }`} />
          <div className={`absolute inset-0 bg-gradient-to-b ${
            isDarkMode ? 'from-black via-black/90 to-black' : 'from-white via-white/90 to-slate-50'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full mb-8 border backdrop-blur-sm bg-white/5 border-white/10"
          >
            <PieChart className="w-4 h-4 mr-2 text-green-400" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Investor Relations
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Financial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
              Transparency & Growth
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl max-w-3xl mx-auto leading-relaxed mb-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Access comprehensive financial reports, corporate governance documents, and investor presentations. We are committed to sustainable value creation.
          </motion.p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                className={`p-6 rounded-2xl border backdrop-blur-sm ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/60 border-gray-200 shadow-lg'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 mx-auto ${
                  stat.color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                  stat.color === 'green' ? 'bg-green-500/20 text-green-500' :
                  stat.color === 'purple' ? 'bg-purple-500/20 text-purple-500' :
                  'bg-pink-500/20 text-pink-500'
                }`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}<span className="text-lg text-gray-500">{stat.suffix}</span>
                </div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-80 flex-shrink-0"
          >
            <div className={`sticky top-24 rounded-3xl border overflow-hidden backdrop-blur-xl ${
              isDarkMode 
                ? 'bg-gray-900/60 border-white/10' 
                : 'bg-white/80 border-gray-200 shadow-xl'
            }`}>
              <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                <h3 className="font-bold text-lg">Document Library</h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Select a category to view
                </p>
              </div>
              <div className="p-3 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section._id}
                    onClick={() => setSelectedSection(section)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedSection?._id === section._id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : isDarkMode 
                          ? 'text-gray-400 hover:bg-white/5 hover:text-white' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>{section.name}</span>
                    {selectedSection?._id === section._id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Document List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex-1"
          >
            <div className={`rounded-3xl border min-h-[600px] backdrop-blur-xl ${
              isDarkMode 
                ? 'bg-gray-900/60 border-white/10' 
                : 'bg-white/80 border-gray-200 shadow-xl'
            }`}>
              {selectedSection ? (
                <>
                  {/* Header */}
                  <div className={`p-6 md:p-8 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{selectedSection.name}</h2>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Showing {filteredDocuments.length} documents
                        </p>
                      </div>
                      <div className="relative w-full md:w-64">
                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                        <Input
                          placeholder="Search documents..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className={`pl-10 ${
                            isDarkMode 
                              ? 'bg-black/50 border-gray-700 focus:border-blue-500' 
                              : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* List */}
                  <div className="p-6 md:p-8">
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className={`h-20 rounded-2xl animate-pulse ${
                            isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                          }`} />
                        ))}
                      </div>
                    ) : filteredDocuments.length > 0 ? (
                      <div className="space-y-4">
                        <AnimatePresence>
                          {filteredDocuments.map((doc, index) => (
                            <motion.div
                              key={doc._id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => openDocument(doc._id)}
                              className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                isDarkMode 
                                  ? 'bg-white/5 border-white/5 hover:border-blue-500/50 hover:bg-white/10' 
                                  : 'bg-white border-gray-100 hover:border-blue-500/30 hover:shadow-lg'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                  isDarkMode 
                                    ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' 
                                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                                }`}>
                                  <FileText className="w-6 h-6" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <h3 className={`font-semibold text-lg mb-1 truncate group-hover:text-blue-500 transition-colors ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {doc.name}
                                  </h3>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {new Date(doc.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-gray-500/10 border border-gray-500/20">
                                      PDF
                                    </span>
                                  </div>
                                </div>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`rounded-full opacity-0 group-hover:opacity-100 transition-all ${
                                    isDarkMode ? 'hover:bg-white/20' : 'hover:bg-gray-100'
                                  }`}
                                >
                                  <Eye className="w-5 h-5" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                        }`}>
                          <Search className={`w-10 h-10 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          No documents found
                        </h3>
                        <p className={`max-w-xs mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          We couldn't find any documents matching your search in this category.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[600px] text-center p-8">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
                    isDarkMode ? 'bg-white/5' : 'bg-gray-50'
                  }`}>
                    <Briefcase className={`w-12 h-12 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Select a Category</h3>
                  <p className="text-gray-500">Choose a document category from the sidebar to view files.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Investors;