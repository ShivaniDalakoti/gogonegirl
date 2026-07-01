import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { MapPin, Calendar, Users, Download, Settings, LogOut } from 'lucide-react';
import client from '../api/client';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await client.get('/api/bookings');
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Show demo booking if not authenticated
      if (error.response?.status === 401) {
        setBookings([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user?.fname}! 👋</h1>
          <p>Manage your bookings and profile</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="dashboard-container">
        <main className="dashboard-main">
          <section className="bookings-section">
            <div className="section-header">
              <h2>My Bookings</h2>
            </div>

            {loading ? (
              <p className="loading">Loading your bookings...</p>
            ) : bookings.length > 0 ? (
              <div className="bookings-list">
                {bookings.map(booking => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-status" data-status={booking.status}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>

                    <h3>{booking.tripTitle}</h3>

                    <div className="booking-details">
                      <div className="detail">
                        <MapPin size={18} />
                        <span>{booking.location}</span>
                      </div>
                      <div className="detail">
                        <Calendar size={18} />
                        <span>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="detail">
                        <Users size={18} />
                        <span>{booking.travelers} Traveler{booking.travelers > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="booking-footer">
                      <div className="price">₹{booking.price.toLocaleString()}</div>
                      <button className="btn-action">
                        <Download size={16} /> Download Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No bookings yet</p>
                <a href="/trips" className="btn btn-primary">Explore Trips</a>
              </div>
            )}
          </section>
        </main>

        <aside className="dashboard-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {user?.fname?.charAt(0)}{user?.lname?.charAt(0)}
            </div>
            <h3>{user?.fname} {user?.lname}</h3>
            <p>{user?.email}</p>
            <p className="phone">{user?.phone}</p>

            <button className="btn btn-secondary btn-full">
              <Settings size={16} /> Edit Profile
            </button>
          </div>

          <div className="stats-card">
            <h3>Your Stats</h3>
            <div className="stat-item">
              <span className="stat-label">Total Bookings</span>
              <span className="stat-value">{bookings.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Spent</span>
              <span className="stat-value">₹{bookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Cities Visited</span>
              <span className="stat-value">{new Set(bookings.map(b => b.location)).size}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
