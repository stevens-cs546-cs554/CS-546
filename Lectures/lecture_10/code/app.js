// We first require our express package
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const movieData = require("./data.js");

// We create our express isntance:
const app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json

// Middlewares:

// 1. One which will count the number of requests made to your website

// Request is the request object, just like how we have access to the request in our routes
// Response is the response object, just like how we have access to the response in our routes
// next is a callback that will call the next middleware registered, or proceed to routes if none exist.
// If we do not call next(), we need to make sure we send a response of some sort or it will poll forever!
let currentNumberOfRequests = 0;
app.use(function(request, response, next) {
  currentNumberOfRequests++;
  console.log(
    "There have now been " +
      currentNumberOfRequests +
      " requests made to the website."
  );
  next();
});

// 2. One which will count the number of requests that have been made to the current path
const pathsAccessed = {};
app.use(function(request, response, next) {
  if (!pathsAccessed[request.path]) pathsAccessed[request.path] = 0;

  pathsAccessed[request.path]++;

  console.log(
    "There have now been " +
      pathsAccessed[request.path] +
      " requests made to " +
      request.path
  );
  next();
});

// 3. One which will log the last time the user has made a request, and store it in a cookie.
app.use(function(request, response, next) {
  // If we had a user system, we could check to see if we could access /admin

  console.log("The request has all the following cookies:");
  console.log(request.cookies);
  if (request.cookies.lastAccessed) {
    console.log(
      "This user last accessed the site at " + request.cookies.lastAccessed
    );
  } else {
    console.log("This user has never accessed the site before");
  }

  // THIS SECTION WILL EXPIRE THE COOKIE EVERY 5th request
  if (currentNumberOfRequests % 5 === 0) {
    console.log("now clearing the cookie");

    const anHourAgo = new Date();
    anHourAgo.setHours(anHourAgo.getHours() - 1);

    // invalidate, then clear so that lastAccessed no longer shows up on the
    // cookie object
    // response.cookie("lastAccessed", "", { expires: anHourAgo });
    response.clearCookie("lastAccessed");

    next();
    return;
  }

  const now = new Date();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  // Providing a third parameter is optional, but allows you to set options for the cookies.
  // see: http://expressjs.com/en/api.html#res.cookie
  // for details on what you can do!
  response.cookie("lastAccessed", now.toString(), { expires: expiresAt });
  next();
});

// 4. One which will deny all users access to the /admin path.
app.use("/admin", function(request, response, next) {
  // If we had a user system, we could check to see if we could access /admin

  console.log(
    "Someone is trying to get access to /admin! We're stopping them!"
  );
  response.status(403).send("You cannot access /admin");
});

// 5. Where we add a number to the request object
app.use(function(request, response, next) {
  request.currentRequestEntry = currentNumberOfRequests;
  request.isEven = currentNumberOfRequests % 2 === 0;
  request.isOdd = currentNumberOfRequests % 2 === 1;

  next();
});

// 6. Where we check if there's an odd or even request being made
app.use(function(request, response, next) {
  console.log("We are now looking at request " + request.currentRequestEntry);
  if (request.isOdd) {
    console.log(
      "This is an odd request; we should see if there's anything wrong with it."
    );
    response.pun = "That really bad odd pun";
  }

  if (request.isEven) {
    console.log(
      "This request is getting even with somebody -- I hope they're not too rough"
    );
    response.pun = "Something about vengeance";
  }

  next();
});

// 7. Where we log which pun happened
app.use(function(request, response, next) {
  console.log("We made a pun, it was bad");
  console.log(response.pun);
  next();
});

const logRequest = (req, res, next) => {
  console.log(req);
  next();
};

// Get the best movies
app.get(
  "/api/movies/best",
  logRequest,
  logRequest,
  async (request, response, next) => {
    const popularMovies = await movieData.getPopularMovies();

    response.json(popularMovies);
  }
);

// Get a single movie
app.get("/api/movies/:id", async function(request, response) {
  const movie = await movieData.getMovie(request.params.id);
  try {
    response.json(movie);
  } catch (errorMessage) {
    response.status(500).json({ error: errorMessage });
  }
});

// Get all the movies
app.get("/api/movies", async function(request, response) {
  const movieList = await movieData.getAllMovies();
  response.json(movieList);
});

// Create a movie
app.post("/api/movies", async function(request, response) {
  try {
    const { title, rating } = request.body;
    const movie = await movieData.createMovie(title, rating);

    response.json(movie);
  } catch (errorMessage) {
    response.status(500).json({ error: errorMessage });
  }
});

// Update a movie
app.put("/api/movies/:id", async function(request, response) {
  try {
    const { title, rating } = request.body;
    const movie = await movieData.updateMovie(request.params.id, title, rating);
    response.json(movie);
  } catch (errorMessage) {
    response.status(500).json({ error: errorMessage });
  }
});

app.delete("/api/movies/:id", async function(request, response) {
  try {
    const status = await movieData.deleteMovie(request.params.id);
    response.json({ success: status });
  } catch (errorMessage) {
    response.status(500).json({ error: errorMessage });
  }
});

app.get("/admin*", function(request, response) {
  response.status(200).send("Oh my! You're in the admin panel!");
});

// We can now navigate to localhost:3000
app.listen(3000, function() {
  console.log(
    "Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it"
  );
});
