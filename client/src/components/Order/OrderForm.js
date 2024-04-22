import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import OrderValidationSchema from '../../validations/OrderValidationSchema';
import transformOrderFormData from '../../validations/OrderFormDataTransformation';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';

const OrderForm = ({ initialValues, onSubmit, customers, products }) => {
  const formik = useFormik({
    initialValues: {
      ...initialValues,
      products: initialValues.order_items.map(item => item.product_id),
      order_items: initialValues.order_items.reduce((acc, item) => ({
        ...acc,
        [item.product_id]: item.quantity
      }), {})
    },
    validationSchema: OrderValidationSchema,
    onSubmit: (values) => {
      const submissionData = transformOrderFormData(values, products); // Use the transformation function

      onSubmit(submissionData);
    },
  });

  const handleProductChange = (event) => {
    const selectedProductIds = event.target.value;
    const updatedOrderItems = selectedProductIds.reduce((acc, id) => ({
      ...acc,
      [id]: formik.values.order_items[id] || 1 // Default to 1 if new product
    }), {});

    formik.setFieldValue('products', selectedProductIds);
    formik.setFieldValue('order_items', updatedOrderItems);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="customer-select-label">Customer</InputLabel>
        <Select
          labelId="customer-select-label"
          id="customer_id"
          name="customer_id"
          value={formik.values.customer_id}
          onChange={formik.handleChange}
          error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
        >
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="products-select-label">Products</InputLabel>
        <Select
          labelId="products-select-label"
          id="products"
          name="products"
          multiple
          value={formik.values.products}
          onChange={handleProductChange}
          error={formik.touched.products && Boolean(formik.errors.products)}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.product_code} - {product.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {formik.values.products.map((productId) => (
        <TextField
          key={productId}
          id={`${productId}-quantity`}
          name={`order_items.${productId}`}
          label={`Quantity for ${products.find(p => p.id === productId).description}`}
          type="number"
          value={formik.values.order_items[productId]}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
        />
      ))}

      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" color="primary">
          {initialValues.id ? 'Update Order' : 'Add Order'}
        </Button>
      </Box>
    </form>
  );
};

OrderForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    customer_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    order_items: PropTypes.arrayOf(PropTypes.shape({
      product_id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    }))
  }).isRequired,
  products: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default OrderForm;
