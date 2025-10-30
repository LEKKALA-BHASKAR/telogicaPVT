import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { Upload, Trash2, FileText, Calendar, Plus, Edit, Save, X, FolderOpen, Search, Filter, MoreVertical, HardDrive, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackNavigation from '../../components/admin/BackNavigation';

const ManageInvestorDocs = () => {
  const [documents, setDocuments] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [sectionForm, setSectionForm] = useState({ name: '', category: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDocForm, setShowAddDocForm] = useState(false);
  const [docForm, setDocForm] = useState({ name: '', url: '', category: '' });
  const [linkType, setLinkType] = useState('cloudinary'); // 'cloudinary' or 'drive'
  const [fileUploadForm, setFileUploadForm] = useState({ title: '', file: null });
  const [editingDocument, setEditingDocument] = useState(null);
  const [editForm, setEditForm] = useState({ name: '' });
  const navigate = useNavigate();

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
      } else if (res.data.data.length === 0) {
        setSelectedSection(null);
      }
    } catch (error) {
      toast.error('Failed to load sections');
      const defaultSections = [
        { _id: '1', name: 'Annual Reports', category: 'annual_report', documentCount: 12 },
        { _id: '2', name: 'Financial Statements', category: 'financial_statement', documentCount: 8 },
        { _id: '3', name: 'Corporate Governance', category: 'corporate_governance', documentCount: 5 },
        { _id: '4', name: 'Investor Presentations', category: 'investor_presentation', documentCount: 15 },
        { _id: '5', name: 'Regulatory Filings', category: 'regulatory_filing', documentCount: 20 }
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

  const handleDownload = async (fileId, filename) => {
    try {
      console.log('Downloading file via proxy:', fileId);
      
      const response = await fetch(`${API_URL}/api/upload/download/${fileId}`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Download failed with status:', response.status, 'and body:', errorText);
        throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      console.log('Download successful');
      toast.success('Download started');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again.');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!fileUploadForm.title || !fileUploadForm.file || !selectedSection) {
      toast.error('Please provide a title and select a file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    
    // Determine the correct field name based on file type
    if (fileUploadForm.file.type.startsWith('image/')) {
      formData.append('images', fileUploadForm.file);
    } else if (fileUploadForm.file.type === 'application/pdf') {
      formData.append('pdfs', fileUploadForm.file);
    } else {
      toast.error('Invalid file type. Only images and PDFs are allowed.');
      setUploading(false);
      return;
    }
    
    formData.append('category', selectedSection.category);
    formData.append('title', fileUploadForm.title); // Add the title to the form data

    try {
      console.log('Uploading file:', fileUploadForm.file.name, 'to category:', selectedSection.category);
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload response:', response.data);
      toast.success('Document uploaded successfully');
      setFileUploadForm({ title: '', file: null });
      fetchDocuments();
    } catch (error) {
      console.error('Upload error details:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload document';
      toast.error(`Upload failed: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!docForm.name || !docForm.url || !selectedSection) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/upload/external-link`, {
        name: docForm.name,
        url: docForm.url,
        category: selectedSection.category,
        linkType: linkType // 'cloudinary' or 'drive'
      });
      
      toast.success('Document added successfully');
      fetchDocuments();
      setDocForm({ name: '', url: '', category: '' });
      setShowAddDocForm(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add document';
      toast.error(`Error: ${errorMessage}`);
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

  const startEditingDocument = (doc) => {
    setEditingDocument(doc._id);
    setEditForm({ name: doc.name });
  };

  const saveDocumentEdit = async (id) => {
    if (editForm.name.trim() === '') {
      toast.error('Document title cannot be empty');
      return;
    }

    try {
      await axios.put(`${API_URL}/api/upload/${id}`, {
        name: editForm.name
      });
      toast.success('Document updated');
      fetchDocuments();
      setEditingDocument(null);
      setEditForm({ name: '' });
    } catch (error) {
      toast.error('Failed to update document');
    }
  };

  const cancelEditingDocument = () => {
    setEditingDocument(null);
    setEditForm({ name: '' });
  };

  const startEditingSection = (section) => {
    setEditingSection(section._id);
    setSectionForm({ name: section.name });
  };

  const saveSection = async (id) => {
    if (sectionForm.name.trim() === '') {
      toast.error('Section name cannot be empty');
      return;
    }

    try {
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
    setSectionForm({ name: '', category: '' });
  };

  const addNewSection = async () => {
    if (sectionForm.name.trim() === '') {
      toast.error('Section name cannot be empty');
      return;
    }

    try {
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
    doc.category === selectedSection?.category &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          <p className="text-gray-400 text-lg">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto pt-24 pb-16 px-4 relative z-10">
        {/* Back Navigation */}
        <BackNavigation />

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Investor Documents
            </h1>
            <p className="text-gray-400 text-lg">Manage and organize your investor reports and documents</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* File Upload Button */}
            <button 
              onClick={() => {
                setFileUploadForm({ title: '', file: null });
                document.getElementById('file-upload-modal').classList.remove('hidden');
              }}
              className={`bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl flex items-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                !selectedSection ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!selectedSection}
            >
              <Upload className="mr-2 w-5 h-5" />
              Upload Document
            </button>
            
            <button 
              onClick={() => {
                setShowAddDocForm(true);
                setLinkType('cloudinary');
              }}
              className={`bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl flex items-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                !selectedSection ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!selectedSection}
            >
              <HardDrive className="mr-2 w-5 h-5" />
              Add External Link
            </button>
          </div>
        </div>

        {/* File Upload Modal */}
        <div id="file-upload-modal" className="hidden fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700/50 shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Upload Document</h3>
                <button 
                  onClick={() => {
                    document.getElementById('file-upload-modal').classList.add('hidden');
                    setFileUploadForm({ title: '', file: null });
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleFileUpload}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Document Title</label>
                    <input
                      type="text"
                      value={fileUploadForm.title}
                      onChange={(e) => setFileUploadForm({...fileUploadForm, title: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Enter document title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Select Document</label>
                    <input
                      type="file"
                      onChange={(e) => setFileUploadForm({...fileUploadForm, file: e.target.files[0]})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: PDF, JPG, JPEG, PNG
                    </p>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('file-upload-modal').classList.add('hidden');
                        setFileUploadForm({ title: '', file: null });
                      }}
                      className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                      disabled={uploading}
                    >
                      {uploading ? 'Uploading...' : 'Upload Document'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Add Document Form Modal */}
        {showAddDocForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-700/50 shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Add External Document</h3>
                  <button 
                    onClick={() => {
                      setShowAddDocForm(false);
                      setDocForm({ name: '', url: '', category: '' });
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleAddDocument}>
                  <div className="space-y-4">
                    {/* Link Type Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Link Type</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setLinkType('cloudinary')}
                          className={`flex-1 py-2 rounded-lg border transition-colors ${
                            linkType === 'cloudinary'
                              ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                              : 'bg-gray-800 border-gray-600 text-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Cloud className="w-4 h-4" />
                            Cloudinary
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLinkType('drive')}
                          className={`flex-1 py-2 rounded-lg border transition-colors ${
                            linkType === 'drive'
                              ? 'bg-green-500/20 border-green-500 text-green-400'
                              : 'bg-gray-800 border-gray-600 text-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <HardDrive className="w-4 h-4" />
                            Drive
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Document Title</label>
                      <input
                        type="text"
                        value={docForm.name}
                        onChange={(e) => setDocForm({...docForm, name: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Enter document title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {linkType === 'cloudinary' ? 'Cloudinary URL' : 'Drive URL'}
                      </label>
                      <input
                        type="url"
                        value={docForm.url}
                        onChange={(e) => setDocForm({...docForm, url: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                        placeholder={linkType === 'cloudinary' ? 'https://res.cloudinary.com/...' : 'https://drive.google.com/...'}
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {linkType === 'cloudinary' 
                          ? 'Make sure the file is set to public access in Cloudinary' 
                          : 'Ensure the Drive file has public sharing enabled'}
                      </p>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddDocForm(false);
                          setDocForm({ name: '', url: '', category: '' });
                        }}
                        className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Add Document
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="xl:col-span-1">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6">
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold text-white">Document Categories</h2>
                </div>
              </div>
              
              <div className="p-4">
                {sections.length > 0 ? (
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <div key={section._id} className="group relative">
                        {editingSection === section._id ? (
                          <div className="space-y-3 p-3 bg-gray-800/50 rounded-xl border border-purple-500/30">
                            <input
                              type="text"
                              value={sectionForm.name}
                              onChange={(e) => setSectionForm({...sectionForm, name: e.target.value})}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                              placeholder="Section name"
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => saveSection(section._id)}
                                className="flex-1 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              >
                                <Save className="w-4 h-4 inline mr-1" />
                                Save
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="flex-1 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                              >
                                <X className="w-4 h-4 inline mr-1" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center group">
                            <button
                              className={`flex-1 text-left p-3 rounded-xl transition-all duration-300 ${
                                selectedSection?._id === section._id
                                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg'
                                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white border border-transparent'
                              }`}
                              onClick={() => setSelectedSection(section)}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{section.name}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  selectedSection?._id === section._id
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-gray-700 text-gray-300'
                                }`}>
                                  {section.documentCount || 0}
                                </span>
                              </div>
                            </button>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex ml-2">
                              <button
                                onClick={() => startEditingSection(section)}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteSection(section._id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
                      <div className="space-y-3 pt-2 p-3 bg-gray-800/50 rounded-xl border border-purple-500/30">
                        <input
                          type="text"
                          value={sectionForm.name}
                          onChange={(e) => setSectionForm({...sectionForm, name: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="New category name"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={addNewSection}
                            className="flex-1 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </button>
                          <button
                            onClick={() => {
                              setShowAddSection(false);
                              setSectionForm({ name: '', category: '' });
                            }}
                            className="flex-1 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddSection(true)}
                        className="w-full flex items-center justify-center gap-2 p-3 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl border border-dashed border-gray-600 hover:border-purple-400 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4" />
                        Add New Category
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">No Categories</h3>
                    <p className="text-gray-500 text-sm mb-4">Add a new category to get started</p>
                    {showAddSection ? (
                      <div className="space-y-3 p-3 bg-gray-800/50 rounded-xl border border-purple-500/30">
                        <input
                          type="text"
                          value={sectionForm.name}
                          onChange={(e) => setSectionForm({...sectionForm, name: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="New category name"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={addNewSection}
                            className="flex-1 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </button>
                          <button
                            onClick={() => {
                              setShowAddSection(false);
                              setSectionForm({ name: '', category: '' });
                            }}
                            className="flex-1 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddSection(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Category
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content - Documents */}
          <div className="xl:col-span-3">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
              {selectedSection ? (
                <>
                  {/* Header */}
                  <div className="p-6 border-b border-gray-700/50">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedSection.name}</h2>
                        <p className="text-gray-400">
                          {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} available
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        {/* Search */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Search documents..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 w-full sm:w-64"
                          />
                        </div>
                        
                        {/* Filter Button */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-700 transition-colors">
                          <Filter className="w-4 h-4" />
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Documents List */}
                  <div className="p-6">
                    {loading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                      </div>
                    ) : filteredDocuments.length > 0 ? (
                      <div className="grid gap-4">
                        {filteredDocuments.map((doc) => (
                          <div 
                            key={doc._id} 
                            className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group"
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className="p-3 bg-red-500/20 rounded-xl">
                                <FileText className="w-6 h-6 text-red-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                {editingDocument === doc._id ? (
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      value={editForm.name}
                                      onChange={(e) => setEditForm({ name: e.target.value })}
                                      className="w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                                      placeholder="Document title"
                                      autoFocus
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => saveDocumentEdit(doc._id)}
                                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={cancelEditingDocument}
                                        className="px-3 py-1 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <h3 className="font-semibold text-white truncate">{doc.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                      <span>{(doc.size / 1024).toFixed(1)} KB</span>
                                      <span>•</span>
                                      <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(doc.createdAt).toLocaleDateString()}
                                      </div>
                                      {doc.isExternalLink && (
                                        <span className={`px-2 py-1 rounded text-xs ${
                                          doc.linkType === 'cloudinary' 
                                            ? 'bg-blue-500/20 text-blue-400' 
                                            : 'bg-green-500/20 text-green-400'
                                        }`}>
                                          {doc.linkType === 'cloudinary' ? 'Cloudinary' : 'Drive'}
                                        </span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {editingDocument !== doc._id && (
                                <button
                                  onClick={() => startEditingDocument(doc)}
                                  className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteDocument(doc._id)}
                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <FileText className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No documents found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          {searchTerm ? 'No documents match your search. Try different keywords.' : 'Upload documents to get started with your investor documentation.'}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="p-16 text-center">
                  <FolderOpen className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a Category</h3>
                  <p className="text-gray-500">Choose a category from the sidebar to view documents</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Cloud icon component since it's not imported
const Cloud = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
  </svg>
);

export default ManageInvestorDocs;