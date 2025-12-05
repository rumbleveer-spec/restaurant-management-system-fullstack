import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import MenuList from './components/MenuList';
import OrderForm from './components/OrderForm';
import TableBooking from './components/TableBooking';
import Inventory from './components/Inventory';
import Recipes from './components/Recipes';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: '#2c3e50' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Ankit's Kitchen Management
            </Typography>
            <Button color="inherit" component={Link} to="/">Dashboard</Button>
            <Button color="inherit" component={Link} to="/menu">Menu</Button>
            <Button color="inherit" component={Link} to="/orders">Orders</Button>
            <Button color="inherit" component={Link} to="/tables">Tables</Button>
            <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
            <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<MenuList />} />
            <Route path="/orders" element={<OrderForm />} />
            <Route path="/tables" element={<TableBooking />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;