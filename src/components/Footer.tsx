import React, { FC } from "react";
import styled from "styled-components";

import Menu from "./Menu";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2rem;
`;

const Footer: FC = () => {
  return (
    <Container>
      <Menu />
    </Container>
  );
};

export default Footer;
