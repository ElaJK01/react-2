import React from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 30px;
  background: whitesmoke;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
  }
`;

const FooterList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Footer = () => (
  <FooterDiv>
    <FooterList>
      <a className="link footer__link" href="#">
        Contact
      </a>
      <a className="link footer__link" href="#">
        Privacy
      </a>
      <a className="link footer__link" href="#">
        Security
      </a>
    </FooterList>
    <FooterList>
      <a className="link footer__link" href="#">
        More
      </a>
      <a className="link footer__link" href="#">
        Lorem ipsum
      </a>
      <a className="link footer__link" href="#">
        Lorem ipsum dolor
      </a>
    </FooterList>
  </FooterDiv>
);

export default Footer;
