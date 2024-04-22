import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useOrderDetail from '../../hooks/Order/useOrderDetail';
import { Alert, Card, CardContent, CardHeader, Typography, Button, Grid } from '@mui/material';
import Customers from '../Customers';

function OrderDetail({ setTabValue, ...rest }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { order, error, isLoading } = useOrderDetail(orderId);

  useEffect(() => {
    setTabValue(1); // Set the tab value to "Orders" tab
  }, []);

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  if (isLoading) return <div>Loading...</div>;

  const handleEdit = () => {
    navigate(`/orders/${orderId}/edit`);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>#{order.id} {order.customer.name}</Typography>
        </Grid>
        {order.order_items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.product_id}>
            <Card>
              <CardHeader title={`Product: ${item.product.product_code} - ${item.product.description}`} />
              <CardContent>
                <Typography variant="body1">Quantity: {item.quantity}</Typography>
                <Typography variant="body1">Price: ${item.unit_price}</Typography>
                <Typography variant="body1">Total: ${(parseFloat(item.total)).toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" color="primary" onClick={handleEdit}>Edit</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

OrderDetail.propTypes = {
  setTabValue: PropTypes.func.isRequired,
};

export default OrderDetail;
