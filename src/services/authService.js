const bcrypt = require('bcrypt');
const { getUserByUsername, createUser } = require('../models/userModel');

const registerUser = async (type, userData) => {
  const existing = await getUserByUsername(type, userData.username);
  if (existing) return { success: false, message: 'Username already exists' };

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await createUser(type, { ...userData, password_hash: hashedPassword });

  return { success: true, user: newUser };
};

const authenticateUser = async (type, username, password) => {
  const user = await getUserByUsername(type, username);
  if (!user) return { success: false, message: 'User not found' };

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return { success: false, message: 'Invalid password' };

  return { success: true, user };
};

module.exports = { registerUser, authenticateUser };
