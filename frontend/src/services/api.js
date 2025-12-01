import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getMenu = () => api.get('/menu');
export const addMenuItem = (item) => api.post('/menu', item);
export const updateMenuItem = (id, item) => api.put(`/menu/${id}`, item);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);

export const getOrders = () => api.get('/orders');
export const addOrder = (order) => api.post('/orders', order);

export const getTables = () => api.get('/tables');
export const addTable = (table) => api.post('/tables', table);
export const bookTable = (data) => api.post('/tables/book', data);

export const getInventory = () => api.get('/inventory');
export const addInventoryItem = (item) => api.post('/inventory', item);
export const updateInventoryItem = (id, item) => api.put(`/inventory/${id}`, item);
export const deleteInventoryItem = (id) => api.delete(`/inventory/${id}`);

export default api;