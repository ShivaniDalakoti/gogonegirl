# 🔌 Backend Wired - Complete Setup Guide

## ✅ What's Been Done

Your backend now has **7 API endpoints** fully integrated with the React frontend:

### New API Endpoints Added:
```
✅ POST   /api/auth/register       - User registration
✅ POST   /api/auth/login          - User login
✅ GET    /api/trips               - Get all trips
✅ GET    /api/trips/:id           - Get trip details
✅ POST   /api/bookings            - Create booking
✅ GET    /api/bookings            - Get user bookings
✅ GET    /api/admin/stats         - Get admin dashboard stats
✅ GET    /api/admin/trips         - Get all trips (admin view)
```

## 🚀 Quick Start (2 Terminal Windows)

### Terminal 1: Start Backend
```bash
cd /Users/shivanidalakoti/Desktop/workspace/gogonegirl
npm start
```

You'll see:
```
🚀 Gone Girl Server Running!
📍 Server: http://localhost:5000

📚 API Endpoints:
   POST   /api/auth/register       - Create account
   POST   /api/auth/login          - Login
   GET    /api/trips               - Get all trips
   ...
```

### Terminal 2: Start Frontend
```bash
cd /Users/shivanidalakoti/Desktop/workspace/gogonegirl/app
npm run dev
```

You'll see:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Terminal 3 (Optional): Watch API Calls
```bash
cd /Users/shivanidalakoti/Desktop/workspace/gogonegirl/app
npm run dev -- --host
```

Then open: **http://localhost:5173**

## 🧪 Test the Complete Flow

### 1. **Register New User**
1. Click "Join Us" button
2. Fill form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: +91 1234567890
   - Password: password123
3. Click "Create Account"
4. ✅ Should redirect to dashboard

### 2. **Browse Trips**
1. Click "Explore Trips" in nav
2. See 3 trips loaded from API:
   - Himalayan Escape
   - Kerala Backwaters
   - Jim Corbett Wilderness
3. Click "View Details" on any trip
4. See full itinerary

### 3. **Make a Booking**
1. On trip details, click "Book Now"
2. Fill booking form:
   - Travelers: 2
   - Date: any future date
   - Special requests: optional
3. Click "Continue to Payment"
4. See price calculation
5. Click "Confirm Booking"
6. ✅ Booking saved to database

### 4. **View Dashboard**
1. After booking, you're on dashboard
2. See "My Bookings" section
3. See your booking with:
   - Trip name & location
   - Travel dates
   - Number of travelers
   - Total price
4. ✅ "Download Details" button (UI ready)

### 5. **Admin Login**
1. Go back to home, click logout
2. Login with:
   - Email: `shivani@gogonegirl.com`
   - Password: `password123`
3. Click "Admin" link (only visible if role=admin)
4. See:
   - Total Users: live count
   - Total Bookings: live count
   - Total Revenue: live calc
   - Trip Management table

## 📊 Data Flow

```
Frontend (React) 
    ↓ (HTTP Request via Axios)
Backend (Express)
    ↓ (Process & Validate)
In-Memory Storage
    ↓ (Return JSON)
Frontend (React)
    ↓ (Update UI)
User Sees Results
```

## 🔐 Authentication

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fname": "Shivani",
    "lname": "Dalakoti",
    "email": "shivani@example.com",
    "phone": "+91 9876543210",
    "password": "secure123"
  }'
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 2,
    "fname": "Shivani",
    "lname": "Dalakoti",
    "email": "shivani@example.com",
    "role": "user"
  },
  "token": "token_2_1234567890"
}
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "shivani@example.com",
    "password": "secure123"
  }'
