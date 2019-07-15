var MongoClient = require("mongodb").MongoClient,
  settings = require("./config.js"),
  Guid = require("guid");

var fullMongoUrl =
  settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup() {
  return MongoClient.connect(fullMongoUrl)
    .then(function(db) {
      return db
        .collection("advancedMovies")
        .drop()
        .then(
          function() {
            return db;
          },
          function() {
            // We can recover from this; if it can't drop the collection, it's because
            // the collection does not exist yet!
            return db;
          }
        );
    })
    .then(function(db) {
      // We've either dropped it or it doesn't exist at all; either way, let's make
      // a new version of the collection
      return db.createCollection("advancedMovies");
    })
    .then(function(movieCollection) {
      var docId = 0;

      var makeDoc = function(title, rating, released, director) {
        return {
          _id: ++docId,
          title: title,
          rating: rating,
          reviews: [],
          cast: [],
          info: {
            release: released,
            director: director
          }
        };
      };

      var addReview = function(movie, title, comment, reviewer, rating) {
        var newReview = {
          _id: Guid.create().toString(),
          title: title,
          comment: comment,
          reviewer: reviewer,
          rating: rating
        };

        movie.reviews.push(newReview);
      };

      var listOfMovies = [];

      var inception = makeDoc("Inception", 4.5, 2015, "Christopher Nolan");
      inception.cast.push(
        "Leonardo DiCaprio",
        "Ellen Page",
        "Ken Watanabe",
        "Joseph Gordon-Levitt",
        "Marion Cotillard",
        "Tom Hardy"
      );
      addReview(
        inception,
        "Really Good",
        "This movie was so interesting.",
        "Phil",
        4.5
      );
      addReview(inception, "Bad", "This movie is trite.", "Agatha", 2);
      addReview(
        inception,
        "Perfect",
        "Leo should win an Oscar for this.",
        "Definitely Not Leo",
        4
      );

      var theLastSamurai = makeDoc(
        "The Last Samurai",
        3.8,
        2003,
        "Edward Zwick"
      );
      theLastSamurai.cast.push(
        "Tom Cruise",
        "Timothy Spall",
        "Ken Watanabe",
        "Billy Connolly",
        "Tony Goldwyn",
        "Masato Harada",
        "Hiroyuki Sanada",
        "Koyuki",
        "Shin Koyamada"
      );

      var darkKnightRises = makeDoc(
        "Batman: The Dark Knight Rises",
        5,
        2012,
        "Christopher Nolan"
      );
      darkKnightRises.cast.push(
        "Christian Bale",
        "Michael Caine",
        "Gary Oldman",
        "Anne Hathaway",
        "Tom Hardy",
        "Marion Cotillard",
        "Joseph Gordon-Levitt",
        "Morgan Freeman"
      );
      addReview(
        darkKnightRises,
        "Aggressively mediocre",
        "Not much to say; it was okay.",
        "Sallie",
        3
      );
      addReview(
        darkKnightRises,
        "The best of the series",
        "This movie was the epitome of the underdog tale",
        "Phil",
        5
      );

      var kingsman = makeDoc(
        "Kingsman: The Secret Service",
        3.2,
        2015,
        "Matthew Vaughn"
      );
      kingsman.cast.push(
        "Colin Firth",
        "Samuel L. Jackson",
        "Mark Strong",
        "Taron Egerton",
        "Sophie Cookson",
        "Jack Davenport",
        "Mark Hamill",
        "Michael Caine"
      );

      addReview(
        kingsman,
        "Unexpectedly good",
        "I really liked it!",
        "Sallie",
        4
      );
      addReview(
        kingsman,
        "New favorite movie",
        "Wow, that was really fun!",
        "Alexander",
        4.5
      );

      listOfMovies.push(inception, theLastSamurai, darkKnightRises, kingsman);

      // we can use insertMany to insert an array of documents!
      return movieCollection.insertMany(listOfMovies).then(function() {
        return movieCollection.find().toArray();
      });
    });
}

// By exporting a function, we can run
var exports = (module.exports = runSetup);
