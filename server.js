const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from public directory
app.use(express.static("public"));

// Read compliments from JSON file
const complimentsFile = path.join(__dirname, "data/compliments.json");
const complimentsData = JSON.parse(fs.readFileSync(complimentsFile, "utf8"));

app.get("/compliment", (req, res) => {
  const compliments = complimentsData.compliments;
  const randomIndex = Math.floor(Math.random() * compliments.length);
  const randomCompliment = compliments[randomIndex];

  res.json({ compliment: randomCompliment });
});

// Specific route for about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public/about.html"));
});

// Serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
