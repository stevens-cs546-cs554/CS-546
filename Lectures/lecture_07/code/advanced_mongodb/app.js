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

  const updatedTitle = await advMongo.updateTitle(1, 'CS546 - Inception');
  console.log(updatedTitle);

  console.log('done');
  process.exit();
}

main();
