const express = require('express');
const app = express();
const cors = require('cors');
const configRoutes = require('./routes');

app.use(cors());
app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});
