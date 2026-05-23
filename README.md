# Genaiproj

A full-stack AI interview preparation platform with authentication, resume upload, interview report generation, and protected user routes.

## Project Structure

- `backend/`
  - `server.js` - starts the Express server and connects to MongoDB.
  - `src/app.js` - configures Express, CORS, cookie parsing, and routes.
  - `src/config/db.js` - MongoDB connection helper.
  - `src/controllers/` - auth and interview controllers.
  - `src/middlewares/` - authentication and file upload middleware.
  - `src/models/` - MongoDB models for users, blacklist tokens, and interview reports.
  - `src/routes/` - API routes for auth and interview features.
  - `src/services/aiService.js` - AI report generation and resume PDF creation.

- `frontend/`
  - `src/App.jsx` - root app with `AuthProvider`, `InterviewProvider`, and router.
  - `src/appRouter.jsx` - main route definitions using React Router.
  - `src/RootLayout.jsx` - shared layout with global navigation.
  - `src/RootRoute.jsx` - public landing or authenticated home decision route.
  - `src/features/auth/` - authentication context, hooks, API services, and login/register pages.
  - `src/features/interview/` - interview report context, hooks, pages, and API services.
  - `src/features/landing/` - public landing page shown to unauthenticated visitors.

## Key Features

- Public landing page for unauthenticated visitors.
- Register and login using JWT stored in a secure cookie.
- Protected `Home` dashboard and interview detail routes.
- AI-powered interview report generation from job description, resume upload, or self-description.
- Report listing and detail view for authenticated users.
- Resume PDF export from generated interview report.
- CORS and cookie settings configured for cross-site auth deployments.

## Backend API Endpoints

### Auth
- `POST /api/auth/register` - register a new user and set auth cookie.
- `POST /api/auth/login` - log in existing user and set auth cookie.
- `GET /api/auth/logout` - clear the auth cookie and blacklist the token.
- `GET /api/auth/userDetails` - get current authenticated user details.

### Interview
- `POST /api/interview/ai/report` - generate an AI interview report and store it.
- `GET /api/interview/ai/report/:interviewId` - fetch a specific report.
- `GET /api/interview/ai/allReports` - fetch all reports for the logged-in user.
- `POST /api/interview/ai/resume/pdf/:interviewReportId` - generate and download a resume PDF.

## Frontend Routes

- `/` - root route renders `Landing` for guests or `Home` for authenticated users.
- `/login` - login page.
- `/register` - registration page.
- `/interview/:interviewId` - protected interview detail route.

## Setup Instructions

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGODB_URL=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## Notes

- The frontend uses Axios with `withCredentials: true` for cookie-based auth.
- The backend sets secure cookies with `sameSite: none`, so a HTTPS environment or trusted proxy is required.
- The app currently points to `https://ai-interview-backend-nmis.onrender.com` in frontend services.
- The user auth flow is centralized in `AuthProvider` to prevent duplicate auth refresh requests.

## Deployment Considerations

- Ensure `trust proxy` is enabled in Express when deploying behind a proxy.
- Confirm CORS `allowedOrigins` includes your frontend host.
- Use a secure `JWT_SECRET` and valid MongoDB connection string.
- If deploying to Render or another host, verify the cookie domain and HTTPS settings.
