import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  #__next {
    overflow-y: scroll;
    height: 100vh;
    scrollbar-width: thin;
    scrollbar-color: #6c757d #dfe6e9;
`;

export default GlobalStyles;
