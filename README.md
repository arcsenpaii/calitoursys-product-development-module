# CaliTourSys - Tourism Product Development Program

Standalone Application Development module for the Tourism Office of Calabanga.

## Project Overview

This repository contains the **Tourism Product Development Program** module of
CaliTourSys. The module helps the Tourism Office manage the internal workflow for
turning local tourism assets into organized tourism activities and packages.

The module currently supports:

- demo JWT login with role-based access control
- tourism asset management
- product development planning linked to tourism assets
- improvement monitoring
- tourism activity management
- tourism package creation
- package readiness review
- status history
- dashboard/report summaries
- ready-for-promotion package handoff endpoint

This project is currently developed as a standalone Application Development
submission. It is also intended to become one module of the larger capstone
project: **Local Government Unit Tourism Office Operation Information Management
System of Calabanga**.

## Tech Stack

- Frontend: Vue.js with Vite
- Backend: Node.js with Express.js
- Database: SQLite
- Authentication: demo JWT login with role-based access control

## User Roles

| Role | Access |
| --- | --- |
| Tourism Staff | Create and update operational records |
| Tourism Officer | Create, update, archive, review, and approve readiness |
| LGU Official | View-only access |
| System Administrator | Full module access |

## Demo Accounts

All demo accounts use this password:

```text
password123
```

| Username | Role |
| --- | --- |
| `staff` | Tourism Staff |
| `officer` | Tourism Officer |
| `lgu` | LGU Official |
| `admin` | System Administrator |

These accounts are for demonstration only and should not be used as production
credentials.

## Project Structure

```text
CaliTourSys/
  backend/     Express API, SQLite migrations, seeds, and module services
  frontend/    Vue/Vite frontend application
  modules/     Placeholder folder for future group module consolidation
```

## Local Setup

### 1. Install Backend Dependencies

```powershell
cd backend
npm install
```

### 2. Prepare Backend Environment

Create `backend/.env` from `backend/.env.example`.

```powershell
Copy-Item .env.example .env
```

The default values are suitable for local development.

### 3. Run Database Migrations and Seeds

```powershell
npm run db:migrate
npm run db:seed
```

The seed command can be run more than once. Demo users are updated and sample
records use fixed IDs to avoid duplicate data.

### 4. Start Backend

```powershell
npm run dev
```

Backend API:

```text
http://localhost:5000/api
```

Health check:

```text
http://localhost:5000/api/health
```

### 5. Install Frontend Dependencies

Open a new terminal:

```powershell
cd frontend
npm install
```

### 6. Prepare Frontend Environment

Create `frontend/.env` from `frontend/.env.example`.

```powershell
Copy-Item .env.example .env
```

### 7. Start Frontend

```powershell
npm run dev
```

Frontend app:

```text
http://localhost:5173
```

## Useful Scripts

Backend:

```powershell
npm run check
npm run db:migrate
npm run db:seed
```

Frontend:

```powershell
npm run build
```

Database reset is protected because it deletes local SQLite data:

```powershell
$env:CONFIRM_DB_RESET='YES'
npm run db:reset
Remove-Item Env:\CONFIRM_DB_RESET
```

## Main API Groups

```text
/api/auth
/api/assets
/api/development-plans
/api/improvements
/api/activities
/api/packages
/api/packages/ready-for-promotion
/api/reports
/api/product/status
```

## Notes

- SQLite database files are stored locally under `backend/data/` and are ignored
  by Git.
- `.env` files are ignored by Git. Only `.env.example` files should be committed.
- Demo JWT authentication is for prototype and classroom demonstration purposes.
  A production deployment should add stronger account management, password
  policies, and deployment security.
