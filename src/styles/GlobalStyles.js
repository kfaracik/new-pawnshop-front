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

  button,
  input,
  select,
  textarea,
  a {
    &:focus-visible {
      outline: 3px solid ${colors.primary};
      outline-offset: 2px;
    }
  }

  .skip-link {
    position: absolute;
    left: 16px;
    top: -48px;
    z-index: 2000;
    background: ${colors.primary};
    color: ${colors.primaryContrastText};
    padding: 10px 14px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 700;
  }

  .skip-link:focus {
    top: 16px;
  }

  img,
  iframe {
    max-width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;
