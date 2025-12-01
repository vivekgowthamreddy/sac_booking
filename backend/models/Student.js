const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /@rguktn\.ac\.in$/.test(v);
      },
      message: 'Email must end with @rguktn.ac.in'
    }
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['male', 'female'],
      message: 'Gender must be either "male" or "female"'
    }
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Method to compare password
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('Student', studentSchema);



