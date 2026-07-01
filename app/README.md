# Go Gone Girl - React Frontend App

A modern, full-featured React app for women's travel booking platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
cd app
npm install
```

### Development Server

Start the Vite dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
app/
├── src/
│   ├── components/
│   │   └── Navigation.jsx          # Top navigation bar
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── Trips.jsx              # Browse all trips
│   │   ├── TripDetails.jsx        # Individual trip details
│   │   ├── Booking.jsx            # Booking flow
│   │   ├── Login.jsx              # User login
│   │   ├── Register.jsx           # User registration
│   │   ├── Dashboard.jsx          # User dashboard
│   │   └── AdminDashboard.jsx     # Admin panel
│   ├── stores/
│   │   └── authStore.js           # Zustand auth state management
│   ├── styles/
│   │   ├── Navigation.css         # Navigation styles
│   │   ├── Home.css               # Home page styles
│   │   ├── Trips.css              # Trips page styles
│   │   ├── TripDetails.css        # Trip details styles
│   │   ├── Booking.css            # Booking styles
│   │   ├── Auth.css               # Login/Register styles
│   │   ├── Dashboard.css          # Dashboard styles
│   │   └── AdminDashboard.css     # Admin styles
│   ├── App.jsx                    # Main app component with routing
│   ├── App.css                    # Global styles
│   ├── index.css                  # Base styles
│   └── main.jsx                   # Entry point
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

## 🎨 Design System

**Color Scheme:**
- Primary Teal: `#2B7A78`
- Accent Orange: `#FF8C42`
- Dark Teal: `#1F5653`
- Bark Dark: `#1F3D3A`
- Light Text: `#5A8A84`
- Cream BG: `#E8F3F1`
- Light BG: `#F0F7F5`

## 🔑 Key Features

### User Features
- Browse curated women-only travel experiences
- View trip details, itineraries, and pricing
- Multi-step booking and payment flow
- Personal dashboard with booking history
- Community features (coming soon)

### Admin Features
- Trip management dashboard
- Booking and revenue analytics
- User management
- Trip performance metrics

## 📦 Dependencies

Core: React 18+, React Router, Vite
State: Zustand
API: Axios
UI: Lucide React icons

## 🚀 Deployment

### Quick Deploy to Netlify/Vercel

```bash
npm run build
# Deploy the dist/ folder
```

Set build command: `npm run build`
Set publish directory: `dist`

## 📝 License

MIT License - Open source project
