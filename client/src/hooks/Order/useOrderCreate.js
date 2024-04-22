import { useState } from 'react';
import { buildApiUrl } from '../../utils/api';

export const useOrderCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (formData) => {
    setIsLoading(true);
    try {
      const url = buildApiUrl('orders');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }
      setIsLoading(false);
      return await response.json();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { createOrder, isLoading, error };
};

export default useOrderCreate;
