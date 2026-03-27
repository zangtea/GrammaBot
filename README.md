# GrammaBot

AI English Learning App (Frontend + Backend).

## Monorepo Structure

```text
GrammaBot/
├── frontend/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
└── package.json
```

## Quick Start

### 1) Install dependencies

At repository root:

```bash
npm install
```

At backend:

```bash
cd backend
npm install
```

At frontend:

```bash
cd ../frontend
npm install
```

### 2) Setup backend environment

Inside `backend/`, create `.env`:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mysql://root:your_password@localhost:3306/grammabot
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
```

Important:
- `DATABASE_URL` must point to an existing MySQL server.
- `JWT_SECRET` must not be empty.

### 3) Run Prisma migration and generate client

Inside `backend/`:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4) Run the app

From repository root:

```bash
npm run dev
```

This starts:
- Backend: `http://localhost:3000`
- Frontend: default Vite port (usually `5173`)

## Backend API

Base URL: `http://localhost:3000`

### Health

- `GET /health`

### Auth

- `POST /auth/register`
  - body:
    ```json
    {
      "email": "user@example.com",
      "password": "12345678"
    }
    ```
- `POST /auth/login`
  - body:
    ```json
    {
      "email": "user@example.com",
      "password": "12345678"
    }
    ```

### Vocabulary (JWT required)

- `POST /vocab`
  - header: `Authorization: Bearer <token>`
  - body:
    ```json
    {
      "word": "abandon",
      "phonetic": "/əˈbæn.dən/",
      "definition": "to leave something behind"
    }
    ```
- `GET /vocab/:userId`
  - header: `Authorization: Bearer <token>`
- `PATCH /vocab/:id/learned`
  - header: `Authorization: Bearer <token>`

### Grammar History (JWT required)

- `POST /grammar`
  - header: `Authorization: Bearer <token>`
  - body:
    ```json
    {
      "query": "difference between present perfect and past simple",
      "response": "..."
    }
    ```
- `GET /grammar/:userId`
  - header: `Authorization: Bearer <token>`

### AI Grammar Explain (JWT required)

- `POST /ai/grammar`
  - header: `Authorization: Bearer <token>`
  - body:
    ```json
    {
      "query": "When to use conditionals?"
    }
    ```

## Why Register Fails (Common Causes)

If `POST /auth/register` cannot create account, check in this exact order:

1. Backend is not running on the expected port.
2. Missing or invalid request JSON body.
   - `email` must be valid.
   - `password` length must be 8-72.
3. Email already exists (returns `409`).
4. MySQL is down or `DATABASE_URL` is wrong.
5. Prisma migration has not been run (`User` table missing).
6. `JWT_SECRET` is empty (token generation fails).

## Verify Register Quickly (curl)

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"12345678\"}"
```

Expected success: HTTP `201` with `user` and `token`.

## Fixed Backend Issues

The backend has been corrected for:

- Prisma client import bug in `authService` that blocked register/login.
- Syntax and duplicated-function errors in `vocabService`.
- Invalid ownership check logic in `markLearned`.

## Useful Commands

From `backend/`:

```bash
npm run dev
npm start
npm run prisma:migrate
npm run prisma:generate
npm run prisma:studio
```

