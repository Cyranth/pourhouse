# Pourhouse Wine Co. Backend

Production-ready backend API for Pourhouse Wine Co., built with Node.js, Express, TypeScript, PostgreSQL, Prisma, JWT auth, and Zod validation.

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT authentication
- dotenv
- Zod validation

## Project Structure

```text
src/
  app.ts
  server.ts
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
prisma/
  schema.prisma
  seed.ts
```

## Prerequisites

- Node.js 20+
- PostgreSQL running locally or remotely

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update `.env` values for your environment.

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Seed sample data:

```bash
npm run prisma:seed
```

6. Start dev server:

```bash
npm run dev
```

API runs at `http://localhost:4000` by default.

## Scripts

- `npm run dev` - run API in development with auto-reload
- `npm run build` - compile TypeScript to `dist`
- `npm run start` - run compiled server
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate` - run migrations in development
- `npm run prisma:seed` - seed sample data

## Environment Variables

Use `.env.example` as a template:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Wines

- `GET /api/wines`
- `GET /api/wines/:id`
- `POST /api/wines`
- `GET /api/wines/search?q=term`
- `GET /api/wines/:id/ratings`

### Inventory

- `GET /api/inventory`
- `GET /api/inventory/:id`
- `POST /api/inventory`
- `PATCH /api/inventory/:id`

### Ratings

- `POST /api/ratings` (requires JWT)

## Business Rules Implemented

- Duplicate wines prevented by composite unique constraint on `(name, wineryId, vintage)`.
- Ratings constrained to 1-5 by validation and service guard.
- Only authenticated users can create ratings.
- Inventory references wines by foreign key (`wineId`) and does not duplicate wine records.

## Seed Data

Seed includes:

- Regions (France, Bordeaux, Napa Valley)
- Wineries
- Wines
- Inventory records
- Default user (`admin@pourhousewineco.com`, password `password123`)

Change seeded credentials before production use.
