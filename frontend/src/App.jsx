import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import MenuList from './components/MenuList';
import OrderForm from './components/OrderForm';
import TableBooking from './components/TableBooking';
import Inventory from './components/Inventory';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: '#2c3e50' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Ankit's Kitchen Management
            </Typography>
            {isAuthenticated && (
              <>
                <Button color="inherit" component={Link} to="/">Dashboard</Button>
                <Button color="inherit" component={Link} to="/menu">Menu</Button>
                <Button color="inherit" component={Link} to="/orders">Orders</Button>
                <Button color="inherit" component={Link} to="/tables">Tables</Button>
                <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
                <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
                <Button color="inherit" onClick={handleLogout} sx={{ ml: 2, bgcolor: '#c0392b' }}>Logout</Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/menu" element={isAuthenticated ? <MenuList /> : <Navigate to="/login" />} />
            <Route path="/orders" element={isAuthenticated ? <OrderForm /> : <Navigate to="/login" />} />
            <Route path="/tables" element={isAuthenticated ? <TableBooking /> : <Navigate to="/login" />} />
            <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />} />
            <Route path="/recipes" element={isAuthenticated ? <Typography variant="h4" align="center">Recipes Coming Soon...</Typography> : <Navigate to="/login" />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;