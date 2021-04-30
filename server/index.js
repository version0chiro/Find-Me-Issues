const express = require("express");
const path = require("path");
const got = require("got");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api", (req, response) => {
  var repositoriesList = null;
  got
    .get(
      "https://api.github.com/search/repositories?q=good-first-issues:%3E2&per_page=2",
      { responseType: "json" }
    )
    .then((res) => {
      const repositoriesList = res.body;
      response.json(repositoriesList);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/", "index.html"));
});
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
