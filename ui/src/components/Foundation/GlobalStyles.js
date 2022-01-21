import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyles = createGlobalStyle`
  * {
    outline: none;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: #FFF;
    color: #000;
    font-size: 1rem;
  }
`;

export default GlobalStyles;