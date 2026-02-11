import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSlot, bookSlot, user } = useParking();
  const [hours, setHours] = useState(2);
  const [showBill, setShowBill] = useState(false);
  
  const slot = getSlot(id);
  if (!slot) return <div className="text-white p-5">Slot Not Found</div>;

  const total = hours * slot.price;
  const billId = useMemo(() => `SR-${Date.now().toString(36).toUpperCase()}`, []);

  const handleConfirm = () => {
    bookSlot(id);
    setShowBill(true);
  };

  return (
    <div className="app-container d-flex align-items-center justify-content-center">
      <div className="glass-card rent-panel p-5" style={{ width: '100%', maxWidth: '500px' }}>
        {!showBill && (
          <>
            <h5 className="text-muted mb-4" style={{ letterSpacing: '3px' }}>INITIATE DOCKING SEQUENCE</h5>
            
            <h1 className="display-3 fw-bold mb-4" style={{ fontFamily: 'Orbitron' }}>
              BAY <span style={{ color: '#00f3ff' }}>{slot.label}</span>
            </h1>

            <div className="mb-4 text-start">
              <label className="text-muted small mb-2 d-block">DURATION (HOURS)</label>
              <input 
                type="number" 
                min="1" 
                value={hours} 
                onChange={(e) => setHours(Number(e.target.value))}
                className="form-control input-tech fs-4 text-center" 
              />
            </div>

            <div className="d-flex justify-content-between mb-3 p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <span>RATE / HR</span>
              <span className="fw-bold">${slot.price}</span>
            </div>

            <div className="mb-4">
              <p className="mb-0 text-muted small">TOTAL RENT ESTIMATION</p>
              <div className="rent-display">${total}</div>
            </div>

            <button onClick={handleConfirm} className="btn w-100 btn-cyber">
              CONFIRM BOOKING
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-link booking-cancel text-decoration-none mt-3">
              CANCEL SEQUENCE
            </button>
          </>
        )}

        {showBill && (
          <div className="bill-panel">
            <h5 className="text-muted mb-3" style={{ letterSpacing: '3px' }}>BOOKING RECEIPT</h5>
            <div className="bill-row">
              <span>Bill ID</span>
              <span className="fw-bold">{billId}</span>
            </div>
            <div className="bill-row">
              <span>Name</span>
              <span className="fw-bold">{user?.name || 'Guest'}</span>
            </div>
            <div className="bill-row">
              <span>Slot</span>
              <span className="fw-bold">{slot.label}</span>
            </div>
            <div className="bill-row">
              <span>Floor</span>
              <span className="fw-bold">L{slot.floor}</span>
            </div>
            <div className="bill-row">
              <span>Rate / Hr</span>
              <span className="fw-bold">${slot.price}</span>
            </div>
            <div className="bill-row">
              <span>Hours</span>
              <span className="fw-bold">{hours}</span>
            </div>
            <div className="bill-total">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button onClick={() => navigate('/dashboard')} className="btn w-100 btn-cyber mt-4">
              GO TO DASHBOARD
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;