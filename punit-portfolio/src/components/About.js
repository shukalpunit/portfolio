import React from 'react';

function About() {
  return (
    <section id="about" style={styles.section}>
      <h2 style={styles.heading}>About Me</h2>
      <p>This is the About section, styled with the provided color palette.</p>
      <h3>My Skills are to build software</h3>
    </section>
  );
}

const styles = {
  section: {
    padding: '100px 20px',
    backgroundColor: '#F5F5F5', // Neutral Base
    color: '#333333', // Text Color
    borderTop: '4px solid #0056D2', // Primary Color
  },
  heading: {
    color: '#0056D2', // Primary Color
  },
};

export default About;
