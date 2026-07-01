# Gone Girl: Technical Architecture

## Frontend Architecture (React + Vite)

### Directory Structure
```
app/src/
├── assets/              (images, icons, fonts)
├── components/
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   └── EmailVerification.jsx
│   ├── Trip/
│   │   ├── TripCard.jsx
│   │   ├── TripGrid.jsx
│   │   └── TripDetailModal.jsx
│   ├── Booking/
│   │   ├── BookingForm.jsx
│   │   ├── DateRangePicker.jsx
│   │   └── PaymentCheckout.jsx
│   ├── Community/
│   │   ├── PhotoGallery.jsx
│   │   ├── ChatWindow.jsx
│   │   └── ReviewCard.jsx
│   ├── Admin/
│   │   ├── TripManager.jsx
│   │   ├── BookingsList.jsx
│   │   └── Analytics.jsx
│   └── Shared/
│       ├── Header.jsx
│       ├── Footer.jsx
│       ├── Navigation.jsx
│       └── LoadingSpinner.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── DashboardPage.jsx
│   ├── TripDetailsPage.jsx
│   ├── BookingPage.jsx
│   ├── ProfilePage.jsx
│   ├── AdminDashboard.jsx
│   ├── LoginPage.jsx
│   └── SignupPage.jsx
├── hooks/
│   ├── useAuth.js         (auth state)
│   ├── useTrips.js        (trips fetching)
│   ├── useBookings.js     (bookings management)
│   └── usePayment.js      (payment integration)
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── services/
│   ├── api.js             (axios instance + interceptors)
│   ├── authService.js
│   ├── tripService.js
│   ├── bookingService.js
│   ├── paymentService.js
│   └── chatService.js
├── styles/
│   ├── globals.css
│   ├── variables.css      (brand colors: #2B7A78, #FF8C42, #E8F3F1)
│   └── tailwind.config.js
├── utils/
│   ├── validators.js
│   ├── formatters.js
│   ├── constants.js
│   └── errorHandler.js
└── App.jsx / main.jsx
```

---

## Backend Architecture (Node.js/Express)

### Directory Structure
```
server/
├── routes/
│   ├── auth.js            (signin, signup, verify)
│   ├── trips.js           (CRUD operations)
│   ├── bookings.js        (create, list, update status)
│   ├── payments.js        (Stripe/Razorpay webhooks)
│   ├── users.js           (profile, settings)
│   ├── gallery.js         (image upload)
│   ├── reviews.js         (create, get reviews)
│   ├── chat.js            (messages)
│   └── admin.js           (admin operations)
├── controllers/           (business logic)
├── models/
│   ├── User.js
│   ├── Trip.js
│   ├── Booking.js
│   ├── Payment.js
│   ├── Review.js
│   ├── Message.js
│   └── Gallery.js
├── middleware/
│   ├── auth.js            (JWT verification)
│   ├── adminCheck.js
│   ├── errorHandler.js
│   └── validation.js
├── config/
│   ├── database.js
│   ├── stripe.js
│   └── email.js
├── utils/
│   ├── tokenManager.js
│   └── logger.js
├── server.js              (main entry, Socket.io setup)
└── .env.example
```

---

## Database Schema (MongoDB)

### Collections

**Users**
```js
{
  _id, email, password, firstName, lastName, avatar,
  phone, bio, role: "user|admin", verified, createdAt
}
```

**Trips**
```js
{
  _id, title, description, destinations: [], images: [],
  price, maxParticipants, currentParticipants,
  startDate, endDate, createdBy(ref User), status,
  itinerary: [], createdAt, updatedAt
}
```

**Bookings**
```js
{
  _id, userId(ref User), tripId(ref Trip),
  startDate, endDate, participantCount, totalPrice,
  paymentId, status: "pending|confirmed|cancelled",
  createdAt, updatedAt
}
```

**Payments**
```js
{
  _id, bookingId(ref Booking), amount, currency,
  provider: "stripe|razorpay", transactionId,
  status: "pending|completed|failed", createdAt
}
```

**Messages** (for Socket.io chat)
```js
{
  _id, tripId(ref Trip), userId(ref User),
  message, timestamp, updatedAt
}
```

**Gallery**
```js
{
  _id, tripId(ref Trip), userId(ref User),
  imageUrl, caption, uploadedAt
}
```

**Reviews**
```js
{
  _id, tripId(ref Trip), userId(ref User),
  rating: 1-5, text, createdAt
}
```

---

## API Response Pattern
```js
{
  success: true,
  data: {...},
  message: "Optional message",
  code: 200
}
```

---

## Authentication Flow
1. User signs up → Email verification sent
2. Verify email link → Account activated
3. Login → JWT token (access + refresh)
4. Protected routes validated via JWT middleware
5. Logout → Clear token

---

## Real-time Communication (Socket.io)
- Trip chat: `trip:${tripId}` room
- Notifications: Per user ID
- Events: `message:send`, `message:receive`, `user:typing`

---

## Third-Party Integrations
- **Payments:** Stripe (US/Int'l), Razorpay (India)
- **Storage:** Cloudinary (images)
- **Email:** Nodemailer (existing setup)
- **Real-time:** Socket.io
