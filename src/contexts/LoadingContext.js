'use client';
import { createContext, useContext, useState } from 'react';
import LoadingOverlay from '@/components/LoadingOverlay';
import { ProgressBar } from '@/components/LoadingIndicators';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const showLoading = (message = '', withProgress = false) => {
    setLoadingMessage(message);
    setIsLoading(true);
    if (withProgress) setProgress(0);
  };

  const updateProgress = (value) => {
    setProgress(Math.min(100, Math.max(0, value)));
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
    setProgress(0);
  };

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, updateProgress }}>
      <LoadingOverlay 
        isLoading={isLoading} 
        message={loadingMessage}
        progress={progress}
      >
        {children}
      </LoadingOverlay>
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext); 