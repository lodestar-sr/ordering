import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

const useCustomers = () => {
  const [customers, setCustomers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomersList = async () => {
      setIsLoading(true);
      try {
        const data = await ApiService.fetchCustomersList();
        setCustomers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching customers list:', error);
        setError('Error fetching customers list');
        setIsLoading(false);
      }
    };

    fetchCustomersList();

    return () => {
      // Cleanup function if necessary
    };
  }, []);

  return { customers, isLoading, error };
};

export default useCustomers;
