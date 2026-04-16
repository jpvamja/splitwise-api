# Onboarding Guide

This document helps a new developer become productive on this project quickly.

## 1. Prerequisites

- Node.js 20+
- npm 10+
- MongoDB local instance or remote URI
- VS Code (recommended)

## 2. First-Time Setup

1. Install dependencies

```bash
npm install
```

2. Create local environment file

- Use `.env.example` as reference
- Add your own values in `.env`

3. Start development server

```bash
npm run dev
```

4. Verify health endpoints

- GET /api/v1/health
- GET /api/v1/health/live
- GET /api/v1/health/ready

5. Open API docs

- GET /api-docs

## 3. Daily Developer Workflow

1. Pull latest changes
2. Create feature branch
3. Implement using architecture conventions
4. Run quality gate

```bash
npm run validate
```

5. Push branch and open PR

## 4. Where To Read Next

- Project architecture: docs/ARCHITECTURE.md
- Development conventions: docs/DEVELOPMENT_GUIDE.md
- API roadmap: docs/SPLITWISE_API_ROADMAP.md
- Contribution process: docs/CONTRIBUTING.md
- Feature template: docs/FEATURE_TEMPLATE.md

## 5. Common Troubleshooting

- Validation failure on startup:
  - Check .env values, especially NODE_ENV, LOG_LEVEL, PORT
- Mongo readiness is failing:
  - Verify MONGO_URI and database availability
- Secret scan failed:
  - Remove secrets from tracked files and use environment variables instead
