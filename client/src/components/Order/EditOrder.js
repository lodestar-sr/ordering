import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Container } from '@mui/material';
import PropTypes from 'prop-types';
import OrderForm from './OrderForm';
import useOrderDetail from '../../hooks/Order/useOrderDetail';
import useCustomers from '../../hooks/useCustomers';
import useProducts from '../../hooks/useProducts';
import useOrderUpdate from '../../hooks/Order/useOrderUpdate';
import useOrderCreate from '../../hooks/Order/useOrderCreate';

const EditOrder = ({ setTabValue, ...rest }) => {
  const { orderId } = useParams();
  const isNewOrder = !orderId; // Check if it's a new order
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { order, error: orderError, isLoading: isOrderLoading } = useOrderDetail(orderId);
  const { customers, error: customersError, isLoading: isCustomersLoading } = useCustomers();
  const { products, error: productsError, isLoading: isProductsLoading } = useProducts();
  const { createOrder, error: createOrderError, isLoading: isCreatingOrder } = useOrderCreate();
  const { updateOrder, error: updateOrderError, isLoading: isUpdatingOrder } = useOrderUpdate();

  useEffect(() => {
    setTabValue(1); // Set the tab value to "Orders" tab
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (isNewOrder) {
        // Use hook for creating a new order
        const newOrder = await createOrder(values);
        setSuccessMessage('Order created successfully!');
        setTabValue(1); // Set the tab value to "Orders" tab after successful operation
        navigate(`/orders/${newOrder.id}`);
      } else {
        // Use hook for updating an existing order
        await updateOrder(orderId, values);
        setSuccessMessage('Order updated successfully!');
        setTabValue(1); // Set the tab value to "Orders" tab after successful operation
        navigate(`/orders/${orderId}`);
      }
    } catch (error) {
      setErrorMessage('Error occurred while processing the request.');
    }
  };

  if (isOrderLoading || isCustomersLoading || isProductsLoading) {
    return <div>Loading...</div>;
  }

  if (orderError || customersError || productsError) {
    return <Alert severity="error">Error occurred while loading data.</Alert>;
  }

  if (!isNewOrder && !order) {
    return <Alert severity="error">Order not found.</Alert>;
  }

  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      {customers && products && (
        <React.Fragment>
          <OrderForm
            initialValues={order || { customer_id: '', order_items: [] }} // Set default values for new order
            onSubmit={handleSubmit}
            customers={customers}
            products={products}
          />
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {createOrderError && <Alert severity="error">Error occurred while creating the order.</Alert>}
          {updateOrderError && <Alert severity="error">Error occurred while updating the order.</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </React.Fragment>
      )}
    </Container>
  );
};

EditOrder.propTypes = {
  setTabValue: PropTypes.func.isRequired,
};

export default EditOrder;
