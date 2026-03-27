# GrammaBot - AI English Learning App Backend

Complete backend for an AI English Learning Application built with Node.js, Express, Prisma ORM, and MySQL.

## Project Structure

```
GrammaBot/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.js
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── grammarController.js
│   │   └── vocabController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── grammarRoutes.js
│   │   └── vocabRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── grammarService.js
│   │   └── vocabService.js
│   └── utils/
│       └── ApiError.js
├── package.json
├── .env.example
└── README.md
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Zod
- **Logging**: Morgan

## Features

### 1. Authentication
- User registration with email and password
- User login with JWT token generation
- JWT middleware for protected routes
- Password hashing with bcryptjs

### 2. Vocabulary Management
- Add new vocabulary words with phonetic transcription and definition
- Retrieve all vocabulary words for a user
- Mark vocabulary as learned
- Sorted by learned status and creation date

### 3. Grammar Query History
- Save grammar queries and AI responses
- Retrieve grammar query history for a user
- Ordered by creation date (newest first)

## Setup Instructions

### Prerequisites
- Node.js v16+
- MySQL 5.7+
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory:
```bash
cd GrammaBot
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
NODE_ENV=development
PORT=3000
DATABASE_URL=mysql://username:password@localhost:3306/grammabot
JWT_SECRET=your_long_random_secret_key_here
JWT_EXPIRES_IN=7d
```

5. Set up Prisma and create the database:
```bash
npx prisma migrate dev --name init
```

6. (Optional) Open Prisma Studio to view/manage data:
```bash
npm run prisma:studio
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication (/auth)

#### Register
- **POST** `/auth/register`
- **Body**: `{ email: string, password: string }`
- **Response**: `{ user: { id, email, createdAt }, token: string }`

#### Login
- **POST** `/auth/login`
- **Body**: `{ email: string, password: string }`
- **Response**: `{ user: { id, email, createdAt }, token: string }`

### Vocabulary (/vocab)
*Requires JWT Authentication*

#### Add Word
- **POST** `/vocab`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ word: string, phonetic?: string, definition: string }`
- **Response**: `{ id, word, phonetic, definition, learned, userId, createdAt, updatedAt }`

#### Get User Words
- **GET** `/vocab/:userId`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `[ { id, word, phonetic, definition, learned, userId, createdAt, updatedAt } ]`

#### Mark as Learned
- **PATCH** `/vocab/:id/learned`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ id, word, phonetic, definition, learned: true, userId, createdAt, updatedAt }`

### Grammar (/grammar)
*Requires JWT Authentication*

#### Save Query and Response
- **POST** `/grammar`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ query: string, response: string }`
- **Response**: `{ id, query, response, userId, createdAt }`

#### Get History
- **GET** `/grammar/:userId`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `[ { id, query, response, userId, createdAt } ]`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment | development, production |
| PORT | Server port | 3000 |
| DATABASE_URL | MySQL connection string | mysql://user:password@localhost:3306/grammabot |
| JWT_SECRET | JWT signing secret | long_random_string |
| JWT_EXPIRES_IN | JWT expiration time | 7d |

## Database Schema

### User
- `id` (Int, Primary Key, Auto-increment)
- `email` (String, Unique)
- `password` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Vocabulary
- `id` (Int, Primary Key)
- `word` (String)
- `phonetic` (String, Optional)
- `definition` (String)
- `learned` (Boolean, default: false)
- `userId` (Int, Foreign Key)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

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