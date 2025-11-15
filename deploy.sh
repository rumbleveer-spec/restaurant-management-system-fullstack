#!/bin/bash

# Restaurant Management System - VPS Deployment Script
# Author: Ankit Rajput

set -e  # Exit on error

echo "🚀 Starting Restaurant Management System Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/var/www/restaurant-management"
REPO_URL="https://github.com/rumbleveer-spec/restaurant-management-system-fullstack.git"
DOMAIN="your-domain.com"  # Change this to your domain
DB_NAME="restaurant_db"
DB_USER="restaurant_user"
DB_PASSWORD="secure_password_here"  # Change this

# Function to print colored messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root (use sudo)"
    exit 1
fi

# 1. Update system packages
print_message "Updating system packages..."
apt update && apt upgrade -y

# 2. Install required packages
print_message "Installing required packages..."
apt install -y python3 python3-pip python3-venv postgresql postgresql-contrib nginx git curl nodejs npm

# 3. Install Node.js LTS
print_message "Installing Node.js LTS..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt install -y nodejs

# Install pnpm
npm install -g pnpm

# 4. Setup PostgreSQL Database
print_message "Setting up PostgreSQL database..."
sudo -u postgres psql <<EOF
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
\qktankitra
EOF

# 5. Clone repository
print_message "Cloning repository..."
if [ -d "$APP_DIR" ]; then
    print_warning "Directory exists. Pulling latest changes..."
    cd $APP_DIR
    git pull origin main
else
    mkdir -p $APP_DIR
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# 6. Backend Setup
print_message "Setting up Flask backend..."
cd $APP_DIR

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file for backend
cat > .env <<EOL
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@localhost/$DB_NAME
SECRET_KEY=$(openssl rand -hex 32)
FLASK_ENV=production
FLASK_APP=main.py
EOL

# Initialize database
print_message "Initializing database..."
python init_db.py

# 7. Frontend Setup
print_message "Setting up React frontend..."
cd $APP_DIR/frontend/restaurant-dashboard

# Install dependencies
pnpm install

# Create .env file for frontend
cat > .env <<EOL
VITE_API_URL=https://$DOMAIN/api
EOL

# Build frontend
print_message "Building frontend..."
pnpm run build

# 8. Create Systemd Service for Flask Backend
print_message "Creating systemd service..."
cat > /etc/systemd/system/restaurant-backend.service <<EOL
[Unit]
Description=Restaurant Management Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=$APP_DIR
Environment="PATH=$APP_DIR/venv/bin"
ExecStart=$APP_DIR/venv/bin/gunicorn --workers 4 --bind unix:restaurant.sock -m 007 main:app

[Install]
WantedBy=multi-user.target
EOL

# Install Gunicorn
source $APP_DIR/venv/bin/activate
pip install gunicorn

# 9. Configure Nginx
print_message "Configuring Nginx..."
cat > /etc/nginx/sites-available/restaurant <<EOL
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Frontend
    location / {
        root $APP_DIR/frontend/restaurant-dashboard/dist;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://unix:$APP_DIR/restaurant.sock;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOL

# Enable site
ln -sf /etc/nginx/sites-available/restaurant /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# 10. Setup SSL with Let's Encrypt (Optional but recommended)
print_message "Would you like to setup SSL with Let's Encrypt? (y/n)"
read -r setup_ssl
if [ "$setup_ssl" = "y" ]; then
    apt install -y certbot python3-certbot-nginx
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
fi

# 11. Set proper permissions
print_message "Setting file permissions..."
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR

# 12. Enable and start services
print_message "Starting services..."
systemctl daemon-reload
systemctl enable restaurant-backend
systemctl start restaurant-backend
systemctl restart nginx

# 13. Setup firewall
print_message "Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

print_message "✅ Deployment completed successfully!"
print_message ""
print_message "🌐 Your application should now be accessible at: http://$DOMAIN"
print_message ""
print_message "📍 Next steps:"
print_message "1. Update DNS records to point to your VPS IP"
print_message "2. Test the application at http://$DOMAIN"
print_message "3. Check logs: sudo journalctl -u restaurant-backend -f"
print_message "4. Check Nginx logs: sudo tail -f /var/log/nginx/error.log"
print_message ""
print_message "🔑 Default credentials:"
print_message "   Username: admin"
print_message "   Password: admin123"
print_message ""
print_message "⚠️  IMPORTANT: Change default credentials and update .env files!"