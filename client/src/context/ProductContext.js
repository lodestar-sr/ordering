import { createContext } from 'react';

const ProductContext = createContext({
  products: [],
  error: null,
  setError: () => {},
  setProducts: () => {},
});

export default ProductContext;
