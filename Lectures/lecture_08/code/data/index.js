const postRoutes = require("./posts");
const userRoutes = require("./users");

let constructorMethod = app => {
  app.use("/post", postRoutes);
  app.use("/user", userRoutes);
};

module.exports = {
  users: require("./users"),
  posts: require("./posts")
};
