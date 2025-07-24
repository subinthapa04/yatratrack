import React from 'react';
import { Bus } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Bus className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Loading YatraTrack</h3>
        <p className="text-gray-600">Preparing your transit experience...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;