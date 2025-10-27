import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, FileText, Calendar, Eye, ExternalLink, Loader, CheckCircle, AlertCircle, FolderOpen, FileDown, Share2, Filter, Search, Grid, List } from 'lucide-react';

const Investors = () => {
  const [documents, setDocuments] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadStatus, setDownloadStatus] = useState({});

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchSections();
    fetchDocuments();
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

  const handleDownload = async (fileId, filename) => {
    try {
      // Set downloading state for this specific file
      setDownloading(prev => ({ ...prev, [fileId]: true }));
      setDownloadStatus(prev => ({ ...prev, [fileId]: 'loading' }));
      
      console.log('Downloading file:', fileId, filename);
      
      // Get the file info
      const response = await axios.get(`${API_URL}/api/upload/${fileId}`);
      
      if (response.data.success && response.data.data) {
        const fileUrl = response.data.data.url;
        console.log('File URL:', fileUrl);
        
        // Create a temporary link element and trigger download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Also open the PDF in a new tab
        window.open(fileUrl, '_blank');
        
        console.log('Download and open triggered');
        
        // Update status to success
        setDownloadStatus(prev => ({ ...prev, [fileId]: 'success' }));
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setDownloadStatus(prev => ({ ...prev, [fileId]: null }));
        }, 3000);
      } else {
        throw new Error('File not found');
      }
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus(prev => ({ ...prev, [fileId]: 'error' }));
      
      // Fallback: open in new tab
      try {
        const response = await axios.get(`${API_URL}/api/upload/${fileId}`);
        if (response.data.success && response.data.data) {
          window.open(response.data.data.url, '_blank');
          
          // Update status to success even for fallback
          setDownloadStatus(prev => ({ ...prev, [fileId]: 'success' }));
          
          // Reset status after 3 seconds
          setTimeout(() => {
            setDownloadStatus(prev => ({ ...prev, [fileId]: null }));
          }, 3000);
        }
      } catch (fallbackError) {
        alert('Unable to download or open file. Please try again or contact support.');
        setDownloadStatus(prev => ({ ...prev, [fileId]: 'error' }));
        
        // Reset error status after 3 seconds
        setTimeout(() => {
          setDownloadStatus(prev => ({ ...prev, [fileId]: null }));
        }, 3000);
      }
    } finally {
      // Reset downloading state
      setDownloading(prev => ({ ...prev, [fileId]: false }));
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.category === selectedSection?.category &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSectionColor = (index) => {
    const colors = [
      'from-red-500 via-orange-500 to-yellow-500',
      'from-yellow-500 via-green-500 to-teal-500',
      'from-teal-500 via-blue-500 to-indigo-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-pink-500 via-red-500 to-orange-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-red-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-reverse"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-green-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-reverse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 via-orange-100 via-yellow-100 via-green-100 via-teal-100 via-blue-100 via-indigo-100 to-purple-100 backdrop-blur-sm border border-gray-200 mb-6">
            <FolderOpen className="h-4 w-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Investor Portal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Investor <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-indigo-500 to-purple-500">Reports</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive financial reports and investor documentation
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-indigo-500 to-purple-500 p-6">
                <h2 className="text-xl font-bold text-white">Report Categories</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {sections.map((section, index) => (
                    <li key={section._id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          selectedSection?._id === section._id
                            ? 'bg-gradient-to-r ' + getSectionColor(index) + ' text-white font-semibold shadow-md transform scale-105'
                            : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
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
          <div className="w-full lg:w-3/4">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {selectedSection ? (
                <>
                  <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedSection.name}</h2>
                        <p className="text-gray-600">
                          {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} available
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Search Bar */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search documents..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        
                        {/* View Mode Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <button
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                            onClick={() => setViewMode('grid')}
                          >
                            <Grid className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                            onClick={() => setViewMode('list')}
                          >
                            <List className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {loading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                      </div>
                    ) : filteredDocuments.length > 0 ? (
                      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
                        {filteredDocuments.map((doc, index) => (
                          <div key={doc._id} className={`group relative overflow-hidden rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 ${
                            viewMode === 'list' ? 'p-4 flex items-center gap-4' : 'p-6'
                          }`}>
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${getSectionColor(index)} opacity-5`}></div>
                            
                            <div className="relative z-10 flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className={`w-12 h-12 bg-gradient-to-br ${getSectionColor(index)} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                  <FileText className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 mb-2 truncate">{doc.name}</h3>
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                  <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                                  <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleDownload(doc._id, doc.name)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                      downloadStatus[doc._id] === 'success' 
                                        ? 'bg-green-100 text-green-700' 
                                        : downloadStatus[doc._id] === 'error'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gradient-to-r ' + getSectionColor(index) + ' text-white hover:shadow-md'
                                    }`}
                                    disabled={downloading[doc._id]}
                                  >
                                    {downloading[doc._id] ? (
                                      <>
                                        <Loader className="w-4 h-4 animate-spin" />
                                        Processing...
                                      </>
                                    ) : downloadStatus[doc._id] === 'success' ? (
                                      <>
                                        <CheckCircle className="w-4 h-4" />
                                        Downloaded
                                      </>
                                    ) : downloadStatus[doc._id] === 'error' ? (
                                      <>
                                        <AlertCircle className="w-4 h-4" />
                                        Try Again
                                      </>
                                    ) : (
                                      <>
                                        <Download className="w-4 h-4" />
                                        Download & Open
                                      </>
                                    )}
                                  </button>
                                  
                                  <button
                                    onClick={() => {
                                      axios.get(`${API_URL}/api/upload/${doc._id}`)
                                        .then(res => {
                                          if (res.data.success && res.data.data) {
                                            window.open(res.data.data.url, '_blank');
                                          }
                                        })
                                        .catch(err => console.error('Failed to open file:', err));
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                                  >
                                    <Eye className="w-4 h-4" />
                                    Preview
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                          <FileText className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No documents available</h3>
                        <p className="text-gray-600">
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
                <div className="p-12 text-center">
                  <p className="text-gray-500">No categories available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Investors;