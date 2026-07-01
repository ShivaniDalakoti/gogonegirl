# Gone Girl Frontend: Setup & Quick Start

## 1. Install Dependencies

```bash
cd app
npm install axios react-router-dom tailwindcss postcss autoprefixer react-icons date-fns socket.io-client
npm install -D tailwindcss postcss autoprefixer
```

## 2. Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

Update `app/tailwind.config.js`:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'brand-teal': '#2B7A78',
        'brand-coral': '#FF8C42',
        'brand-cream': '#E8F3F1',
      },
    },
  },
  plugins: [],
}
```

## 3. Folder Structure Setup

Run from `app/src/`:

```bash
mkdir -p components/Auth components/Trip components/Booking components/Community components/Admin components/Shared
mkdir -p pages hooks context services styles utils
touch styles/globals.css styles/variables.css
```

## 4. Initialize Global Styles

Create `app/src/styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-teal: #2B7A78;
  --color-coral: #FF8C42;
  --color-cream: #E8F3F1;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--color-cream);
}
```

Update `app/src/main.jsx`:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 5. Create Core Files

### `app/src/services/api.js` (API Client)
```js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`);
        localStorage.setItem('accessToken', data.accessToken);
        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

### `app/src/context/AuthContext.jsx`
```jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data.user);
    } catch {
      localStorage.removeItem('accessToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### `app/src/hooks/useAuth.js`
```js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### `app/src/App.jsx` (Router Setup)
```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

## 6. Create Environment File

Create `app/.env.local`:
```
VITE_API_URL=http://localhost:3000
```

## 7. Start Development

```bash
npm run dev
```

Server runs at `http://localhost:5173`

---

## Component Template (Copy-Paste)

`app/src/components/Auth/LoginForm.jsx`:
```jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded"
        required
      />
      <button type="submit" className="w-full bg-brand-teal text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}
```

---

## Next Steps
1. Create page components (LandingPage, DashboardPage, etc.)
2. Implement auth flow (signup, verify email, login)
3. Connect to backend API
4. Build trip browsing UI
5. Implement booking flow
6. Add payment integration
