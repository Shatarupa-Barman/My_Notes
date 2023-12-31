const mongoose = require('mongoose');

const { Schema } = mongoose;
//const Schema=mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, maxLength: 10, minLength: 3 },
  mobile: { type: String },
  email_opt: { type: String },
  mobile_otp: { type: String },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;