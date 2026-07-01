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
                src="https://picsum.photos/400/280?random=20"
                alt="Priya"
                className="testimonial-image"
              />
              <p>"The best decision I made this year!"</p>
              <h4>Priya</h4>
            </div>

            <div className="testimonial-card">
              <img
                src="https://picsum.photos/400/280?random=21"
                alt="Aisha"
                className="testimonial-image"
              />
              <p>"I felt safe, supported, and truly alive!"</p>
              <h4>Aisha</h4>
            </div>

            <div className="testimonial-card">
              <img
                src="https://picsum.photos/400/280?random=22"
                alt="Maya"
                className="testimonial-image"
              />
              <p>"This trip changed my life completely!"</p>
              <h4>Maya</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Simple */}
      <section className="gallery-section">
        <div className="container">
          <h2>Our community in moments</h2>
          <div className="gallery-grid">
            <img src="https://picsum.photos/400/300?random=30" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=31" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=32" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=33" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=34" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=35" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=36" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=37" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=38" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=39" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=40" alt="Moment" />
            <img src="https://picsum.photos/400/300?random=41" alt="Moment" />
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
