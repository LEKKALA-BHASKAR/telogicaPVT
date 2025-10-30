import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Calendar, Eye } from 'lucide-react';

const Investors = () => {
  const [documents, setDocuments] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchSections();
    fetchDocuments();
  }, []);
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const fetchSections = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/sections/public`);
      setSections(res.data.data);
      if (res.data.data.length > 0) {
        setSelectedSection(res.data.data[0]);
      } else {
        setSelectedSection(null);
      }
    } catch (error) {
      console.error('Failed to load sections', error);
      // Fallback to default sections if API fails
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
        const fileUrl = response.data.data.url;
        window.open(fileUrl, '_blank');
      }
    } catch (error) {
      console.error('Failed to open document:', error);
      alert('Unable to open document. Please try again.');
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.category === selectedSection?.category &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSectionColor = (index) => {
    const colors = [
      'from-purple-600 to-pink-500',
      'from-blue-600 to-cyan-500',
      'from-green-600 to-teal-500',
      'from-yellow-600 to-orange-500',
      'from-red-600 to-pink-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 mb-6">
            <FileText className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">Investor Portal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Investor
            </span>
            <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Documents
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Access our comprehensive financial reports and investor documentation
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Moved further left with fixed width */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6">
                <h2 className="text-xl font-bold text-white">Document Categories</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {sections.map((section, index) => (
                    <li key={section._id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                          selectedSection?._id === section._id
                            ? 'bg-gradient-to-r ' + getSectionColor(index) + ' text-white font-semibold shadow-lg transform scale-105'
                            : 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:shadow-sm'
                        }`}
                        onClick={() => setSelectedSection(section)}
                      >
                        {section.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
              {selectedSection ? (
                <>
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 border-b border-gray-700/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedSection.name}</h2>
                        <p className="text-gray-400">
                          {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} available
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Search Bar */}
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search documents..."
                            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {loading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                      </div>
                    ) : filteredDocuments.length > 0 ? (
                      <div className="space-y-3">
                        {filteredDocuments.map((doc, index) => (
                          <div 
                            key={doc._id} 
                            className="group relative overflow-hidden rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 p-4 flex items-center justify-between cursor-pointer bg-gray-800/30"
                            onClick={() => openDocument(doc._id)}
                          >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${getSectionColor(index)} opacity-5`}></div>
                            
                            <div className="relative z-10 flex items-center gap-4 flex-1 min-w-0">
                              <div className="flex-shrink-0">
                                <div className={`w-10 h-10 bg-gradient-to-br ${getSectionColor(index)} rounded-lg flex items-center justify-center`}>
                                  <FileText className="w-5 h-5 text-white" />
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white truncate">{doc.name}</h3>
                              </div>
                              
                              <div className="flex-shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDocument(doc._id);
                                  }}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 hover:shadow-lg transition-all duration-300"
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-700/50">
                          <FileText className="w-12 h-12 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No documents available</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          {searchTerm 
                            ? `No documents matching "${searchTerm}" found in ${selectedSection.name}.`
                            : `There are currently no documents in the ${selectedSection.name} section.`
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="p-16 text-center">
                  <p className="text-gray-500">No categories available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investors;