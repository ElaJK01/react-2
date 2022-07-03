import React from "react";
import styled from "styled-components";
import { map } from "ramda";
import Link from "./link";

const List = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

const FooterList = ({ list }) => {
  return (
    <List>
      {map(
        (el) => (
          <Link href={el.link} name={el.title} />
        ),
        list
      )}
    </List>
  );
};

export default FooterList;