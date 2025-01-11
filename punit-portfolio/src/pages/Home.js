import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Name = styled.h1`
  font-size: 5rem;
  font-family: 'Pacifico', cursive;
  color: ${({ theme }) => theme.primary};
  animation: ${float} 3s ease-in-out infinite;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  a {
    font-size: 2rem;
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const Characters = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;

  a {
    font-size: 1.5rem;
    padding: 20px;
    border: 2px solid ${({ theme }) => theme.accent};
    border-radius: 10px;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
      box-shadow: 0 0 15px ${({ theme }) => theme.accent};
    }
  }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Name>PUNIT</Name>
      <Links>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        <a href="/resume.pdf" download>Resume</a>
      </Links>
      <Characters>
        <a href="/about">About</a>
        <a href="/education">Education</a>
        <a href="/work">Work Experience</a>
        <a href="/skills">Skills</a>
        <a href="/projects">Projects</a>
        <a href="/contact">Contact</a>
      </Characters>
    </HomeWrapper>
  );
};

export default Home;
