# Gone Girl: Full-Stack Implementation Plan

## PHASE 1: Foundation (Weeks 1-2, ~60 hours)
**Priority:** Authentication + Database Schema

### Frontend Structure
```
app/src/
├── components/
│   ├── Auth/          (Login, Signup, Email Verification)
│   ├── Shared/        (Header, Footer, Navigation, Modal)
│   └── Layout/        (ProtectedRoute, MainLayout)
├── pages/
│   ├── Dashboard.jsx
│   ├── LoginPage.jsx
│   └── LandingPage.jsx
├── hooks/            (useAuth, useUser)
├── services/         (api.js - axios instance)
├── context/          (AuthContext)
├── styles/           (Tailwind config)
└── utils/            (validators, formatters)
```

### Backend API Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/verify-email` - Email verification
- `POST /auth/logout` - Logout
- `GET /auth/me` - Current user info

### Database Schema (MongoDB)
```
Users: _id, email, password(hashed), firstName, lastName, avatar, role(user/admin), verified, createdAt
```

---

## PHASE 2: Core Features (Weeks 3-4, ~80 hours)
**Priority:** User Dashboard + Trip Management

### Components Needed
- TripCard, TripGrid, TripDetails
- BookingForm, DatePicker, PaymentForm
- UserProfile, ProfileSettings

### API Endpoints
- `GET /trips` - Browse trips
- `GET /trips/:id` - Trip details
- `POST /bookings` - Create booking
- `GET /bookings` - User bookings
- `GET /users/:id` - Public profile

### Database Schema
```
Trips: _id, title, description, destinations[], dates, price, maxParticipants, images[], createdBy
Bookings: _id, userId, tripId, startDate, endDate, status, totalPrice, paymentId
```

---

## PHASE 3: Payments (Week 5, ~40 hours)
- Stripe integration + webhook handling
- Razorpay integration
- `POST /payments/create-intent`, `POST /payments/confirm`

---

## PHASE 4: Community (Week 6, ~50 hours)
- Gallery component + image upload (Cloudinary)
- Socket.io chat setup
- Reviews system
- `GET /gallery/:tripId`, `POST /reviews`, `GET /chat/:tripId`

---

## PHASE 5: Admin (Week 7, ~30 hours)
- AdminDashboard, AnalyticsCharts
- Trip CRUD operations
- Booking management
- `POST/PUT/DELETE /admin/trips`, `GET /admin/analytics`

---

## PHASE 6: Polish (Week 8, ~20 hours)
- E2E testing, deployment, monitoring

---

## Key Dependencies to Add
```json
{
  "frontend": ["axios", "react-router-dom", "tailwindcss", "react-icons", "date-fns"],
  "backend": ["mongoose", "bcryptjs", "jsonwebtoken", "stripe", "socket.io", "multer"],
  "email": "existing nodemailer setup"
}
```

**Total Estimate:** 8 weeks, ~280 hours
**MVP (Phases 1-3):** 4 weeks, 180 hours
