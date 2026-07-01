import { useState, useEffect } from 'react';
import { BarChart, Users, BookOpen, DollarSign, TrendingUp, Settings } from 'lucide-react';
import client from '../api/client';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 45,
    totalRevenue: 900000,
    totalUsers: 250,
    activeTrips: 8,
  });
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch admin stats
      const statsResponse = await client.get('/api/admin/stats');
      if (statsResponse.data.success) {
        setStats(statsResponse.data.stats);
      }

      // Fetch trips with admin data
      const tripsResponse = await client.get('/api/admin/trips');
      if (tripsResponse.data.success) {
        setTrips(tripsResponse.data.trips);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="settings-btn">
          <Settings size={20} /> Settings
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={32} />
          </div>
          <h3>Total Users</h3>
          <p className="stat-number">{stats.totalUsers}</p>
          <span className="stat-change">+12% this month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BookOpen size={32} />
          </div>
          <h3>Total Bookings</h3>
          <p className="stat-number">{stats.totalBookings}</p>
          <span className="stat-change">+8% this month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={32} />
          </div>
          <h3>Total Revenue</h3>
          <p className="stat-number">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
          <span className="stat-change">+15% this month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={32} />
          </div>
          <h3>Active Trips</h3>
          <p className="stat-number">{stats.activeTrips}</p>
          <span className="stat-change">5 upcoming</span>
        </div>
      </div>

      <div className="admin-content">
        <section className="trips-management">
          <div className="section-header">
            <h2>Trip Management</h2>
            <button className="btn btn-primary">+ Add New Trip</button>
          </div>

          {loading ? (
            <p className="loading">Loading trips...</p>
          ) : (
            <div className="trips-table-container">
              <table className="trips-table">
                <thead>
                  <tr>
                    <th>Trip Title</th>
                    <th>Location</th>
                    <th>Bookings</th>
                    <th>Revenue</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map(trip => (
                    <tr key={trip.id}>
                      <td>{trip.title}</td>
                      <td>{trip.location}</td>
                      <td>{trip.bookings}</td>
                      <td>₹{trip.revenue.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge status-${trip.status}`}>
                          {trip.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-small">Edit</button>
                        <button className="btn-small btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
