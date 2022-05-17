import { createGlobalStyle } from 'styled-components';

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

	html {
		height: 100%;
	}

	body {
		position: relative;
		min-height: 100%;
		padding-bottom: 8rem;
	}

	.navbar,
	.navbar-default {
    background-color: #338091;
		height: 4rem;
	}
`;

export default GlobalStyles;