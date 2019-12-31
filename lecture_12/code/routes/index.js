const exampleRoutes = require("./examples");

const constructorMethod = app => {
  app.use("/examples", exampleRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
