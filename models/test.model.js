const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema({
  pin: {
    type: String,
    required: true,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    default: 0,
  },
  amount: {
    type: String,
    required: true,
    default: 0,
  },
  topic: {
    type: String,
    required: true,
    default: 0,
  },
  time: {
    type: String,
    required: true,
    default: 0,
  },
  expiry: {
    type: Date,
    required: true,
    default: 0,
  },
  created: {
    type: Date,
    required: true,
    default: 0,
  },
});

const test = mongoose.model("Test", testSchema);

module.exports = test;
