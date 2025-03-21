require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const app = express();
const port = process.env.PORT || 3000;

// Environment configuration for development and production
const isDev = process.env.NODE_ENV !== 'production';
const BASE_URL = isDev
  ? `http://localhost:${port}`
  : 'https://freecompliment.com';

// Serve static files from public directory
app.use(express.static('public'));

// Make sure this comes before other routes
app.use(
  '/.well-known',
  express.static(path.join(__dirname, 'public/.well-known'))
);

// Read both compliment files
const complimentsFile = path.join(__dirname, 'data/compliments.json');
const backhandedFile = path.join(__dirname, 'data/backhanded_compliments.json');
const complimentsData = JSON.parse(fs.readFileSync(complimentsFile, 'utf8'));
const backhandedData = JSON.parse(fs.readFileSync(backhandedFile, 'utf8'));

// Add express.json() middleware for parsing POST requests
app.use(express.json());

// API routes should come before the catch-all
app.get('/api/og', async (req, res) => {
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
    const pngBuffer = await sharp(Buffer.from(svg)).toFormat('png').toBuffer();

    // Send the PNG
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(pngBuffer);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Error generating image');
  }
});

app.get('/compliment', (req, res) => {
  const compliments = complimentsData.compliments;
  const randomIndex = Math.floor(Math.random() * compliments.length);
  const randomCompliment = compliments[randomIndex];

  res.json({ compliment: randomCompliment });
});

// Specific route for about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/about.html'));
});

// Frame interaction endpoint
app.post('/api/frame', async (req, res) => {
  try {
    const compliments = complimentsData.compliments;
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const compliment = compliments[randomIndex];

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="fc:frame" content='{
                "version": "next",
                "imageUrl": "${BASE_URL}/api/og",
                "buttons": [{
                    "label": "Get another compliment",
                    "action": "post"
                }],
                "postUrl": "${BASE_URL}/api/frame"
            }' />
        </head>
        <body>
            <script src="https://cdn.jsdelivr.net/npm/@farcaster/frame-sdk/dist/index.min.js"></script>
            <script>
                window.addEventListener('load', function() {
                    if (window.frame && window.frame.sdk) {
                        frame.sdk.actions.ready();
                    }
                });
            </script>
        </body>
        </html>
    `);
  } catch (error) {
    console.error('Error handling frame:', error);
    res.status(500).send('Error handling frame');
  }
});

// Add new endpoint for backhanded compliments
app.get('/backhanded-compliment', (req, res) => {
  const compliments = backhandedData.backhanded_compliments;
  const randomIndex = Math.floor(Math.random() * compliments.length);
  const randomCompliment = compliments[randomIndex];

  res.json({ compliment: randomCompliment });
});

// Add route for backhanded.html
app.get('/backhanded', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/backhanded.html'));
});

// Catch-all route should be last
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at ${BASE_URL}`);
});
