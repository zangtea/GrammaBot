# GrammaBot Frontend

A modern React application for language learning with AI-powered grammar assistance.

## Features

- 🔐 **Authentication**: Secure login and registration
- 📚 **Vocabulary Management**: Add, track, and learn new words
- 🤖 **AI Grammar Assistant**: ChatGPT-like interface for grammar help
- 📊 **Dashboard**: Overview of learning progress
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 📱 **Mobile-Friendly**: Works perfectly on all devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **Zustand** for state management
- **Axios** for API calls
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/           # API client and service functions
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── pages/         # Page components
├── stores/        # Zustand state stores
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── assets/        # Static assets
```

## API Integration

The frontend connects to a backend API running on `http://localhost:3000` with the following endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `GET /vocab/:userId` - Get user's vocabulary
- `POST /vocab` - Add new vocabulary word
- `PATCH /vocab/:id/learned` - Mark word as learned
- `POST /ai/grammar` - Ask grammar questions

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Write clear, concise commit messages
4. Test your changes thoroughly

## License

This project is part of the GrammaBot application.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
