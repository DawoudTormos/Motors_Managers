const db = require('../config/db');

const getUserByUsername = async (type, username) => {
  const table = type === 'admin' ? 'admins' : 'subscribers';

  const res = await db.query(`SELECT * FROM ${table} WHERE username = $1`, [username]);
  return res.rows[0];
};

const createUser = async (type, userData) => {
  const table = type === 'admin' ? 'admins' : 'subscribers';
  const commonFields = ['username', 'password_hash', 'address', 'phone_number'];
  const values = [
    userData.username,
    userData.password_hash,
    userData.address,
    userData.phone_number,
  ];

  if (type === 'subscriber') {
    commonFields.push('energy_limit', 'current_limit');
    values.push(userData.energy_limit, userData.current_limit);
  }

  const placeholders = commonFields.map((_, i) => `$${i + 1}`).join(', ');
  const query = `INSERT INTO ${table} (${commonFields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
  console.log(query);
  const result = await db.query(query, values);

  return result.rows[0];
};

module.exports = { getUserByUsername, createUser };
