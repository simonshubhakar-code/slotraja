import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';

function Dashboard() {
  const { slots } = useParking();
  const navigate = useNavigate();
  const [currentFloor, setCurrentFloor] = useState(1);

  const floorSlots = slots.filter(slot => slot.floor === currentFloor);
  const availableCount = floorSlots.filter(s => s.status === 'free').length;
  const occupiedCount = floorSlots.filter(s => s.status === 'occupied').length;

  return (
    <div className="app-container pt-5">
      <div className="container">
        
        <div className="text-center mb-4">
         
          <h2 className="display-4 fw-bold mb-0" style={{ fontFamily: 'Orbitron' }}>
            SECTOR <span style={{ color: '#ffaa00', textShadow: '0 0 20px #ffaa00' }}>ALPHA</span>
          </h2>
          
          <p className="mt-2 text-white fw-bold" style={{ letterSpacing: '3px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            SELECT AN AVAILABLE DOCKING BAY
          </p>
          
          <div className="d-flex justify-content-center gap-5 mt-4 p-3 rounded" style={{ background: 'rgba(0,0,0,0.6)', display: 'inline-flex', border: '1px solid rgba(255,170,0,0.3)' }}>
            <div className="d-flex align-items-center gap-2 text-white fw-bold">
              <span style={{width: 12, height: 12, borderRadius: '50%', background: '#00ff9d', boxShadow: '0 0 10px #00ff9d'}}></span> 
              AVAILABLE: <span style={{ color: '#00ff9d', fontSize: '1.2rem' }}>{availableCount}</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-white fw-bold">
              <span style={{width: 12, height: 12, borderRadius: '50%', background: '#ff0055', boxShadow: '0 0 10px #ff0055'}}></span> 
              OCCUPIED: <span style={{ color: '#ff0055', fontSize: '1.2rem' }}>{occupiedCount}</span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 mb-5">
          {[1, 2, 3].map(floor => (
            <button 
              key={floor}
              onClick={() => setCurrentFloor(floor)}
              className={`btn btn-floor ${currentFloor === floor ? 'active' : ''}`}
            >
              FLOOR 0{floor}
            </button>
          ))}
        </div>

        <div className="dashboard-grid">
          {floorSlots.map((slot) => (
            <div 
              key={slot.id} 
              onClick={() => slot.status === 'free' && navigate(`/book/${slot.id}`)}
              className={`slot-unit ${slot.status === 'free' ? 'slot-free' : 'slot-occupied'}`}
            >
              <div className="icon-ring">
                <i className={`fas ${slot.status === 'free' ? 'fa-car-side' : 'fa-lock'}`}></i>
              </div>
              <div className="slot-id">{slot.label}</div>
              <div className="slot-type">{slot.type}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;