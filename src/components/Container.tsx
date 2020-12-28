import { FC } from "react";
import styled, { createGlobalStyle } from "styled-components";

type Props = {
  type: "break" | "nobreak" | "create";
};

const GlobalStyle = createGlobalStyle<Props>`
    html {
        background-color: ${({ type }) => {
          switch (type) {
            case "break":
              return "#71B340";
            case "nobreak":
              return "#DE3C4B";
            case "create":
            default:
              return "#2E6171";
          }
        }};
    }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
`;

const Container: FC<Props> = ({ type, children }) => {
  return (
    <StyledContainer>
      <GlobalStyle type={type} />
      {children}
    </StyledContainer>
  );
};

export default Container;
