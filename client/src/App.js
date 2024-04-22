import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './components/Routes';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';

function LinkTab({ label, to, ...rest }) {
  return (
    <Tab
      component={Link}
      to={to}
      label={label}
      {...rest}
    />
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0); // Initialize tabValue to a valid value

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: '#eeeeee' }}>
          <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} aria-label="nav tabs example">
            <LinkTab label="Home" to="/" />
            <LinkTab label="Orders" to="/orders" />
            <LinkTab label="Products" to="/products" />
            <LinkTab label="Customers" to="/customers" />
          </Tabs>
        </AppBar>
        <Routes setTabValue={setTabValue} />
      </Box>
    </Router>
  );
}

LinkTab.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default App;
