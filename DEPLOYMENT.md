# 🚀 One-Click Deployment Setup for Hostinger VPS

## Prerequisites
- Hostinger VPS with Ubuntu 20.04 or higher
- SSH access to your VPS
- Domain name pointed to your VPS IP

## 🔧 Quick Setup (2 Steps)

### Step 1: SSH into Your VPS and Run Deployment Script

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Download and run the deployment script
curl -o deploy.sh https://raw.githubusercontent.com/rumbleveer-spec/restaurant-management-system-fullstack/main/deploy.sh
chmod +x deploy.sh
sudo ./deploy.sh
```

### Step 2: Add GitHub Secrets for Auto-Deploy

Go to your GitHub repository → Settings → Secrets and Variables → Actions

Add these secrets:

1. **VPS_HOST**: Your VPS IP address (e.g., `192.168.1.100`)
2. **VPS_USERNAME**: Usually `root` or `ubuntu`
3. **VPS_PORT**: SSH port (usually `22`)
4. **VPS_SSH_KEY**: Your private SSH key (see below)

---

## 🔑 Generate SSH Key for GitHub Actions

Run these commands **on your VPS**:

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github-actions -N ""

# Add public key to authorized_keys
cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys

# Display private key (copy this to GitHub secret VPS_SSH_KEY)
cat ~/.ssh/github-actions
```

Copy the entire output of the last command (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`) and paste it into GitHub secret `VPS_SSH_KEY`.

---

## 🎯 How It Works

1. **Push to GitHub** → Triggers GitHub Actions workflow
2. **GitHub Actions** → SSHs into your VPS
3. **VPS** → Pulls latest code, builds, and restarts services
4. **Done!** → Your app is live

---

## 🔧 Manual Deployment (If Needed)

```bash
# SSH into VPS
ssh root@your-vps-ip

# Navigate to app directory
cd /var/www/restaurant-management

# Pull latest changes
git pull origin main

# Update backend
source venv/bin/activate
pip install -r requirements.txt

# Update frontend
cd frontend/restaurant-dashboard
pnpm install
pnpm run build

# Restart services
sudo systemctl restart restaurant-backend
sudo systemctl restart nginx
```

---

## 📊 Useful Commands

```bash
# Check backend service status
sudo systemctl status restaurant-backend

# View backend logs
sudo journalctl -u restaurant-backend -f

# Check Nginx status
sudo systemctl status nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart services
sudo systemctl restart restaurant-backend
sudo systemctl restart nginx
```

---

## 🛠️ Troubleshooting

### Backend not starting?
```bash
sudo journalctl -u restaurant-backend -n 50
```

### Frontend not loading?
```bash
sudo tail -f /var/log/nginx/error.log
```

### Database connection error?
```bash
sudo -u postgres psql
\l  # List databases
\q  # Quit
```

---

## 🔐 Security Checklist

- [ ] Change default database password in `.env`
- [ ] Change default admin credentials
- [ ] Setup SSL with Let's Encrypt
- [ ] Configure firewall (UFW)
- [ ] Disable root login via SSH
- [ ] Setup regular backups

---

## 📝 Configuration Files Locations

```
/var/www/restaurant-management/          # App root
/var/www/restaurant-management/.env      # Backend config
/var/www/restaurant-management/frontend/restaurant-dashboard/.env  # Frontend config
/etc/systemd/system/restaurant-backend.service  # Backend service
/etc/nginx/sites-available/restaurant    # Nginx config
```

---

## 🚀 From VS Code to Production

1. Make changes in VS Code
2. Commit: `git add . && git commit -m "Your message"`
3. Push: `git push origin main`
4. ✅ Auto-deployed in ~2 minutes!

---

## 📞 Support

Need help? Check the logs or create an issue in the repository.

Made with ❤️ by Ankit Rajput
