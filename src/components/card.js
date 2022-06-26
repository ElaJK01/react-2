import React from "react";
import CardButton from "./cardButton";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 10px;
  box-sizing: border-box;
  flex-basis: 30%;
`;

const CardContent = styled.div`
  padding: 2px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  margin-left: 5px;
`;

const CardTitle = styled.h4`
  margin: 0.5em;
  padding: 0;
`;

const CardParagraph = styled.p`
  font-size: 10px;
`;

const Card = ({ img, link }) => (
  <CardContainer>
    <img src={img} alt="alt-foto" />
    <CardContent>
      <CardTitle>Consectetur adipiscing elit</CardTitle>
      <CardParagraph>Dignissim diam quis enim lobortis</CardParagraph>
      <CardButton link={link} />
    </CardContent>
  </CardContainer>
);

export default Card;
