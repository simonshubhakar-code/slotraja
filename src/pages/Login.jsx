import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';

function Login() {
  const { login } = useParking();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(form.username, form.password)) navigate('/dashboard');
    else alert('Invalid Credentials');
  };

  return (
    <div className="app-container d-flex align-items-center justify-content-center">
      <div className="glass-card p-5" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 fw-bold" style={{ fontFamily: 'Orbitron' }}>IDENTITY</h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input className="input-tech" placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
          <input className="input-tech" type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
          <button className="btn btn-cyber mt-3">ACCESS</button>
        </form>
        <div className="auth-switch">
          <span className="text-muted">New here?</span>
          <Link to="/register" className="auth-link">Go to Register</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;