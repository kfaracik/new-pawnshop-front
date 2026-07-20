import { createGlobalStyle } from "styled-components";
import colors from "styles/colors";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    -webkit-tap-highlight-color: transparent;
  }

  body {
    background-color: ${colors.backgroundDefault};
    padding: 0;
    margin: 0;
    font-family: var(--app-font, system-ui), sans-serif;
    color: ${colors.textPrimary};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    background: rgba(201, 162, 39, 0.28);
    color: ${colors.textPrimary};
  }

  button,
  input,
  select,
  textarea {
    font-family: inherit;
  }

  #__next {
    overflow-y: scroll;
    height: 100vh;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #b5b0a2 transparent;
  }

  #__next::-webkit-scrollbar {
    width: 9px;
  }

  #__next::-webkit-scrollbar-track {
    background: transparent;
  }

  #__next::-webkit-scrollbar-thumb {
    background: #c3beb0;
    border-radius: 999px;
    border: 2px solid ${colors.backgroundDefault};
  }

  #__next::-webkit-scrollbar-thumb:hover {
    background: ${colors.primary};
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
