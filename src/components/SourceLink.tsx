import React, { FC } from "react";
import styled from "styled-components";

import { Code } from "./icons";

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ExternalLink = styled.a`
  margin: 2rem;
`;

const SourceLink: FC = () => {
  return (
    <Footer>
      <ExternalLink title="kildekode" href="https://google.com">
        <Code />
      </ExternalLink>
    </Footer>
  );
};

export default SourceLink;
