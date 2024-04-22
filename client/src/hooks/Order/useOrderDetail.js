import { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';

const useOrderDetail = (orderId) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setIsLoading(true);
      try {
        const orderDetail = await ApiService.fetchOrderDetail(orderId);
        setOrder(orderDetail);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching order detail:', error);
        setError('Error fetching order detail');
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetail();
    } else {
      setIsLoading(false);
    }

    return () => {
      // Cleanup function if necessary
    };
  }, [orderId]);

  return { order, isLoading, error };
};

export default useOrderDetail;
