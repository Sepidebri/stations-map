import React from 'react';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
        <div className="mb-4 text-4xl">⚠️</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
        <p className="text-red-700 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
