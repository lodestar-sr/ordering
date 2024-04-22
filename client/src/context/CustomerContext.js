import { createContext } from 'react';

const CustomerContext = createContext({
  customers: [],
  error: null,
  setError: () => {},
  setCustomers: () => {},
});

export default CustomerContext;
