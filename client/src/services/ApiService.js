import { buildApiUrl } from '../utils/api';

const ApiService = {
  async fetchOrders() {
    try {
      const url = buildApiUrl('orders'); // Using the buildApiUrl utility function
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error('Error fetching orders');
    }
  },

  async fetchOrderDetail(orderId) {
    try {
      const url = buildApiUrl(`orders/${orderId}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error('Error fetching orders');
    }
  },

  async fetchCustomersList() {
    try {
      const url = buildApiUrl('customers');
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error('Error fetching customers');
    }
  },

  async fetchProductsList() {
    try {
      const url = buildApiUrl('products');
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },


  // Add other API functions for different endpoints...
};

export default ApiService;
