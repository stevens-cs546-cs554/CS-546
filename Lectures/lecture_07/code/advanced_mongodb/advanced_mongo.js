const MongoClient = require("mongodb").MongoClient,
  runStartup = require("./advanced_startup_docs.js"),
  settings = require("./config.js");

async function main() {
  const allMovies = await runStartup();
  console.log(
    "After the advanced document setup has been complete, we have the following movies:"
  );
  console.log(allMovies);

  const connection = await MongoClient.connect(settings.mongoConfig.serverUrl);
  const db = await connection.db(settings.mongoConfig.database);
  const movieCollection = db.collection("advancedMovies");

  // simple stuff
  exports.getAllMovies = async () => {
    return await movieCollection.find().toArray();
  };

  // more simple stuff
  exports.getMovie = async id => {
    if (id === undefined) throw "You must provide an ID";
    const movie = await movieCollection.findOne({ _id: id });

    if (!movie) {
      throw "Could not find movie with id of " + id;
    }
    return movie;
  };

  // =================
  // Advanced finding
  // =================

  // We can query on subdocuments very easily
  exports.findByDirector = async directorName => {
    if (!directorName) throw "You must provide a director name";

    // to query on a subdocument field, just provide the path to the field as a string key;
    // so when you have {info: {director: someName}}, just find on {"info.director": someName}
    return await movieCollection
      .find({ "info.director": directorName })
      .toArray();
  };

  // For demonstration purposes, let's take an array of ratings and search by that
  exports.findByRatings = async potentialRatings => {
    if (!potentialRatings)
      throw "You must provide an array of potentially matching ratings";

    // ie, passing [3.2, 5] would find movies that have a rating field with 3.2 or 5
    return await movieCollection
      .find({ rating: { $in: potentialRatings } })
      .toArray();
  };

  exports.findMoviesReleasedBefore = async startingYear => {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw "You must give a starting year";

    return await movieCollection
      .find({ "info.release": { $lt: startingYear } })
      .toArray();
  };

  exports.findMoviesReleasedOnOrBefore = async startingYear => {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw "You must give a starting year";

    return await movieCollection
      .find({ "info.release": { $lte: startingYear } })
      .toArray();
  };

  exports.findMoviesReleasedAfter = async startingYear => {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw "You must give a starting year";

    return await movieCollection
      .find({ "info.release": { $gt: startingYear } })
      .toArray();
  };

  exports.findMoviesReleasedOnOrAfter = async startingYear => {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw "You must give a starting year";

    return movieCollection
      .find({ "info.release": { $gte: startingYear } })
      .toArray();
  };

  exports.findMoviesWithDirectorAndYear = async (directorName, releaseYear) => {
    if (!directorName) throw "You must provide a director name";
    if (releaseYear === undefined) throw "You must give a release year";

    // you can pass any number of arguments to your $and, meaning you can also query different
    // things on the same field -- you can check, for example, that it matches 2 text expression
    // or that it exists AND that it is less than a certain value

    // test with: findMoviesWithDirectorAndYear("Christopher Nolan", 2012)
    return await movieCollection
      .find({
        $and: [
          { "info.release": releaseYear },
          { "info.director": directorName }
        ]
      })
      .toArray();
  };

  exports.findMoviesWithDirectorOrYear = async (directorName, releaseYear) => {
    if (!directorName) throw "You must provide a director name";
    if (releaseYear === undefined) throw "You must give a release year";

    // you can pass any number of arguments to your $or, just like $and;
    // This works pretty much as you'd expect, and matches any documents that match ANY of the conditions

    // test with: findMoviesWithDirectorOrYear("Christopher Nolan", 2015)
    return await movieCollection
      .find({
        $or: [
          { "info.release": releaseYear },
          { "info.director": directorName }
        ]
      })
      .toArray();
  };

  // this is a VERY slow operation;
  // it has to traverse the whole collection
  exports.searchByJavaScriptQuery = async keyword => {
    if (!keyword) throw "You must provide a keyword";

    return await movieCollection
      .find({
        $where: "this.title.toLowerCase().indexOf('" + keyword + "') >= 0"
      })
      .toArray();
  };

  // =================
  // Advanced Updating
  // =================

  exports.updateTitle = async (id, newTitle) => {
    if (id === undefined) throw "No id provided";
    if (!newTitle) throw "No title provided";

    // we use $set to update only the fields specified
    await movieCollection.update({ _id: id }, { $set: { title: newTitle } });
    return await exports.getMovie(id);
  };

  exports.updateDirector = function(id, newDirector) {
    if (id === undefined) return Promise.reject("No id provided");
    if (!newDirector) return Promise.reject("No newDirector provided");

    // we use $set to update only the fields specified
    return movieCollection
      .update({ _id: id }, { $set: { "info.director": newDirector } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.bumpReleaseYearUp = function(id) {
    if (id === undefined) return Promise.reject("No id provided");

    // Can increment positively or negatively by any value
    return movieCollection
      .update({ _id: id }, { $inc: { "info.release": 1 } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.doubleRating = function(id) {
    if (id === undefined) return Promise.reject("No id provided");

    // Can multiply positively or negatively by any value
    return movieCollection
      .update({ _id: id }, { $mul: { rating: 2 } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.removeRating = function(id) {
    if (id === undefined) return Promise.reject("No id provided");

    return movieCollection
      .update({ _id: id }, { $unset: { rating: "" } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.updateRatingToMinValue = function(id, newRating) {
    if (id === undefined) return Promise.reject("No id provided");
    if (newRating === undefined) return Promise.reject("no rating provided");

    // if the value is higher than newRating, it will change to newRating; otherwise, it
    // will stay as is
    return movieCollection
      .update({ _id: id }, { $min: { rating: newRating } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.updateRatingToMaxValue = function(id, newRating) {
    if (id === undefined) return Promise.reject("No id provided");
    if (newRating === undefined) return Promise.reject("no rating provided");

    // if the value is lower than newRating, it will change to newRating; otherwise, it
    // will stay as is
    return movieCollection
      .update({ _id: id }, { $max: { rating: newRating } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  // =================
  // Array based querying
  // =================

  exports.findByCast = function(name) {
    if (!name)
      return Promise.reject("You must provide a name for the cast member");

    return movieCollection.find({ cast: name }).toArray();
  };

  exports.findByReviewerName = function(reviewerName) {
    if (!reviewerName)
      return Promise.reject("You must provide a name for the reviewer");

    // pass 'Phil' or 'Sallie' to find multiple matches, or 'Definitely Not Leo' to find a suspicious review.
    return movieCollection.find({ "reviews.reviewer": reviewerName }).toArray();
    // alternatively, we can pass an entire document describing our subdocument in our array using $elemMatch
    //            return movieCollection.find({ "reviews": { $elemMatch: { "reviewer": reviewerName } } }).toArray();
  };

  // =================
  // Updating arrays
  // =================

  exports.addCastMemberIfNotExists = function(id, newCastMember) {
    if (id === undefined) return Promise.reject("No id provided");
    if (newCastMember === undefined)
      return Promise.reject("no newCastMember provided");

    // if our new cast member is already listed, this will be ignored
    // Try it out -- add Matthew McConaughey
    return movieCollection
      .update({ _id: id }, { $addToSet: { cast: newCastMember } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.addCastMemberAllowDuplicates = function(id, newCastMember) {
    if (id === undefined) return Promise.reject("No id provided");
    if (newCastMember === undefined)
      return Promise.reject("no newCastMember provided");

    // if our new cast member is already listed, we will be left with 2 copies of them
    // Try this a few times. Remember, you can never have enough Matthew McConaughey
    return movieCollection
      .update({ _id: id }, { $push: { cast: newCastMember } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.popLastCastMember = function(id) {
    if (id === undefined) return Promise.reject("No id provided");

    // removes last
    return movieCollection
      .update({ _id: id }, { $pop: { cast: 1 } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.popFirstCastMember = function(id) {
    if (id === undefined) return Promise.reject("No id provided");

    // removes first
    return movieCollection
      .update({ _id: id }, { $pop: { cast: -1 } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  // We can also remove based on value, or by matching fields the same way we can query for documents
  exports.removeCastMember = function(id, memberToRemove) {
    if (id === undefined) return Promise.reject("No id provided");
    if (!memberToRemove) return Promise.reject("No memberToRemove provided");

    // removes all matching array entry; remember, if you add
    // you can use $pullAll to pull multiple entries
    return movieCollection
      .update({ _id: id }, { $pull: { cast: memberToRemove } })
      .then(function() {
        return exports.getMovie(id);
      });
  };

  exports.removeReview = function(id, reviewId) {
    if (id === undefined) return Promise.reject("No id provided");
    if (!reviewId) return Promise.reject("No reviewId provided");

    return movieCollection
      .update({ _id: id }, { $pull: { reviews: { _id: reviewId } } })
      .then(function() {
        return exports.getMovie(id);
      });
  };
}

main();
