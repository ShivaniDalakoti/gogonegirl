import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Shield, Sparkles } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>The world is calling. <span className="highlight">Answer it.</span></h1>
          <p className="hero-subtitle">
            Curated, women-focused travel experiences for solo travelers and groups seeking adventure, safety, and sisterhood.
          </p>
          <div className="hero-actions">
            <Link to="/trips" className="btn btn-primary">
              Explore Trips <ArrowRight size={18} />
            </Link>
            <a href="/#why" className="btn btn-secondary">Learn More</a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">2000+</div>
              <div className="stat-label">Travelers</div>
            </div>
            <div className="stat">
              <div className="stat-number">15+</div>
              <div className="stat-label">Destinations</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Women-Only</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="why-section" id="why">
        <div className="container">
          <h2>Why Go Gone Girl?</h2>
          <div className="features-grid">
            <div className="feature">
              <Shield size={40} />
              <h3>Safety First</h3>
              <p>Vetted accommodations, 24/7 support, and experienced female guides.</p>
            </div>
            <div className="feature">
              <Users size={40} />
              <h3>Real Friendships</h3>
              <p>Small groups (max 12) turn strangers into lifelong friends.</p>
            </div>
            <div className="feature">
              <MapPin size={40} />
              <h3>Expert Routes</h3>
              <p>Curated by women who've been there, for the perfect balance.</p>
            </div>
            <div className="feature">
              <Sparkles size={40} />
              <h3>Every Detail Handled</h3>
              <p>Flights, hotels, meals, activities—all sorted. Just show up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2>Real Stories, Real Adventures</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <iframe
                width="100%"
                height="250"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Traveler testimonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h4>Maya's Himalayan Journey</h4>
              <p>"This trip changed my life. I came back with new friends and an adventurous spirit!"</p>
            </div>

            <div className="testimonial-card">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt="Priya's adventure"
                className="testimonial-image"
              />
              <h4>Priya's Kerala Experience</h4>
              <p>"The best decision I made this year. Safety, friendship, and unforgettable moments!"</p>
            </div>

            <div className="testimonial-card">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                alt="Aisha's wildlife trek"
                className="testimonial-image"
              />
              <h4>Aisha's Wildlife Trek</h4>
              <p>"I felt safe, supported, and truly alive. Can't wait for the next trip!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2>Moments Worth Remembering</h2>
          <div className="gallery-grid">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" alt="Mountain adventure" />
            <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19" alt="Beach sunset" />
            <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801" alt="Wildlife safari" />
            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828" alt="Group photo" />
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" alt="Trekking" />
            <img src="https://images.unsplash.com/photo-1537225228614-b4fad34a0b60" alt="Bonfire night" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to join our tribe?</h2>
        <p>Start your adventure today with Go Gone Girl</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Join Now <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}
