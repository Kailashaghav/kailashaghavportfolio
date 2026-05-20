# 🚀 Kailash Portfolio — Backend + Deployment Guide

## What We Built
The contact form now sends data to a **Next.js API Route** which saves it to **MongoDB Atlas**.
No separate backend server needed — Next.js handles everything.

---

## 📁 Files Added / Changed

```
kailash-portfolio/
├── app/
│   └── api/
│       └── contact/
│           └── route.ts          ← NEW: API endpoint
├── lib/
│   └── db.ts                     ← NEW: MongoDB connection
├── models/
│   └── Contact.ts                ← NEW: Mongoose schema
├── components/sections/
│   └── ContactSection.tsx        ← UPDATED: calls real API
├── .env.local.example            ← NEW: environment template
└── package.json                  ← needs mongoose added
```

---

## STEP 1 — Add Mongoose to Your Project

Open terminal inside your project folder and run:

```bash
npm install mongoose
```

---

## STEP 2 — Set Up MongoDB Atlas (Free Cloud Database)

### 2.1 Create Account
1. Go to → https://www.mongodb.com/atlas
2. Click **"Try Free"** → Sign up with Google or email
3. Choose **Free tier (M0)** → Select region (Mumbai/Singapore for India)
4. Click **"Create Deployment"**

### 2.2 Create Database User
1. On the left sidebar → **Database Access**
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Set a username (e.g., `kailash`) and a strong password
5. Under **Database User Privileges** → select **"Read and write to any database"**
6. Click **"Add User"**

### 2.3 Whitelist Your IP
1. On the left sidebar → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Vercel deployment)
   - This sets `0.0.0.0/0` — fine for portfolio projects
4. Click **"Confirm"**

### 2.4 Get Your Connection String
1. Go to **Database** (left sidebar) → Click **"Connect"**
2. Choose **"Drivers"**
3. Select **Node.js** → Version **5.5 or later**
4. Copy the connection string — looks like:
   ```
   mongodb+srv://kailash:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add your database name: change `/?retryWrites` to `/portfolio?retryWrites`

Final string:
```
mongodb+srv://kailash:yourpassword@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## STEP 3 — Add Files to Your Project

### 3.1 Copy the new files
From the files provided, copy these into your project:

| File | Location in project |
|------|-------------------|
| `route.ts` | `app/api/contact/route.ts` |
| `db.ts` | `lib/db.ts` |
| `Contact.ts` | `models/Contact.ts` |
| `ContactSection.tsx` | `components/sections/ContactSection.tsx` (replace existing) |

### 3.2 Create .env.local
Create a file called `.env.local` in the ROOT of your project:

```env
MONGODB_URI=mongodb+srv://kailash:yourpassword@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

⚠️ **IMPORTANT**: Never commit `.env.local` to Git! Add it to `.gitignore`:
```
echo ".env.local" >> .gitignore
```

---

## STEP 4 — Test Locally

```bash
npm run dev
```

1. Open → http://localhost:3000
2. Scroll to the Contact section
3. Fill in name, email, message → click **Send Message**
4. You should see the ✓ success screen

### Verify data in MongoDB Atlas:
1. Go to Atlas → **Browse Collections**
2. You'll see: `portfolio` database → `contacts` collection
3. Your test message will appear there ✓

---

## STEP 5 — Deploy to Vercel (Recommended)

Vercel is made by the same team as Next.js — best choice.

### 5.1 Push to GitHub
```bash
# If you haven't already:
git init
git add .
git commit -m "Add MongoDB contact form backend"

# Create a repo on github.com then:
git remote add origin https://github.com/YOUR_USERNAME/kailash-portfolio.git
git push -u origin main
```

### 5.2 Deploy on Vercel
1. Go to → https://vercel.com
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your `kailash-portfolio` repository
5. Keep all settings as default (Vercel auto-detects Next.js)
6. Before clicking Deploy → scroll down to **"Environment Variables"**

### 5.3 Add Environment Variable in Vercel
| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://kailash:yourpassword@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority` |

7. Click **"Deploy"** 🚀
8. Wait ~2 minutes → Your site is LIVE!

Vercel gives you a URL like: `https://kailash-portfolio.vercel.app`

---

## STEP 6 — View All Contact Messages

### Option A: MongoDB Atlas UI
1. Go to Atlas → Browse Collections → `portfolio` → `contacts`
2. See all messages with timestamps

### Option B: API Endpoint (temporary)
Visit: `https://your-site.vercel.app/api/contact`

This returns all messages as JSON. 
⚠️ Add authentication before sharing the URL publicly!

---

## How It Works — Flow Diagram

```
User fills form
      ↓
ContactSection.tsx — fetch("/api/contact", { method: "POST", body: formData })
      ↓
app/api/contact/route.ts — validates name, email, message
      ↓
lib/db.ts — connectDB() → connects to MongoDB Atlas
      ↓
models/Contact.ts — Contact.create({ name, email, message })
      ↓
MongoDB Atlas — saves document with timestamps
      ↓
Returns { success: true } → form shows ✓ success screen
```

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `MONGODB_URI is not defined` | Make sure `.env.local` exists and has the variable |
| `MongoServerError: bad auth` | Wrong password in connection string |
| `Network timeout` | IP not whitelisted in Atlas → set `0.0.0.0/0` |
| `Module not found: mongoose` | Run `npm install mongoose` |
| Form shows error but no crash | Check browser console + terminal logs |

---

## Your Data in MongoDB

Each contact message is stored as:
```json
{
  "_id": "664a1b2c3d4e5f6a7b8c9d0e",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello Kailash, I have a project for you!",
  "createdAt": "2026-04-21T10:30:00.000Z",
  "updatedAt": "2026-04-21T10:30:00.000Z",
  "__v": 0
}
```

---

## 🎉 Done!

Your portfolio is now fully deployed with:
- ✅ Next.js 14 frontend
- ✅ MongoDB Atlas database  
- ✅ Contact form saves messages
- ✅ Hosted live on Vercel
- ✅ Free tier (no cost!)
