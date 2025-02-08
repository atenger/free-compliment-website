const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Read compliments from JSON file
const complimentsFile = path.join(__dirname, "data/compliments.json");
const complimentsData = JSON.parse(fs.readFileSync(complimentsFile, "utf8"));

app.get("/compliment", (req, res) => {
  const compliments = complimentsData.compliments;
  const randomIndex = Math.floor(Math.random() * compliments.length);
  const randomCompliment = compliments[randomIndex];

  res.json({ compliment: randomCompliment });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
