# Polling-APP

A full-stack polling application with a Django REST backend and a React (Material-UI) frontend. Users can register, log in, create polls, vote, and view results with modern UI and dynamic effects.

## Project Structure

- `backend/` — Django REST API (authentication, polls, voting)
- `frontend/` — React app (user interface, charts, dynamic effects)

---

## How to Run the Project

### 1. Backend (Django)

#### Prerequisites
- Python 3.8+
- pip

#### Setup & Run
1. Navigate to the backend folder:
   ```
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Create a `.env` file in `backend/` with at least:
   ```
   SECRET_KEY=your-secret-key
   DEBUG=True
   ```
5. Run migrations:
   ```
   python manage.py migrate
   ```
6. Create a superuser (optional, for admin):
   ```
   python manage.py createsuperuser
   ```
7. Start the server:
   ```
   python manage.py runserver
   ```

---

### 2. Frontend (React)

#### Prerequisites
- Node.js (v16+ recommended)
- npm

#### Setup & Run
1. Navigate to the frontend folder:
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

---

## Tools & Libraries Used

### Backend
- Django 4.1
- Django REST Framework
- djoser (auth)
- SimpleJWT (JWT auth)
- django-environ (env vars)
- django-cors-headers
- MySQL (prod) / SQLite (dev)

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios
- React Toastify
- React Loading
- Chart.js (via react-chartjs-2)
- Bootstrap (legacy)

---

## Features
- User registration/login (JWT)
- Create, list, and vote on polls
- Live and closed poll results
- Responsive, modern UI with dynamic effects
- Admin panel (Django admin)

---

## Development Notes
- Keep your `.env` and `venv/` out of version control (see `.gitignore`).
- For production, set `DEBUG=False` and use a strong `SECRET_KEY`.
- Update CORS and allowed hosts as needed.

---

## License
MIT (or your choice)
