import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import '../styles/Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img
            src="/logo.jpg"
            alt="Gone Girl Logo"
            className="nav-logo-img"
          />
          <span>Go Gone Girl</span>
        </Link>

        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/trips" onClick={() => setIsOpen(false)}>Explore Trips</Link></li>
          <li><a href="/#why">Why Us</a></li>
          <li><a href="/#about">About</a></li>

          {user ? (
            <>
              <li><Link to="/dashboard" onClick={() => setIsOpen(false)}>My Dashboard</Link></li>
              {user.role === 'admin' && (
                <li><Link to="/admin" onClick={() => setIsOpen(false)}>Admin</Link></li>
              )}
              <li className="user-menu">
                <span className="user-avatar">
                  <User size={18} />
                </span>
                <span className="user-name">{user.fname}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={18} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
              <li><Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary">Join Us</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
