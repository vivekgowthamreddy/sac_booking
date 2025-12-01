# MongoDB Atlas Database Integration Setup

## 📋 Setup Instructions

### Step 1: Get MongoDB Atlas Connection String

1. **Create a free MongoDB Atlas account** (if you don't have one):
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up with your email

2. **Create a Cluster**:
   - After login, click "Build a Database"
   - Choose FREE tier (M0)
   - Select a cloud provider and region (closest to you)
   - Click "Create"

3. **Set up Database Access**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter username (e.g., `sacadmin`)
   - Click "Autogenerate Secure Password" or create your own
   - **Copy the password** (you'll need it!)
   - Under "Database User Privileges", select "Read and write to any database"
   - Click "Add User"

4. **Set up Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP
   - Click "Confirm"

5. **Get Connection String**:
   - Go back to "Database" section
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" driver
   - Copy the connection string (looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

### Step 2: Update .env File

1. Open the `.env` file in the project root
2. Replace `<placeholder_for_atlas_url>` with your connection string
3. Replace `<username>` with your database username
4. Replace `<password>` with your database password
5. Add database name before `?retryWrites`:

   **Example:**
   ```env
   MONGO_URI=mongodb+srv://sacadmin:yourpassword@cluster0.xxxxx.mongodb.net/sac-booking?retryWrites=true&w=majority
   JWT_SECRET=supersecretkey123
   PORT=5000
   ```

   **Important:** The connection string should look like:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
   ```

### Step 3: Test Database Connection

1. **Start the server:**
   ```bash
   npm run server
   ```

2. **Check connection:**
   - You should see: `✅ MongoDB Atlas connected successfully`
   - If you see errors, check your connection string in `.env`

3. **Test the database:**
   ```bash
   curl http://localhost:5000/api/db-test
   ```
   
   Should return:
   ```json
   {"success": true, "message": "MongoDB connection working"}
   ```

### Step 4: Seed Sample Shows

1. **Run the seed script:**
   ```bash
   npm run seed
   ```
   OR
   ```bash
   node backend/seed/seedShows.js
   ```

2. **Expected output:**
   ```
   🔌 Connecting to MongoDB Atlas...
   ✅ Connected to MongoDB Atlas
   🗑️  Cleared existing shows
   ✅ Successfully seeded 3 shows

   📋 Seeded Shows:
     • Avengers (male) - 2025-12-15 18:00
     • Barbie (female) - 2025-12-16 19:00
     • Leo (male) - 2025-12-17 20:00

   ✅ Database seeding completed successfully
   ```

### Step 5: Verify Shows Were Added

1. **Check via API** (after registering/login):
   ```bash
   # First, register a user
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "rollNumber": "N220866",
       "email": "n220866@rguktn.ac.in",
       "gender": "male",
       "password": "password123"
     }'

   # Then login to get token
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "n220866@rguktn.ac.in",
       "password": "password123"
     }'

   # Use the token to get shows (replace TOKEN with actual token)
   curl http://localhost:5000/api/shows \
     -H "Authorization: Bearer TOKEN"
   ```

2. **Check in MongoDB Atlas**:
   - Go to your cluster in Atlas
   - Click "Browse Collections"
   - You should see:
     - `shows` collection with 3 documents
     - `students` collection (after registration)
     - `bookings` collection (after booking)

---

## 🧪 Testing Signup/Login Data Persistence

### Test Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "rollNumber": "N220866",
    "email": "n220866@rguktn.ac.in",
    "gender": "male",
    "password": "password123"
  }'
```

**Verify in MongoDB Atlas:**
- Go to "Browse Collections"
- Open `students` collection
- You should see the new student document with:
  - name: "John Doe"
  - rollNumber: "N220866"
  - email: "n220866@rguktn.ac.in"
  - gender: "male"
  - passwordHash: (hashed password)

### Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "n220866@rguktn.ac.in",
    "password": "password123"
  }'
```

Should return a JWT token and user data.

---

## 📁 File Structure

```
sac/
├── .env                          ✅ Environment variables
├── server.js                     ✅ Updated to use connectDB
├── backend/
│   ├── config/
│   │   └── db.js                ✅ Database connection module
│   ├── models/
│   │   ├── Student.js           ✅ Uses active mongoose connection
│   │   ├── Show.js              ✅ Uses active mongoose connection
│   │   └── Booking.js           ✅ Uses active mongoose connection
│   └── seed/
│       └── seedShows.js         ✅ Seed script with sample shows
└── package.json                 ✅ Updated seed script
```

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas account created
- [ ] Database user created with read/write access
- [ ] Network access configured (IP whitelist)
- [ ] Connection string copied
- [ ] `.env` file updated with correct MONGO_URI
- [ ] Server starts successfully with database connection
- [ ] `/api/db-test` returns success
- [ ] Seed script runs successfully
- [ ] Shows appear in MongoDB Atlas
- [ ] Registration creates student in database
- [ ] Login works with database credentials

---

## 🐛 Troubleshooting

### Error: "MONGO_URI is not set"
- Check that `.env` file exists in project root
- Verify `MONGO_URI` is spelled correctly (not `MONGODB_URI`)
- Make sure connection string is on one line

### Error: "Authentication failed"
- Check username and password in connection string
- Verify special characters in password are URL-encoded
- Recreate database user if needed

### Error: "IP not whitelisted"
- Go to Network Access in Atlas
- Add your current IP address or allow from anywhere

### Connection timeout
- Check your internet connection
- Verify cluster is running in Atlas
- Check if firewall is blocking connection

---

## 📝 Quick Reference

**Start server:**
```bash
npm run server
```

**Seed shows:**
```bash
npm run seed
```

**Test database:**
```bash
curl http://localhost:5000/api/db-test
```

**Connection string format:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

---

**🎉 Once setup is complete, your database will persist all data!**


