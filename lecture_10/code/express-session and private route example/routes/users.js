const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
  res.json({ route: '/users', method: req.method });
});

router.post('/', async (req, res) => {
  res.json({ route: '/users', method: req.method });
});

router.post('/login', async (req, res) => {
  /*get req.body username and password
	const { username, password } = req.body;
	here, you would get the user from the db based on the username, then you would read the hashed pw
	and then compare it to the pw in the req.body
	let match = bcrypt.compare(password, 'HASHED_PW_FROM DB');
	if they match then set req.session.user and then redirect them to the login page
	 I will just do that here */
  req.session.user = { firstName: 'Patrick', lastName: 'Hill', userId: 123 };
  res.redirect('/private');
});

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.send('Logged out');
});

module.exports = router;
