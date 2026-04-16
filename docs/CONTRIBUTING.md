# Contributing Guide

## Branching

- Main branch should stay releasable
- Create feature branches using descriptive names
  - feat/auth-register
  - fix/health-ready-check

## Commit Style (Recommended)

- feat: new functionality
- fix: bug fix
- refactor: internal change without behavior change
- docs: documentation only
- test: test-related changes
- chore: maintenance updates

Example:

```text
feat(expenses): add create expense endpoint
```

## Pull Request Checklist

Before opening a PR:

1. Code follows architecture rules in docs/DEVELOPMENT_GUIDE.md
2. New endpoints include zod validation
3. New endpoints include Swagger annotations
4. Responses use ApiResponse and errors use ApiError
5. Constants and shared types are reused where applicable
6. `npm run validate` passes locally

## Review Expectations

- Keep PRs focused and reasonably small
- Add context in PR description:
  - What changed
  - Why changed
  - Any migration or env updates

## Security Rules

- Never commit secrets
- Keep tokens/keys in `.env`
- If a secret is committed accidentally, rotate it immediately

## Documentation Rules

When adding a new feature:

1. Update API roadmap status in docs/SPLITWISE_API_ROADMAP.md
2. Update README endpoint list if public endpoints changed
3. Update architecture/development docs if conventions changed
