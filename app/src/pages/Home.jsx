import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Shield, Sparkles } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
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
