var MongoClient = require("mongodb").MongoClient,
  runStartup = require("./startup.js"),
  settings = require("./config.js"),
  Guid = require("Guid");

var fullMongoUrl =
  settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = (module.exports = {});

runStartup().then(function(allMovies) {
  console.log(
    "After the setup has been complete, we have the following movies:"
  );
  console.log(allMovies);
});

MongoClient.connect(fullMongoUrl).then(function(db) {
  var movieCollection = db.collection("movies");

  // Our easiest to follow function!
  exports.getAllMovies = function() {
    // collection.find() returns a cursor, a special mongoDB object that acts as an interface to the
    // results;

    // If we call find() without an argument, it will return a cursor to the entire collection
    // It may paginate!

    // by calling .toArray() on the find cursor, it converts it to the promise that resolves
    // an array of all the results
    return movieCollection.find().toArray();
  };

  // we can still update our data module by adding properties here, even though it's inside a callback!
  exports.getMovie = function(id) {
    if (!id) return Promise.reject("You must provide an ID");

    // by calling .toArray() on the function, we convert the Mongo Cursor to a promise where you can
    // easily iterate like a normal array
    return movieCollection
      .find({ _id: id })
      .limit(1)
      .toArray()
      .then(function(listOfMovies) {
        if (listOfMovies.length === 0)
          throw "Could not find movie with id of " + id;

        return listOfMovies[0];
      });
  };

  // creating data in MongoDB is very easy, as we can just use a simple insert method
  exports.createMovie = function(title, rating) {
    if (!title) return Promise.reject("You must provide a title");
    if (rating == null || rating === undefined || rating < 0 || rating > 5)
      return Promise.reject("You have provided an invalid rating");

    // Our insertOne method takes a JSON object as its first parameter;
    // there are overloads that have more parameters
    // You'll notice we name our "id" as "_id"; MongoDB has a few quirks.
    // One is that it will index all documents on the _id field,
    // Which must be a unique identifier.
    // Curiously, it doesn't let you rename it to something more sane.
    // Like 'id'.
    // Because, you know, reasons.
    return movieCollection
      .insertOne({
        _id: Guid.create().toString(),
        title: title,
        rating: rating
      })
      .then(function(newDoc) {
        return newDoc.insertedId;
      })
      .then(function(newId) {
        return exports.getMovie(newId);
      });
  };

  // This is just a preview!
  // We can find on a few limited operations
  exports.getPopularMovies = function() {
    // a preview of advanced querying!
    return movieCollection.find({ rating: { $gte: 3 } }).toArray();
  };

  exports.updateMovie = function(id, newTitle, newRating) {
    if (!id) return Promise.reject("You must provide an ID");
    if (!newTitle) return Promise.reject("You must provide a title");
    if (
      newRating == null ||
      newRating === undefined ||
      newRating < 0 ||
      newRating > 5
    )
      return Promise.reject("You have provided an invalid rating");

    // our first parameters is a way of describing the document to update;
    // our second will be a replacement version of the document;
    // next week we will learn how to use mongo atomic updates
    return movieCollection
      .updateOne({ _id: id }, { title: newTitle, rating: newRating })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.deleteMovie = function(id) {
    if (!id) return Promise.reject("You must provide an ID");

    return movieCollection.deleteOne({ _id: id }).then(function(deletionInfo) {
      if (deletionInfo.deletedCount === 0)
        throw "Could not find the document with this id to delete";

      return true;
    });
  };
});
