import { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';

const useOrders = () => {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const data = await ApiService.fetchOrders();
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders list:', error);
        setError('Error fetching orders list');
        setIsLoading(false);
      }
    };

    fetchOrders();

    return () => {
      // Cleanup function if necessary
    };
  }, []);

  return { orders, isLoading, error };
};

export default useOrders;
