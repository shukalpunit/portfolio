import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div id="about" style={{ height: '100vh', backgroundColor: '#F5F5F5' }}>
        About Section
      </div>
      <div id="education" style={{ height: '100vh', backgroundColor: '#FFC107' }}>
        Education Section
      </div>
      <div id="work-experience" style={{ height: '100vh', backgroundColor: '#0056D2', color: '#F5F5F5' }}>
        Work Experience Section
      </div>
      <div id="skills" style={{ height: '100vh', backgroundColor: '#008080', color: '#F5F5F5' }}>
        Skills Section
      </div>
      <div id="projects" style={{ height: '100vh', backgroundColor: '#333333', color: '#F5F5F5' }}>
        Projects Section
      </div>
      <div id="contact" style={{ height: '100vh', backgroundColor: '#F5F5F5' }}>
        Contact Section
      </div>
      <Footer />
    </div>
  );
}

export default App;
