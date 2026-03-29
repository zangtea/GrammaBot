# GrammaBot - AI English Learning App

Complete full-stack AI English Learning Application built with Node.js, Express, Prisma ORM, MySQL, React, TypeScript, and Vite.

## Project Structure

```
GrammaBot/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── prisma.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── .gitignore
└── README.md
```

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: MySQL
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **Validation**: Zod
- **Logging**: Morgan

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Features

### Authentication
- User registration with name, email, password
- User login with JWT token
- Profile management (update name, email, password)
- Protected routes with JWT middleware

### Vocabulary Management
- Add vocabulary words with phonetic and definition
- View and manage personal vocabulary list
- Mark words as learned
- Search and filter vocabulary

### Grammar Assistance
- AI-powered grammar queries
- Query history tracking
- Contextual grammar explanations

## Setup Instructions

### Prerequisites
- Node.js v18+
- MySQL 8.0+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your MySQL credentials:
```
DATABASE_URL="mysql://username:password@localhost:3306/grammabot"
JWT_SECRET="your-super-secret-jwt-key-here-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
```

5. Set up database:
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio
npm run prisma:studio
```

6. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` and backend at `http://localhost:3000`.

## API Documentation

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user profile
- `PUT /auth/me` - Update user profile

### Vocabulary Endpoints
- `POST /vocab` - Add new vocabulary word
- `GET /vocab/:userId` - Get user's vocabulary list
- `PUT /vocab/:id/learned` - Mark word as learned

### Grammar Endpoints
- `POST /grammar` - Submit grammar query
- `GET /grammar/:userId` - Get grammar history

## Database Schema

The application uses MySQL with the following main tables:
- `users` - User accounts
- `vocabularies` - Vocabulary words
- `grammar_histories` - Grammar query history

## Development

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

### Building for Production
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

MIT License

### GrammarHistory
- `id` (Int, Primary Key)
- `query` (Text)
- `response` (Text)
- `userId` (Int, Foreign Key)
- `createdAt` (DateTime)

## Error Handling

The API uses consistent error responses with HTTP status codes:

```json
{
  "message": "Error message",
  "details": { }
}
```

### Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (email already registered)
- `500` - Internal Server Error

## Input Validation

All inputs are validated using Zod:

- Email must be valid email format
- Password must be 8-72 characters for registration, 1-72 for login
- Words must be 1-128 characters
- Definitions must be 1-2000 characters
- Queries and responses must be 1-20000 and 1-200000 characters respectively

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs (12 salt rounds)
- Authorization checks for user-specific data
- Input validation on all endpoints
- Error handler middleware
- CORS enabled

## Development

### Available Scripts

```bash
npm run dev              # Start development server with hot reload
npm start               # Start production server
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run migrations
npm run prisma:studio   # Open Prisma Studio GUI
```

## License

MIT