const express = require("express");

const app = express();

app.get("/bus", (req, res) => {
  // 1, data from front-end

  // 2, db logic  

  // 3, data to front-end
  res.send("Ready to travel...1");
});

app.get("/bus", (req, res) => {
  // 1, data from front-end

  // 2, db logic

  // 3, data to front-end
  res.send("Ready to travel...2");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Api is working...");
});
