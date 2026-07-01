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
              <img
                src="https://drive.google.com/uc?export=view&id=17hRBcFJ2HgxVLC9_v4J-E9YHsIlkOir7"
                alt="Priya's adventure"
                className="testimonial-image"
              />
              <h4>Priya's Kerala Experience</h4>
              <p>"The best decision I made this year. Safety, friendship, and unforgettable moments!"</p>
            </div>

            <div className="testimonial-card">
              <img
                src="https://drive.google.com/uc?export=view&id=1JBJT9r2Ql0lAJvsz9t11NV3y2ai0TuGf"
                alt="Aisha's wildlife trek"
                className="testimonial-image"
              />
              <h4>Aisha's Wildlife Trek</h4>
              <p>"I felt safe, supported, and truly alive. Can't wait for the next trip!"</p>
            </div>

            <div className="testimonial-card">
              <img
                src="https://drive.google.com/uc?export=view&id=1eA2gkOLIzhUUaR9mWQx-Haa7JMDX7r_s"
                alt="Maya's adventure"
                className="testimonial-image"
              />
              <h4>Maya's Himalayan Journey</h4>
              <p>"This trip changed my life. I came back with new friends and an adventurous spirit!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2>Moments Worth Remembering</h2>
          <div className="gallery-grid">
            <img src="https://drive.google.com/uc?export=view&id=1Es47CP9N2uHOjHzKu4lijy7T6qTNXYo5" alt="Gone Girl moment 1" />
            <img src="https://drive.google.com/uc?export=view&id=1fTw5Psq9qsnbTVtyIpEJzF0JX95Ynaop" alt="Gone Girl moment 2" />
            <img src="https://drive.google.com/uc?export=view&id=123Mw6xZNJovMoVIhvv5OSxXjMfGyKW-h" alt="Gone Girl moment 3" />
            <img src="https://drive.google.com/uc?export=view&id=1z5RWK0ckwb3CcoH0lJJYqB90X2k5skrU" alt="Gone Girl moment 4" />
            <img src="https://drive.google.com/uc?export=view&id=1iLjpn7ghUysHxZaccYYEEpCNPNGp-sRE" alt="Gone Girl moment 5" />
            <img src="https://drive.google.com/uc?export=view&id=1163R1NvvCl-i6hN4RmiNMWF-M6rSBtzM" alt="Gone Girl moment 6" />
            <img src="https://drive.google.com/uc?export=view&id=166cjx2Upu0ZP1sjuPoKwoqDOeB40vuRL" alt="Gone Girl moment 7" />
            <img src="https://drive.google.com/uc?export=view&id=1mLE-VCvoRNkrWjfKy6hha7YvOGTcHvUs" alt="Gone Girl moment 8" />
            <img src="https://drive.google.com/uc?export=view&id=1zbQYae-9zmO3xa-ZSuTpzPW2D9fXpzbS" alt="Gone Girl moment 9" />
            <img src="https://drive.google.com/uc?export=view&id=15XS1I8OPCL5_YSTMdWoeFYzb02WGEeYF" alt="Gone Girl moment 10" />
            <img src="https://drive.google.com/uc?export=view&id=1NqPPrSmso9m0tepldZnXmpuxGQ9IhuhP" alt="Gone Girl moment 11" />
            <img src="https://drive.google.com/uc?export=view&id=1leByubQ4M9kWBgLj174BiATiKcsxPeFI" alt="Gone Girl moment 12" />
            <img src="https://drive.google.com/uc?export=view&id=1na68gCG83WP5_h-HbnnkotXzhn1xMUrN" alt="Gone Girl moment 13" />
            <img src="https://drive.google.com/uc?export=view&id=18vSnw4LYCOvEN_4PnL_dttQaRjPa7XFy" alt="Gone Girl moment 14" />
            <img src="https://drive.google.com/uc?export=view&id=1aK9yBZTuB7NDOGj183cXnWDD5ie2_hYB" alt="Gone Girl moment 15" />
            <img src="https://drive.google.com/uc?export=view&id=1f9t4KzfMTu7ORtYZ3hNRpfr1JOhB3uvv" alt="Gone Girl moment 16" />
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
