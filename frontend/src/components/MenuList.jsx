import React, { useEffect, useState } from 'react';
import { getMenu } from '../services/api';

const MenuList = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await getMenu();
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <div>
            <h1>Menu</h1>
            <ul>
                {menuItems.map(item => (
                    <li key={item._id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuList;