import React from "react";
import styled from "styled-components";

const Button = styled.a`
  color: black;
  text-decoration: none;
  background: whitesmoke;
  border-style: none;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 30%;
  color: gray;
  font-size: 10px;
  text-align: center;
`;

const CardButton = ({ link }) => (
  <Button className="link card-content__btn" href={link}>
    More Info
  </Button>
);

export default CardButton;
