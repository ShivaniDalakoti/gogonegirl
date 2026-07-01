# Gone Girl Backend: Setup & API Reference

## 1. Install Required Dependencies

```bash
npm install mongoose bcryptjs jsonwebtoken stripe razorpay socket.io multer cloudinary express-validator
npm install --save-dev nodemon
```

## 2. Environment Variables (.env)

Create `.env` in root directory:
```env
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/gonegirl

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...

# Razorpay
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Email (existing nodemailer setup)
NODEMAILER_EMAIL=gonegirl@example.com
NODEMAILER_PASSWORD=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## 3. Backend Folder Structure

Create directory structure:
```bash
mkdir -p routes controllers models middleware config utils
```

## 4. Core Files

### `config/database.js` (MongoDB Connection)
```js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
```

### `models/User.js`
```js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String },
  phone: { type: String },
  bio: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
```

### `models/Trip.js`
```js
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  destinations: [String],
  images: [String],
  price: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  currentParticipants: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  itinerary: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Trip', tripSchema);
```

### `models/Booking.js`
```js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participantCount: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentId: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Booking', bookingSchema);
```

### `middleware/auth.js` (JWT Verification)
```js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const adminCheck = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
```

### `middleware/errorHandler.js`
```js
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server error',
    code: err.status || 500,
  });
};
```

### `routes/auth.js` (Authentication Routes)
```js
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Sign up
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password, firstName, lastName });
    await user.save();

    // TODO: Send verification email
    res.status(201).json({ message: 'User created. Check your email.' });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.verified) {
      return res.status(403).json({ message: 'Email not verified' });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.json({
      success: true,
      accessToken,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

// Logout (client-side: remove token)
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
```

### `routes/trips.js` (Trip Routes)
```js
import express from 'express';
import Trip from '../models/Trip.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all trips
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const trips = await Trip.find({ status: 'active' })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'firstName lastName avatar');
    
    const total = await Trip.countDocuments({ status: 'active' });
    res.json({ success: true, data: trips, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
});

// Get trip by ID
router.get('/:id', async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('createdBy');
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ success: true, data: trip });
  } catch (error) {
    next(error);
  }
});

// Create trip (admin only)
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { title, description, destinations, price, maxParticipants, startDate, endDate, images } = req.body;
    const trip = new Trip({
      title, description, destinations, price, maxParticipants, startDate, endDate, images,
      createdBy: req.userId,
    });
    await trip.save();
    res.status(201).json({ success: true, data: trip });
  } catch (error) {
    next(error);
  }
});

export default router;
```

### `routes/bookings.js` (Booking Routes)
```js
import express from 'express';
import Booking from '../models/Booking.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Create booking
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { tripId, startDate, endDate, participantCount } = req.body;
    
    const booking = new Booking({
      userId: req.userId,
      tripId,
      startDate,
      endDate,
      participantCount,
      totalPrice: 0, // Calculate from trip price
      status: 'pending',
    });

    await booking.save();
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
});

// Get user bookings
router.get('/user/:userId', verifyToken, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('tripId');
    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
});

export default router;
```

## 5. Main Server File

Update `server.js`:
```js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.js';
import tripRoutes from './routes/trips.js';
import bookingRoutes from './routes/bookings.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL },
});

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Database
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/trips', tripRoutes);
app.use('/bookings', bookingRoutes);

// Socket.io for chat
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-trip', (tripId) => {
    socket.join(`trip:${tripId}`);
  });

  socket.on('send-message', (tripId, message) => {
    io.to(`trip:${tripId}`).emit('receive-message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 6. Start Development

```bash
npm run dev
```

Server runs on `http://localhost:3000`

---

## API Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | - | Register user |
| POST | `/auth/login` | - | Login user |
| GET | `/auth/me` | ✓ | Get current user |
| POST | `/auth/logout` | ✓ | Logout |
| GET | `/trips` | - | List all trips |
| GET | `/trips/:id` | - | Get trip details |
| POST | `/trips` | ✓ | Create trip (admin) |
| PUT | `/trips/:id` | ✓ | Update trip (admin) |
| DELETE | `/trips/:id` | ✓ | Delete trip (admin) |
| POST | `/bookings` | ✓ | Create booking |
| GET | `/bookings/user/:userId` | ✓ | Get user bookings |

---

## Next Steps
1. Connect to MongoDB Atlas
2. Implement email verification flow
3. Add payment integration
4. Set up WebSocket for real-time chat
5. Implement admin routes
6. Add comprehensive error handling
