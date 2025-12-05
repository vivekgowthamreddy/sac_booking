# SAC Ticket Booking System - Backend API

## 🚀 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Set a secure `JWT_SECRET` for production

3. **Start MongoDB:**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/sac-booking`

4. **Run the server:**
   ```bash
   npm run server
   # or for development with auto-reload:
   npm install -g nodemon
   npm run dev:server
   ```

## 📡 API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new student.

**Request Body:**
```json
{
  "name": "John Doe",
  "rollNumber": "N220866",
  "email": "n220866@rguktn.ac.in",
  "gender": "male",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "token": "jwt-token-here",
  "user": {
    "id": "...",
    "name": "John Doe",
    "rollNumber": "N220866",
    "email": "n220866@rguktn.ac.in",
    "gender": "male",
    "createdAt": "..."
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "n220866@rguktn.ac.in",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": { ... }
}
```

### Shows

#### GET `/api/shows`
Get all shows filtered by user's gender.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Shows retrieved successfully",
  "shows": [
    {
      "_id": "...",
      "movie": "Inception",
      "date": "2025-12-01",
      "time": "18:00",
      "allowedGender": "male",
      "rows": 10,
      "cols": 10
    }
  ]
}
```

### Booking

#### POST `/api/book`
Create a new booking.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "showId": "show-id-here",
  "seatNumber": "A5"
}
```

**Response:**
```json
{
  "message": "Booking successful",
  "booking": {
    "id": "...",
    "showId": "...",
    "seatNumber": "A5",
    "timestamp": "...",
    "show": { ... }
  }
}
```

#### GET `/api/book/my-bookings`
Get all bookings for the logged-in user.

**Headers:**
```
Authorization: Bearer <token>
```

## 🔐 Security Features

- ✅ Email domain validation (@rguktn.ac.in only)
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Gender-based access control
- ✅ Protected routes with middleware

## 🚻 Gender-Based Access Control

- Students can ONLY see shows matching their gender
- Students can ONLY book shows matching their gender
- All gender mismatches return 403 Forbidden

## 📋 Error Messages

- `Email must end with @rguktn.ac.in` - Invalid email domain
- `User already exists` - Registration with existing email
- `Not allowed to book this show` - Gender mismatch
- `Invalid email or password` - Login failure
- `No token provided` - Missing authentication token



