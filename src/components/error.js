import React from "react";
import error from "../assets/error.png";
import styled from "styled-components";

const ErrorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
`;

const ErrorParagraph = styled.p`
  color: red;
  width: fit-content;
`;

const ButtonError = styled.button`
  color: red;
  border-width: 1px;
  border-color: red;
  background-color: white;
  width: fit-content;
  height: 20px;
  border-radius: 5px;
  font-size: 10px;
  margin: 5px;
`;

const Error = ({ onClick }) => (
  <ErrorDiv>
    <ErrorParagraph>Sorry, couldn't get what you want!</ErrorParagraph>
    <img src={error} alt="error" width={50} height={50} />
    <ButtonError onClick={onClick}>Try again!</ButtonError>
  </ErrorDiv>
);

export default Error;
