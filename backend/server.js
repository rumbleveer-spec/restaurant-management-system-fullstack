const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tableRoutes = require('./routes/tableRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes'); // Added
const authRoutes = require('./routes/authRoutes'); // Added
const authMiddleware = require('./middleware/auth');
const dbConfig = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url} `);
    next();
});

// Database connection
// Database connection
dbConfig();

// Protected Routes (Auth removed for now)
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/inventory', inventoryRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});