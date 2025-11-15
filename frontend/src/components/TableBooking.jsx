import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableBooking = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get('/api/tables');
                setTables(response.data);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/tables/book', {
                tableId: selectedTable,
                date: bookingDate,
                customerName,
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error booking table:', error);
            setMessage('Failed to book the table. Please try again.');
        }
    };

    return (
        <div>
            <h2>Table Booking</h2>
            <form onSubmit={handleBooking}>
                <div>
                    <label>Select Table:</label>
                    <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
                        <option value="">Select a table</option>
                        {tables.map((table) => (
                            <option key={table._id} value={table._id}>
                                Table {table.tableNumber} (Capacity: {table.capacity})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Booking Date:</label>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Customer Name:</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Book Table</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TableBooking;