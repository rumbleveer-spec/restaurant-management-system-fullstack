#!/bin/bash

# Restaurant Management System - Auto Deploy Script
# Created by Rube AI for Ankit Rajput

set -e

echo "🚀 Starting deployment..."

# Backend deployment
echo "📦 Setting up Backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install/update dependencies
pip install -r requirements.txt

# Database setup (if needed)
if [ ! -f "database_initialized" ]; then
    echo "🗻️ Initializing database..."
    python init_db.py
    touch database_initialized
fi

# Restart backend service
sudo systemctl restart restaurant-backend

cd ..

# Frontend deployment
echo "🎨 Building Frontend..."
cd frontend/restaurant-dashboard

# Install dependencies
pnpm install

# Build for production
pnpm run build

# Copy build to nginx directory sudo rm -rf /var/www/html/restaurant/*
sudo cp -r dist/* /var/www/html/restaurant/

cd ../..

echo "✅ Deployment completed successfully!"
echo "🌐 Frontend: http://your-domain.com"
echo "🔔 Automated by Rube AI"