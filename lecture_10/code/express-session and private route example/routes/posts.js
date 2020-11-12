const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
  res.json({ route: `/posts/${req.params.id}`, method: req.method });
});

router.get('/', async (req, res) => {
  res.json({ route: '/posts', method: req.method });
});

router.post('/', async (req, res) => {
  res.json({ route: '/posts', method: req.method });
});

router.put('/:id', async (req, res) => {
  res.json({ route: `/posts/${req.params.id}`, method: req.method });
});

router.patch('/:id', async (req, res) => {
  res.json({ route: `/posts/${req.params.id}`, method: req.method });
});

router.delete('/:id', async (req, res) => {
  res.json({ route: `/posts/${req.params.id}`, method: req.method });
});

module.exports = router;
