import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../auth';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Contacts</Link>
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          <button onClick={logout}>
                    Logout
                  </button>
        </div>
      </div>
    </nav>
  );
}
