# Personal Day Financial Tracking System

This is a personal day financial tracking system, which is intended to track personal finances, how money is spent, and how you can improve your financial practices.

## List of Completed Endpoints

1. Welcome message endpoint
2. User Registration endpoint
3. User Login endpoint
4. User Forgot Password endpoint
5. User Reset Password endpoint
6. User Logout endpoint
7. User Create People and Groups endpoint
8. User View People and Groups endpoint
9. User Update People and Groups endpoint
10. User Delete People and Groups endpoint

| Verb   | Endpoint                  | Code        | Availability |
| ------ | ------------------------- | ----------- | ------------ |
| GET    | /                         | 200 OK      | Public       |
| POST   | /api/auth/register        | 201 CREATED | Public       |
| POST   | /api/auth/login           | 200 OK      | Public       |
| POST   | /api/auth/forgot-password | 200 OK      | Public       |
| POST   | /api/auth/reset-password  | 200 OK      | Private      |
| POST   | /api/auth/logout          | 200 OK      | Private      |
| POST   | /api/people               | 201 CREATED | Private      |
| GET    | /api/people               | 200 OK      | Private      |
| PUT    | /api/people/:id           | 200 OK      | Private      |
| DELETE | /api/people/:id           | 200 OK      | Private      |
