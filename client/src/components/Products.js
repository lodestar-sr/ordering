import React, { useEffect } from 'react';
import { Alert, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useProducts from '../hooks/useProducts';
import Customers from './Customers';

function Products({ setTabValue, ...rest }) {
  const { products, error: errorGetProducts, isLoading: isLoadingProducts } = useProducts();

  useEffect(() => {
    setTabValue(2); // Set the tab value to "Products" tab
  }, []);

  if (errorGetProducts) {
    return <Alert severity="error">Get Products List Failed.</Alert>;
  }

  if (isLoadingProducts) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Products</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.product_code}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

Products.propTypes = {
  setTabValue: PropTypes.func.isRequired,
};

export default Products;
