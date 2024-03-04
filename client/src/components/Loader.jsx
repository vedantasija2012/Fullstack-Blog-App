import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen overflow-y-hidden">
      <div className="animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-gray-900"></div>
    </div>
  );
};

export default Loader;
