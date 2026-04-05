import { createGlobalStyle } from "styled-components";
import colors from "styles/colors";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${colors.backgroundDefault};
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    color: ${colors.textPrimary};
    overflow-x: hidden;
  }

  #__next {
    overflow-y: scroll;
    height: 100vh;
    scrollbar-width: thin;
    scrollbar-color: #6c757d #dfe6e9;
  }

  a {
    color: inherit;
  }

  img,
  iframe {
    max-width: 100%;
  }
`;

export default GlobalStyles;
