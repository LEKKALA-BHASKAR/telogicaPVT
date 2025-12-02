import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

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
  const [pendingQuoteData, setPendingQuoteData] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

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
    
    // Load pending quote data if exists
    const savedPendingQuote = localStorage.getItem('pendingQuoteData');
    if (savedPendingQuote) {
      try {
        setPendingQuoteData(JSON.parse(savedPendingQuote));
      } catch (error) {
        console.error('Error parsing pending quote data:', error);
        localStorage.removeItem('pendingQuoteData');
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

  const savePendingQuote = (quoteData) => {
    setPendingQuoteData(quoteData);
    localStorage.setItem('pendingQuoteData', JSON.stringify(quoteData));
  };

  const clearPendingQuote = () => {
    setPendingQuoteData(null);
    localStorage.removeItem('pendingQuoteData');
  };

  const submitPendingQuote = useCallback(async (userId) => {
    if (!pendingQuoteData) return { success: false };

    try {
      const quoteData = {
        buyer: pendingQuoteData.buyer,
        address: pendingQuoteData.address,
        products: pendingQuoteData.products.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        userId: userId,
        userMessage: pendingQuoteData.userMessage || null
      };

      await axios.post(`${API_URL}/api/quotes`, quoteData);
      
      toast.success('Your quote request has been submitted successfully!');
      clearPendingQuote();
      setQuotationItems([]);
      localStorage.removeItem('quotationItems');
      return { success: true };
    } catch (error) {
      console.error('Error submitting pending quote:', error);
      toast.error('Failed to submit quote. Please try again from My Quotes.');
      return { success: false, error };
    }
  }, [pendingQuoteData, API_URL]);

  const value = {
    quotationItems,
    isQuotationModalOpen,
    pendingQuoteData,
    addToQuotation,
    updateQuotationQuantity,
    removeFromQuotation,
    clearQuotation,
    openQuotationModal,
    closeQuotationModal,
    getQuotationTotal,
    getQuotationCount,
    savePendingQuote,
    clearPendingQuote,
    submitPendingQuote
  };

  return (
    <QuotationContext.Provider value={value}>
      {children}
    </QuotationContext.Provider>
  );
};
