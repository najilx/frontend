import { useState } from 'react';
import { login } from '../auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handle = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      login(data);
      nav('/contacts');
    } catch {
      setErr('Invalid credentials');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="mb-4">Login</h2>
        {err && <div className="text-danger mb-2">{err}</div>}

        <form onSubmit={handle}>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="switch-link">
          Don’t have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
