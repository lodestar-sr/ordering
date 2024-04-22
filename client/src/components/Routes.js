import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Orders from './Order/Orders';
import OrderDetail from './Order/OrderDetail';
import EditOrder from './Order/EditOrder';
import Customers from './Customers';
import Products from './Products';

const Routes = ({ setTabValue, ...rest }) => {
  return (
      <ReactRoutes>
        <Route path="/orders" element={<Orders setTabValue={setTabValue} />} />
        <Route path="/orders/:orderId" element={<OrderDetail setTabValue={setTabValue} />} />
        <Route path="/orders/:orderId/edit" element={<EditOrder setTabValue={setTabValue} />} />
        <Route path="/orders/new" element={<EditOrder setTabValue={setTabValue} />} />
        <Route path="/products" element={<Products setTabValue={setTabValue} />} />
        <Route path="/customers" element={<Customers setTabValue={setTabValue} />} />
        <Route path="/" element={<>This is Home page</>} />
      </ReactRoutes>
  );
}

Routes.propTypes = {
  setTabValue: PropTypes.func.isRequired,
};

export default Routes;
