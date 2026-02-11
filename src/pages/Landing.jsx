import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing-wrapper">
      <h1 className="hero-title">
        SLOT<span>RAJA</span>
      </h1>
      <p className="hero-subtitle">COMMAND YOUR PARKING SPACE</p>
      
      <div className="d-flex gap-4 z-3">
        <Link to="/register" className="btn-cinematic text-decoration-none">
          Enter Garage
        </Link>
        <Link to="/login" className="btn-cinematic text-decoration-none" style={{ borderColor: '#fff', color: '#fff' }}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Landing;