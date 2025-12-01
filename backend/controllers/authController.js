const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const { JWT_SECRET } = require('../middleware/auth');

// Validate email domain
const validateEmailDomain = (email) => {
  return email.endsWith('@rguktn.ac.in');
};

// Register new student
const register = async (req, res) => {
  try {
    const { name, rollNumber, email, gender, password } = req.body;

    // Validate required fields
    if (!name || !rollNumber || !email || !gender || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email domain
    if (!validateEmailDomain(email)) {
      return res.status(400).json({ message: 'Email must end with @rguktn.ac.in' });
    }

    // Validate gender
    if (gender !== 'male' && gender !== 'female') {
      return res.status(400).json({ message: 'Gender must be either "male" or "female"' });
    }

    // Check if user already exists
    const existingUser = await Student.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new student
    const student = new Student({
      name,
      rollNumber,
      email: email.toLowerCase(),
      gender,
      passwordHash,
    });

    await student.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        gender: student.gender,
        role: 'student'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user profile (without password)
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        email: student.email,
        gender: student.gender,
        createdAt: student.createdAt
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'User already exists' });
    }
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Login student
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Validate email domain
    if (!validateEmailDomain(email)) {
      return res.status(400).json({ message: 'Email must end with @rguktn.ac.in' });
    }

    // Find user
    const student = await Student.findOne({ email: email.toLowerCase() });
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        gender: student.gender,
        role: 'student'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user profile (without password)
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        email: student.email,
        gender: student.gender,
        createdAt: student.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

module.exports = { register, login };



