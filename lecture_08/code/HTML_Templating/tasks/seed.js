const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;

async function main() {
  const db = await dbConnection();

  await db.dropDatabase();

  const patrick = await users.addUser('Patrick', 'Hill');
  const id = patrick._id;

  await posts.addPost('Hello, class!', 'Today we are creating a blog!', [], id);

  await posts.addPost(
    'Using the seed',
    'We use the seed to have some initial data so we can just focus on servers this week',
    [],
    id
  );
  await posts.addPost(
    'Using routes',
    'The purpose of today is to simply look at some GET routes',
    [],
    id
  );

  const aiden = await users.addUser('Aiden', 'Hill');
  await posts.addPost(
    "Aiden's First Post",
    "I'm 6 months old, I can't blog1",
    [],
    aiden._id
  );
  await posts.addPost(
    "Aiden's Second Post",
    "I'm still 6 months old, I told you already, I can't blog1",
    [],
    aiden._id
  );
  console.log('Done seeding database');
  await db.serverConfig.close();
}

main().catch((error) => {
  console.error(error);
  return dbConnection().then((db) => {
    return db.serverConfig.close();
  });
});
