import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { 
  Upload, Trash2, FileText, Calendar, Plus, Edit, Save, X, 
  FolderOpen, Search, Filter, HardDrive, Pencil, Cloud, 
  ChevronRight, Download, ExternalLink, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import { useTheme } from '../../context/ThemeContext';

const ManageInvestorDocs = () => {
  const { isDarkMode } = useTheme();
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
  const [showUploadModal, setShowUploadModal] = useState(false);
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
      // Fallback data for demo/dev if API fails
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

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!fileUploadForm.title || !fileUploadForm.file || !selectedSection) {
      toast.error('Please provide a title and select a file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    
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
    formData.append('title', fileUploadForm.title);

    try {
      await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Document uploaded successfully');
      setFileUploadForm({ title: '', file: null });
      setShowUploadModal(false);
      fetchDocuments();
    } catch (error) {
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
      await axios.post(`${API_URL}/api/upload/external-link`, {
        name: docForm.name,
        url: docForm.url,
        category: selectedSection.category,
        linkType: linkType
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
      await axios.put(`${API_URL}/api/upload/${id}`, { name: editForm.name });
      toast.success('Document updated');
      fetchDocuments();
      setEditingDocument(null);
      setEditForm({ name: '' });
    } catch (error) {
      toast.error('Failed to update document');
    }
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
      await axios.put(`${API_URL}/api/admin/sections/${id}`, { name: sectionForm.name });
      toast.success('Section updated');
      fetchSections();
      setEditingSection(null);
      setSectionForm({ name: '', category: '' });
    } catch (error) {
      toast.error('Failed to update section');
    }
  };

  const addNewSection = async () => {
    if (sectionForm.name.trim() === '') {
      toast.error('Section name cannot be empty');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/admin/sections`, { name: sectionForm.name });
      toast.success('New section added');
      fetchSections();
      setSectionForm({ name: '', category: '' });
      setShowAddSection(false);
    } catch (error) {
      toast.error('Failed to add section');
    }
  };

  const deleteSection = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;

    try {
      await axios.delete(`${API_URL}/api/admin/sections/${id}`);
      toast.success('Section deleted');
      fetchSections();
      if (selectedSection?._id === id) setSelectedSection(null);
    } catch (error) {
      toast.error('Failed to delete section');
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.category === selectedSection?.category &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Investor Documents" subtitle="Manage reports, filings, and presentations">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        
        {/* Sidebar - Categories */}
        <div className="xl:col-span-1 flex flex-col gap-4 h-full">
          <div className={`flex-1 rounded-2xl border backdrop-blur-xl overflow-hidden flex flex-col ${
            isDarkMode 
              ? 'bg-gray-900/60 border-gray-800' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="p-4 border-b border-gray-800/50 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
              <div className="flex items-center justify-between">
                <h2 className={`font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <FolderOpen className="w-5 h-5 text-purple-500" />
                  Categories
                </h2>
                <button
                  onClick={() => setShowAddSection(true)}
                  className="p-2 rounded-lg bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
              <AnimatePresence>
                {showAddSection && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 rounded-xl border mb-2 ${
                      isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <input
                      type="text"
                      value={sectionForm.name}
                      onChange={(e) => setSectionForm({...sectionForm, name: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg text-sm mb-2 outline-none border ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-700 text-white focus:border-purple-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                      }`}
                      placeholder="Category Name"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addNewSection}
                        className="flex-1 py-1.5 text-xs bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowAddSection(false);
                          setSectionForm({ name: '', category: '' });
                        }}
                        className={`flex-1 py-1.5 text-xs rounded-lg ${
                          isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {sections.map((section) => (
                  <motion.div
                    key={section._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {editingSection === section._id ? (
                      <div className={`p-3 rounded-xl border ${
                        isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <input
                          type="text"
                          value={sectionForm.name}
                          onChange={(e) => setSectionForm({...sectionForm, name: e.target.value})}
                          className={`w-full px-3 py-2 rounded-lg text-sm mb-2 outline-none border ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-700 text-white focus:border-purple-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                          }`}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveSection(section._id)}
                            className="flex-1 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingSection(null);
                              setSectionForm({ name: '', category: '' });
                            }}
                            className={`flex-1 py-1.5 text-xs rounded-lg ${
                              isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setSelectedSection(section)}
                        className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                          selectedSection?._id === section._id
                            ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20'
                            : isDarkMode
                              ? 'bg-gray-800/30 text-gray-400 border-transparent hover:bg-gray-800 hover:text-white'
                              : 'bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FolderOpen className={`w-4 h-4 flex-shrink-0 ${
                            selectedSection?._id === section._id ? 'text-white' : 'text-gray-500'
                          }`} />
                          <span className="truncate font-medium text-sm">{section.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedSection?._id === section._id
                              ? 'bg-white/20 text-white'
                              : isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {section.documentCount || 0}
                          </span>
                          <div className={`flex opacity-0 group-hover:opacity-100 transition-opacity ${
                            selectedSection?._id === section._id ? 'text-white' : 'text-gray-500'
                          }`}>
                            <button
                              onClick={(e) => { e.stopPropagation(); startEditingSection(section); }}
                              className="p-1.5 hover:bg-white/20 rounded-lg"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteSection(section._id); }}
                              className="p-1.5 hover:bg-red-500/20 hover:text-red-500 rounded-lg"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main Content - Documents */}
        <div className="xl:col-span-3 flex flex-col h-full overflow-hidden">
          <div className={`flex-1 rounded-2xl border backdrop-blur-xl overflow-hidden flex flex-col ${
            isDarkMode 
              ? 'bg-gray-900/60 border-gray-800' 
              : 'bg-white/80 border-gray-200'
          }`}>
            {selectedSection ? (
              <>
                {/* Header */}
                <div className={`p-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedSection.name}
                      </h2>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                      <div className="relative flex-1 lg:flex-none">
                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className={`pl-9 pr-4 py-2 rounded-xl text-sm w-full lg:w-64 outline-none border ${
                            isDarkMode 
                              ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                          }`}
                        />
                      </div>
                      
                      <button 
                        onClick={() => {
                          setFileUploadForm({ title: '', file: null });
                          setShowUploadModal(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors text-sm font-medium shadow-lg shadow-purple-500/20"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                      
                      <button 
                        onClick={() => {
                          setShowAddDocForm(true);
                          setLinkType('cloudinary');
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors text-sm font-medium ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Link
                      </button>
                    </div>
                  </div>
                </div>

                {/* Documents List */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    </div>
                  ) : filteredDocuments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence>
                        {filteredDocuments.map((doc) => (
                          <motion.div
                            key={doc._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-xl ${
                              isDarkMode 
                                ? 'bg-gray-800/40 border-gray-700 hover:border-purple-500/50 hover:bg-gray-800/60' 
                                : 'bg-white border-gray-200 hover:border-purple-500/50 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className={`p-2.5 rounded-lg ${
                                doc.type?.includes('pdf') 
                                  ? 'bg-red-500/10 text-red-500' 
                                  : 'bg-blue-500/10 text-blue-500'
                              }`}>
                                <FileText className="w-6 h-6" />
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => startEditingDocument(doc)}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                                  }`}
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteDocument(doc._id)}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    isDarkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-100 text-red-500'
                                  }`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {editingDocument === doc._id ? (
                              <div className="space-y-2 mb-2">
                                <input
                                  type="text"
                                  value={editForm.name}
                                  onChange={(e) => setEditForm({ name: e.target.value })}
                                  className={`w-full px-2 py-1 rounded text-sm border ${
                                    isDarkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300'
                                  }`}
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <button onClick={() => saveDocumentEdit(doc._id)} className="text-xs bg-green-600 text-white px-2 py-1 rounded">Save</button>
                                  <button onClick={() => setEditingDocument(null)} className="text-xs bg-gray-600 text-white px-2 py-1 rounded">Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <h3 className={`font-semibold mb-1 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {doc.name}
                              </h3>
                            )}

                            <div className={`flex items-center gap-2 text-xs mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              <Calendar className="w-3 h-3" />
                              {new Date(doc.createdAt).toLocaleDateString()}
                              {doc.isExternalLink && (
                                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                                  doc.linkType === 'cloudinary' 
                                    ? 'bg-blue-500/10 text-blue-500' 
                                    : 'bg-green-500/10 text-green-500'
                                }`}>
                                  {doc.linkType === 'cloudinary' ? 'Cloud' : 'Drive'}
                                </span>
                              )}
                            </div>

                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                                isDarkMode 
                                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                              }`}
                            >
                              {doc.isExternalLink ? <ExternalLink className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                              {doc.isExternalLink ? 'Open Link' : 'Download'}
                            </a>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                      <FileText className="w-16 h-16 mb-4" />
                      <h3 className="text-lg font-medium">No documents found</h3>
                      <p className="text-sm">Upload a document or add a link to get started.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                <FolderOpen className="w-20 h-20 mb-6 text-purple-500/50" />
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Select a Category
                </h3>
                <p className={`max-w-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Choose a category from the sidebar to view and manage documents.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden ${
                isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Upload Document
                  </h3>
                  <button onClick={() => setShowUploadModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Document Title
                    </label>
                    <input
                      type="text"
                      value={fileUploadForm.title}
                      onChange={(e) => setFileUploadForm({...fileUploadForm, title: e.target.value})}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                      placeholder="Enter title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      File
                    </label>
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      isDarkMode 
                        ? 'border-gray-700 hover:border-purple-500/50 bg-gray-800/50' 
                        : 'border-gray-300 hover:border-purple-500/50 bg-gray-50'
                    }`}>
                      <input
                        type="file"
                        id="file-upload"
                        onChange={(e) => setFileUploadForm({...fileUploadForm, file: e.target.files[0]})}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {fileUploadForm.file ? fileUploadForm.file.name : 'Click to upload file'}
                        </span>
                        <span className="text-xs text-gray-500">PDF, JPG, PNG supported</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Link Modal */}
      <AnimatePresence>
        {showAddDocForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden ${
                isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Add External Link
                  </h3>
                  <button onClick={() => setShowAddDocForm(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleAddDocument} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Link Type
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setLinkType('cloudinary')}
                        className={`flex-1 py-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                          linkType === 'cloudinary'
                            ? 'bg-blue-500/10 border-blue-500 text-blue-500'
                            : isDarkMode 
                              ? 'bg-gray-800 border-gray-700 text-gray-400' 
                              : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                      >
                        <Cloud className="w-4 h-4" />
                        Cloudinary
                      </button>
                      <button
                        type="button"
                        onClick={() => setLinkType('drive')}
                        className={`flex-1 py-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                          linkType === 'drive'
                            ? 'bg-green-500/10 border-green-500 text-green-500'
                            : isDarkMode 
                              ? 'bg-gray-800 border-gray-700 text-gray-400' 
                              : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                      >
                        <HardDrive className="w-4 h-4" />
                        Drive
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Document Title
                    </label>
                    <input
                      type="text"
                      value={docForm.name}
                      onChange={(e) => setDocForm({...docForm, name: e.target.value})}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                      placeholder="Enter title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      URL
                    </label>
                    <input
                      type="url"
                      value={docForm.url}
                      onChange={(e) => setDocForm({...docForm, url: e.target.value})}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                      placeholder="https://..."
                      required
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddDocForm(false)}
                      className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                    >
                      Add Link
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </AdminLayout>
  );
};

export default ManageInvestorDocs;
