# Development Guide

## Coding Conventions

- Keep business logic in services, not routes
- Keep routes thin: validation + controller/service call + response
- Use constants from src/constants for reusable literals
- Use shared types from src/types
- Use ApiResponse for success and ApiError for failures
- Use asyncHandler for async route handlers

## Adding A New Endpoint (Checklist)

1. Define zod schema in src/validations
2. Add/extend types if needed in src/types
3. Implement service logic in src/services
4. Implement controller (or route-level logic for simple cases)
5. Add route in src/routes with validateRequest
6. Add OpenAPI block comments for Swagger docs
7. Use ApiResponse for output
8. Throw ApiError for controlled failures

## Error Handling Rules

- Never return raw thrown objects directly from routes
- Throw ApiError for domain and validation-like conditions
- Let errorHandler convert unexpected errors to safe messages

## Environment and Constants Rules

- Add new env defaults in src/constants/env.constants.ts
- Add parser/validation in src/config/env.ts
- Keep direct process.env access only inside env.ts

## Logging Rules

- Use logger from src/config/logger.ts in app/service layers
- Do not use console.log in app code
- Include structured context where useful

## Quality Gate Before Push

Run:

```bash
npm run validate
```

This checks:

- TypeScript typecheck
- ESLint
- Prettier formatting
- Secret scanning

## API Docs Rules

- Every externally reachable endpoint should include OpenAPI annotation
- Keep response examples aligned with real ApiResponse shape
