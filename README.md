# Free Compliments Website

A delightful web application that generates both heartwarming and backhanded compliments, served up in a Farcaster frame. Spread joy (or playful mischief) with randomly generated compliments!

## 🌟 Features

- Generate random nice compliments to brighten someone's day
- Generate backhanded compliments for a touch of humor
- Clean, modern UI with responsive design
- OpenGraph image generation for social sharing
- Farcaster frame integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```powershell
git clone https://github.com/atenger/free-compliment-website.git
cd free-compliments-website
```

2. Install dependencies:

```powershell
npm install
```

3. Create your environment file:

For Windows (PowerShell):
```powershell
Copy-Item .env.example .env
```

For Linux/macOS (bash):
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

5. Start the server:

For Windows (PowerShell):
```powershell
# For development (with auto-reload):
npm run dev

# For production:
npm start
```

For Linux/macOS (bash):
```bash
# For development (with auto-reload):
npm run dev

# For production:
npm start
```

The application will be available at `http://localhost:3000`

## 🛠️ API Endpoints

### GET `/api/compliment`

Returns a random nice compliment

### GET `/api/backhanded`

Returns a random backhanded compliment

### GET `/api/og`

Generates an OpenGraph image with a random compliment

## 🧱 Project Structure

```
free-compliments-website/
├── data/ # Compliment JSON data files
├── public/ # Static files
├── server.js # Main server file
└── .env # Environment variables

```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped with compliment suggestions
- Built with Express.js and Node.js
- Styled with modern CSS features

## 📞 Contact

Your Name - [@adrienne](https://farcaster.xyz/adrienne)

Project Link: [https://github.com/atenger/free-compliment-website](https://github.com/atenger/free-compliments-website)
