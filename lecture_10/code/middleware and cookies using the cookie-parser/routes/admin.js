const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log("I'm in the admin route");
  res.json({ route: '/admin', method: req.method });
});

router.get('/dashboard', async (req, res) => {
  console.log("I'm in the admin/dashboard route");
  res.json({ route: '/admin/dashboard', method: req.method });
});

module.exports = router;
