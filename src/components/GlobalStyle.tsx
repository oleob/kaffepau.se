import { createGlobalStyle } from "styled-components";

const color = "#19231A";

const GlobalStyle = createGlobalStyle`
  html,body, #root {
    margin: 0;
    padding: 0;
    width:100%;
    height: 100%;
    color: ${color};
  }

  #root {
      display: flex;
      flex-direction: column;
  }

  svg {
    fill: ${color}
  }
`;

export default GlobalStyle;
