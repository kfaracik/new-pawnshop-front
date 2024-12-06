import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
  }

  #__next {
    overflow-y: scroll;
    height: 100vh;
    scrollbar-width: thin;
    scrollbar-color: #6c757d #dfe6e9;
`;

export default GlobalStyles;
