import React from 'react';

/**
 * SkipToContent - Accessibility component for keyboard navigation
 * Allows users to skip navigation and jump directly to main content
 */
const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-xl"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
