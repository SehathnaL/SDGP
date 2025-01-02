
import React from "react";
import styled from "styled-components";
import intXLogo from "../assets/Thasara.png";

// Styled Components
const Section = styled.section`
  width: 100vw;
  background-color: #ffffff; /* White page background */
  padding: 1rem 0;
  display: flex;
  justify-content: center; /* Center content horizontally */
`;

const NavContainer = styled.nav`
  width: 85%; /* Space on both sides */
  background-color: #fff8e6; /* Yellow background for the navbar */
  border-radius: 15px; /* Rounded corners */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 25px; /* Adjust the height as needed */
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;

  @media (max-width: 768px) {
    display: none; /* Hide menu for smaller screens */
  }
`;

const MenuItem = styled.li`
  margin: 0 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #000; /* Black text */
  cursor: pointer;

  &:hover {
    color: #f0c300; /* White text on hover */
  }
`;

const LoginButton = styled.button`
  background-color: #000; /* Black button */
  color: #fff;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 20px; /* Rounded corners for button */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333; /* Darker black on hover */
  }
`;

// Navigation Component
const Navigation = () => {

  const scrollTo = (id) => {
       let element = document.getElementById(id);
  }
  
  return (
    <Section id="navigation">
      <NavContainer>
        {/* Logo */}
        <Logo>
          <LogoImage src={intXLogo} alt="intX Logo" />
        </Logo>

        {/* Menu Items */}
        <Menu>
          <MenuItem onClick={() => scrollTo("home")}>Home</MenuItem>
          <MenuItem onClick={() => scrollTo("Roadmap")}>Services</MenuItem>
          <MenuItem>About Us</MenuItem>
          <MenuItem onClick={() => scrollTo("faq")}>FAQ</MenuItem>
        </Menu>

        {/* Login Button */}
        <LoginButton>Log In</LoginButton>
      </NavContainer>
    </Section>
  );
};

export default Navigation;

