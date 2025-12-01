import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Alert, AlertTitle, Box, CircularProgress } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InventoryIcon from '@mui/icons-material/Inventory';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import axios from 'axios';

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invRes, menuRes] = await Promise.all([
          axios.get(`${API_URL}/inventory`),
          axios.get(`${API_URL}/menu`)
        ]);
        setInventory(invRes.data);
        setMenuItems(menuRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  // Notification Logic
  const getExpiringItems = () => {
    const today = new Date();
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(today.getDate() + 2);

    return inventory.filter(item => {
      if (!item.expiryDate) return false;
      const expiry = new Date(item.expiryDate);
      return expiry <= twoDaysFromNow;
    });
  };

  const getLowStockItems = () => {
    return inventory.filter(item => item.quantity <= (item.minStockLevel || 5));
  };

  const expiringItems = getExpiringItems();
  const lowStockItems = getLowStockItems();

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Dashboard
      </Typography>

      {/* URGENT NOTIFICATIONS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#fff3e0' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#e65100' }}>
              <ErrorIcon sx={{ mr: 1 }} /> Expiry Alerts (Next 2 Days)
            </Typography>
            {expiringItems.length === 0 ? (
              <Typography variant="body2" sx={{ mt: 1 }}>No items expiring soon.</Typography>
            ) : (
              <List dense>
                {expiringItems.map(item => (
                  <ListItem key={item._id}>
                    <ListItemText 
                      primary={item.itemName} 
                      secondary={`Expires: ${new Date(item.expiryDate).toLocaleDateString()}`} 
                      primaryTypographyProps={{ color: 'error', fontWeight: 'bold' }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#ffebee' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#c62828' }}>
              <WarningIcon sx={{ mr: 1 }} /> Low Stock Alerts
            </Typography>
            {lowStockItems.length === 0 ? (
              <Typography variant="body2" sx={{ mt: 1 }}>All stock levels are healthy.</Typography>
            ) : (
              <List dense>
                {lowStockItems.slice(0, 5).map(item => (
                  <ListItem key={item._id}>
                    <ListItemText 
                      primary={item.itemName} 
                      secondary={`Qty: ${item.quantity} ${item.unit}`} 
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItem>
                ))}
                {lowStockItems.length > 5 && <ListItem><ListItemText secondary={`...and ${lowStockItems.length - 5} more`} /></ListItem>}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* STATS OVERVIEW */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <InventoryIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h4">{inventory.length}</Typography>
            <Typography variant="subtitle1" color="textSecondary">Total Inventory Items</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <RestaurantMenuIcon color="secondary" sx={{ fontSize: 40 }} />
            <Typography variant="h4">{menuItems.length}</Typography>
            <Typography variant="subtitle1" color="textSecondary">Menu Items</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
