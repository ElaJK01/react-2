import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarRoot = styled.nav`
  background: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 50px;
  height: 50px;
  gap: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Navbar = () => (
  <NavbarRoot>
    <Link className="link navbar__btn" to="/">
      Home
    </Link>
    <Link className="link navbar__btn" to="/about">
      About
    </Link>
    <Link className="link navbar__btn" to="/contact">
      Contact
    </Link>
    <Link className="link navbar__btn" to="/teams">
      Gardening Teams
    </Link>
    <Link className="link navbar__btn" to="/players">
      Players
    </Link>
  </NavbarRoot>
);

export default Navbar;
