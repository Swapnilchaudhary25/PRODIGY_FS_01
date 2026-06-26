# 🔐 Secure User Authentication — Prodigy Infotech Task-01

A complete Node.js + Express authentication system with:
- ✅ User registration with input validation
- ✅ Secure login via Passport.js (LocalStrategy)
- ✅ Password hashing with **bcryptjs** (salt rounds: 10)
- ✅ Session management with **express-session** (HTTP-only cookies)
- ✅ Protected routes via custom `ensureAuthenticated` middleware
- ✅ Role-based access control (User / Admin)
- ✅ Flash messages for feedback
- ✅ Clean dark-themed UI with EJS templates

---

## 📁 Project Structure

```
auth-app/
├── config/
│   └── passport.js         # Passport LocalStrategy
├── middleware/
│   └── auth.js             # ensureAuthenticated, ensureGuest, ensureAdmin
├── models/
│   └── User.js             # Mongoose schema with pre-save bcrypt hook
├── routes/
│   ├── index.js            # Home page
│   ├── auth.js             # /auth/register, /auth/login, /auth/logout
│   └── dashboard.js        # /dashboard, /dashboard/admin, /dashboard/profile
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── register.ejs
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── profile.ejs
│   ├── admin.ejs
│   ├── 404.ejs
│   └── error.ejs
├── public/
│   ├── css/style.css
│   └── js/main.js
├── server.js
├── package.json
├── .env
└── .gitignore
```

---

## 🚀 Setup & Run

### 1. Prerequisites
- Node.js >= 16
- MongoDB running locally (or MongoDB Atlas URI)

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Edit `.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth_app
SESSION_SECRET=change_this_to_a_long_random_string
```

### 4. Start the server
```bash
# Production
npm start

# Development (auto-reload)
npm run dev
```

### 5. Open in browser
```
http://localhost:3000
```

---

## 🛡️ Security Features

| Feature | Implementation |
|---|---|
| Password hashing | bcryptjs with 10 salt rounds |
| Session storage | express-session with HTTP-only cookies |
| Input validation | express-validator on all form inputs |
| Protected routes | Passport.js `req.isAuthenticated()` middleware |
| Role-based access | `ensureAdmin` middleware on admin routes |

---

## 👑 Creating an Admin

Register normally, then update the role in MongoDB:
```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```
