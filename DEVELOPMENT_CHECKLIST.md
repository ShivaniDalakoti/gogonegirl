# Gone Girl: Development Checklist

## PHASE 1: Authentication & Database (Weeks 1-2)

### Backend Setup
- [ ] MongoDB connection + Mongoose models (User, Trip, Booking)
- [ ] User model with password hashing (bcryptjs)
- [ ] JWT token generation (access + refresh)
- [ ] Auth middleware for protected routes
- [ ] Email verification flow with nodemailer
- [ ] Auth routes: `/auth/signup`, `/auth/login`, `/auth/verify`, `/auth/logout`
- [ ] Input validation (Joi or express-validator)
- [ ] Error handling middleware

### Frontend Setup
- [ ] React Router setup + route protection
- [ ] AuthContext + useAuth hook
- [ ] Login form component
- [ ] Signup form component
- [ ] Email verification component
- [ ] API service with axios interceptors for JWT
- [ ] Store JWT in localStorage/sessionStorage
- [ ] Redirect logic for unauthorized users

### Testing
- [ ] Manual test signup → email verification → login flow
- [ ] Test token refresh logic
- [ ] Test protected route access

---

## PHASE 2: User Dashboard & Trip Management (Weeks 3-4)

### Frontend Components
- [ ] TripCard component (title, image, price, dates)
- [ ] TripGrid component (responsive grid layout)
- [ ] Trip filter/search functionality
- [ ] TripDetailModal or separate page
- [ ] UserProfile component (avatar, bio, trips)
- [ ] Booking summary card
- [ ] Dashboard layout with navigation

### Backend Routes
- [ ] `GET /trips` (with pagination, filters)
- [ ] `GET /trips/:id`
- [ ] `POST /trips` (admin only)
- [ ] `PUT /trips/:id` (admin only)
- [ ] `DELETE /trips/:id` (admin only)
- [ ] `GET /users/:id/bookings`
- [ ] `GET /users/:id` (public profile)

### Database
- [ ] Trip model schema
- [ ] Booking model schema
- [ ] Indexes for performance

### UI/UX
- [ ] Apply brand colors (Teal #2B7A78, Coral #FF8C42, Cream #E8F3F1)
- [ ] Mobile-responsive design (Tailwind CSS)
- [ ] Loading states
- [ ] Error messages

---

## PHASE 3: Booking & Payments (Week 5)

### Frontend
- [ ] DateRangePicker component
- [ ] BookingForm (dates, participant count)
- [ ] PaymentCheckout (card details or Razorpay embed)
- [ ] Payment confirmation page
- [ ] Booking confirmation email

### Backend
- [ ] `POST /bookings` (create booking)
- [ ] `PUT /bookings/:id/status` (update status)
- [ ] Stripe integration (payment intent)
- [ ] Razorpay integration
- [ ] Webhook handling for payment confirmation
- [ ] `POST /payments/create-intent`
- [ ] `POST /payments/confirm`

### Payments
- [ ] Stripe account setup
- [ ] Razorpay account setup
- [ ] Webhook validation
- [ ] Idempotency handling

---

## PHASE 4: Community Features (Week 6)

### Frontend
- [ ] PhotoGallery component (grid of images)
- [ ] Image upload form
- [ ] ChatWindow component (messages list + input)
- [ ] ReviewCard + ReviewForm
- [ ] Rating component (1-5 stars)

### Backend
- [ ] Gallery model + routes
- [ ] Message model + Socket.io setup
- [ ] Review model + routes
- [ ] Image upload handler (Cloudinary)
- [ ] `GET /gallery/:tripId`
- [ ] `POST /gallery` (upload image)
- [ ] `POST /reviews`
- [ ] `GET /reviews/:tripId`
- [ ] Socket.io event handlers for chat

### Real-time
- [ ] Socket.io server setup
- [ ] Room-based chat (per trip)
- [ ] Message persistence
- [ ] Typing indicators (optional)

---

## PHASE 5: Admin Dashboard (Week 7)

### Frontend
- [ ] AdminDashboard layout
- [ ] TripManager (create, edit, delete trips)
- [ ] BookingsList (view all bookings, update status)
- [ ] Analytics charts (revenue, bookings, users)
- [ ] UserManagement (view users, roles)

### Backend
- [ ] AdminCheck middleware
- [ ] `POST /admin/trips`, `PUT /admin/trips/:id`, `DELETE /admin/trips/:id`
- [ ] `GET /admin/bookings`, `PUT /admin/bookings/:id/status`
- [ ] `GET /admin/analytics` (revenue, metrics)
- [ ] `GET /admin/users`

---

## PHASE 6: Testing & Deployment (Week 8)

### Testing
- [ ] Unit tests (services, utils)
- [ ] Integration tests (API routes)
- [ ] E2E tests (critical user flows)
- [ ] Manual QA on desktop + mobile

### DevOps
- [ ] Environment variables (.env setup)
- [ ] Database backup strategy
- [ ] API rate limiting
- [ ] CORS configuration
- [ ] Deployment script (Vercel/Heroku for backend, Netlify for frontend)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Error monitoring (Sentry)

### Documentation
- [ ] API documentation (Postman/Swagger)
- [ ] Setup guide for developers
- [ ] Deployment guide
- [ ] Troubleshooting guide

---

## Dependencies to Install

### Frontend
```bash
npm install axios react-router-dom tailwindcss react-icons date-fns socket.io-client
```

### Backend
```bash
npm install mongoose bcryptjs jsonwebtoken stripe razorpay socket.io multer cloudinary
```

---

## Quick Command Reference

### Start Development
```bash
# Backend
npm run dev

# Frontend (from app/ directory)
npm run dev
```

### Environment Variables (.env)
```
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
```

---

## Key Metrics to Track
- User signup rate
- Booking conversion rate
- Payment success rate
- Chat engagement
- Admin analytics queries

---

## Risk Mitigation
- Payment failures → Retry logic + manual reconciliation
- Chat scaling → Redis for session storage (future)
- Image storage → Cloudinary CDN for performance
- Database → MongoDB Atlas backup + replication
