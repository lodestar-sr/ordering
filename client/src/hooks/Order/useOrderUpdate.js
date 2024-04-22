import { useState } from 'react';
import { buildApiUrl } from '../../utils/api';

export const useOrderUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateOrder = async (orderId, formData) => {
    setIsLoading(true);
    try {
      const url = buildApiUrl(`orders/${orderId}`);
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update order: ${response.statusText}`);
      }
      setIsLoading(false);
      return await response.json();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { updateOrder, isLoading, error };
};

export default useOrderUpdate;
