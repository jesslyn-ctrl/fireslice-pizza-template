import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-16 h-16 border-t-4 border-red-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;