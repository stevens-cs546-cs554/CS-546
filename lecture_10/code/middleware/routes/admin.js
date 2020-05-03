const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ route: '/admin', method: req.method });
});

router.get('/dashboard', async (req, res) => {
  res.json({ route: '/admin/dashboard', method: req.method });
});

module.exports = router;
