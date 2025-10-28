import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import {
  Plus, Edit, Trash2, X, Search, Package, DollarSign, BarChart3, Tag, Image, FileText, Upload, ChevronDown, ChevronUp, Star
} from "lucide-react";
import { motion } from "framer-motion";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ManageProducts = () => {
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
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
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
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          <p className="text-gray-400 text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
      </div>

      <div className="container mx-auto pt-20 pb-12 px-4 relative z-10">
        {/* Header */}
        <motion.div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4" initial="hidden" animate="visible" variants={fadeInUp}>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">Manage Products</h1>
            <p className="text-sm text-gray-400">Manage your product catalog and inventory</p>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-sm text-white hover:shadow-lg hover:scale-105 transition-all"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </motion.div>

        {/* Stats Overview */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" initial="hidden" animate="visible" variants={fadeInUp}>
          {[
            { label: "Total Products", value: products.length, icon: Package, color: "purple-400" },
            { label: "In Stock", value: products.filter((p) => p.stock > 0).length, icon: BarChart3, color: "green-400" },
            { label: "Featured", value: products.filter((p) => p.featured).length, icon: Star, color: "yellow-400" },
            { label: "Categories", value: [...new Set(products.map((p) => p.category))].length, icon: Tag, color: "blue-400" }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className={`text-xl font-semibold text-${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`p-2 bg-${stat.color}/20 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 mb-6" initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:border-purple-400 focus:ring-0"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white focus:border-purple-400 focus:ring-0"
            >
              <option value="all">All Categories</option>
              <option value="Telecommunication">Telecommunication</option>
              <option value="Defence">Defence</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={priceFilter.min}
                onChange={(e) => setPriceFilter((prev) => ({ ...prev, min: e.target.value }))}
                className="w-1/2 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:border-purple-400 focus:ring-0"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={priceFilter.max}
                onChange={(e) => setPriceFilter((prev) => ({ ...prev, max: e.target.value }))}
                className="w-1/2 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:border-purple-400 focus:ring-0"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white focus:border-purple-400 focus:ring-0"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <button
                onClick={clearFilters}
                className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-800"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <motion.div
              key={product._id}
              className="bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-purple-400/30 transition-all duration-300"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {/* Product Image */}
              <div className="relative">
                {product.images?.[0]?.url ? (
                  <img src={product.images[0].url} alt={product.title} className="w-full h-40 object-cover rounded-t-lg" />
                ) : (
                  <div className="w-full h-40 bg-gray-900/50 rounded-t-lg flex items-center justify-center">
                    <Package className="w-10 h-10 text-gray-500" />
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </div>
                )}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(product.category)}`}>
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white text-base line-clamp-1">{product.title}</h3>
                  <div className="flex items-center gap-1 text-green-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-sm">{product.price}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div
                  className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    product.stock > 10
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : product.stock > 0
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  <Package className="w-3 h-3" />
                  {product.stock} in stock
                </div>

                {/* Specifications Preview */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="mt-3">
                    <button
                      onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
                      className="flex items-center gap-1 text-gray-400 hover:text-white text-sm"
                    >
                      {expandedProduct === product._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Specifications
                    </button>
                    {expandedProduct === product._id && (
                      <div className="mt-2 p-2 bg-gray-900/50 rounded border border-gray-700">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="text-gray-400">{key}:</span>
                            <span className="text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* PDFs Preview */}
                {product.pdfs?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-400 mb-1">Documents:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.pdfs.map((pdf, index) => (
                        <a key={index} href={pdf.url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
                          <FileText className="w-3 h-3" /> {pdf.name || `Document ${index + 1}`}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleFeatured(product._id, product.featured)}
                      className={`p-2 rounded hover:bg-opacity-30 ${product.featured ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"}`}
                      title={product.featured ? "Remove from Featured" : "Add to Featured"}
                    >
                      <Star className={`w-4 h-4 ${product.featured ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <motion.div className="text-center py-12" initial="hidden" animate="visible" variants={fadeInUp}>
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-400 mb-2">No products found</h3>
            <p className="text-sm text-gray-400 mb-4">
              {searchTerm || categoryFilter !== "all" || priceFilter.min || priceFilter.max
                ? "Try adjusting your search or filter criteria"
                : "Add your first product to get started."}
            </p>
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-sm text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </motion.div>
        )}

        {/* Add/Edit Modal */}
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-gray-800/80 rounded-lg p-6 w-full max-w-2xl border border-gray-700/50 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">{isEditing ? "Edit Product" : "Add Product"}</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-300">Product Title *</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter product title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white placeholder-gray-400 focus:border-purple-400 focus:ring-0"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-300">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white focus:border-purple-400 focus:ring-0"
                      required
                    >
                      <option value="Telecommunication">Telecommunication</option>
                      <option value="Defence">Defence</option>
                      <option value="Manufacturing">Manufacturing</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300">Description *</label>
                  <textarea
                    name="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white placeholder-gray-400 focus:border-purple-400 focus:ring-0"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-300">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white placeholder-gray-400 focus:border-purple-400 focus:ring-0"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-300">Stock Quantity *</label>
                    <input
                      type="number"
                      name="stock"
                      placeholder="Enter stock quantity"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white placeholder-gray-400 focus:border-purple-400 focus:ring-0"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300 flex items-center gap-1">
                    <FileText className="w-4 h-4" /> Specifications (JSON)
                  </label>
                  <textarea
                    name="specifications"
                    placeholder='{"weight": "2kg", "dimensions": "10x5x3cm", "material": "Plastic"}'
                    value={formData.specifications}
                    onChange={handleSpecChange}
                    rows="4"
                    className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white placeholder-gray-400 focus:border-purple-400 focus:ring-0 font-mono"
                  />
                  <p className="text-xs text-gray-400">Enter specifications as JSON key-value pairs</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300 flex items-center gap-1">
                    <Image className="w-4 h-4" /> Images
                  </label>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white"
                  />
                  {formData.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">{renderImagePreviews()}</div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300 flex items-center gap-1">
                    <FileText className="w-4 h-4" /> PDFs
                  </label>
                  <input
                    type="file"
                    name="pdfs"
                    accept=".pdf"
                    multiple
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white"
                  />
                  {formData.pdfs.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">{renderPdfPreviews()}</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-400 bg-gray-900/50 border-gray-700 rounded focus:ring-purple-400"
                  />
                  <label className="text-xs font-medium text-gray-300">Feature this product</label>
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="px-3 py-2 bg-gray-900/50 border border-gray-700 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-sm text-white hover:shadow-lg"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
        )}
      </div>
    </div>
  );
};

export default ManageProducts;