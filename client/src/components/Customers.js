import React, { useEffect } from 'react';
import { Alert, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useCustomers from '../hooks/useCustomers';

function Customers({ setTabValue, ...rest }) {
  const { customers, error: errorGetCustomers, isLoading: isLoadingCustomers } = useCustomers();

  useEffect(() => {
    setTabValue(3); // Set the tab value to "Customers" tab
  }, []);

  if (errorGetCustomers) {
    return <Alert severity="error">Get Customers List Failed.</Alert>;
  }

  if (isLoadingCustomers) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Customers</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>Since</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.revenue}</TableCell>
                <TableCell>{customer.since}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

Customers.propTypes = {
  setTabValue: PropTypes.func.isRequired,
};

export default Customers;
