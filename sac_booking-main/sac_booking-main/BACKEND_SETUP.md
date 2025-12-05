# Backend Setup Complete! 🎉

## ✅ What's Been Implemented

### 1. **MongoDB Models** (`backend/models/`)
- ✅ `Student.js` - Student schema with email validation, password hashing
- ✅ `Show.js` - Show schema with `allowedGender` field
- ✅ `Booking.js` - Booking schema with unique seat constraint

### 2. **Authentication** (`backend/routes/auth.js` & `backend/controllers/authController.js`)
- ✅ POST `/api/auth/register` - Register with email domain validation
- ✅ POST `/api/auth/login` - Login with JWT token generation
- ✅ Email must end with `@rguktn.ac.in`
- ✅ Password hashing with bcrypt
- ✅ JWT token includes: `{ id, email, gender, role: "student" }`

### 3. **JWT Middleware** (`backend/middleware/auth.js`)
- ✅ Verifies `Authorization: Bearer <token>` header
- ✅ Attaches `req.user = { id, email, gender, role }` to requests
- ✅ Validates token and checks if user exists

### 4. **Shows Endpoint** (`backend/routes/shows.js`)
- ✅ GET `/api/shows` - Returns ONLY shows matching user's gender
- ✅ **CRUCIAL**: Filters by `show.allowedGender === req.user.gender`
- ✅ Requires authentication

### 5. **Booking Endpoint** (`backend/routes/booking.js`)
- ✅ POST `/api/book` - Create booking with gender validation
- ✅ **CRUCIAL**: Rejects if `show.allowedGender !== req.user.gender`
- ✅ Returns 403: "Not allowed to book this show" for gender mismatch
- ✅ GET `/api/book/my-bookings` - Get user's bookings

### 6. **Server Setup** (`server.js`)
- ✅ Express server with CORS
- ✅ MongoDB connection
- ✅ All routes configured
- ✅ Health check endpoint

## 🚀 How to Run

### 1. Start MongoDB
```bash
# Make sure MongoDB is running
mongod
# or if using a service:
sudo systemctl start mongod
```

### 2. Seed Initial Data (Optional)
```bash
npm run seed
```

### 3. Start the Backend Server
```bash
npm run server
```

The server will run on `http://localhost:5000`

## 📡 API Testing

### Register a Student
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

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "n220866@rguktn.ac.in",
    "password": "password123"
  }'
```

### Get Shows (requires token)
```bash
curl -X GET http://localhost:5000/api/shows \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Book a Seat (requires token)
```bash
curl -X POST http://localhost:5000/api/book \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "showId": "SHOW_ID_HERE",
    "seatNumber": "A5"
  }'
```

## 🔐 Security Features Implemented

✅ Email domain validation (`@rguktn.ac.in` only)  
✅ Password hashing with bcrypt (10 salt rounds)  
✅ JWT token authentication  
✅ Gender-based access control  
✅ Protected routes with middleware  
✅ Duplicate booking prevention  
✅ Seat validation  

## 🚻 Gender-Based Access Control

- ✅ Male students see ONLY male shows
- ✅ Female students see ONLY female shows
- ✅ Booking rejected if gender doesn't match show's `allowedGender`
- ✅ All validation happens at API level

## ⚠️ Error Messages

All error messages match requirements:
- `Email must end with @rguktn.ac.in`
- `Not allowed to book this show`
- `User already exists`
- `Invalid email or password`

## 📁 Project Structure

```
sac/
├── server.js                 # Main server entry point
├── backend/
│   ├── models/
│   │   ├── Student.js       # Student model
│   │   ├── Show.js          # Show model
│   │   └── Booking.js       # Booking model
│   ├── controllers/
│   │   └── authController.js # Auth logic
│   ├── routes/
│   │   ├── auth.js          # Auth routes
│   │   ├── shows.js         # Shows routes
│   │   └── booking.js        # Booking routes
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   └── scripts/
│       └── seedData.js      # Seed initial shows
└── .env                     # Environment variables
```

## ✅ All Requirements Met

- ✅ Login/Register ONLY with @rguktn.ac.in emails
- ✅ Registration fields: name, rollNumber, email, gender, password
- ✅ Password hashing with bcrypt
- ✅ JWT token with { id, email, gender, role }
- ✅ Gender-based show filtering
- ✅ Gender-based booking restriction
- ✅ All error messages as specified
- ✅ Clean, modular, production-ready code



