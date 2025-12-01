const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: [true, 'Movie name is required'],
    trim: true,
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  allowedGender: {
    type: String,
    required: [true, 'Allowed gender is required'],
    enum: {
      values: ['male', 'female'],
      message: 'Allowed gender must be either "male" or "female"'
    }
  },
  rows: {
    type: Number,
    required: [true, 'Number of rows is required'],
    min: [1, 'Rows must be at least 1']
  },
  cols: {
    type: Number,
    required: [true, 'Number of columns is required'],
    min: [1, 'Columns must be at least 1']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Show', showSchema);



