const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const posts = data.posts;

dbConnection().then(
  db => {
    return db
      .dropDatabase()
      .then(() => {
        return dbConnection;
      })
      .then(db => {
        return users.addUser("Phil", "Barresi");
      })
      .then(phil => {
        const id = phil._id;

        return posts
          .addPost("Hello, class!", "Today we are creating a blog!", [], id)
          .then(() => {
            return posts.addPost(
              "Using the seed",
              "We use the seed to have some initial data so we can just focus on servers this week",
              [],
              id
            );
          })
          .then(() => {
            return posts.addPost(
              "Using routes",
              "The purpose of today is to simply look at some GET routes",
              [],
              id
            );
          });
      })
      .then(() => {
        console.log("Done seeding database");
        db.close();
      });
  },
  error => {
    console.error(error);
    return dbConnection().then( ( db ) => {
      return db.serverConfig.close();
    } );
  }
);
