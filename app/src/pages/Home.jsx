import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section - Clean & Minimal */}
      <section className="hero-section" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>The world is calling.</h1>
          <p className="hero-subtitle">Women-focused travel experiences</p>
          <Link to="/trips" className="btn btn-primary btn-lg">
            Explore Trips <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2>Hear from our travelers</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <img
                src="https://drive.google.com/uc?export=view&id=1unx2LKrkJ22vjF29ZHwzWBBvuY0NIrTM"
                alt="Traveler"
                className="testimonial-image"
              />
              <p>"The best decision I made this year!"</p>
              <h4>Gone Girl Traveler</h4>
            </div>

            <div className="testimonial-card">
              <img
                src="https://drive.google.com/uc?export=view&id=17hRBcFJ2HgxVLC9_v4J-E9YHsIlkOir7"
                alt="Traveler"
                className="testimonial-image"
              />
              <p>"I felt safe, supported, and truly alive!"</p>
              <h4>Gone Girl Traveler</h4>
            </div>

            <div className="testimonial-card">
              <img
                src="https://drive.google.com/uc?export=view&id=1JBJT9r2Ql0lAJvsz9t11NV3y2ai0TuGf"
                alt="Traveler"
                className="testimonial-image"
              />
              <p>"This trip changed my life completely!"</p>
              <h4>Gone Girl Traveler</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Simple */}
      <section className="gallery-section">
        <div className="container">
          <h2>Our community in moments</h2>
          <div className="gallery-grid">
            <img src="https://drive.google.com/uc?export=view&id=1Es47CP9N2uHOjHzKu4lijy7T6qTNXYo5" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=1fTw5Psq9qsnbTVtyIpEJzF0JX95Ynaop" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=123Mw6xZNJovMoVIhvv5OSxXjMfGyKW-h" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=1z5RWK0ckwb3CcoH0lJJYqB90X2k5skrU" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=1iLjpn7ghUysHxZaccYYEEpCNPNGp-sRE" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=1163R1NvvCl-i6hN4RmiNMWF-M6rSBtzM" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=166cjx2Upu0ZP1sjuPoKwoqDOeB40vuRL" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=1mLE-VCvoRNkrWjfKy6hha7YvOGTcHvUs" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=1zbQYae-9zmO3xa-ZSuTpzPW2D9fXpzbS" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=15XS1I8OPCL5_YSTMdWoeFYzb02WGEeYF" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=1NqPPrSmso9m0tepldZnXmpuxGQ9IhuhP" alt="Moment" />
            <img src="https://drive.google.com/uc?export=view&id=1leByubQ4M9kWBgLj174BiATiKcsxPeFI" alt="Moment" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Join our community</h2>
        <p>Experience women-focused travel like never before</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Get Started <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}
