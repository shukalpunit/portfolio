import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  text-align: center;
  padding: 10px 0;

  a {
    color: ${({ theme }) => theme.primary};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </FooterWrapper>
  );
};

export default Footer;
