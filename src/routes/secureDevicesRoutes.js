const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

  res.json({
    message: 'Access granted to protected route.',
    user: req.user, // contains { id, type }
  });
  
});

module.exports = router;
