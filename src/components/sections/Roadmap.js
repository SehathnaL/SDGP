import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import ServiceText from "../ServiceText";
import Image1 from "../../assets/Person 1.png";
import Image2 from "../../assets/Person 2.png";
import { useNavigate } from "react-router-dom";


const Section = styled.section`
  min-height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
  width: 100vw;
  position: relative;
  background-color: ${(props) => props.theme.body};
`;

const Container = styled.div`
  width: 75%;
  min-height: 100vh;
  margin: 0 auto;
  // min-height:100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 64em) {
    width: 85%;
  }
  @media (max-width: 48em) {
    flex-direction: column-reverse;
    width: 100%;

    &>*: first-child {
      width: 100%;
      margin-top: 2rem;
    }
  }
`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

const Round = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 90%;
  width: 6rem;
  height: 6rem;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 50%;

  img {
    width: 100%;
    height: auto;
    animation: ${rotate} 6s linear infinite reverse;
  }

  @media (max-width: 64em) {
    width: 4rem;
    height: 4rem;
    left: none;
    right: 2rem;
    bottom: 100%;
  }

  @media (max-width: 48em) {
    right: 1rem;
  }
`;

const Circle = styled.span`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  font-size: ${(props) => props.theme.fontxl};

  @media (max-width: 64em) {
    width: 2rem;
    height: 2rem;
    font-size: ${(props) => props.theme.fontlg};
  }
`;
const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 48em) {
    gap: 1rem;
  }
  
`;

const OptionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid  #EAC42D;;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%; /* Make the box occupy full width */
  max-width: 400px; /* Optional: set a max-width for large screens */

  &:hover {
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const OptionImage = styled.img`
  width: 60px;
  height: 60px;
  // border-radius: 50%;
`;

const OptionText = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: ${(props) => props.theme.text};
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${(props) => props.theme.text};
  }
`;

const Roadmap = () =>{

  const navigate = useNavigate(); // Initialize navigate

  const handleHireClick = () => {
    navigate("/trainer-selection"); // Navigate to the TrainerSelection page
  };

  const handleInterviewClick = () => {
    navigate('/upload-cv'); // Navigate to the TrainerSelection page
  };

  return (
    <Section id="Roadmap">
      <Container>
        <Box>
          <ServiceText />
        </Box>
        <Box>
        <OptionContainer>
            <OptionBox onClick={handleHireClick}> {/* Add onClick here */}
              <OptionImage src={Image1} alt="Personal Trainer" />
              <OptionText>
                <h3>Hire</h3>
                <p>a Personal Trainer</p>
              </OptionText>
            </OptionBox>
            <OptionBox onClick={handleInterviewClick}>
              <OptionImage src={Image2} alt="Virtual Interview" />
              <OptionText>
                <h3>Continue</h3>
                <p>a Virtual Interview with an Avatar</p>
              </OptionText>
            </OptionBox>
          </OptionContainer>

        </Box>
      </Container>
    </Section>
  );
};

export default Roadmap;
