import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '16px' }}>
            <li><NavLink to="/home" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}>
                  Главная
                </NavLink>
            </li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}>
                  О нас
                </NavLink>
            </li>
            <li>
                <NavLink to="/contacts" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}>
                  Контакты
                </NavLink>
            </li>
          </ul>
        </nav>

        {/* Контент */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}