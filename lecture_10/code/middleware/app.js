const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
app.use(cookieParser());

app.use(express.json());

app.use(
	session({
		name: 'PatricksSession',
		secret: "This is a secret.. shhh don't tell anyone",
		saveUninitialized: true,
		resave: false
	})
);

let totalRequests = 0;

app.use(async (req, res, next) => {
	totalRequests++;
	console.log(`There have been ${totalRequests} requests made to the server`);
	next();
});

const pathsAccessed = {};

app.use(async (req, res, next) => {
	if (!pathsAccessed[req.path]) pathsAccessed[req.path] = 0;

	pathsAccessed[req.path]++;

	console.log(`There have now been ${pathsAccessed[req.path]} requests made to ${req.path}`);
	next();
});

app.use(async (req, res, next) => {
	if (totalRequests % 2 === 0) {
		req.isEven = true;
	} else {
		req.isOdd = true;
	}

	next();
});

app.use(async (req, res, next) => {
	if (req.isEven) {
		req.pun = 'Someone is looking to get even.  ';
	}

	if (req.isOdd) {
		req.pun = "This is an odd request that doesn't make me feel comfortable  ";
	}
	next();
});

app.use(async (req, res, next) => {
	console.log(req.pun);
	next();
});

app.use('/admin', async (req, res, next) => {
	console.log("I'm in the admin middleware");
	return res.status(403).json({ error: '403: Forbidden' });
	next();
});

app.use('/posts', async (req, res, next) => {
	console.log(req);

	if (req.method == 'GET') {
		req.method = 'PUT';
	}
	next();
});

app.use(async (req, res, next) => {
	console.log(req.cookies);

	if (req.cookies.lastAccessed) {
		console.log(`This user last accessed the site at ${req.cookies.lastAccessed}`);
	} else {
		console.log('This is the first time the user has accessed the site');
	}

	if (totalRequests % 5 === 0) {
		console.log('Clearing the cookie');

		const anHourAgo = new Date();
		anHourAgo.setHours(anHourAgo.getHours() - 1);
		res.clearCookie('lastAccessed');
		next();
		return;
	}

	const now = new Date();
	const expiresAt = new Date();
	expiresAt.setHours(expiresAt.getHours() + 1);
	res.cookie('lastAccessed', now.toString(), { expires: expiresAt });
	next();
});

app.use(async (req, res, next) => {
	console.log(req.session.id);

	if (req.session.user) {
		console.log(`we have a user, here is their info: ${JSON.stringify(req.session.user)}`);
	} else {
		console.log('there is no user set');
	}

	console.log(`foo is ${req.session.foo}`);
	if (totalRequests % 5 === 0) {
		console.log('Clearing the session cookie');

		const anHourAgo = new Date();
		anHourAgo.setHours(anHourAgo.getHours() - 1);
		//req.session.user = undefined;
		req.session.foo = 'bar';
		//or to clear all the session props
		req.session.cookie.expires = anHourAgo;
		//req.session.destroy()

		next();
		return;
	}

	const expiresAt = new Date();
	expiresAt.setHours(expiresAt.getHours() + 1);

	req.session.user = { firstName: 'Patrick', lastName: 'Hill', userId: 123 };
	req.session.cookie.expires = expiresAt;

	next();
});

app.use(async (req, res, next) => {
	console.log(req.session.bar);
	next();
});

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});
