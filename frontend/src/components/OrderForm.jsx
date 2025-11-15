import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [tableNumber, setTableNumber] = useState('');
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleAddItem = (item) => {
        setItems([...items, item]);
        setTotalAmount(totalAmount + item.price);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            customerName,
            tableNumber,
            items,
            totalAmount,
        };

        try {
            await axios.post('/api/orders', orderData);
            alert('Order placed successfully!');
            // Reset form
            setCustomerName('');
            setTableNumber('');
            setItems([]);
            setTotalAmount(0);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Order</h2>
            <div>
                <label>Customer Name:</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Table Number:</label>
                <input
                    type="number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <h3>Items</h3>
                {/* Add logic to display and add items to the order */}
            </div>
            <div>
                <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
            </div>
            <button type="submit">Place Order</button>
        </form>
    );
};

export default OrderForm;