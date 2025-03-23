# Game Discovery App

A modern game discovery web application built with React and Vite, using the RAWG Video Games Database API.

## Features

- Browse games by genre
- Search for specific games
- Filter by platform
- Sort by different criteria
- Dark/Light theme support
- Responsive design
- Favorites/Cart system

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- RAWG API

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd game-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your RAWG API key:
```bash
VITE_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Environment Variables

The following environment variables are required:

- `VITE_API_KEY`: Your RAWG API key

## Deployment

This project is configured for deployment on Vercel. Simply connect your repository to Vercel and it will automatically deploy your application.

Make sure to add the environment variables in your Vercel project settings.
