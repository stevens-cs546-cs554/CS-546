const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const posts = data.posts;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const phil = await users.addUser("Phil", "Barresi");
  const id = phil._id;
  await posts.addPost("Hello, class!", "Today we are creating a blog!", [], id);
  await posts.addPost(
    "Using the seed",
    "We use the seed to have some initial data so we can just focus on servers this week",
    [],
    id
  );

  await posts.addPost(
    "Using routes",
    "The purpose of today is to simply look at some GET routes",
    [],
    id
  );
  console.log("Done seeding database");
  await db.close();
}

main();
