import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreditCard, Calendar, Users, AlertCircle } from 'lucide-react';
import client from '../api/client';
import '../styles/Booking.css';

export default function Booking() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState('details');
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    departureDate: '',
    specialRequests: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tripPrice = 20000;
  const totalPrice = tripPrice * bookingData.travelers;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await client.post('/api/bookings', {
        tripId,
        ...bookingData,
        totalAmount: totalPrice
      });

      if (data.success) {
        navigate('/dashboard', { state: { message: 'Booking confirmed!' } });
      } else {
        setError(data.error || 'Booking failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-main">
          <h1>Complete Your Booking</h1>

          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="step-tabs">
              <button
                type="button"
                className={`tab ${step === 'details' ? 'active' : ''}`}
                onClick={() => setStep('details')}
              >
                Trip Details
              </button>
              <button
                type="button"
                className={`tab ${step === 'payment' ? 'active' : ''}`}
                onClick={() => setStep('payment')}
              >
                Payment
              </button>
            </div>

            {step === 'details' && (
              <div className="step-content">
                <h2>Select Your Preferences</h2>

                <div className="form-group">
                  <label htmlFor="travelers">Number of Travelers</label>
                  <div className="input-wrapper">
                    <Users size={18} />
                    <select
                      id="travelers"
                      value={bookingData.travelers}
                      onChange={(e) => setBookingData({ ...bookingData, travelers: parseInt(e.target.value) })}
                    >
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Traveler{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Preferred Departure Date</label>
                  <div className="input-wrapper">
                    <Calendar size={18} />
                    <input
                      id="date"
                      type="date"
                      value={bookingData.departureDate}
                      onChange={(e) => setBookingData({ ...bookingData, departureDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="requests">Special Requests (Optional)</label>
                  <textarea
                    id="requests"
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                    placeholder="Any dietary restrictions, accessibility needs, etc."
                    rows={4}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="btn btn-primary"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="step-content">
                <h2>Payment Details</h2>

                <div className="booking-summary">
                  <div className="summary-item">
                    <span>Trip Price</span>
                    <span>₹{tripPrice.toLocaleString()}</span>
                  </div>
                  <div className="summary-item">
                    <span>Number of Travelers</span>
                    <span>{bookingData.travelers}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total Amount</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="payment-method">
                  <h3>Payment Method</h3>
                  <label className="payment-option active">
                    <input type="radio" name="payment" value="card" defaultChecked />
                    <span>
                      <CreditCard size={18} />
                      Credit/Debit Card
                    </span>
                  </label>
                </div>

                <p className="payment-note">
                  Payment will be processed securely through Stripe
                </p>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="btn btn-secondary"
                >
                  Back
                </button>
              </div>
            )}
          </form>
        </div>

        <aside className="booking-sidebar">
          <div className="trip-summary">
            <h3>Trip Summary</h3>
            <div className="summary-item">
              <span>Duration:</span>
              <span>4 Nights / 5 Days</span>
            </div>
            <div className="summary-item">
              <span>Location:</span>
              <span>Nainital, India</span>
            </div>
            <div className="summary-item">
              <span>Group Size:</span>
              <span>Max 12</span>
            </div>
            <div className="price-display">
              Total: <span>₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
