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
              <iframe
                src="https://drive.google.com/file/d/1unx2LKrkJ22vjF29ZHwzWBBvuY0NIrTM/preview"
                width="100%"
                height="280"
                allow="autoplay"
                className="testimonial-video"
              ></iframe>
              <h4>Gone Girl Traveler</h4>
            </div>

            <div className="testimonial-card">
              <iframe
                src="https://drive.google.com/file/d/17hRBcFJ2HgxVLC9_v4J-E9YHsIlkOir7/preview"
                width="100%"
                height="280"
                allow="autoplay"
                className="testimonial-video"
              ></iframe>
              <h4>Gone Girl Traveler</h4>
            </div>

            <div className="testimonial-card">
              <iframe
                src="https://drive.google.com/file/d/1JBJT9r2Ql0lAJvsz9t11NV3y2ai0TuGf/preview"
                width="100%"
                height="280"
                allow="autoplay"
                className="testimonial-video"
              ></iframe>
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
            <img src="https://lh3.googleusercontent.com/d/1Es47CP9N2uHOjHzKu4lijy7T6qTNXYo5=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1fTw5Psq9qsnbTVtyIpEJzF0JX95Ynaop=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/123Mw6xZNJovMoVIhvv5OSxXjMfGyKW-h=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1z5RWK0ckwb3CcoH0lJJYqB90X2k5skrU=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1iLjpn7ghUysHxZaccYYEEpCNPNGp-sRE=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1163R1NvvCl-i6hN4RmiNMWF-M6rSBtzM=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/166cjx2Upu0ZP1sjuPoKwoqDOeB40vuRL=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1mLE-VCvoRNkrWjfKy6hha7YvOGTcHvUs=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1zbQYae-9zmO3xa-ZSuTpzPW2D9fXpzbS=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/15XS1I8OPCL5_YSTMdWoeFYzb02WGEeYF=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1NqPPrSmso9m0tepldZnXmpuxGQ9IhuhP=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1leByubQ4M9kWBgLj174BiATiKcsxPeFI=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1na68gCG83WP5_h-HbnnkotXzhn1xMUrN=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/18vSnw4LYCOvEN_4PnL_dttQaRjPa7XFy=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1aK9yBZTuB7NDOGj183cXnWDD5ie2_hYB=s600" alt="Moment" />
            <img src="https://lh3.googleusercontent.com/d/1f9t4KzfMTu7ORtYZ3hNRpfr1JOhB3uvv=s600" alt="Moment" />
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
