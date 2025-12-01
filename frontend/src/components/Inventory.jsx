import React, { useState, useEffect } from 'react';
import { getInventory, updateInventoryItem } from '../services/api';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Alert } from '@mui/material';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await getInventory();
            setInventory(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch inventory');
            setLoading(false);
        }
    };

    const handleUpdate = async (id, field, value) => {
        try {
            // Optimistic update
            const updatedInventory = inventory.map(item =>
                item._id === id ? { ...item, [field]: value } : item
            );
            setInventory(updatedInventory);

            // API call
            await updateInventoryItem(id, { [field]: value });
        } catch (err) {
            console.error('Update failed', err);
            // Revert on error (could be improved)
            fetchInventory();
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Inventory Management</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Min Stock</TableCell>
                            <TableCell>Expiry Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.itemName}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={item.minStockLevel || 5}
                                        onChange={(e) => handleUpdate(item._id, 'minStockLevel', e.target.value)}
                                        sx={{ width: 80 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="date"
                                        size="small"
                                        value={item.expiryDate ? item.expiryDate.split('T')[0] : ''}
                                        onChange={(e) => handleUpdate(item._id, 'expiryDate', e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Inventory;
