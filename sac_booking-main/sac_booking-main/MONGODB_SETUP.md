# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start) ⭐

**No installation needed!** Use free cloud MongoDB.

### Steps:

1. **Create free account at:** https://www.mongodb.com/cloud/atlas/register

2. **Create a free cluster** (M0 - Free tier)

3. **Get connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)

4. **Update `.env` file:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sac-booking?retryWrites=true&w=majority
   ```

5. **Restart server:**
   ```bash
   npm run server
   ```

## Option 2: Install MongoDB Locally

### On Kali/Debian/Ubuntu:

```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Check status
sudo systemctl status mongodb
```

### On Other Linux:

Visit: https://www.mongodb.com/docs/manual/installation/

## Option 3: Use Docker (if installed)

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Check if running
docker ps | grep mongodb
```

## Verify Connection

After setup, test the connection:

```bash
# Health check
curl http://localhost:5000/api/health

# Seed data (if local MongoDB)
npm run seed
```

## Current Status

Your server is running on `http://localhost:5000`

Once MongoDB is connected, you'll see:
```
✅ MongoDB connected successfully
```

**Quick Start: Use MongoDB Atlas - it's free and takes 5 minutes!**



