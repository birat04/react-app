import React from 'react'

const Spinner = () => {
  return (
    <div 
      role="status" 
      aria-label="Loading movies"
      className="flex justify-center items-center py-12"
    >
      <div className="relative">
        <div className="w-12 h-12 border-4 border-indigo-200 rounded-full" />
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
      </div>
      <span className="sr-only">Loading movies...</span>
    </div>
  );
};

export default Spinner;