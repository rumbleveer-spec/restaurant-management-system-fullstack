const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

export const fetchMenuItems = async () => {
    const response = await fetch(`${API_URL}/menu`);
    if (!response.ok) {
        throw new Error('Failed to fetch menu items');
    }
    return await response.json();
};

export const createMenuItem = async (menuItem) => {
    const response = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItem),
    });
    if (!response.ok) {
        throw new Error('Failed to create menu item');
    }
    return await response.json();
};

export const updateMenuItem = async (id, menuItem) => {
    const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItem),
    });
    if (!response.ok) {
        throw new Error('Failed to update menu item');
    }
    return await response.json();
};

export const deleteMenuItem = async (id) => {
    const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete menu item');
    }
    return await response.json();
};

export const fetchOrders = async () => {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return await response.json();
};

export const createOrder = async (order) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return await response.json();
};

export const fetchTables = async () => {
    const response = await fetch(`${API_URL}/tables`);
    if (!response.ok) {
        throw new Error('Failed to fetch tables');
    }
    return await response.json();
};

export const bookTable = async (table) => {
    const response = await fetch(`${API_URL}/tables`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(table),
    });
    if (!response.ok) {
        throw new Error('Failed to book table');
    }
    return await response.json();
};