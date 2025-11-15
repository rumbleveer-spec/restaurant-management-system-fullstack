import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillGeneration = () => {
    const [orderId, setOrderId] = useState('');
    const [bill, setBill] = useState(null);
    const [error, setError] = useState('');

    const handleGenerateBill = async () => {
        try {
            const response = await axios.get(`/api/orders/${orderId}/bill`);
            setBill(response.data);
            setError('');
        } catch (err) {
            setError('Error generating bill. Please check the order ID.');
            setBill(null);
        }
    };

    return (
        <div>
            <h2>Generate Bill</h2>
            <input
                type="text"
                placeholder="Enter Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={handleGenerateBill}>Generate Bill</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bill && (
                <div>
                    <h3>Bill Details</h3>
                    <p>Order ID: {bill.orderId}</p>
                    <p>Total Amount: ${bill.totalAmount}</p>
                    <p>GST: ${bill.gst}</p>
                    <p>Final Amount: ${bill.finalAmount}</p>
                </div>
            )}
        </div>
    );
};

export default BillGeneration;