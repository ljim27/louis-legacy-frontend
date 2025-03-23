import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2>Louis Legacy LLC</h2>
      <div className="nav-toggle" onClick={() => setOpen(!open)}>
        ☰
      </div>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link to="/portfolio" onClick={() => setOpen(false)}>Portfolio</Link></li>
        <li><Link to="/services" onClick={() => setOpen(false)}>Services</Link></li>
        <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        <li><Link to="/blog" onClick={() => setOpen(false)}>Blog</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;