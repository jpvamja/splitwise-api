# Splitwise API Roadmap

This file lists the target Splitwise-style API surface to build step by step.

Status legend:

- [x] implemented
- [ ] pending

## 0. System and Meta

- [x] GET /api/v1
- [x] GET /api/v1/ping
- [x] GET /api/v1/health
- [x] GET /api/v1/health/live
- [x] GET /api/v1/health/ready

## 1. Auth

- [x] POST /api/v1/auth/register
- [x] POST /api/v1/auth/login
- [x] POST /api/v1/auth/refresh-token
- [x] POST /api/v1/auth/logout
- [x] GET /api/v1/auth/me
- [x] PATCH /api/v1/auth/me
- [x] PATCH /api/v1/auth/change-password

## 2. Users and Friends

- [ ] GET /api/v1/users/search
- [ ] GET /api/v1/users/:id
- [ ] POST /api/v1/friends/requests
- [ ] GET /api/v1/friends/requests
- [ ] PATCH /api/v1/friends/requests/:id/accept
- [ ] PATCH /api/v1/friends/requests/:id/reject
- [ ] GET /api/v1/friends
- [ ] DELETE /api/v1/friends/:id

## 3. Groups

- [ ] POST /api/v1/groups
- [ ] GET /api/v1/groups
- [ ] GET /api/v1/groups/:id
- [ ] PATCH /api/v1/groups/:id
- [ ] DELETE /api/v1/groups/:id
- [ ] POST /api/v1/groups/:id/members
- [ ] DELETE /api/v1/groups/:id/members/:userId

## 4. Expenses

- [ ] POST /api/v1/expenses
- [ ] GET /api/v1/expenses
- [ ] GET /api/v1/expenses/:id
- [ ] PATCH /api/v1/expenses/:id
- [ ] DELETE /api/v1/expenses/:id

## 5. Splits and Balances

- [ ] GET /api/v1/balances
- [ ] GET /api/v1/balances/groups/:groupId
- [ ] GET /api/v1/balances/users/:userId

## 6. Settlements

- [ ] POST /api/v1/settlements
- [ ] GET /api/v1/settlements
- [ ] GET /api/v1/settlements/:id
- [ ] PATCH /api/v1/settlements/:id
- [ ] DELETE /api/v1/settlements/:id

## 7. Activity and Notifications (Optional)

- [ ] GET /api/v1/activity
- [ ] GET /api/v1/notifications
- [ ] PATCH /api/v1/notifications/:id/read

## Build Order Recommendation

1. Auth
2. Users and friends
3. Groups
4. Expenses
5. Balances
6. Settlements
7. Activity/notifications

## Notes

- Keep all endpoints documented in Swagger as they are added.
- For each endpoint, add zod validation + ApiResponse + ApiError handling.
- Keep route/controller/service layering consistent.
