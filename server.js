require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static("public"));

// Read compliments from JSON file
const complimentsFile = path.join(__dirname, "data/compliments.json");
const complimentsData = JSON.parse(fs.readFileSync(complimentsFile, "utf8"));

// Add express.json() middleware for parsing POST requests
app.use(express.json());

// API routes should come before the catch-all
app.get("/api/og", async (req, res) => {
  try {
    const compliments = complimentsData.compliments;
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const compliment = compliments[randomIndex];

    // Create an SVG with the compliment
    const svg = `
            <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
                <rect width="1200" height="630" fill="#1a1f3c"/>
                <text 
                    x="600" 
                    y="315" 
                    font-family="Arial, sans-serif" 
                    font-size="48" 
                    fill="#4eff9f" 
                    text-anchor="middle"
                    dominant-baseline="middle"
                >${compliment}</text>
            </svg>
        `;

    // Convert SVG to PNG
    const pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();

    // Send the PNG
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.send(pngBuffer);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).send("Error generating image");
  }
});

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

// Frame interaction endpoint
app.post("/api/frame", (req, res) => {
  const compliments = complimentsData.compliments;
  const randomIndex = Math.floor(Math.random() * compliments.length);
  const compliment = compliments[randomIndex];

  // Return the frame response
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://freecompliment.com/api/og" />
            <meta property="fc:frame:button:1" content="Get another compliment" />
            <meta property="fc:frame:post_url" content="https://freecompliment.com/api/frame" />
        </head>
        </html>
    `);
});

// Catch-all route should be last
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(
    `Server is running at ${process.env.BASE_URL || `http://localhost:${port}`}`
  );
});
