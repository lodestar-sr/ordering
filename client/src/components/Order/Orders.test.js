import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Orders from './Orders';
import * as useOrdersModule from '../../hooks/Order/useOrders'; // Import useOrders module
import useCustomers from '../../hooks/useCustomers';
import useProducts from '../../hooks/useProducts';

jest.mock('../../hooks/useCustomers');
jest.mock('../../hooks/useProducts');

describe('Orders component', () => {
  test('displays orders when there are no errors', async () => {
    // Mock orders data
    const mockOrders = [
      { id: 1, customer: { name: 'Customer 1' }, total: 100 },
      { id: 2, customer: { name: 'Customer 2' }, total: 150 },
      { id: 3, customer: { name: 'Customer 3' }, total: 200 },
    ];

    // Mock the useOrders hook to return the list of orders
    const useOrdersSpy = jest.spyOn(useOrdersModule, 'default');
    useOrdersSpy.mockReturnValueOnce({
      orders: mockOrders,
      saveOrder: jest.fn(),
      updateOrder: jest.fn(),
      error: null,
    });

    // Mock the useCustomers hook to return an empty list of customers
    useCustomers.mockReturnValueOnce({
      customers: [],
      error: null,
    });

    // Mock the useProducts hook to return an empty list of products
    useProducts.mockReturnValueOnce({
      products: [],
      error: null,
    });

    // Mock setTabValue function
    const setTabValue = jest.fn();

    // Render the component within MemoryRouter with the expected URL
    render(
      <MemoryRouter initialEntries={["/orders"]} initialIndex={1}>
        <Orders setTabValue={setTabValue} />
      </MemoryRouter>
    );

    // Wait for the orders to be displayed
    await waitFor(() => {
      // Check if each order is displayed correctly
      mockOrders.forEach(order => {
        expect(screen.getByText(order.id)).toBeInTheDocument();
        expect(screen.getByText(order.customer.name)).toBeInTheDocument();
        expect(screen.getByText(order.total)).toBeInTheDocument();
      });
    });

    // Verify that setTabValue was called
    expect(setTabValue).toHaveBeenCalledWith(1);
  });
});
