# 🍽️ Restaurant Management System

> **Comprehensive Dashboard for Menu, Orders, Recipes & Stock Management**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-Latest-green.svg)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue.svg)](https://www.postgresql.org/)

---

## 📋 Overview

A **full-stack Restaurant Management System** built with modern technologies to streamline restaurant operations. This comprehensive dashboard application provides an integrated solution for managing menus, inventory, orders, and recipes with real-time tracking and automated calculations.

### ✨ Key Features

- 🍕 **Menu Management** - Create and organize menu items with categories and pricing
- 📦 **Inventory Control** - Track stock levels and receive low inventory alerts
- 🛒 **Order Processing** - Manage customer orders from creation to completion
- 📖 **Recipe Management** - Link recipes to menu items with automated cost analysis
- 🔐 **User Authentication** - JWT-based secure authentication with role-based access control
- 📊 **Dashboard Overview** - Real-time metrics and KPIs at a glance

---

## 🏗️ System Architecture

### Tech Stack

**Frontend:**
- ⚛️ React 18
- 🎨 Material-UI
- 🛣️ React Router
- 📡 Axios

**Backend:**
- 🐍 Flask
- 🗃️ SQLAlchemy (ORM)
- 🔐 JWT Authentication
- 🌐 Flask-CORS

**Database:**
- 🐘 PostgreSQL 12+
- 📐 Relational Schema
- ✅ ACID Compliance
- 🔒 Data Integrity

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+
- PostgreSQL 12+
- pnpm (or npm/yarn)

### Installation

#### 1️⃣ Backend Setup

```bash
# Clone the repository
git clone https://github.com/rumbleveer-spec/restaurant-management-system-fullstack.git
cd restaurant-management-system-fullstack

# Install Python dependencies
pip install -r requirements.txt

# Initialize the database
python init_db.py

# Start the Flask server
python main.py
```

The backend API will be available at `http://localhost:5000`

#### 2️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend/restaurant-dashboard

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

The frontend application will be available at `http://localhost:5173`

---

## 🎯 Usage

### Demo Credentials

```
Username: admin
Password: admin123
```

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Menu Management
- `GET /api/menu-items` - Get all menu items
- `POST /api/menu-items` - Create new menu item
- `PUT /api/menu-items/:id` - Update menu item
- `DELETE /api/menu-items/:id` - Delete menu item

#### Inventory Management
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/:id` - Update stock level
- `GET /api/inventory/low-stock` - Get low stock alerts

#### Order Management
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `GET /api/orders/:id` - Get order details

#### Recipe Management
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `GET /api/recipes/:id/cost` - Calculate recipe cost

---

## 📊 Core Features

### 1. User Authentication
- JWT-based secure authentication
- Role-based access control (Admin, Manager, Staff)
- Session management
- Password encryption

### 2. Menu Management
- Create, read, update, and delete menu items
- Category organization (Appetizers, Main Course, Desserts, Beverages)
- Dynamic pricing
- Menu item status (Active/Inactive)

### 3. Inventory Management
- Real-time stock tracking
- Automated low stock alerts
- Transaction history
- Stock-in and stock-out management
- Supplier information tracking

### 4. Order Processing
- End-to-end order lifecycle management
- Order status tracking (Pending, Preparing, Ready, Completed)
- Sales reporting and analytics
- Customer order history

### 5. Recipe Management
- Recipe creation with ingredients list
- Automatic cost calculation based on inventory prices
- Link recipes to menu items
- Ingredient quantity tracking

### 6. Dashboard Analytics
- Total sales overview
- Active orders count
- Low stock items alert
- Popular menu items
- Revenue trends

---

## 📁 Project Structure

```
restaurant-management-system-fullstack/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py          # Database models
│   │   ├── routes.py          # API routes
│   │   └── auth.py            # Authentication logic
│   ├── main.py                # Flask application entry point
│   ├── init_db.py             # Database initialization
│   ├── requirements.txt       # Python dependencies
│   └── config.py              # Configuration settings
│
├── frontend/
│   └── restaurant-dashboard/
│       ├── src/
│       │   ├── components/    # React components
│       │   ├── pages/         # Page components
│       │   ├── services/      # API services
│       │   ├── utils/         # Utility functions
│       │   ├── App.jsx        # Main App component
│       │   └── main.jsx       # Entry point
│       ├── package.json
│       └── vite.config.js
│
├── docs/                      # Documentation
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- SQL injection prevention via SQLAlchemy ORM
- XSS protection
- CSRF token validation

---

## 🛠️ Development

### Running Tests

```bash
# Backend tests
python -m pytest tests/

# Frontend tests
cd frontend/restaurant-dashboard
pnpm test
```

### Database Migrations

```bash
# Create migration
flask db migrate -m "Description"

# Apply migration
flask db upgrade
```

---

## 📈 Project Statistics

| Metric | Value |
|--------|-------|
| Development Phases | 8 |
| Features Implemented | 15+ |
| Project Completion | 100% |
| Code Quality | A+ |

---

## 🔮 Future Enhancements

- 📱 Mobile application for servers and kitchen staff
- 💳 POS system integration
- 🎁 Customer loyalty program
- 📧 Email notifications for orders
- 📊 Advanced analytics and reporting
- 🌐 Multi-location support
- 🍔 Table reservation system
- 💬 Real-time order notifications via WebSocket

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ankit Rajput**

A passionate full-stack developer building scalable and efficient web applications.

- 🔗 GitHub: [@rumbleveer-spec](https://github.com/rumbleveer-spec)
- 💼 LinkedIn: [Ankit Rajput](https://linkedin.com/in/ankit-rajput)
- 🌐 Portfolio: Coming Soon
- 📧 Email: ankitrajput.dev@gmail.com

### 💡 About Me
I'm a software engineer passionate about creating real-world solutions with modern technologies. This Restaurant Management System showcases my expertise in:
- Full-stack development (React + Flask)
- Database design & optimization
- RESTful API development
- Modern UI/UX design
- System architecture

---

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- Flask community for the excellent web framework
- React team for the amazing frontend library
- PostgreSQL for the robust database system

---

## 📞 Support

For support, email ankitrajput.dev@gmail.com or create an issue in this repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful! ⭐**

Made with ❤️ by **Ankit Rajput**

*"Building the future, one line of code at a time"*

</div>
