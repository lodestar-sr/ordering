import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useOrders from '../../hooks/Order/useOrders';
import Customers from '../Customers';

function Orders({ setTabValue, ...rest }) {
  const { orders, error: errorGetOrders, isLoading: isLoadingOrders } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    setTabValue(1); // Set the tab value to "Orders" tab
  }, []);

  if (errorGetOrders) {
    return <Alert severity="error">Get Orders List Failed.</Alert>;
  }

  if (isLoadingOrders) return <div>Loading...</div>;

  const handleCreateClick = () => {
    navigate('/orders/new');
  };

  const handleViewOrderDetail = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleEditOrder = (orderId) => {
    navigate(`/orders/${orderId}/edit`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>Create new order</Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleViewOrderDetail(order.id)}>Detail</Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleEditOrder(order.id)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

Orders.propTypes = {
  setTabValue: PropTypes.func.isRequired,
};

export default Orders;
