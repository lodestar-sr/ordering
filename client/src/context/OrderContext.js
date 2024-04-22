import { createContext } from 'react';

const OrdersContext = createContext({
  orders: [],
  error: null,
  setOrders: () => {},
  setError: () => {},
});

export default OrdersContext;
