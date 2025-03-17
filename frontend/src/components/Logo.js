import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import intXLogo from "../assets/Thasara.png";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 50px; /* Adjust the height as needed */
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Logo = () => {
  return (
    <LogoContainer>
      <Link to="/">
        <LogoImage src={intXLogo} alt="intX Logo" />
      </Link>
    </LogoContainer>
  );
};

export default Logo;
