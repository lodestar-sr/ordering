import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsList = async () => {
      setIsLoading(true);
      try {
        const data = await ApiService.fetchProductsList();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products list:', error);
        setError('Error fetching products list');
        setIsLoading(false);
      }
    };

    fetchProductsList();

    return () => {
      // Cleanup function if necessary
    };
  }, []);

  return { products, isLoading, error };
};

export default useProducts;
