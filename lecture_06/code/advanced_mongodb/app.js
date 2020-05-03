const advMongo = require('./advanced_mongo');
const startUpDocs = require('./advanced_startup_docs');

async function main() {
  //First lets run the start up to create the data in the DB Can be commented out after first run to perserve DB
  const startUp = await startUpDocs.runSetup();

  //Now we can experiment calling the advanced query functions.
  const findChrisNolan = await advMongo.findByDirector('Christopher Nolan');
  console.log(findChrisNolan);

  const before2015 = await advMongo.findMoviesReleasedOnOrBefore(2015);
  console.log(before2015);

  const rating = await advMongo.findByRatings([3.2, 5]);
  console.log(rating);

  const ratingtwo = await advMongo.findByRatingsNot([3.2, 5]);
  console.log(ratingtwo);

  const after2015 = await advMongo.findMoviesReleasedAfter(2015);
  console.log(after2015);

  const directorAndYear = await advMongo.findMoviesWithDirectorAndYear(
    'Christopher Nolan',
    2015
  );
  console.log(directorAndYear);

  const directorOrYear = await advMongo.findMoviesWithDirectorOrYear(
    'Christopher Nolan',
    2015
  );
  console.log(directorOrYear);

  const selectFields = await advMongo.getAllMoviesTitleDirectorCastOnly();
  console.log(selectFields);

  const excludeFields = await advMongo.getAllMoviesExcludeReviewsInfoCast();
  console.log(excludeFields);

  const sortByTitleAsc = await advMongo.getAllMoviesSortedByTitleAsc();
  console.log(sortByTitleAsc);

  const sortByTitleDec = await advMongo.getAllMoviesSortedByTitleDec();
  console.log(sortByTitleDec);

  const sortByYearAsc = await advMongo.getAllMoviesSortedByYearAsc();
  console.log(sortByYearAsc);

  const sortByYearDec = await advMongo.getAllMoviesSortedByYearDec();
  console.log(sortByYearDec);

  const sortByTitleYearDec = await advMongo.getAllMoviesSortedByTitleAscYearDec();
  console.log(sortByTitleYearDec);

  const skipFirstTwo = await advMongo.getAllMoviesSkipFirstTwo();
  console.log(skipFirstTwo);

  const limitFirstTwo = await advMongo.getAllMoviesLimitOfTwo();
  console.log(limitFirstTwo);

  const skipAndLimit = await advMongo.getAllMoviesSkipFirstLimitThree();
  console.log(skipAndLimit);

  const updateTitle = await advMongo.updateTitle(1, 'inception');
  console.log(updateTitle);

  const updateDirector = await advMongo.updateDirector(1, 'Patrick Hill');
  console.log(updateDirector);

  const incYear = await advMongo.bumpReleaseYearUp(1);
  console.log(incYear);

  const findLeo = await advMongo.findByCast('Leonardo DiCaprio');
  console.log(findLeo);

  const findPhil = await advMongo.findByReviewerName('Phil');
  console.log(findPhil);

  const addCastNoDup = await advMongo.addCastMemberIfNotExists(
    1,
    'Leonardo DiCaprio'
  );
  console.log(addCastNoDup);

  const addCastDup = await advMongo.addCastMemberAllowDuplicates(
    1,
    'Leonardo DiCaprio'
  );
  console.log(addCastDup);

  console.log('done');
  process.exit();
}

main();
