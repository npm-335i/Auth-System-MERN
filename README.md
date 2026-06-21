# 🔐 Auth-System-MERN

**A complete, production-ready authentication system built with the MERN stack featuring account lockout, rate limiting, and secure JWT-based authentication.**

![MongoDB](https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-4ade80?style=for-the-badge&logo=mit&logoColor=white)

---

## ✨ Preview

- **Live Demo**: [https://auth-system-frontend-six.vercel.app/auth](https://auth-system-frontend-six.vercel.app/auth)

A complete authentication solution with a stunning dark glass-morphic UI, built for security and user experience.

---

## 🔐 Core Authentication Features

- **User Registration** - Email, password, first name, last name with validation
- **User Login** - Secure authentication with rate limiting
- **Logout** - Session termination with cookie clearing
- **Password Hashing** - bcrypt with unique salt per user
- **Account Lockout** - After 5 failed attempts (30-minute lock)
- **Rate Limiting** - 5 attempts per 15 minutes, 10 registrations per hour
- **JWT Authentication** - Secure 7-day tokens in HTTP-only cookies
- **Input Sanitization** - All inputs sanitized on backend
- **Password Strength** - Minimum 8 characters requirement

---

## 👤 User Management

- **User Profile** - View complete account details
- **Change Password** - With current password verification
- **Account Details** - Email, name, join date, status
- **Last Login Tracking** - Stores timestamp
- **Login Attempts** - Tracks failed attempts
- **Role-Based Access** - User/Admin roles

---

## 🎨 Frontend Features

- **Authentication Pages** - Login/Signup with seamless toggle
- **Dashboard** - Full user account management
- **Protected Routes** - Redirects unauthenticated users
- **Persistent Sessions** - Stays logged in on refresh
- **Dark Theme UI** - Premium glass-morphism design
- **Responsive Design** - Works perfectly on all devices
- **Real-time Validation** - Instant form validation
- **Loading States** - Visual feedback during API calls
- **Toast Notifications** - Success/error messages

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **MongoDB + Mongoose** - Database with ODM
- **JWT** - JSON Web Tokens for auth
- **bcrypt** - Password hashing
- **express-rate-limit** - Rate limiting
- **helmet** - Security headers
- **cookie-parser** - Cookie handling
- **cors** - Cross-origin configuration
- **express-validator** - Input validation

### Frontend
- **React 19.2.7** - UI framework
- **React Router** - Routing with protection
- **Axios** - HTTP client with interceptors
- **Raw CSS** - Custom glass-morphism styling
- **SVG Icons** - Clean vector icons

---

## 📁 Project Structure

```
Auth-System-MERN/
├── backend/
│   ├── models/
│   │   └── User.js              # User schema with password hashing
│   ├── routes/
│   │   └── authRoutes.js        # All authentication endpoints
│   ├── app.js                   # Express server setup
│   ├── .env                     # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js         # Axios instance with interceptors
│   │   ├── components/
│   │   │   ├── Auth.jsx         # Login/Signup page
│   │   │   ├── Dashboard.jsx    # User dashboard
│   │   │   └── Navbar.jsx       # Navigation with auth state
│   │   ├── styles/
│   │   │   ├── auth.css         # Auth page styles
│   │   │   ├── Dashboard.css    # Dashboard styles
│   │   │   └── navbar.css       # Navigation styles
│   │   └── App.jsx              # Main app with routing
│   ├── public/
│   └── package.json
└── README.md
```

---

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/profile` | Get user profile |
| GET | `/api/auth/dashboard` | Get dashboard data |
| PUT | `/api/auth/change-password` | Change password |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/npm-335i/Auth-System-MERN.git
cd Auth-System-MERN
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment**
```bash
# In backend directory, create .env file
MONGODB_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:3000
COOKIE_SECRET=your_secret_key
JWT_SECRET=your_jwt_secret
```

5. **Run the Application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
# Backend running on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
# Frontend running on http://localhost:3000
```

6. **Open your browser**
Navigate to `http://localhost:3000`

---

## 🛡️ Security Features

- ✅ HTTP-only cookies (prevents XSS)
- ✅ Signed cookies (prevents tampering)
- ✅ JWT with 7-day expiry
- ✅ Password hashing with bcrypt
- ✅ Account lockout after 5 attempts
- ✅ Rate limiting on login/register
- ✅ Input sanitization
- ✅ Helmet.js security headers
- ✅ CORS with proper configuration

---

## 📊 Dashboard Features

- **Welcome Message** - Personalized greeting
- **Account Details** - Email, name, join date, status
- **Security Info** - Login attempts, last login, role
- **Change Password** - Modal with current password verification
- **Quick Actions** - One-click password change
- **Session Management** - Stay logged in on refresh

---

## 🎯 What Works

- ✅ Registration with validation
- ✅ Secure login with rate limiting
- ✅ Account lockout on failed attempts
- ✅ JWT stored in HTTP-only cookies
- ✅ Session persistence on refresh
- ✅ Password change with verification
- ✅ Protected dashboard route
- ✅ Responsive dark theme UI
- ✅ Professional glass-morphism design
- ✅ Mobile-friendly navigation
- ✅ Input sanitization
- ✅ Error handling
- ✅ Loading states

---

## 🐛 Troubleshooting

### Common Issues

**Backend not running**
```bash
cd backend
npm run dev
```

**MongoDB connection error**
- Check MONGODB_URI in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure network access allows connections

**CORS errors**
- Verify FRONTEND_URL in .env
- Check CORS configuration in backend

---

## 👨‍💻 About the Developer

**Uzair** - Full Stack Developer passionate about building secure, production-ready applications.

[![LinkedIn](https://img.shields.io/badge/Connect_on_LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/uzairdev1/)
[![GitHub](https://img.shields.io/badge/Follow_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/npm-335i)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Built with ❤️ by [Uzair](https://www.linkedin.com/in/uzairdev1/)
- Security best practices implemented throughout
- Inspired by modern authentication standards

---

**Built with ❤️ by Uzair**

[Report Bug](https://github.com/npm-335i/Auth-System-MERN/issues) · [Request Feature](https://github.com/npm-335i/Auth-System-MERN/issues)

⭐ Star this project if you find it useful!

---

### 🔐 Secure Authentication Made Simple

---

## 📊 Badges

![GitHub stars](https://img.shields.io/github/stars/npm-335i/Auth-System-MERN?style=social)
![GitHub forks](https://img.shields.io/github/forks/npm-335i/Auth-System-MERN?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/npm-335i/Auth-System-MERN?style=social)

![GitHub issues](https://img.shields.io/github/issues/npm-335i/Auth-System-MERN)
![GitHub pull requests](https://img.shields.io/github/issues-pr/npm-335i/Auth-System-MERN)
![GitHub last commit](https://img.shields.io/github/last-commit/npm-335i/Auth-System-MERN)