```

## 📦 Backend Structure

```
server.js
├── Middleware Setup
│   ├── CORS enabled ✅
│   ├── Body Parser ✅
│   └── Static Files ✅
│
├── In-Memory Data
│   ├── users array (2 users pre-loaded)
│   ├── trips array (3 trips pre-loaded)
│   └── bookings array (grows with submissions)
│
├── Auth Routes
│   ├── POST /api/auth/register
│   └── POST /api/auth/login
│
├── Trip Routes
│   ├── GET /api/trips
│   └── GET /api/trips/:id
│
├── Booking Routes
│   ├── POST /api/bookings
│   └── GET /api/bookings
│
└── Admin Routes
    ├── GET /api/admin/stats
    └── GET /api/admin/trips
```

## 🔄 Frontend API Integration

Created `/app/src/api/client.js` - Axios client with:
- Base URL configuration
- Token auto-injection
- Error handling
- Auto-logout on 401

### Usage in Components:
```javascript
import client from '../api/client';

// Make request
const { data } = await client.get('/api/trips');
if (data.success) {
  console.log(data.trips);
}
```

## 📝 Testing with cURL

### Get All Trips
```bash
curl http://localhost:5000/api/trips
```

### Get Single Trip
```bash
curl http://localhost:5000/api/trips/1
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token_1_123456" \
  -d '{
    "tripId": 1,
    "travelers": 2,
    "departureDate": "2026-08-15",
    "specialRequests": "Vegetarian meals",
    "totalAmount": 40000
  }'
```

## 🐛 Troubleshooting

### "Can't connect to server"
```bash
# Check if backend is running
curl http://localhost:5000
# Should see: error or HTML response

# If not, restart backend
npm start
```

### "CORS error"
- ✅ Already fixed - CORS is enabled
- Clear browser cache (Ctrl+Shift+Delete)
- Restart frontend dev server

### "Login fails"
- Email: `shivani@gogonegirl.com` (admin)
- Email: `test@example.com` (if you registered)
- Password: `password123` (if registered with this)

### "Booking doesn't save"
- Check you're logged in (token in localStorage)
- Check browser console (F12) for errors
- Restart both frontend and backend

## 📈 Next Steps

### Phase 1: Production Database (Week 1)
- Replace in-memory storage with MongoDB
- Add proper password hashing (bcrypt)
- Implement JWT tokens

### Phase 2: Payments (Week 2)
- Integrate Stripe API
- Handle payment webhooks
- Add payment history

### Phase 3: Advanced Features (Week 3)
- Email confirmations
- Photo uploads
- Real-time notifications
- Community chat

## 📚 Files Modified/Created

**Backend:**
- ✅ `server.js` - Added 8 API endpoints

**Frontend:**
- ✅ `app/src/api/client.js` - Axios client
- ✅ `app/src/stores/authStore.js` - Updated to use API
- ✅ `app/src/pages/Trips.jsx` - Updated to use API
- ✅ `app/src/pages/Dashboard.jsx` - Updated to use API
- ✅ `app/src/pages/Booking.jsx` - Updated to use API
- ✅ `app/src/pages/AdminDashboard.jsx` - Updated to use API
- ✅ `app/.env` - API URL configuration

## 🎯 Success Indicators

If everything is working:
- ✅ Can register new account
- ✅ Can login with credentials
- ✅ Can see trips from backend
- ✅ Can make bookings
- ✅ Dashboard shows bookings
- ✅ Admin panel shows stats
- ✅ Can logout

## 💡 Pro Tips

1. **Check Network Tab** (F12 → Network)
   - See actual API requests/responses
   - Verify status codes (200 = success, 401 = auth, 404 = not found)

2. **Console Logs** (F12 → Console)
   - Frontend logs API responses
   - Helps debug state management

3. **localStorage Debug**
   - F12 → Application → localStorage
   - See stored user & token data

4. **API Testing**
   - Use Postman or Insomnia
   - Test endpoints independently
   - Verify data structure

## 📞 Need Help?

- **Frontend issues:** Check browser console (F12)
- **Backend issues:** Check terminal output
- **API issues:** Test with cURL first

---

## 🎉 You're All Set!

Your Gone Girl app is now **fully wired** with:
- ✅ User authentication
- ✅ Trip management
- ✅ Booking system
- ✅ Admin dashboard

**Next:** Deploy to production! 🚀
