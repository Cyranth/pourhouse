# Development Setup

This guide covers local development setup for the Pourhouse backend.

## Prerequisites

- Node.js 20+
- PostgreSQL running locally or remotely

For local containerized PostgreSQL, use `npm run db:up` (see [database.md](database.md)).

## Setup Steps

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update `.env` values for your environment.

4. Run development migrations:

```bash
npx prisma migrate dev
```

For first deployment (and all non-development environments), use deploy-mode migrations:

```bash
npx prisma migrate deploy
```

5. Seed sample data:

```bash
npm run prisma:seed
```

6. Start the development server:

```bash
npm run dev
```

API runs at `http://localhost:4000` by default.

## Sample Data Workflow

For realistic local demo data synced with Square sandbox:

```bash
npm run seed:sample:data
```

This runs in order:

1. `npm run prisma:seed`
2. `npm run square:seed:sandbox`
3. `npm run square:sync:wines`

When `sample_data/*.xlsx` exists, `npm run square:seed:sandbox` reads the newest workbook and seeds catalog items from the `Items` sheet. If no workbook is found, it falls back to bundled sample fixtures.

## Useful Commands

- `npm run dev:full` - start Postgres and run API in development
- `npm run build` - compile TypeScript to `dist`
- `npm run test` - run tests once
- `npm run test:coverage` - run tests with coverage thresholds
- `npm run db:status` - inspect local Postgres container status
