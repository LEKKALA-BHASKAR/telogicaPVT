import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import {
  Plus, Edit, Trash2, X, Search, Package, DollarSign, BarChart3, Tag, Image, FileText, Upload, ChevronDown, ChevronUp, Star, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { useTheme } from "../../context/ThemeContext";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ManageProducts = () => {
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [sortOption, setSortOption] = useState("newest");
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Telecommunication",
    price: "",
    stock: "",
    specifications: "",
    featured: false,
    images: [], // Array of File objects for upload
    pdfs: []    // Array of File objects for upload
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Fetch products with filters
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (categoryFilter !== "all") params.append("category", categoryFilter);
      if (priceFilter.min) params.append("minPrice", priceFilter.min);
      if (priceFilter.max) params.append("maxPrice", priceFilter.max);
      if (sortOption) params.append("sort", sortOption);

      const res = await axios.get(`${API_URL}/api/products?${params}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } // Add auth if required
      });
      setProducts(res.data.data);
    } catch (err) {
      toast.error("Failed to load products");
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, categoryFilter, priceFilter, sortOption]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (files) {
      setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle specification change
  const handleSpecChange = (e) => {
    setFormData((prev) => ({ ...prev, specifications: e.target.value }));
  };

  // File upload handler (assumes backend endpoint /api/upload)
  const uploadFiles = async (files, type) => {
    const formData = new FormData();
    files.forEach((file) => formData.append(type, file));
    
    try {
      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}` // Add auth if required
        }
      });
      return res.data.files.map((file) => ({
        url: file.url,
        publicId: file.publicId
      }));
    } catch (err) {
      throw new Error(`Failed to upload ${type}: ${err.message}`);
    }
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let specifications = {};
      if (formData.specifications) {
        try {
          specifications = JSON.parse(formData.specifications);
        } catch {
          toast.error("Invalid JSON format for specifications");
          return;
        }
      }

      // Upload images and PDFs
      const uploadedImages = formData.images.length > 0 ? await uploadFiles(formData.images, "images") : [];
      const uploadedPdfs = formData.pdfs.length > 0 ? await uploadFiles(formData.pdfs, "pdfs") : [];

      const productData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        specifications,
        featured: formData.featured,
        images: uploadedImages,
        pdfs: uploadedPdfs
      };

      if (isEditing) {
        await axios.put(`${API_URL}/api/products/${editId}`, productData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        toast.success("Product updated successfully!");
      } else {
        await axios.post(`${API_URL}/api/products`, productData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        toast.success("Product created successfully!");
      }

      setShowForm(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
      console.error("Submit error:", error);
    } finally {
      setUploading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Telecommunication",
      price: "",
      stock: "",
      specifications: "",
      featured: false,
      images: [],
      pdfs: []
    });
    setIsEditing(false);
    setEditId(null);
  };

  // Edit product
  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const product = res.data.data;
      
      // Handle specifications properly - check if it's already an object or needs conversion
      let specsString = "";
      if (product.specifications) {
        try {
          // If specifications is already an object, stringify it
          if (typeof product.specifications === 'object') {
            specsString = JSON.stringify(product.specifications, null, 2);
          } else {
            // If it's a string, try to parse it first to validate it's valid JSON
            const parsedSpecs = JSON.parse(product.specifications);
            specsString = JSON.stringify(parsedSpecs, null, 2);
          }
        } catch (e) {
          console.error("Error parsing specifications:", e);
          specsString = "{}"; // Default to empty object if parsing fails
        }
      }
      
      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
        specifications: specsString,
        featured: product.featured || false,
        images: [], // Files need to be re-uploaded
        pdfs: []    // Files need to be re-uploaded
      });
      setEditId(id);
      setIsEditing(true);
      setShowForm(true);
    } catch (err) {
      toast.error("Failed to load product details");
      console.error("Edit fetch error:", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  // Toggle featured status
  const toggleFeatured = async (id, currentStatus) => {
    try {
      await axios.put(
        `${API_URL}/api/products/${id}`,
        { featured: !currentStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success(`Product ${!currentStatus ? "added to" : "removed from"} featured`);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update featured status");
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case "Telecommunication": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Defence": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Manufacturing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setPriceFilter({ min: "", max: "" });
    setSortOption("newest");
  };

  // File preview for images
  const renderImagePreviews = () => {
    return formData.images.map((file, index) => (
      <div key={index} className="relative">
        <img
          src={URL.createObjectURL(file)}
          alt={`Preview ${index}`}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <button
          onClick={() => setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
          }))}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    ));
  };

  // File preview for PDFs
  const renderPdfPreviews = () => {
    return formData.pdfs.map((file, index) => (
      <div key={index} className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-300">{file.name}</span>
        <button
          onClick={() => setFormData((prev) => ({
            ...prev,
            pdfs: prev.pdfs.filter((_, i) => i !== index)
          }))}
          className="bg-red-500 text-white rounded-full p-1"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    ));
  };

  if (loading && products.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Manage Products"
      subtitle="Manage your product catalog and inventory"
      actions={
        <Button
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105 transition-all"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      }
    >
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={fadeInUp}
        className="space-y-6"
      >
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Products", value: products.length, icon: Package, color: "purple" },
            { label: "In Stock", value: products.filter((p) => p.stock > 0).length, icon: BarChart3, color: "green" },
            { label: "Featured", value: products.filter((p) => p.featured).length, icon: Star, color: "yellow" },
            { label: "Categories", value: [...new Set(products.map((p) => p.category))].length, icon: Tag, color: "blue" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-2xl border backdrop-blur-xl ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    stat.color === 'purple' ? 'text-purple-500' :
                    stat.color === 'green' ? 'text-green-500' :
                    stat.color === 'yellow' ? 'text-yellow-500' : 'text-blue-500'
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${
                  stat.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                  stat.color === 'green' ? 'bg-green-500/10 text-green-500' :
                  stat.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className={`p-4 rounded-2xl border backdrop-blur-xl ${
          isDarkMode 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-black/20 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDarkMode 
                  ? 'bg-black/20 border-white/10 text-white' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            >
              <option value="all">All Categories</option>
              <option value="Telecommunication">Telecommunication</option>
              <option value="Defence">Defence</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceFilter.min}
                onChange={(e) => setPriceFilter((prev) => ({ ...prev, min: e.target.value }))}
                className={`w-1/2 px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-black/20 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
              <input
                type="number"
                placeholder="Max"
                value={priceFilter.max}
                onChange={(e) => setPriceFilter((prev) => ({ ...prev, max: e.target.value }))}
                className={`w-1/2 px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-black/20 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={`flex-1 px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-black/20 border-white/10 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <button
                onClick={clearFilters}
                className={`px-3 py-2 rounded-xl border text-sm transition-colors ${
                  isDarkMode 
                    ? 'bg-black/20 border-white/10 text-gray-400 hover:text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`group rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-purple-500/30' 
                  : 'bg-white border-gray-200 hover:border-purple-200'
              }`}
            >
              {/* Product Image */}
              <div className={`relative h-64 p-6 flex items-center justify-center ${
                isDarkMode ? 'bg-black/40' : 'bg-gray-50'
              }`}>
                {product.images?.[0]?.url ? (
                  <img 
                    src={product.images[0].url} 
                    alt={product.title} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <Package className={`w-16 h-16 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-white shadow-lg shadow-yellow-500/20 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </span>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="p-3 rounded-xl bg-white text-gray-900 hover:bg-blue-50 transition-colors shadow-lg"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleFeatured(product._id, product.featured)}
                    className={`p-3 rounded-xl transition-colors shadow-lg ${
                      product.featured 
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                        : 'bg-white text-gray-900 hover:bg-yellow-50'
                    }`}
                    title={product.featured ? "Remove Featured" : "Add Featured"}
                  >
                    <Star className={`w-5 h-5 ${product.featured ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
                  <span className="font-bold text-lg text-green-500">₹{product.price}</span>
                </div>
                
                <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                    product.stock > 10
                      ? "bg-green-500/10 text-green-500"
                      : product.stock > 0
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-red-500/10 text-red-500"
                  }`}>
                    <Package className="w-3 h-3" />
                    {product.stock} in stock
                  </div>

                  {product.pdfs?.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-purple-500 font-medium">
                      <FileText className="w-3 h-3" />
                      {product.pdfs.length} Docs
                    </div>
                  )}
                </div>

                {/* Specifications Toggle */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200/10">
                    <button
                      onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
                      className={`flex items-center gap-1 text-xs font-medium hover:underline ${
                        isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {expandedProduct === product._id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      View Specifications
                    </button>
                    
                    <AnimatePresence>
                      {expandedProduct === product._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className={`mt-2 p-3 rounded-xl text-xs space-y-1 overflow-hidden ${
                            isDarkMode ? 'bg-white/5' : 'bg-gray-50'
                          }`}
                        >
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-white/5' : 'bg-gray-100'
            }`}>
              <Package className={`w-10 h-10 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {searchTerm || categoryFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Add your first product to get started."}
            </p>
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </div>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl ${
                  isDarkMode ? 'bg-gray-900 border border-white/10' : 'bg-white'
                }`}
              >
                <div className={`p-6 border-b sticky top-0 z-10 flex justify-between items-center ${
                  isDarkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-100'
                }`}>
                  <h2 className="text-xl font-bold">{isEditing ? "Edit Product" : "Add New Product"}</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Product Title *</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Enter product title"
                          value={formData.title}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            isDarkMode 
                              ? 'bg-black/20 border-white/10 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category *</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            isDarkMode 
                              ? 'bg-black/20 border-white/10 text-white' 
                              : 'bg-gray-50 border-gray-200 text-gray-900'
                          }`}
                          required
                        >
                          <option value="Telecommunication">Telecommunication</option>
                          <option value="Defence">Defence</option>
                          <option value="Manufacturing">Manufacturing</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description *</label>
                      <textarea
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          isDarkMode 
                            ? 'bg-black/20 border-white/10 text-white placeholder-gray-500' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        }`}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Price (₹) *</label>
                        <input
                          type="number"
                          name="price"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            isDarkMode 
                              ? 'bg-black/20 border-white/10 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Stock Quantity *</label>
                        <input
                          type="number"
                          name="stock"
                          placeholder="0"
                          value={formData.stock}
                          onChange={handleChange}
                          min="0"
                          className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            isDarkMode 
                              ? 'bg-black/20 border-white/10 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Specifications (JSON)
                      </label>
                      <textarea
                        name="specifications"
                        placeholder='{"weight": "2kg", "dimensions": "10x5x3cm"}'
                        value={formData.specifications}
                        onChange={handleSpecChange}
                        rows="4"
                        className={`w-full p-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          isDarkMode 
                            ? 'bg-black/20 border-white/10 text-white placeholder-gray-500' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        }`}
                      />
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Enter specifications as JSON key-value pairs
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Image className="w-4 h-4" /> Product Images
                      </label>
                      <div className={`p-4 rounded-xl border border-dashed text-center ${
                        isDarkMode ? 'border-white/20 bg-black/20' : 'border-gray-300 bg-gray-50'
                      }`}>
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          multiple
                          onChange={handleChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer block">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-blue-500 font-medium">Click to upload images</span>
                        </label>
                      </div>
                      {formData.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {renderImagePreviews()}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" /> PDF Documents
                      </label>
                      <input
                        type="file"
                        name="pdfs"
                        accept=".pdf"
                        multiple
                        onChange={handleChange}
                        className={`w-full p-2 rounded-xl border text-sm ${
                          isDarkMode 
                            ? 'bg-black/20 border-white/10 text-gray-400' 
                            : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                      />
                      {formData.pdfs.length > 0 && (
                        <div className="flex flex-col gap-2 mt-2">
                          {renderPdfPreviews()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl border bg-opacity-50 ${
                      isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                    }">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        id="featured-check"
                      />
                      <label htmlFor="featured-check" className="text-sm font-medium cursor-pointer">
                        Feature this product on homepage
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200/10">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                        className={isDarkMode ? 'border-white/10 hover:bg-white/5' : ''}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        disabled={uploading}
                      >
                        {uploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : isEditing ? (
                          "Update Product"
                        ) : (
                          "Create Product"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

export default ManageProducts;