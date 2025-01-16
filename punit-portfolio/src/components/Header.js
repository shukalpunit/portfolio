import React from 'react';
import './Header.css';
import floatingImage from '../assets/floating-image.jpg';

function Header() {
  return (
    <div className="header">
      <div className="image-container">
        <img src={floatingImage} alt="Floating" className="floating-image" />
      </div>
      <nav className="navbar">
        <a href="#about">About</a>
        <a href="#education">Education</a>
        <a href="#work-experience">Work Experience</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  );
}

export default Header;
