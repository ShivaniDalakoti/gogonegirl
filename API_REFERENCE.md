# Gone Girl: API Reference

**Base URL:** `http://localhost:3000`  
**Frontend Base:** `http://localhost:5173`  
**Auth:** Bearer token in `Authorization: Bearer {token}`

---

## Authentication Endpoints

### POST /auth/signup
Register a new user
```json
Request:
{
  "email": "user@example.com",
  "password": "secure123",
  "firstName": "Jane",
  "lastName": "Doe"
}

Response (201):
{
  "success": true,
  "message": "User created. Check your email.",
  "data": { "id": "...", "email": "..." }
}
```

### POST /auth/login
Login & get JWT token
```json
Request:
{
  "email": "user@example.com",
  "password": "secure123"
}

Response (200):
{
  "success": true,
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### POST /auth/verify
Verify email with token
```json
Request:
{
  "token": "verification-token-from-email"
}

Response (200):
{
  "success": true,
  "message": "Email verified successfully"
}
```

### GET /auth/me
Get current user (requires auth)
```
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "avatar": "url-to-image",
    "role": "user",
    "verified": true
  }
}
```

### POST /auth/logout
Logout (client removes token)
```
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Trip Endpoints

### GET /trips
List all active trips (paginated)
```
Query params:
- page: number (default: 1)
- limit: number (default: 10)
- search: string (optional)
- destination: string (optional)
- priceMin: number (optional)
- priceMax: number (optional)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Bali Adventure",
      "description": "7-day beach & jungle adventure",
      "destinations": ["Bali", "Ubud"],
      "images": ["url1", "url2"],
      "price": 1299,
      "maxParticipants": 12,
      "currentParticipants": 8,
      "startDate": "2024-12-15T00:00:00Z",
      "endDate": "2024-12-22T00:00:00Z",
      "status": "active",
      "createdBy": {
        "id": "...",
        "firstName": "Priya",
        "lastName": "Singh",
        "avatar": "url"
      }
    }
  ],
  "total": 45,
  "page": 1,
  "pages": 5
}
```

### GET /trips/:id
Get single trip details
```
Response (200):
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Bali Adventure",
    "description": "...",
    "destinations": ["Bali", "Ubud"],
    "images": ["url1", "url2"],
    "price": 1299,
    "maxParticipants": 12,
    "currentParticipants": 8,
    "startDate": "2024-12-15T00:00:00Z",
    "endDate": "2024-12-22T00:00:00Z",
    "itinerary": [
      "Day 1: Arrive in Bali",
      "Day 2: Beach day",
      "Day 3: Jungle trek"
    ],
    "status": "active",
    "createdBy": { "id": "...", "firstName": "Priya", "lastName": "Singh" },
    "createdAt": "2024-10-15T10:30:00Z",
    "reviews": [
      {
        "id": "...",
        "userId": "...",
        "rating": 5,
        "text": "Amazing trip!",
        "createdAt": "2024-11-10T..."
      }
    ]
  }
}
```

### POST /trips
Create new trip (admin only)
```
Headers: Authorization: Bearer {token}

Request:
{
  "title": "Bali Adventure",
  "description": "7-day beach & jungle adventure",
  "destinations": ["Bali", "Ubud"],
  "images": ["url1", "url2"],
  "price": 1299,
  "maxParticipants": 12,
  "startDate": "2024-12-15T00:00:00Z",
  "endDate": "2024-12-22T00:00:00Z",
  "itinerary": ["Day 1: Arrive", "Day 2: Beach", "Day 3: Jungle"]
}

Response (201):
{
  "success": true,
  "data": { "id": "...", "title": "Bali Adventure", ... }
}
```

### PUT /trips/:id
Update trip (admin only)
```
Headers: Authorization: Bearer {token}

Request: (same as POST, any fields to update)

Response (200):
{
  "success": true,
  "data": { "id": "...", "title": "Updated Title", ... }
}
```

### DELETE /trips/:id
Delete trip (admin only)
```
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Trip deleted"
}
```

---

## Booking Endpoints

### POST /bookings
Create a new booking
```
Headers: Authorization: Bearer {token}

Request:
{
  "tripId": "507f1f77bcf86cd799439011",
  "startDate": "2024-12-15T00:00:00Z",
  "endDate": "2024-12-22T00:00:00Z",
  "participantCount": 2
}

Response (201):
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "tripId": "507f1f77bcf86cd799439011",
    "participantCount": 2,
    "totalPrice": 2598,
    "status": "pending",
    "createdAt": "2024-11-15T14:30:00Z"
  }
}
```

