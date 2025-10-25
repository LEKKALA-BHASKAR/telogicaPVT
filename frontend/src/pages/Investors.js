import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, FileText, Calendar } from 'lucide-react';

const Investors = () => {
  const [documents, setDocuments] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);

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
      console.log('Downloading file:', fileId, filename);
      
      // For Cloudinary files, we can directly download them
      // Get the file info first
      const response = await axios.get(`${API_URL}/api/upload/${fileId}`);
      
      if (response.data.success && response.data.data) {
        const fileUrl = response.data.data.url;
        console.log('File URL:', fileUrl);
        
        // Create a temporary link element and trigger download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = filename; // This might not work with cross-origin URLs, but let's try
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Download triggered');
      } else {
        throw new Error('File not found');
      }
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      try {
        const response = await axios.get(`${API_URL}/api/upload/${fileId}`);
        if (response.data.success && response.data.data) {
          window.open(response.data.data.url, '_blank');
        }
      } catch (fallbackError) {
        alert('Unable to download or open file. Please try again or contact support.');
      }
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.category === selectedSection?.category
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Investor Reports</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive financial reports and investor documentation
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-violet-600 to-orange-500 p-6">
                <h2 className="text-xl font-bold text-white">Report Categories</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section._id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          selectedSection?._id === section._id
                            ? 'bg-violet-50 text-violet-700 font-semibold border border-violet-200'
                            : 'text-gray-700 hover:bg-gray-100'
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
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {selectedSection ? (
                <>
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedSection.name}</h2>
                    <p className="text-gray-600">
                      {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} available
                    </p>
                  </div>

                  <div className="p-6">
                    {loading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                      </div>
                    ) : filteredDocuments.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredDocuments.map((doc) => (
                          <div key={doc._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-violet-300">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                  <FileText className="w-6 h-6 text-red-600" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-2">{doc.name}</h3>
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                </div>
                                <button
                                  onClick={() => handleDownload(doc._id, doc.name)}
                                  className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-800 font-medium"
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No documents available</h3>
                        <p className="text-gray-600">
                          There are currently no documents in the {selectedSection.name} section.
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
    </div>
  );
};

export default Investors;