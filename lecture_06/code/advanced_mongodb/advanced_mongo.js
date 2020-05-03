const mongoCollections = require('./mongoCollections');
const movies = mongoCollections.advancedMovies;
module.exports = {
  getAllMovies: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({}).toArray();
    return movieList;
  },

  // more simple stuff
  getMovie: async (id) => {
    console.log('inGetMovie');
    if (id === undefined) throw 'You must provide an ID';
    const movieCollection = await movies();
    const movie = await movieCollection.findOne({ _id: id });

    if (!movie) {
      throw 'Could not find movie with id of ' + id;
    }
    return JSON.stringify(movie);
  },

  // =================
  // Advanced finding
  // =================

  //Including or excluding certain fields
  getAllMoviesTitleDirectorCastOnly: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection
      .find(
        {},
        { projection: { _id: 0, title: 1, 'info.director': 1, cast: 1 } }
      )
      .toArray();
    return movieList;
  },
  getAllMoviesExcludeReviewsInfoCast: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection
      .find({}, { projection: { _id: 0, reviews: 0, info: 0, cast: 0 } })
      .toArray();
    return movieList;
  },
  //Sorting
  getAllMoviesSortedByTitleAsc: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection
      .find({})
      .sort({ title: 1 })
      .toArray();
    return movieList;
  },
  getAllMoviesSortedByTitleDec: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection
      .find({})
      .sort({ title: -1 })
      .toArray();
    return movieList;
  },
  getAllMoviesSortedByYearAsc: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection
      .find({})
      .sort({ 'info.release': 1 })
      .toArray();
    return movieList;
  },
  getAllMoviesSortedByYearDec: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection
      .find({})
      .sort({ 'info.release': -1 })
      .toArray();
    return movieList;
  },
  getAllMoviesSortedByTitleAscYearDec: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection
      .find({})
      .sort({ title: 1, 'info.release': 1 })
      .toArray();
    return movieList;
  },

  //skip and limit
  //skip
  getAllMoviesSkipFirstTwo: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({}).skip(2).toArray();
    return movieList;
  },
  //limit
  getAllMoviesLimitOfTwo: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({}).limit(2).toArray();
    return movieList;
  },

  //limit and skip
  getAllMoviesSkipFirstLimitThree: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({}).skip(2).limit(3).toArray();
    return movieList;
  },

  //limit skip and sort
  getAllMoviesSkipFirstLimitThreeSortByTitleDec: async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection
      .find({})
      .skip(2)
      .limit(3)
      .sort({ title: -1 })
      .toArray();
    return movieList;
  },

  // We can query on subdocuments very easily
  findByDirector: async (directorName) => {
    if (!directorName) throw 'You must provide a director name';
    const movieCollection = await movies();
    // to query on a subdocument field, just provide the path to the field as a string key;
    // so when you have {info: {director: someName}}, just find on {"info.director": someName}
    return await movieCollection
      .find({ 'info.director': directorName })
      .toArray();
  },

  // For demonstration purposes, let's take an array of ratings and search by that
  findByRatings: async (potentialRatings) => {
    if (!potentialRatings)
      throw 'You must provide an array of potentially matching ratings';
    const movieCollection = await movies();
    // ie, passing [3.2, 5] would find movies that have a rating field with 3.2 or 5 [3.2,5]
    return await movieCollection
      .find({ rating: { $in: potentialRatings } })
      .toArray();
  },
  findByRatingsNot: async (potentialRatings) => {
    if (!potentialRatings)
      throw 'You must provide an array of potentially matching ratings';
    const movieCollection = await movies();
    // ie, passing [3.2, 5] would find movies that have a rating field with 3.2 or 5 [3.2,5]
    return await movieCollection
      .find({ rating: { $nin: potentialRatings } })
      .toArray();
  },

  findMoviesReleasedBefore: async (startingYear) => {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw 'You must give a starting year';
    const movieCollection = await movies();
    return await movieCollection
      .find({ 'info.release': { $lt: startingYear } })
      .toArray();
  },

  findMoviesReleasedOnOrBefore: async (startingYear) => {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw 'You must give a starting year';
    const movieCollection = await movies();
    return await movieCollection
      .find({ 'info.release': { $lte: startingYear } })
      .toArray();
  },

  findMoviesReleasedAfter: async (startingYear) => {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw 'You must give a starting year';
    const movieCollection = await movies();
    return await movieCollection
      .find({ 'info.release': { $gt: startingYear } })
      .toArray();
  },

  findMoviesReleasedOnOrAfter: async (startingYear) => {
    // we can query numerically for things that are greater than, greater than or equal to, less than, and less than or equal to.
    if (startingYear === undefined) throw 'You must give a starting year';
    const movieCollection = await movies();
    return movieCollection
      .find({ 'info.release': { $gte: startingYear } })
      .toArray();
  },

  findMoviesWithDirectorAndYear: async (directorName, releaseYear) => {
    if (!directorName) throw 'You must provide a director name';
    if (releaseYear === undefined) throw 'You must give a release year';

    // you can pass any number of arguments to your $and, meaning you can also query different
    // things on the same field -- you can check, for example, that it matches 2 text expression
    // or that it exists AND that it is less than a certain value
    const movieCollection = await movies();
    // test with: findMoviesWithDirectorAndYear("Christopher Nolan", 2012)
    return await movieCollection
      .find({
        $and: [
          { 'info.release': releaseYear },
          { 'info.director': directorName }
        ]
      })
      .toArray();
  },

  findMoviesWithDirectorOrYear: async (directorName, releaseYear) => {
    if (!directorName) throw 'You must provide a director name';
    if (releaseYear === undefined) throw 'You must give a release year';
    const movieCollection = await movies();
    // you can pass any number of arguments to your $or, just like $and;
    // This works pretty much as you'd expect, and matches any documents that match ANY of the conditions

    // test with: findMoviesWithDirectorOrYear("Christopher Nolan", 2015)
    return await movieCollection
      .find({
        $or: [
          { 'info.release': releaseYear },
          { 'info.director': directorName }
        ]
      })
      .toArray();
  },

  // this is a VERY slow operation;
  // it has to traverse the whole collection
  searchByJavaScriptQuery: async (keyword) => {
    if (!keyword) throw 'You must provide a keyword';
    const movieCollection = await movies();
    return await movieCollection
      .find({
        $where: "this.title.toLowerCase().indexOf('" + keyword + "') >= 0"
      })
      .toArray();
  },

  // =================
  // Advanced Updating
  // =================

  updateTitle: async (id, newTitle) => {
    if (id === undefined) throw 'No id provided';
    if (!newTitle) throw 'No title provided';
    const movieCollection = await movies();
    // we use $set to update only the fields specified
    return await movieCollection
      .updateOne({ _id: id }, { $set: { title: newTitle } })
      .then(async function () {
        return await module.exports.getMovie(id);
      });
  },

  updateDirector: async function (id, newDirector) {
    if (id === undefined) return Promise.reject('No id provided');
    if (!newDirector) return Promise.reject('No newDirector provided');
    const movieCollection = await movies();
    // we use $set to update only the fields specified
    return movieCollection
      .updateOne({ _id: id }, { $set: { 'info.director': newDirector } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  bumpReleaseYearUp: async function (id) {
    if (id === undefined) return Promise.reject('No id provided');
    const movieCollection = await movies();
    // Can increment positively or negatively by any value
    return movieCollection
      .updateOne({ _id: id }, { $inc: { 'info.release': 1 } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  doubleRating: async function (id) {
    if (id === undefined) return Promise.reject('No id provided');
    const movieCollection = await movies();
    // Can multiply positively or negatively by any value
    return movieCollection
      .updateOne({ _id: id }, { $mul: { rating: 2 } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  removeRating: async function (id) {
    if (id === undefined) return Promise.reject('No id provided');
    const movieCollection = await movies();
    return movieCollection
      .updateOne({ _id: id }, { $unset: { rating: '' } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  updateRatingToMinValue: async function (id, newRating) {
    if (id === undefined) return Promise.reject('No id provided');
    if (newRating === undefined) return Promise.reject('no rating provided');
    const movieCollection = await movies();
    // if the value is higher than newRating, it will change to newRating; otherwise, it
    // will stay as is
    return movieCollection
      .updateOne({ _id: id }, { $min: { rating: newRating } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  updateRatingToMaxValue: async function (id, newRating) {
    if (id === undefined) return Promise.reject('No id provided');
    if (newRating === undefined) return Promise.reject('no rating provided');
    const movieCollection = await movies();
    // if the value is lower than newRating, it will change to newRating; otherwise, it
    // will stay as is
    return movieCollection
      .updateOne({ _id: id }, { $max: { rating: newRating } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  // =================
  // Array based querying
  // =================

  findByCast: async function (name) {
    if (!name)
      return Promise.reject('You must provide a name for the cast member');
    const movieCollection = await movies();
    return movieCollection.find({ cast: name }).toArray();
  },

  findByReviewerName: async function (reviewerName) {
    if (!reviewerName)
      return Promise.reject('You must provide a name for the reviewer');
    const movieCollection = await movies();
    // pass 'Phil' or 'Sallie' to find multiple matches, or 'Definitely Not Leo' to find a suspicious review.
    return movieCollection.find({ 'reviews.reviewer': reviewerName }).toArray();
    // alternatively, we can pass an entire document describing our subdocument in our array using $elemMatch
    //            return movieCollection.find({ "reviews": { $elemMatch: { "reviewer": reviewerName } } }).toArray();
  },

  // =================
  // Updating arrays
  // =================

  addCastMemberIfNotExists: async function (id, newCastMember) {
    if (id === undefined) return Promise.reject('No id provided');
    if (newCastMember === undefined)
      return Promise.reject('no newCastMember provided');
    const movieCollection = await movies();
    // if our new cast member is already listed, this will be ignored
    // Try it out -- add Matthew McConaughey
    return movieCollection
      .updateOne({ _id: id }, { $addToSet: { cast: newCastMember } })
      .then(function () {
        //return getMovie(id);
      });
  },

  addCastMemberAllowDuplicates: async function (id, newCastMember) {
    if (id === undefined) return Promise.reject('No id provided');
    if (newCastMember === undefined)
      return Promise.reject('no newCastMember provided');
    const movieCollection = await movies();
    // if our new cast member is already listed, we will be left with 2 copies of them
    // Try this a few times. Remember, you can never have enough Matthew McConaughey
    return movieCollection
      .updateOne({ _id: id }, { $push: { cast: newCastMember } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  popLastCastMember: async function (id) {
    if (id === undefined) return Promise.reject('No id provided');
    const movieCollection = await movies();
    // removes last
    return movieCollection
      .updateOne({ _id: id }, { $pop: { cast: 1 } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  popFirstCastMember: async function (id) {
    if (id === undefined) return Promise.reject('No id provided');
    const movieCollection = await movies();
    // removes first
    return movieCollection
      .updateOne({ _id: id }, { $pop: { cast: -1 } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  // We can also remove based on value, or by matching fields the same way we can query for documents
  removeCastMember: async function (id, memberToRemove) {
    if (id === undefined) return Promise.reject('No id provided');
    if (!memberToRemove) return Promise.reject('No memberToRemove provided');
    const movieCollection = await movies();
    // removes all matching array entry; remember, if you add
    // you can use $pullAll to pull multiple entries
    return movieCollection
      .updateOne({ _id: id }, { $pull: { cast: memberToRemove } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  },

  removeReview: async function (id, reviewId) {
    if (id === undefined) return Promise.reject('No id provided');
    if (!reviewId) return Promise.reject('No reviewId provided');
    const movieCollection = await movies();
    return movieCollection
      .updateOne({ _id: id }, { $pull: { reviews: { _id: reviewId } } })
      .then(function () {
        return module.exports.getMovie(id);
      });
  }
};
