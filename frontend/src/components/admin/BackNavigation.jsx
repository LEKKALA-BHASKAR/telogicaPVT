import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackNavigation = ({ to = '/admin/dashboard', label = 'Back to Dashboard' }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <button
        onClick={() => navigate(to)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">{label}</span>
      </button>
    </div>
  );
};

export default BackNavigation;