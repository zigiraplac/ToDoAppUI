import { useState } from 'react';

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const callApi = async (apiFunction: any, ...args: any[]) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError('');

  return {
    isLoading,
    error,
    callApi,
    clearError,
  };
};