import mongoose from 'mongoose';

// Define the schema for User
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  birthday: String,
  gender: String
});

const users = mongoose.model('users', userSchema);

export default users;
