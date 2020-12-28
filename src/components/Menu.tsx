import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Edit, Menu as MenuIcon, Code } from "./icons";

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-gap: 0.5rem;
  margin: 0;
`;

type ListItemProps = {
  index: number;
  isExpanded: boolean;
};

const createOffset = (index: number) => index * (24 + 10);

const ListItem = styled.li<ListItemProps>`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  position: relative;
  right: ${({ index, isExpanded }) =>
    `${isExpanded ? createOffset(index) : 0}px`};
  transition: all 0.1s ease-in-out;
  visibility: ${({ isExpanded }) => (isExpanded ? "inherit" : "hidden")};
  &:hover {
    transform: scale(1.2);
  }
`;

const Menu: FC = () => {
  const [isExpanded, setExpanded] = useState(false);

  const onClick = () => {
    setExpanded((prevValue) => !prevValue);
  };

  return (
    <List>
      <ListItem index={2} isExpanded={isExpanded}>
        <Link to="/edit">
          <Edit />
        </Link>
      </ListItem>
      <ListItem index={1} isExpanded={isExpanded}>
        <a title="yas" href="https://github.com/oleob/kaffepau.se">
          <Code />
        </a>
      </ListItem>
      <ListItem index={0} isExpanded>
        <Button onClick={onClick}>
          <MenuIcon />
        </Button>
      </ListItem>
    </List>
  );
};

export default Menu;
