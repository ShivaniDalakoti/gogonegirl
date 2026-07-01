import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Star, ArrowRight } from 'lucide-react';
import '../styles/TripDetails.css';

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const mockTrip = {
      id: id,
      title: 'Himalayan Escape',
      location: 'Nainital, India',
      price: 20000,
      duration: '4 Nights / 5 Days',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
      groupSize: 12,
      rating: 4.9,
      reviews: 156,
      description: 'Experience the majestic Himalayas with a group of like-minded women travelers. This curated journey takes you through some of India\'s most picturesque mountain destinations.',
      highlights: [
        'Visit sacred Kainchi Dham',
        'Explore Nainital Lake',
        'Trek to Bhalugaad Waterfall',
        'Jim Corbett Safari',
        'Bonfire nights under the stars'
      ],
      included: [
        'Round-trip flights',
        'All accommodations (3-star+)',
        'Daily breakfast, lunch & dinner',
        'All activities and entrance fees',
        '24/7 support & guides',
        'Ground transportation'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Ramgarh',
          description: 'Pickup from Kathgodam. Scenic drive to Ramgarh. Check-in and relaxation with sunset views.'
        },
        {
          day: 2,
          title: 'Nainital & Kainchi Dham',
          description: 'Explore Naini Lake, Mall Road. Visit the spiritual Kainchi Dham ashram.'
        },
        {
          day: 3,
          title: 'Mukteshwar & Waterfall Trek',
          description: 'Cliffside viewpoints and trek down to Bhalugaad Waterfall.'
        },
        {
          day: 4,
          title: 'Jim Corbett Safari',
          description: 'Early morning safari in Jim Corbett National Park for wildlife viewing.'
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Final breakfast and journey back home with unforgettable memories.'
        }
      ]
    };
    setTrip(mockTrip);
  }, [id]);

  if (!trip) return <div className="loading">Loading trip details...</div>;

  return (
    <div className="trip-details">
      <div className="trip-hero">
        <img src={trip.image} alt={trip.title} />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{trip.title}</h1>
            <p className="location">
              <MapPin size={20} /> {trip.location}
            </p>
          </div>
        </div>
      </div>

      <div className="trip-container">
        <main className="trip-main">
          <section className="trip-info">
            <div className="info-grid">
              <div className="info-item">
                <Calendar size={24} />
                <h4>Duration</h4>
                <p>{trip.duration}</p>
              </div>
              <div className="info-item">
                <Users size={24} />
                <h4>Group Size</h4>
                <p>Max {trip.groupSize} travelers</p>
              </div>
              <div className="info-item">
                <Star size={24} />
                <h4>Rating</h4>
                <p>{trip.rating} / 5 ({trip.reviews} reviews)</p>
              </div>
            </div>
          </section>

          <section className="trip-description">
            <h2>About This Trip</h2>
            <p>{trip.description}</p>
          </section>

          <section className="highlights">
            <h2>Highlights</h2>
            <ul>
              {trip.highlights.map((highlight, idx) => (
                <li key={idx}>✓ {highlight}</li>
              ))}
            </ul>
          </section>

          <section className="itinerary">
            <h2>Day-by-Day Itinerary</h2>
            <div className="itinerary-list">
              {trip.itinerary.map((day) => (
                <div key={day.day} className="itinerary-item">
                  <div className="day-badge">Day {day.day}</div>
                  <div className="day-content">
                    <h4>{day.title}</h4>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="included">
            <h2>What's Included</h2>
            <div className="included-list">
              {trip.included.map((item, idx) => (
                <div key={idx} className="included-item">
                  <span className="check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="trip-sidebar">
          <div className="booking-card">
            <div className="price">₹{trip.price.toLocaleString()}</div>
            <p className="price-per">per person</p>
            <Link to={`/booking/${trip.id}`} className="btn btn-primary btn-full">
              Book Now <ArrowRight size={18} />
            </Link>
            <p className="booking-note">Secure your spot today</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
