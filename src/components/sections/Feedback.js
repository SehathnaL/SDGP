import React from "react";
import styled from "styled-components";

// Styled Components
const Section = styled.section`
  width: 100vw;
  background-color: #ffffff;
  padding: 4rem 0;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    width: 45%;
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const StatsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const StatCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  width: calc(33% - 1rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: calc(50% - 0.5rem);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StatTitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const StatValue = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Graph = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const CircleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const CircleProgress = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: conic-gradient(
      #ff9500 0% ${props => props.percentage}%,
      #f0f0f0 ${props => props.percentage}% 100%
    );
  }

  &::after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: white;
  }
`;

const CircleText = styled.span`
  position: relative;
  z-index: 1;
  font-size: 2.5rem;
  font-weight: 700;
`;

const BarChartContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Bar = styled.div`
  width: 40px;
  height: ${props => props.height}%;
  background-color: ${props => props.color};
  border-radius: 20px;
`;

const BarLabel = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
`;

const SkillsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const SkillItem = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  font-weight: 500;
`;

const SkillValue = styled.span`
  color: #666;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => props.color || "#ff9500"};
  border-radius: 4px;
`;

// Feedback Component
const Feedback = () => {
  // Sample data - in a real app, this would come from props or an API
  const stats = {
    startingKnowledge: 64,
    currentKnowledge: 86,
    knowledgeGain: 34,
    overallScore: 72,
    dailyProgress: [60, 75, 40, 55, 70, 80, 65], // D1 to D7
    skills: [
      { name: "Communication Skills", value: 74, color: "#ff9500" },
      { name: "Content", value: 52, color: "#ff9500" },
      { name: "Confidence", value: 36, color: "#ff9500" },
    ],
  };

  return (
    <Section id="feedback">
      <Container>
        <TextContainer>
          <Title>Thank you for using IntX to practice your interview skills!</Title>
          <Description>Here's a detailed analysis of your today's performance:</Description>
          
          <StatsContainer>
            <StatCard>
              <StatTitle>Starting Knowledge</StatTitle>
              <StatValue>{stats.startingKnowledge}%</StatValue>
              <Graph>
                <svg viewBox="0 0 100 30">
                  <path
                    d="M0,15 Q10,5 20,10 T40,5 T60,15 T80,10 T100,5"
                    fill="none"
                    stroke="#ffcc00"
                    strokeWidth="2"
                  />
                </svg>
              </Graph>
            </StatCard>
            
            <StatCard>
              <StatTitle>Current Knowledge</StatTitle>
              <StatValue>{stats.currentKnowledge}%</StatValue>
              <Graph>
                <svg viewBox="0 0 100 30">
                  <path
                    d="M0,20 Q10,15 20,10 T40,5 T60,10 T80,5 T100,10"
                    fill="none"
                    stroke="#ffcc00"
                    strokeWidth="2"
                  />
                </svg>
              </Graph>
            </StatCard>
            
            <StatCard>
              <StatTitle>Knowledge Gain</StatTitle>
              <StatValue>+{stats.knowledgeGain}%</StatValue>
              <Graph>
                <svg viewBox="0 0 100 30">
                  <path
                    d="M0,25 Q10,20 20,15 T40,10 T60,5 T80,10 T100,5"
                    fill="none"
                    stroke="#ffcc00"
                    strokeWidth="2"
                  />
                </svg>
              </Graph>
            </StatCard>
          </StatsContainer>
          
          <BarChartContainer>
            {stats.dailyProgress.map((value, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Bar 
                  height={value} 
                  color={index % 2 === 0 ? "#ffcc00" : "#ffe699"}
                />
                <BarLabel>D {index + 1}</BarLabel>
              </div>
            ))}
          </BarChartContainer>
        </TextContainer>
        
        <StatsContainer>
          <CircleContainer>
            <CircleProgress percentage={stats.overallScore}>
              <CircleText>{stats.overallScore}%</CircleText>
            </CircleProgress>
          </CircleContainer>
          
          <SkillsContainer>
            {stats.skills.map((skill, index) => (
              <SkillItem key={index}>
                <SkillLabel>
                  <SkillName>{skill.name}</SkillName>
                  <SkillValue>{skill.value}%</SkillValue>
                </SkillLabel>
                <ProgressBar>
                  <Progress percentage={skill.value} color={skill.color} />
                </ProgressBar>
              </SkillItem>
            ))}
          </SkillsContainer>
        </StatsContainer>
      </Container>
    </Section>
  );
};

export default Feedback;