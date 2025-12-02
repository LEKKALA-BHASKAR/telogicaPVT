import React, { createContext, useState, useContext, useEffect } from 'react';

const QuotationContext = createContext();

export const useQuotation = () => {
  const context = useContext(QuotationContext);
  if (!context) {
    throw new Error('useQuotation must be used within QuotationProvider');
  }
  return context;
};

export const QuotationProvider = ({ children }) => {
  const [quotationItems, setQuotationItems] = useState([]);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);

  // Load quotation items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('quotationItems');
    if (savedItems) {
      try {
        setQuotationItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Error parsing quotation items:', error);
        localStorage.removeItem('quotationItems');
      }
    }
  }, []);

  // Save quotation items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quotationItems', JSON.stringify(quotationItems));
  }, [quotationItems]);

  const addToQuotation = (product, quantity = 1) => {
    setQuotationItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.product._id === product._id);
      
      if (existingIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += quantity;
        return updatedItems;
      }
      
      return [...prevItems, { product, quantity }];
    });
  };

  const updateQuotationQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromQuotation(productId);
      return;
    }
    
    setQuotationItems(prevItems =>
      prevItems.map(item =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromQuotation = (productId) => {
    setQuotationItems(prevItems =>
      prevItems.filter(item => item.product._id !== productId)
    );
  };

  const clearQuotation = () => {
    setQuotationItems([]);
    localStorage.removeItem('quotationItems');
  };

  const openQuotationModal = () => {
    setIsQuotationModalOpen(true);
  };

  const closeQuotationModal = () => {
    setIsQuotationModalOpen(false);
  };

  const getQuotationTotal = () => {
    return quotationItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getQuotationCount = () => {
    return quotationItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    quotationItems,
    isQuotationModalOpen,
    addToQuotation,
    updateQuotationQuantity,
    removeFromQuotation,
    clearQuotation,
    openQuotationModal,
    closeQuotationModal,
    getQuotationTotal,
    getQuotationCount
  };

  return (
    <QuotationContext.Provider value={value}>
      {children}
    </QuotationContext.Provider>
  );
};
