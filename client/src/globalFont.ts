// globalStyles.ts

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'MyFont';
    src: url('./Font/OpenDyslexic-Bold.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
  }

  body {
    font-family: 'MyFont', sans-serif;
  }
`;

export default GlobalStyles;
