# Backend (Django REST API)

## Overview
This is the backend for the Polling-APP, built with Django and Django REST Framework. It provides APIs for user authentication, poll creation, voting, and results.

## How to Run

### Prerequisites
- Python 3.8+
- pip

### Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. (Optional) Create and activate a virtual environment:
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
6. Create a superuser (optional):
   ```
   python manage.py createsuperuser
   ```
7. Start the server:
   ```
   python manage.py runserver
   ```

## Main Tools & Libraries
- Django 4.1
- Django REST Framework
- djoser (auth)
- SimpleJWT (JWT auth)
- django-environ (env vars)
- django-cors-headers
- MySQL (prod) / SQLite (dev)

## Features
- JWT authentication
- User registration/login
- Poll creation, listing, voting
- Live and closed poll results
- Admin panel

## Notes
- For production, set `DEBUG=False` and use a strong `SECRET_KEY`.
- Update CORS and allowed hosts as needed.
- Keep `.env` and `venv/` out of version control.
