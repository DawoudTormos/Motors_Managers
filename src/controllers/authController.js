const { registerUser, authenticateUser } = require('../services/authService');
const { signToken } = require('../utils/jwt');


const signup = async (req, res) => {
  try {
    const { username, password, address, phone_number, type } = req.body;

    if (!['admin', 'subscriber'].includes(type)) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    const extraFields = type === 'subscriber'
      ? {
          energy_limit: req.body.energy_limit || 0,
          current_limit: req.body.current_limit || 0,
        }
      : {};

    const result = await registerUser(type, {
      username,
      password,
      address,
      phone_number,
      ...extraFields,
    });

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    const { password_hash, ...safeUser } = result.user;
    const token = signToken({ id: safeUser.id, type });

    return res.status(201).json({
      message: 'Signup successful',
      user: safeUser,
      token,
    });

  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === '22001') {
      return res.status(500).json({ message: 'value too long for type.' });
    }
    return res.status(500).json({ message: 'Internal server error during signup.' });
  }
};


const login = async (req, res) => {
  try {
    const { username, password, type } = req.body;

    if (!['admin', 'subscriber'].includes(type)) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    const result = await authenticateUser(type, username, password);

    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }

    const { password_hash, ...safeUser } = result.user;
    const token = signToken({ id: safeUser.id, type });

    return res.json({ message: 'Login successful', user: safeUser, token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
};

module.exports = { signup, login };
