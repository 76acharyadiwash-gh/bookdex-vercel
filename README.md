# 📖 BookDex — Vercel + Supabase

Personal book tracking app. Deployed on Vercel (free, never sleeps) with Supabase PostgreSQL (free, persistent).

## Stack
- **Frontend:** Vanilla HTML/CSS/JS (single page)
- **Backend:** Vercel Serverless Functions
- **Database:** Supabase (PostgreSQL)
- **Auth:** JWT + bcrypt

## Project Structure
```
bookdex-vercel/
├── api/
│   ├── _db.js          # Supabase client
│   ├── _auth.js        # JWT verify helper
│   ├── signup.js       # POST /api/signup
│   ├── login.js        # POST /api/login
│   └── books/
│       ├── index.js    # GET + POST /api/books
│       └── [id].js     # PUT + DELETE /api/books/:id
├── public/
│   └── index.html      # Full frontend
├── vercel.json
└── package.json
```

## Deploy

1. Create a Supabase project at supabase.com
2. Run the SQL in the Supabase SQL editor (see below)
3. Push to GitHub
4. Import to Vercel, add environment variables
5. Deploy

## Supabase SQL Setup
```sql
create table users (
  id serial primary key,
  name text,
  email text unique,
  password text
);

create table books (
  id serial primary key,
  title text,
  author text,
  genre text,
  description text,
  pages integer,
  "currentPage" integer,
  status text,
  rating integer,
  notes text,
  "startDate" text,
  "finishDate" text,
  "coverUrl" text,
  user_id integer
);
```

## Environment Variables (Vercel)
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
JWT_SECRET=your_random_secret
```
