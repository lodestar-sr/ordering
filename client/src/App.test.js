import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders all tabs with correct links', () => {
    render(<App />);

    const homeTab = screen.getByText('Home');
    expect(homeTab).toBeInTheDocument();
    expect(homeTab).toHaveAttribute('href', '/');

    const ordersTab = screen.getByText('Orders');
    expect(ordersTab).toBeInTheDocument();
    expect(ordersTab).toHaveAttribute('href', '/orders');

    const productsTab = screen.getByText('Products');
    expect(productsTab).toBeInTheDocument();
    expect(productsTab).toHaveAttribute('href', '/products');

    const customersTab = screen.getByText('Customers');
    expect(customersTab).toBeInTheDocument();
    expect(customersTab).toHaveAttribute('href', '/customers');
  });
});
