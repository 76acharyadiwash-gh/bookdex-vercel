# 📖 BookDex


View My personal book Library :  https://bookdex-vercel.vercel.app/share.html?t=1f1627b35f8a071bb5e271be566774dd
> A personal book tracking web app to manage your entire reading life.

🌐 **Live (v2):** [bookdex-vercel.vercel.app](https://bookdex-vercel.vercel.app/)

---

## What is BookDex?

BookDex lets you track every book you've read, are reading, or plan to read — with progress tracking, personal ratings, notes, and reading statistics. Built as a personal project and deployed as a full-stack web app.

---

## Features

- 🔐 User authentication — signup, login, logout with JWT
- 📚 Add, edit, delete books from your personal library
- 📊 Reading progress bar per book (current page / total pages)
- ⭐ Rate books out of 10
- 🗒️ Personal notes per book
- 🖼️ Book cover via URL
- 📅 Start date and finish date tracking
- 🗂️ Filter by status — Reading, Completed, Plan to Read, On Hold, Dropped
- 🔍 Search by title, author, or genre
- 🔃 Sort by date added, rating, pages, or title
- 🔗 Share a private, read-only library link that can be revoked at any time
- 📈 Statistics — status breakdown, genre chart, rating distribution
- ✨ Smooth page transitions and animated progress bars
- 📱 Fully responsive — works on mobile and desktop
- 👥 Multi-user support — each account sees only their own books

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Vercel Serverless Functions (Node.js) |
| Database | Supabase (PostgreSQL) |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Hosting | Vercel (free, never sleeps) |

---

## Changelog

### v2.0 — Vercel + Supabase *(current)*
- Migrated from Express/Render to **Vercel Serverless Functions**
- Migrated from SQLite → Render PostgreSQL → **Supabase PostgreSQL**
- Data now persists forever — no more resets on server restart
- Site never sleeps — instant load every time (Vercel free tier)
- Token stored in `localStorage` — stay logged in across sessions
- Auth headers fixed on all API calls (PUT, DELETE, POST)
- Clean fresh repo — no legacy code

### v1.1 — Render + PostgreSQL
- Migrated backend database from SQLite to PostgreSQL on Render
- Added JWT expiry (7 days)
- Fixed auth middleware on all protected routes
- Added proper logout flow
- Fixed duplicate server code in frontend

### v1.0 — Node.js + SQLite + Render
- Initial release — Express.js backend, SQLite database
- Deployed on Render free tier
- Basic book CRUD, user authentication, reading stats
- Rebranded from **Folio** → **BookDex**
- Theme changed from amber (#d4a843) to green (#B5E18B)
- Added smooth page transitions and animated progress bars

---

## Project Structure (v2)

```
bookdex-vercel/
├── api/
│   ├── _db.js            # Supabase client
│   ├── _auth.js          # JWT verify middleware
│   ├── signup.js         # POST /api/signup
│   ├── login.js          # POST /api/login
│   ├── share.js          # GET + POST + DELETE /api/share
│   ├── shared.js         # GET /api/shared (public read-only view data)
│   └── books/
│       ├── index.js      # GET + POST /api/books
│       └── [id].js       # PUT + DELETE /api/books/:id
├── public/
│   ├── index.html        # Full frontend (single page app)
│   └── share.html        # Public read-only shared library
├── vercel.json
├── package.json
└── .gitignore
```

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/signup` | Create account | No |
| POST | `/api/login` | Login, returns JWT | No |
| GET | `/api/books` | Get all your books | Yes |
| POST | `/api/books` | Add a book | Yes |
| PUT | `/api/books/:id` | Update a book | Yes |
| DELETE | `/api/books/:id` | Delete a book | Yes |
| GET | `/api/share` | Get your current share link token | Yes |
| POST | `/api/share` | Create a share link | Yes |
| DELETE | `/api/share` | Revoke your share link | Yes |
| GET | `/api/shared?t=<token>` | Get books for a valid shared link | No |

---

## Run Locally

```bash
git clone https://github.com/76acharyadiwash-gh/bookdex-vercel.git
cd bookdex-vercel
npm install
```

Create a `.env` file:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_service_role_key
JWT_SECRET=your_secret_key
```

```bash
npx vercel dev
```

Open `http://localhost:3000`

---

## Deploy Your Own

1. Fork this repo
2. Create a free [Supabase](https://supabase.com) project and run the SQL below
3. Import to [Vercel](https://vercel.com) and add the 3 environment variables
4. Deploy

**Supabase SQL:**
```sql
create table users (
  id serial primary key,
  name text,
  email text unique,
  password text,
  share_token text unique
);

create table books (
  id serial primary key,
  title text, author text, genre text,
  description text, pages integer,
  "currentPage" integer, status text,
  rating integer, notes text,
  "startDate" text, "finishDate" text,
  "coverUrl" text, user_id integer
);
```

If your Supabase project already has the `users` table, run this migration once in the SQL Editor before deploying:

```sql
alter table users add column share_token text unique;
```

Owners can create a link from the **Share** button in the library. Anyone with the link can view shared books, ratings, descriptions, and notes; they cannot edit the library. **Stop sharing** immediately revokes the link. Use your main site domain when sharing so viewers are not prompted to sign in to Vercel.

---

## Author

**Diwash Acharya**
BSc. CSIT Student — Mechi Multiple Campus, Nepal
- GitHub: [@76acharyadiwash-gh](https://github.com/76acharyadiwash-gh)

---

## License

MIT — open source, free to use.
