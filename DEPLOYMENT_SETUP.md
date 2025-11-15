# 🚀 One-Click Deployment Setup for Hostinger VPS

## ✅ Step 1: SSH into Your VPS

```bash
ssh root@your-vps-ip
```

## ✅ Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install Python 3.8+
sudo apt install -y python3 python3-pip python3-venv

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

## ✅ Step 3: Setup PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL shell:
CREATE DATABASE restaurant_db;
CREATE USER restaurant_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE restaurant_db TO restaurant_user;
\q
```

## ✅ Step 4: Clone Your Repository

```bash
# Create directory
sudo mkdir -p /var/www/restaurant-management-system
sudo chown $USER:$USER /var/www/restaurant-management-system

# Clone repository
cd /var/www
git clone https://github.com/rumbleveer-spec/restaurant-management-system-fullstack.git restaurant-management-system
cd restaurant-management-system

# Make deploy script executable
chmod +x deploy.sh
```

## ✅ Step 5: Configure Backend

```bash
cd /var/www/restaurant-management-system/backend

# Create .env file
cat > .env << 'EOF'
DATABASE_URL=postgresql://restaurant_user:your_secure_password@localhost/restaurant_db
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this
FLASK_ENV=production
FLASK_APPP=main.py
EOF

# Create systemd service for backend
sudo tee /etc/systemd/system/restaurant-backend.service > /dev/null << 'EOF'
[Unit]
Description=Restaurant Management Backend
After=network.target postgresql.service

[Service]
User=root
WorkingDirectory=/var/www/restaurant-management-system/backend
Environment="PATH=/var/www/restaurant-management-system/backend/venv/bin"
ExecStart=/var/www/restaurant-management-system/backend/venv/bin/python main.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
sudo systemctl enable restaurant-backend
sudo systemctl start restaurant-backend
```

## ✅ Step 6: Configure Nginx

```bash
# Create Nginh config
sudo tee /etc/nginx/sites-available/restaurant > /dev/null << 'EOF'
server {
    listen 80;
    server_name your-domain.com;  # Change this to your domain

    # Frontend
    location / {
        root /var/www/html/restaurant;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/restaurant /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Create frontend directory
sudo mkdir -p /var/www/html/restaurant

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

## ✅ Step 7: Setup GitHub Secrets

Go to your GitHub repository:  
**Settings → Secrets and variables → Actions → New repository secret**

Add these 3 secrets:

1. **VPS_HOST**: Your VPS IP address (e.g., 123.45.67.89)
2. **VPS_USERNAME**: SSH username (usually `root`)
3. **VPS_SSH_KEY**: Your private SSH key (see below)

### Generate SSH Key on VPS:

```bash
# On your VPS, generate SSH key
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions -N ""

# Add public key to authorized_keys
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys

# Copy private key (paste this in GitHub secret VPS_SSH_KEY)
cat ~/.ssh/github_actions
```

## ✅ Step 8: Initial Deployment

```bash
# Run deploy script manually first time
cd /var/www/restaurant-management-system
./deploy.sh
```

## 🎉 Done! Now Push from VS Code → Auto Deploy!

From now on:
1. Edit code in VS Code
2. Commit: `git commit -am "Your changes"`
3. Push: `git push origin main`
4. GitHub Actions automatically deploys to your VPS! 🚀

---

## 🔍 Useful Commands

```bash
# Check backend status
sudo systemctl status restaurant-backend

# View backend logs
sudo journalctl -u restaurant-backend -f

# Check Nginx status
sudo systemctl status nginx

# Restart services
sudo systemctl restart restaurant-backend
sudo systemctl restart nginx

# Manual deploy
cd /var/www/restaurant-management-system
./deploy.sh
```

---

## 📱 Access Your App

- **Frontend**: http://your-domain.com
- **Backend API**: http://your-domain.com/api
- **Admin Login**: admin / admin123

---

Made with ❤️ by Rube AI for Ankit Rajput