import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="floating-name">PUNIT</h1>
      <div className="links-container">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="/resume.pdf" download>Resume</a>
      </div>
      <div className="characters-container">
        <a href="/about" className="character">About</a>
        <a href="/education" className="character">Education</a>
        <a href="/work-experience" className="character">Work Experience</a>
        <a href="/skills" className="character">Skills</a>
        <a href="/projects" className="character">Projects</a>
        <a href="/contact" className="character">Contact</a>
      </div>
    </div>
  );
}

export default Home;
