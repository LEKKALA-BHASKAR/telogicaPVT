import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { Upload, Trash2, Download, FileText, Calendar, Plus, Edit, Save, X } from 'lucide-react';

const ManageInvestorDocs = () => {
  const [documents, setDocuments] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [newSectionName, setNewSectionName] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [sectionForm, setSectionForm] = useState({ name: '', category: '' });

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchSections();
    fetchDocuments();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/sections`);
      setSections(res.data.data);
      if (res.data.data.length > 0 && !selectedSection) {
        setSelectedSection(res.data.data[0]);
      }
    } catch (error) {
      toast.error('Failed to load sections');
      // Fallback to default sections if API fails
      const defaultSections = [
        { _id: '1', name: 'Annual Reports', category: 'annual_report' },
        { _id: '2', name: 'Financial Statements', category: 'financial_statement' },
        { _id: '3', name: 'Corporate Governance', category: 'corporate_governance' },
        { _id: '4', name: 'Investor Presentations', category: 'investor_presentation' },
        { _id: '5', name: 'Regulatory Filings', category: 'regulatory_filing' }
      ];
      setSections(defaultSections);
      if (defaultSections.length > 0 && !selectedSection) {
        setSelectedSection(defaultSections[0]);
      }
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/upload`);
      setDocuments(res.data.data);
    } catch (error) {
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      // Try different approaches to download the file
      console.log('Attempting to download file:', url);
      
      // Method 1: Direct fetch with credentials
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Check if blob is valid
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }
      
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      console.log('Download successful');
    } catch (error) {
      console.error('Download failed:', error);
      
      // Method 2: Try with different approach
      try {
        // Create a link that opens in a new tab as fallback
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError);
        toast.error('Download failed. The file may be corrupted or unavailable.');
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedSection) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', selectedSection.category);

    try {
      console.log('Uploading file:', file.name, 'to category:', selectedSection.category);
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload response:', response.data);
      toast.success('Document uploaded successfully');
      fetchDocuments();
    } catch (error) {
      console.error('Upload error details:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload document';
      toast.error(`Upload failed: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/upload/${id}`);
      toast.success('Document deleted');
      fetchDocuments();
    } catch (error) {
      toast.error('Failed to delete document');
    }
  };

  const startEditingSection = (section) => {
    setEditingSection(section._id);
    setNewSectionName(section.name);
    setSectionForm({ name: section.name });
  };

  const saveSection = async (id) => {
    if (sectionForm.name.trim() === '') {
      toast.error('Section name cannot be empty');
      return;
    }

    try {
      // Only send the name field, category will be generated on the backend
      await axios.put(`${API_URL}/api/admin/sections/${id}`, {
        name: sectionForm.name
      });
      toast.success('Section updated');
      fetchSections();
      setEditingSection(null);
      setSectionForm({ name: '', category: '' });
    } catch (error) {
      toast.error('Failed to update section');
    }
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setNewSectionName('');
    setSectionForm({ name: '', category: '' });
  };

  const addNewSection = async () => {
    if (sectionForm.name.trim() === '') {
      toast.error('Section name cannot be empty');
      return;
    }

    try {
      // Only send the name field, category will be generated on the backend
      await axios.post(`${API_URL}/api/admin/sections`, {
        name: sectionForm.name
      });
      toast.success('New section added');
      fetchSections();
      setSectionForm({ name: '', category: '' });
      setShowAddSection(false);
    } catch (error) {
      toast.error('Failed to add section');
    }
  };

  const deleteSection = async (id) => {
    if (sections.length <= 1) {
      toast.error('You must have at least one section');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this section? All documents in this section will remain but will not be categorized.')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/admin/sections/${id}`);
      toast.success('Section deleted');
      fetchSections();
    } catch (error) {
      toast.error('Failed to delete section');
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.category === selectedSection?.category
  );

  if (sections.length === 0 && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-gray-900">Manage Investor Reports</h1>
          <label className="bg-gradient-to-r from-violet-600 to-orange-500 text-white px-6 py-3 rounded-lg cursor-pointer flex items-center font-medium shadow-lg hover:shadow-xl transition-shadow">
            <Upload className="mr-2 w-5 h-5" />
            Upload Document
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx"
              disabled={uploading || !selectedSection}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Management */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-violet-600 to-orange-500 p-6">
                <h2 className="text-xl font-bold text-white">Report Categories</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {sections.map((section) => (
                    <div key={section._id} className="group">
                      {editingSection === section._id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={sectionForm.name}
                            onChange={(e) => setSectionForm({...sectionForm, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Section name"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveSection(section._id)}
                              className="flex-1 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="flex-1 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <button
                            className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedSection?._id === section._id
                                ? 'bg-violet-50 text-violet-700 font-semibold border border-violet-200'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => setSelectedSection(section)}
                          >
                            {section.name}
                          </button>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex">
                            <button
                              onClick={() => startEditingSection(section)}
                              className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg ml-1"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteSection(section._id)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg ml-1"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {showAddSection ? (
                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        value={sectionForm.name}
                        onChange={(e) => setSectionForm({...sectionForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Section name"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addNewSection}
                          className="flex-1 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowAddSection(false);
                            setSectionForm({ name: '', category: '' });
                          }}
                          className="flex-1 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddSection(true)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Category
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {selectedSection ? (
                <>
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedSection.name}</h2>
                        <p className="text-gray-600">
                          {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} available
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Category: {selectedSection.category}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-violet-600 to-orange-500 text-white">
                        <tr>
                          <th className="px-6 py-4 text-left">Document</th>
                          <th className="px-6 py-4 text-left">Upload Date</th>
                          <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="3" className="px-6 py-12 text-center">
                              <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
                              </div>
                            </td>
                          </tr>
                        ) : filteredDocuments.length > 0 ? (
                          filteredDocuments.map((doc) => (
                            <tr key={doc._id} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                  <FileText className="w-8 h-8 text-red-500" />
                                  <div>
                                    <div className="font-semibold">{doc.name}</div>
                                    <div className="text-sm text-gray-500">{(doc.url.length / 1024).toFixed(2)} KB</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {new Date(doc.createdAt).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleDownload(doc.url, doc.name)}
                                    className="p-2 bg-violet-100 text-violet-600 rounded-lg hover:bg-violet-200 transition-colors"
                                    title="Download"
                                  >
                                    <Download className="w-4 h-4" />
                                  </button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-600 text-red-600 hover:bg-red-50"
                                    onClick={() => deleteDocument(doc._id)}
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                              No documents found in this category. Upload documents to get started.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-500">Please select a category or create a new one</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInvestorDocs;