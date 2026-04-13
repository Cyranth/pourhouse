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

## Development Setup

For prerequisites, local environment setup, database migration flow, and sample-data seeding, see [Development Setup](docs/development-setup.md).

## Documentation Index

- [Documentation Home](docs/index.md)
- [Development Setup](docs/development-setup.md)
- [Architecture](docs/architecture.md)
- [Environment Configuration](docs/environment.md)
- [Database](docs/database.md)
- [API Reference](docs/api-reference.md)
- [Domain Rules](docs/domain-rules.md)
- [Squarespace Integration Runbook](docs/squarespace-integration.md)
- [Square Data Structure and Integration Model](docs/square-integration-model.md)

## Scripts

- `npm run dev` - run API in development with auto-reload
- `npm run dev:full` - start Postgres and run the API in development
- `npm run build` - compile TypeScript to `dist`
- `npm run lint` - run ESLint across the project
- `npm run format` - format the project with Prettier
- `npm run test` - run the Vitest suite once
- `npm run test:watch` - run Vitest in watch mode
- `npm run test:coverage` - run Vitest with 100% coverage thresholds enabled
- `npm run start` - run compiled server
- `npm run square:fetch` - fetch catalog data from Square
- `npm run square:seed:sandbox` - seed sample catalog items into Square sandbox (safe-guarded to sandbox env)
- `npm run square:sync:wines` - sync Square catalog wines into the database
- `npm run seed:sample:data` - seed local DB, seed Square sandbox catalog, then sync Square data into local wines
- `npm run admin:grant -- <email>` - grant admin role to an existing user
- `npm run admin:revoke -- <email>` - revoke admin role from a user
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate` - run migrations in development
- `npx prisma migrate deploy` - apply committed migrations in CI/staging/production
- `npm run prisma:seed` - seed sample data
- `npm run db:up` - start the local Postgres container
- `npm run db:down` - stop the local Postgres container
- `npm run db:status` - inspect the local Postgres container
- `npm run db:logs` - tail Postgres container logs
- `npm run db:reset` - destroy the local Postgres data volume
- `npm run db:setup` - start Postgres, run migrations, and seed data

## Environment Variables

Use `.env.example` as a template:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `SQUARE_ACCESS_TOKEN`
- `SQUARE_ENVIRONMENT`
- `SQUARE_SYNC_ENABLED`
- `SQUARE_SYNC_CRON`

For sample-data seeding workflows, set `SQUARE_ENVIRONMENT=sandbox` and use a Square sandbox access token.

## Scheduled Square Sync

The API supports a background scheduler that fetches Square catalog data and syncs it into local wines/inventory.

- Set `SQUARE_SYNC_ENABLED=true` to turn on the scheduler.
- Set `SQUARE_SYNC_CRON` to control the interval (default: `*/10 * * * *`, every 10 minutes).
- Each run logs start, completion summary (created/updated/skipped/inventoryRowsSynced), and failures.

For detailed integration usage, see [Squarespace Integration Runbook](docs/squarespace-integration.md).

## API and Rules

- For endpoints, request/response examples, and query parameters, see [API Reference](docs/api-reference.md).
- For business constraints and behavior guarantees, see [Domain Rules](docs/domain-rules.md).
