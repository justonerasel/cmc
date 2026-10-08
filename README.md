# CYBER MUSLIM COMMUNITY (CMC) — V1

**Master Project Release V1**
**Architect & Developer:** MD RASEL HOSSEN
**Payment System:** STRICTLY NONE (Permanent non-monetized community platform)
**Primary Stack:** HTML + CSS + JavaScript + Supabase + GitHub + Vercel

---

## 1. Project Overview
CYBER MUSLIM COMMUNITY (CMC) is an exclusive, private digital community hub engineered with 9 Eleven cyberpunk styling: dark obsidian backgrounds, emerald/cyan accents, and glassmorphism.

### Key Features
1. **Private Media Hub**: Encrypted repository supporting APKs, Documents, Audio, Video, and Images.
2. **Media Login Gate**: Public visitors cannot see or download private files without authentication.
3. **Official Announcements**: Live broadcast system for community updates.
4. **Encrypted Message Drop**: In-browser secure message transmission to admin.
5. **Real-Time Visitor Counter**: Backed by persistent storage.
6. **Social Hub**: Verified official communication relays.
7. **Protected Admin Command Center**: Dashboard to manage files, read messages, post bulletins, and configure Supabase.
8. **Strict Zero-Payment Discipline**: No bKash, no Nagad, no Rocket, no card gateways.

---

## 2. Step-by-Step Setup Guide (For Non-Programmers)

### STEP 1: GitHub Repository Setup
1. Open [https://github.com](https://github.com) and log in.
2. Click the **"+"** button at the top right and select **"New repository"**.
3. Name your repository: `cmc-cyber-community`.
4. Choose **Public** or **Private**, then click **"Create repository"**.
5. Upload all files from this ZIP to the repository and click **Commit changes**.

### STEP 2: Supabase Database Setup
1. Open [https://supabase.com](https://supabase.com) and create a free project.
2. Go to the **SQL Editor** tab on the left sidebar.
3. Open `supabase/schema.sql` from this project, copy all the SQL code, and paste it into the Supabase SQL Editor.
4. Click **Run**. All database tables, security policies (RLS), and functions will be created automatically.
5. Go to **Storage**, click **"New bucket"**, name it `cmc-media`, and keep it private.
6. In **Project Settings -> API**, copy your **Project URL** and **Anon Key**.
7. Open the CMC Admin Panel on your website -> **Supabase Config** tab, and paste your URL and Anon Key.

### STEP 3: Vercel Deployment
1. Open [https://vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Select your `cmc-cyber-community` GitHub repository.
4. Click **"Deploy"**.
5. In less than 1 minute, your website will be live worldwide!

---

## 3. File Structure
```
CMC/
├── index.html              # Main homepage
├── media.html              # Private media vault & gate
├── admin.html              # Administrator command center
├── login.html              # Community authentication gate
├── vercel.json             # Vercel deployment configuration
├── README.md               # Complete documentation
├── .gitignore              # Git ignore rules
│
├── assets/
│   ├── css/
│   │   └── style.css       # 9 Eleven dark cyberpunk stylesheet
│   └── js/
│       ├── app.js          # Homepage logic & visitor counter
│       ├── auth.js         # Authentication helpers
│       ├── media.js        # Media vault access gate logic
│       ├── admin.js        # Admin dashboard operations
│       └── supabase.js     # Supabase client integration
│
└── supabase/
    └── schema.sql          # Complete PostgreSQL schema & RLS rules
```
