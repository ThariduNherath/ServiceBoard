# ServiceBoard — GlobalTNA Full-Stack Intern Assessment

A full-stack Mini Service Request Board where homeowners can post service requests and tradespeople can browse, view, and update their status.

---

## Live Demo

| | URL |
|---|---|
| 🌐 Frontend | https://service-board-next.vercel.app |
| ⚙️ Backend API | https://serviceboard-production.up.railway.app/api/jobs|
| 📦 GitHub | https://github.com/ThariduNherath/ServiceBoard |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) + Tailwind CSS |
| Backend | Node.js + Express 5 |
| Database | MongoDB (Atlas or local) |
| ODM | Mongoose |
| Fonts | Syne (headings) + DM Sans (body) |

---

## Project Structure

```
globaltna-assessment/
├── backend/
│   ├── src/
│   │   ├── index.js          # Express server entry point
│   │   ├── db.js             # MongoDB connection
│   │   ├── models/
│   │   │   └── JobRequest.js # Mongoose schema
│   │   └── routes/
│   │       └── jobs.js       # REST API routes
│   ├── seed.js               # Sample data seed script
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── layout.jsx         # Root layout + fonts
    │   ├── page.jsx           # Home — job listings
    │   ├── globals.css        # Global styles + CSS variables
    │   ├── jobs/[id]/
    │   │   └── page.jsx       # Job detail page
    │   └── new/
    │       └── page.jsx       # New job form
    ├── components/
    │   ├── Navbar.jsx         # Sticky navigation header
    │   └── StatusBadge.jsx    # Status indicator component
    ├── lib/
    │   └── api.js             # API client functions
    └── package.json
```

---

## Environment Variables

### Backend — create `backend/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

> MongoDB Atlas example:
> `MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/globaltna?retryWrites=true&w=majority`
>
> Local MongoDB example:
> `MONGO_URI=mongodb://localhost:27017/globaltna`

### Frontend — create `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Setup & Run Instructions

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier) or local MongoDB installed

---

### 1. Clone the repository

```bash
git clone https://github.com/ThariduNherath/ServiceBoard.git
cd globaltna-assessment
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Create the `.env` file as shown above, then:

```bash
npm run dev
```

You should see:
```
MongoDB connected
API running on :5000
```

Test it: open `http://localhost:5000/api/jobs` in your browser — should return `[]`.

---

### 3. Seed sample data (optional)

```bash
cd backend
node seed.js
```

This inserts 5 sample jobs:
- Leaking kitchen tap (Plumbing, Glasgow)
- Rewire garage sockets (Electrical, Edinburgh)
- Paint living room (Painting, London)
- Fix garden fence (Joinery, Manchester)
- Boiler service (Plumbing, Glasgow)

---

### 4. Frontend setup

```bash
cd frontend
npm install
```

Create `.env.local` as shown above, then:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/jobs` | List all jobs |
| GET | `/jobs?category=Plumbing` | Filter by category |
| GET | `/jobs?status=Open` | Filter by status |
| GET | `/jobs?search=boiler` | Keyword search (title + description) |
| GET | `/jobs/:id` | Get single job |
| POST | `/jobs` | Create new job |
| PATCH | `/jobs/:id` | Update status only |
| DELETE | `/jobs/:id` | Delete a job |

### HTTP Status Codes used

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad request / validation error |
| 404 | Resource not found |
| 500 | Server error |

---

## Data Model — `jobRequests` collection

```js
{
  title:        String, required
  description:  String, required
  category:     String  // Plumbing | Electrical | Painting | Joinery
  location:     String
  contactName:  String
  contactEmail: String  // validated email format
  status:       String  // "Open" | "In Progress" | "Closed", default: "Open"
  createdAt:    Date    // auto set on create
}
```

---

## Frontend Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | All job cards, category filter dropdown, keyword search |
| `/new` | New Request | Form to create a job with client-side validation |
| `/jobs/[id]` | Job Detail | Full details, status pill buttons, delete button |

---

## Features Implemented

### Core (Required)
- [x] MongoDB `jobRequests` collection with all required fields
- [x] `GET /api/jobs` with `?category=` and `?status=` filters
- [x] `GET /api/jobs/:id` — single job fetch
- [x] `POST /api/jobs` — create with required field validation
- [x] `PATCH /api/jobs/:id` — update status only
- [x] `DELETE /api/jobs/:id` — delete a job
- [x] Global error handler + 404 for missing resources
- [x] Proper HTTP status codes + JSON responses
- [x] Home page with job cards + category filter dropdown
- [x] New job form with client-side validation
- [x] Job detail page with status change + delete button
- [x] Frontend talks to Express API (not directly to MongoDB)

### Bonus (Optional)
- [x] Keyword search across title and description (MongoDB text index)
- [x] Seed script with 5 sample jobs (`node seed.js`)
- [x] Deployed frontend to Vercel, backend to Railway
- [ ] JWT-based authentication
- [ ] Unit tests (Jest / Vitest)

---

## Running Both Servers

Open two terminals:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api/jobs |

---

## Notes

- The frontend uses Next.js **App Router** (not Pages Router)
- All API calls go through `frontend/lib/api.js` to the Express backend
- MongoDB text index on `title` and `description` enables the keyword search bonus
- Status can only be updated via `PATCH /api/jobs/:id` — other fields are immutable after creation
