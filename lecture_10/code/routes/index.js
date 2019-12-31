const calculatorRoutes = require("./calculator");

const constructorMethod = app => {
  app.use("/calculator", calculatorRoutes);

  app.use("*", (req, res) => {
    res.redirect("/calculator/static");
  });
};

module.exports = constructorMethod;
