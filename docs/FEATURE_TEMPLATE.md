# Feature Implementation Template

Use this template for every new module (auth, users, groups, expenses, settlements).

## 1. Scope

- Feature name:
- API endpoints:
- Data entities involved:

## 2. Files To Add

- Model: src/models/<feature>.model.ts
- Validation: src/validations/<feature>.validation.ts
- Service: src/services/<feature>.service.ts
- Controller: src/controllers/<feature>.controller.ts
- Route: src/routes/<feature>.routes.ts
- Optional types: src/types/<feature>.types.ts
- Optional constants: src/constants/<feature>.constants.ts

## 3. Route Pattern

- Validate input with validateRequest + zod schema
- Use asyncHandler
- Return ApiResponse
- Throw ApiError on controlled failures

## 4. Swagger Pattern

- Add OpenAPI annotations for each endpoint
- Include params/body/response descriptions
- Keep docs examples in sync with real response shape

## 5. Quality Checklist

- Build passes
- Lint passes
- Format check passes
- Secret scan passes

Run:

```bash
npm run validate
```

## 6. Documentation Checklist

- Update docs/SPLITWISE_API_ROADMAP.md endpoint status
- Update README endpoint list for public endpoints
- Add notes to docs/DEVELOPMENT_GUIDE.md if convention changed
