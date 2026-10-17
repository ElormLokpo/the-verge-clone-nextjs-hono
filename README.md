# The Verge Inspired project

A full-stack blog application inspired by "The Verge", a website.

## Tech Stack
- **Frontend:** Next.js (`client/`)
- **Backend:** Hono.js (`server/`)
- **Database:** Neon PostgreSQL
- **ORM:** Drizzle
- **Runtime & package manager:** Bun

The backend follows a **modular monolith** architecture.

## Development

Run these commands from the relevant `client/` or `server/` directory:

```bash
bun install
bun run dev
bun run lint
bun run format
```

- `bun run dev` — start the development server
- `bun run lint` — run the linter
- `bun run format` — format code with Prettier

Configure the required environment variables for each application before starting development.
