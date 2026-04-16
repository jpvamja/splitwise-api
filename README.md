# Splitwise API

Backend API boilerplate for a Splitwise-style expense sharing app.

## Tech Stack

- Node.js
- TypeScript
- Express (REST API)
- MongoDB + Mongoose
- Swagger/OpenAPI
- Pino + pino-http logging
- Security baseline: helmet, cors, express-rate-limit, zod validation, secretlint
- Quality: ESLint + Prettier + strict TypeScript

## Current Status

Core foundation is implemented and validated:

- App bootstrap and graceful shutdown
- Environment config parsing and validation
- Constants and shared types management
- Centralized error handling and response utils
- Request validation middleware with Zod
- Health routes (health, live, ready)
- Swagger docs setup

## Project Documentation

- Architecture and request flow: docs/ARCHITECTURE.md
- Development conventions: docs/DEVELOPMENT_GUIDE.md
- Splitwise API build roadmap: docs/SPLITWISE_API_ROADMAP.md
- New developer onboarding: docs/ONBOARDING.md
- Contribution process: docs/CONTRIBUTING.md
- Feature implementation template: docs/FEATURE_TEMPLATE.md

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

- Copy values from `.env.example` into `.env`
- Update Mongo URI and other settings if needed

3. Run in development:

```bash
npm run dev
```

4. Validate project quality/security:

```bash
npm run validate
```

## Available Endpoints (Current)

- GET / -> API root info
- GET /api-docs -> Swagger UI
- GET /api-docs.json -> OpenAPI JSON
- GET /api/v1 -> API metadata
- GET /api/v1/ping -> Ping validation example
- GET /api/v1/health -> Process + runtime health info
- GET /api/v1/health/live -> Liveness probe
- GET /api/v1/health/ready -> Readiness probe (DB state)
- POST /api/v1/auth/register -> Register user
- POST /api/v1/auth/login -> Login user
- POST /api/v1/auth/refresh-token -> Refresh JWT tokens
- POST /api/v1/auth/logout -> Logout current user
- GET /api/v1/auth/me -> Get current profile
- PATCH /api/v1/auth/me -> Update current profile
- PATCH /api/v1/auth/change-password -> Change current password

## NPM Scripts

- npm run dev
- npm run build
- npm run start
- npm run typecheck
- npm run lint
- npm run lint:fix
- npm run format
- npm run format:check
- npm run scan:secrets
- npm run validate
