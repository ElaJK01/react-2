import React from "react";
import Navbar from "./navbar";
import styled from "styled-components";

const HeaderRoot = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-bottom: 20px;
`;

const HeaderContainer = styled.div`
  position: relative;
  text-align: center;
  color: black;
  width: 100%;
  > img {
    width: 100%;
    height: 100%;
  }
`;

const HeaderTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 4px -3px 5px rgba(37, 41, 41, 0.59);
`;

const Header = () => (
  <HeaderRoot>
    <HeaderContainer>
      <img src="https://picsum.photos/id/306/1000/50" alt="header-img" />
      <HeaderTitle>
        <h1>My Garden</h1>
      </HeaderTitle>
      <Navbar />
    </HeaderContainer>
  </HeaderRoot>
);

export default Header;
