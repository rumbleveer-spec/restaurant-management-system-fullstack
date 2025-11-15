# Restaurant Management System

This project is a complete Restaurant Management System built using Node.js, Express.js, and MongoDB for the backend, and React for the frontend. It provides functionalities for managing menu items, handling orders, booking tables, and generating bills with GST calculations.

## Features

- **Menu Management**: Create, read, update, and delete menu items.
- **Order Management**: Create new orders and retrieve existing ones.
- **Table Booking**: Manage table reservations, including creating and retrieving bookings.
- **Bill Generation**: Generate bills with GST calculations.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, React Router

## Project Structure

```
restaurant-management
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   ├── package.json
│   └── README.md
└── frontend
    ├── src
    ├── package.json
    └── README.md
```

## Getting Started

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`.
3. Set up your MongoDB connection in `config/db.js`.
4. Start the server: `node server.js`.

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`.
3. Start the React application: `npm start`.

## License

This project is licensed under the MIT License.