### GET /bookings/user/:userId
Get user's bookings
```
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "tripId": "507f1f77bcf86cd799439011",
      "startDate": "2024-12-15T00:00:00Z",
      "endDate": "2024-12-22T00:00:00Z",
      "participantCount": 2,
      "totalPrice": 2598,
      "paymentId": "pi_test_...",
      "status": "confirmed",
      "tripData": {
        "id": "507f1f77bcf86cd799439011",
        "title": "Bali Adventure",
        "destination": "Bali",
        "image": "url"
      },
      "createdAt": "2024-11-15T14:30:00Z"
    }
  ]
}
```

### PUT /bookings/:id/status
Update booking status (admin)
```
Headers: Authorization: Bearer {token}

Request:
{
  "status": "confirmed"  // or "cancelled"
}

Response (200):
{
  "success": true,
  "data": { "id": "...", "status": "confirmed" }
}
```

---

## Payment Endpoints

### POST /payments/create-intent
Create Stripe payment intent
```
Headers: Authorization: Bearer {token}

Request:
{
  "bookingId": "507f1f77bcf86cd799439012",
  "amount": 2598,
  "currency": "USD"
}

Response (200):
{
  "success": true,
  "data": {
    "clientSecret": "pi_test_..._secret_...",
    "paymentIntentId": "pi_test_..."
  }
}
```

### POST /payments/confirm
Confirm payment (webhook from Stripe)
```
Headers: stripe-signature

Webhook Data:
{
  "id": "evt_test_...",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_test_...",
      "amount": 2598,
      "metadata": { "bookingId": "507f1f77bcf86cd799439012" }
    }
  }
}

Response (200):
{
  "received": true
}
```

---

## Community Endpoints

### GET /gallery/:tripId
Get trip's photo gallery
```
Response (200):
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439013",
      "tripId": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439011",
      "imageUrl": "https://cloudinary.com/image.jpg",
      "caption": "Sunset at the beach",
      "uploadedAt": "2024-11-20T18:00:00Z"
    }
  ]
}
```

### POST /gallery
Upload image to gallery
```
Headers: Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- tripId: string
- image: File
- caption: string (optional)

Response (201):
{
  "success": true,
  "data": { "id": "...", "imageUrl": "...", "caption": "..." }
}
```

### GET /reviews/:tripId
Get trip reviews & ratings
```
Response (200):
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439014",
      "tripId": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439011",
      "rating": 5,
      "text": "Amazing experience with wonderful people!",
      "createdAt": "2024-11-25T10:00:00Z"
    }
  ]
}
```

### POST /reviews
Create trip review
```
Headers: Authorization: Bearer {token}

Request:
{
  "tripId": "507f1f77bcf86cd799439011",
  "rating": 5,
  "text": "Amazing experience!"
}

Response (201):
{
  "success": true,
  "data": { "id": "...", "tripId": "...", "rating": 5, ... }
}
```

---

## Admin Endpoints

### GET /admin/bookings
Get all bookings
```
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "user": { "firstName": "Jane", "email": "jane@example.com" },
      "trip": { "title": "Bali Adventure" },
      "totalPrice": 2598,
      "status": "confirmed",
      "createdAt": "2024-11-15T..."
    }
  ]
}
```

### GET /admin/analytics
Get analytics dashboard data
```
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "totalUsers": 145,
    "totalTrips": 23,
    "totalRevenue": 125400,
    "totalBookings": 67,
    "bookingsByStatus": {
      "confirmed": 45,
      "pending": 15,
      "cancelled": 7
    },
    "revenueByMonth": [
      { "month": "Oct", "revenue": 25000 },
      { "month": "Nov", "revenue": 100400 }
    ],
    "topTrips": [
      { "title": "Bali Adventure", "bookings": 12, "revenue": 15588 }
    ]
  }
}
```

---

## Socket.io Events (Real-time Chat)

### Join Trip Room
```js
socket.emit('join-trip', 'tripId123');
```

### Send Message
```js
socket.emit('send-message', {
  tripId: 'tripId123',
  userId: 'userId456',
  message: 'Hello everyone!',
  timestamp: new Date()
});

// Receive on all users in trip room
socket.on('receive-message', (message) => {
  console.log(message);
});
```

### Typing Indicator (optional)
```js
socket.emit('user-typing', { tripId: 'tripId123', userId: 'userId456' });
socket.on('user-typing-notification', (data) => {
  console.log(`${data.userId} is typing...`);
});
```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "code": 400
}
```

### Common Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email, etc.)
- `500` - Server Error

---

## Testing with cURL

```bash
# Signup
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Get trips (no auth needed)
curl http://localhost:3000/trips

# Get current user (with token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/auth/me
```

---

**Last Updated:** November 2024
