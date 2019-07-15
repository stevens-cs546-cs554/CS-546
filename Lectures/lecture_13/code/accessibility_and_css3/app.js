const path = require("path");
const express = require("express");
const app = express();

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log(
    "Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it"
  );
});
