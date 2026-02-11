import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { ParkingProvider, useParking } from './context/ParkingContext';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { user, logout } = useParking();
  const navigate = useNavigate();

  if (window.location.pathname === '/') return null;

  return (
    <nav className="navbar navbar-dark sticky-top" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container">
     
        <Link to="/" className="navbar-brand fw-bold" style={{ fontFamily: 'Orbitron', letterSpacing: '2px' }}>
          SLOT<span style={{ color: '#ffaa00', textShadow: '0 0 15px #ffaa00' }}>RAJA</span>
        </Link>
        {user && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-light small d-none d-md-block" style={{opacity: 0.8}}>CMD: {user.name}</span>
            <button onClick={() => { logout(); navigate('/'); }} className="btn btn-sm btn-outline-danger rounded-pill px-3">
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const Protected = ({ children }) => {
  const { user } = useParking();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ParkingProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/book/:id" element={<Protected><Booking /></Protected>} />
      </Routes>
    </ParkingProvider>
  );
}

export default App;