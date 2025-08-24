# Frontend (React)

## Overview
This is the frontend for the Polling-APP, built with React and Material-UI. It provides a modern, responsive UI for users to register, log in, create polls, vote, and view results.

## How to Run

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Main Tools & Libraries
- React 18
- Material-UI (MUI)
- React Router
- Axios
- React Toastify
- React Loading
- Chart.js (via react-chartjs-2)
- Bootstrap (legacy)

## Features
- User registration/login (JWT)
- Create, list, and vote on polls
- Live and closed poll results
- Responsive, modern UI with dynamic effects

## Notes
- The frontend expects the backend API to be running (see backend README).
- Update API URLs in `src/services/` if needed for deployment.
