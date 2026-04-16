# Architecture

## Overview

This project follows a layered backend architecture so new modules can be added consistently.

## Folder Structure

- src/app.ts: Express app setup, middleware ordering, docs routes, fallback routing
- src/server.ts: Process bootstrap, DB connect, HTTP start, graceful shutdown
- src/config: Environment, database, logger, swagger configuration
- src/constants: Centralized constants (app, env defaults, error codes/messages)
- src/types: Shared types used across layers
- src/middleware: Cross-cutting concerns (security, validation, logging, error handling)
- src/routes: Route definitions and OpenAPI annotations
- src/validations: Zod schemas grouped by domain
- src/utils: Reusable utilities (ApiError, ApiResponse, asyncHandler, helpers)
- src/controllers, src/services, src/models: Reserved for feature modules

## Runtime Request Flow

1. Request enters Express in app.ts
2. Global middleware executes in order:
   - Request parsing
   - Request logging
   - Security headers and CORS
   - Rate limiting
3. Route handler executes
4. Validation middleware rejects invalid input early
5. Route logic returns standardized ApiResponse
6. Any error flows into centralized errorHandler
7. Error response is normalized and logged

## Configuration Strategy

- Environment defaults and valid enum values are centralized in src/constants
- src/config/env.ts parses and validates all config values on startup
- Invalid configuration fails fast

## Error and Response Strategy

- ApiError represents operational and domain errors
- ApiResponse standardizes success payloads
- errorHandler is the single response formatter for failures

## Validation Strategy

- Zod schemas are defined in src/validations
- validateRequest middleware handles body/params/query parsing and shaping
- Validation errors return 400 with machine-friendly details

## Observability

- Pino logger for structured logs
- pino-http for request-level logging
- Request ID propagation through X-Request-Id header
- Health endpoints:
  - /api/v1/health
  - /api/v1/health/live
  - /api/v1/health/ready

## Security Baseline

- helmet for secure headers
- CORS allowlist policy
- rate limiting with configurable window/max
- secret scanning via secretlint

## Scalability Pattern For New Modules

For each new domain (users, groups, expenses, settlements):

1. Create model in src/models
2. Create zod schemas in src/validations
3. Create service logic in src/services
4. Create controller in src/controllers
5. Register routes in src/routes
6. Annotate routes for Swagger
7. Add tests once test stack is introduced
