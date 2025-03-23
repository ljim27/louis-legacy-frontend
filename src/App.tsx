import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

const Home = () => (
  <div className="app-container">
    <h1>Welcome to Louis Legacy LLC</h1>
    <p>Your digital and creative partner for branding & social media.</p>
  </div>
);

const Portfolio = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('src', '//www.instagram.com/embed.js');
    script.setAttribute('async', '');
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="app-container">
      <h1>Our Work on Instagram</h1>
      <div
        className="instagram-embed"
        dangerouslySetInnerHTML={{
          __html: `
            <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DASJ8twJ7M8/" data-instgrm-version="14" style="background:#FFF;border:0;border-radius:3px;box-shadow:0 0 1px rgba(0,0,0,0.5);margin:1px;max-width:540px;min-width:326px;padding:0;width:99.375%;">
              <a href="https://www.instagram.com/reel/DASJ8twJ7M8/" target="_blank" rel="noopener noreferrer">View this post on Instagram</a>
            </blockquote>
          `
        }}
      />
    </div>
  );
};

const Services = () => (
  <div className="app-container">
    <h1>Our Services</h1>
    <ul>
      <li>🚀 App Development</li>
      <li>🎨 Branding & Design</li>
      <li>📱 Social Media Strategy</li>
      <li>📸 Content Creation</li>
    </ul>
  </div>
);

const Contact = () => (
  <div className="app-container">
    <h1>Contact Us</h1>
    <p>Email: info@louislegacy.com</p>
  </div>
);

const Blog = () => (
  <div className="app-container">
    <h1>Blog & Case Studies</h1>
    <ul className="services">
      <li><strong>📱 Social Media Branding</strong> – Boosted engagement by 85%</li>
      <li><strong>🎥 Music Artist Video Strategy</strong> – Helped achieve viral reels</li>
      <li><strong>🧠 Brand Identity Creation</strong> – Full logo, style, and story buildout</li>
    </ul>
  </div>
);

const RequestInfo = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      service: formData.get("service"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };
 
    try {
    const res = await fetch("https://louislegacy.life/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
 
      const result = await res.json();
      console.log("Server response:", result); // Debugging log
 
      if (result.success) {
        setFormSubmitted(true);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error sending form:", error);
      alert("Connection error. Please try again later.");
    }
  };

  return (
    <div className="app-container">
      <h1>Request Our Services</h1>
      <ul className="services">
        <li><strong>🚀 App Development:</strong> Starting at $2,500</li>
        <li><strong>🎨 Branding & Design:</strong> Starting at $800</li>
        <li><strong>📱 Social Media Strategy:</strong> $500/month</li>
        <li><strong>📸 Content Creation:</strong> $300/session</li>
      </ul>
      {!formSubmitted ? (
        <form className="request-form" onSubmit={handleSubmit}>
          <label>Name: <input type="text" name="name" required /></label>
          <label>Email: <input type="email" name="email" required /></label>
          <label>
            Service:
            <select name="service" required>
              <option value="">Select a service</option>
              <option value="App Development">App Development</option>
              <option value="Branding & Design">Branding & Design</option>
              <option value="Social Media Strategy">Social Media Strategy</option>
              <option value="Content Creation">Content Creation</option>
            </select>
          </label>
          <label>Budget: <input type="text" name="budget" /></label>
          <label>Message: <textarea name="message" rows={4}></textarea></label>
          <button type="submit">Send Request</button>
        </form>
      ) : (
        <p style={{ marginTop: "20px", color: "#f8b400" }}>
          ✅ Thank you! We'll get back to you as soon as possible.
        </p>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <nav className="navbar">
        <h2>Louis Legacy LLC</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/request-info" element={<RequestInfo />} />
      </Routes>

      <footer className="footer">
        <p>© 2025 Louis Legacy LLC | Auburn, NY</p>
        <p>
          <a href="https://www.instagram.com/louislegacyllc/" target="_blank" rel="noopener noreferrer">Instagram</a> | 
          <a href="https://apps.apple.com/us/app/binaryme/id6742085556" target="_blank" rel="noopener noreferrer">BinaryMe App</a> | 
          <Link to="/request-info" style={{ color: '#f8b400', textDecoration: 'underline' }}>More Info</Link> | 
          <a href="https://a.co/d/7q4irPo" target="_blank" rel="noopener noreferrer">Jesus My M.P. Book</a>
        </p>
      </footer>
    </Router>
  );
}

export default App;