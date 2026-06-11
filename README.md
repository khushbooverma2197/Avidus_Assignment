# Avidus Assignment

Full-stack task management application for the Avidus first-round assignment.

## Features

- JWT authentication with protected routes.
- User roles: `Admin` and `User`.
- Active/inactive account status enforcement.
- Users can create, view, update and delete only their own tasks.
- Admins can view all users, manage user status, delete users, view all tasks and delete any task.
- Activity logs for login, task creation, task update and task deletion.
- React admin dashboard with analytics, user management, task monitoring and activity logs.

## Setup

1. Install dependencies:

   ```bash
   npm run install:all
   ```

2. Create `backend/.env` from `backend/.env.example`.

3. Start MongoDB locally, then run:

   ```bash
   npm run dev
   ```

The API runs on `http://localhost:5000` and the React app runs on `http://localhost:5173`.

The first registered user becomes an admin. A user whose email matches `ADMIN_EMAIL` also becomes an admin.
