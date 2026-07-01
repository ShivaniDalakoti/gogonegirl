import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Heart } from 'lucide-react';
import client from '../api/client';
import '../styles/Trips.css';

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const { data } = await client.get('/api/trips');
      if (data.success) {
        setTrips(data.trips);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockTrips = [
    {
      id: 1,
      title: 'Himalayan Escape',
      location: 'Nainital, India',
      price: 20000,
      duration: '4 Nights / 5 Days',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      groupSize: 12,
      rating: 4.9,
      category: 'mountain'
    },
    {
      id: 2,
      title: 'Kerala Backwaters',
      location: 'Kerala, India',
      price: 25000,
      duration: '5 Nights / 6 Days',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      groupSize: 12,
      rating: 4.8,
      category: 'beach'
    },
    {
      id: 3,
      title: 'Jim Corbett Wilderness',
      location: 'Uttarakhand, India',
      price: 10000,
      duration: '2 Nights / 3 Days',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop',
      groupSize: 10,
      rating: 4.7,
      category: 'wildlife'
    },
    {
      id: 4,
      title: 'Sikkim & Darjeeling',
      location: 'Sikkim, India',
      price: 20700,
      duration: '4 Nights / 5 Days',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop',
      groupSize: 10,
      rating: 4.9,
      category: 'mountain'
    },
  ];

  const displayTrips = trips.length > 0 ? trips : mockTrips;
  const filtered = filter === 'all' ? displayTrips : displayTrips.filter(t => t.category === filter);

  return (
    <div className="trips-page">
      <div className="trips-header">
        <h1>Explore Our Escapes</h1>
        <p>Choose your next adventure with Go Gone Girl</p>
      </div>

      <div className="trips-container">
        <aside className="filters">
          <h3>Filter by Type</h3>
          <div className="filter-options">
            <label>
              <input type="radio" name="filter" value="all" checked={filter === 'all'} onChange={(e) => setFilter(e.target.value)} />
              All Trips
            </label>
            <label>
              <input type="radio" name="filter" value="mountain" checked={filter === 'mountain'} onChange={(e) => setFilter(e.target.value)} />
              Mountains
            </label>
            <label>
              <input type="radio" name="filter" value="beach" checked={filter === 'beach'} onChange={(e) => setFilter(e.target.value)} />
              Beaches
            </label>
            <label>
              <input type="radio" name="filter" value="wildlife" checked={filter === 'wildlife'} onChange={(e) => setFilter(e.target.value)} />
              Wildlife
            </label>
          </div>
        </aside>

        <main className="trips-grid">
          {loading ? (
            <p className="loading">Loading trips...</p>
          ) : filtered.length > 0 ? (
            filtered.map(trip => (
              <div key={trip.id} className="trip-card">
                <div className="trip-image">
                  <img src={trip.image} alt={trip.title} />
                  <button className="wishlist-btn">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="trip-content">
                  <h3>{trip.title}</h3>
                  <p className="location">
                    <MapPin size={16} /> {trip.location}
                  </p>

                  <div className="trip-details">
                    <span className="detail">
                      <Calendar size={16} /> {trip.duration}
                    </span>
                    <span className="detail">
                      <Users size={16} /> Max {trip.groupSize}
                    </span>
                  </div>

                  <div className="trip-footer">
                    <div className="price">₹{trip.price.toLocaleString()}</div>
                    <Link to={`/trips/${trip.id}`} className="btn-view">View Details</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-trips">No trips found in this category</p>
          )}
        </main>
      </div>
    </div>
  );
}
