import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #1b1b1b;
    color: #ffffff;
  }

  a {
    text-decoration: none;
    color: #ff6f61;
  }
`;

export default GlobalStyle;
