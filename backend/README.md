# Restaurant Management System - Backend

This is the backend part of the Restaurant Management System built using Node.js, Express.js, and MongoDB. The backend provides RESTful APIs for managing menu items, orders, and table bookings.

## Features

- **Menu Management**: Create, read, update, and delete menu items.
- **Order Management**: Create new orders and retrieve existing ones.
- **Table Booking**: Manage table reservations, including creating and retrieving bookings.
- **Bill Generation**: Generate bills with GST calculations.

## Project Structure

```
backend
├── config
│   └── db.js
├── controllers
│   ├── menuController.js
│   ├── orderController.js
│   └── tableController.js
├── models
│   ├── menu.js
│   ├── order.js
│   └── table.js
├── routes
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   └── tableRoutes.js
├── utils
│   └── billGenerator.js
├── server.js
├── package.json
└── README.md
```

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd restaurant-management/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   Update the database connection settings in `config/db.js`.

4. **Run the server**:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` (or the port specified in your configuration).

## API Documentation

Refer to the individual route files in the `routes` directory for detailed API endpoints and usage.

## License

This project is licensed under the MIT License.