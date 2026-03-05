# How to Change the Email Used to Send the 6-Digit Verification Code

The 6-digit code is **not** sent from this frontend app. It is sent by your **backend API** when:

1. A user signs up → backend calls `POST /auth/signup` and should send the code by email.
2. A user clicks "Resend Code" → frontend calls `POST /api/phone-verification/resend`; the **backend** sends the email.

So to use a **different sender email and password**, you must change the configuration **on the backend server**, not in this repo.

---

## Step-by-step: Change sender email and password

### 1. Locate your backend project

- Your frontend uses: **`https://hometrust-backend.duckdns.org/api`** (from `vite-project/.env` as `VITE_API_BASE_URL`).
- The code that sends the verification email runs in the **backend** that serves that URL (e.g. a repo named something like `hometrust-backend` or your API server).

Open that backend project (where you have routes like `/auth/signup` and `/phone-verification/resend`).

---

### 2. Find where email is configured in the backend

In the backend repo, look for:

- **Environment variables** (e.g. in `.env` or in your hosting dashboard):
  - `MAIL_USER` / `MAIL_EMAIL` / `EMAIL_USER` / `NODEMAILER_USER` → **sender email**
  - `MAIL_PASS` / `MAIL_PASSWORD` / `EMAIL_PASS` / `NODEMAILER_PASS` → **sender password** (often an “App Password”, see below)
  - Sometimes: `SMTP_HOST`, `SMTP_PORT`, `SENDGRID_API_KEY`, `RESEND_API_KEY`, etc.
- **Code** that sends email:
  - Search for: `nodemailer`, `sendgrid`, `resend`, `createTransport`, `sendMail`, `transporter`.

Whoever set up the backend originally would have used these (or similar) names for the sender email and password.

---

### 3. Use a proper “sender” email and password

- **Sender email**: The address that appears as “From” (e.g. `noreply@yourdomain.com` or a Gmail you use only for sending).
- **Password**: For Gmail/Google, do **not** use your normal account password. Use an **App Password**:
  1. Go to [Google Account → Security](https://myaccount.google.com/security).
  2. Turn on **2-Step Verification** if it’s not already on.
  3. Under “2-Step Verification”, open **App passwords**.
  4. Create a new app password for “Mail” (or “Other”) and copy the 16-character password.
  5. Put that **App Password** in your backend’s email password variable (e.g. `MAIL_PASS`).

For other providers (Outlook, SendGrid, Resend, etc.), use the credentials or API key they give you for sending mail.

---

### 4. Set the new values on the backend

**Option A – Backend runs locally / you have a `.env` file**

1. Open the backend’s `.env` (or `.env.example` and then rename/copy to `.env`).
2. Set or update, for example:
   ```env
   MAIL_USER=your-new-sender@gmail.com
   MAIL_PASS=your-16-char-app-password
   ```
   (Use the exact variable names your backend code expects; they might be `EMAIL_USER` / `EMAIL_PASS` or `NODEMAILER_USER` / `NODEMAILER_PASS`.)
3. Restart the backend server so it picks up the new env vars.

**Option B – Backend is deployed (e.g. VPS, Railway, Render, Fly.io)**

1. Log in to the hosting dashboard where `hometrust-backend.duckdns.org` is deployed.
2. Open **Environment variables** / **Config vars** for that project.
3. Add or edit:
   - Sender email variable (e.g. `MAIL_USER`) = your new sender email.
   - Sender password variable (e.g. `MAIL_PASS`) = new password or App Password.
4. Save and **redeploy** the backend (or restart the service) so the new values are used.

---

### 5. Test

1. In your frontend, sign up with a **different** email (the one that should receive the 6-digit code).
2. Check that the code arrives and that “Resend Code” also sends an email.
3. If it still doesn’t work, check the **backend logs** (where the API is running) for email/SMTP errors (e.g. “Invalid login”, “Less secure app”, etc.).

---

## Summary

| What you want to change | Where to change it |
|-------------------------|---------------------|
| Sender email (and password) for the 6-digit code | **Backend** env vars (e.g. `MAIL_USER`, `MAIL_PASS`) in backend repo or hosting dashboard |
| API URL the frontend uses | This repo: `vite-project/.env` → `VITE_API_BASE_URL` |

If you don’t have access to the backend repo or the server that hosts `hometrust-backend.duckdns.org`, you’ll need to get that access from your team or hosting provider to change the email and password.
