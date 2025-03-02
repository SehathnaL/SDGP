import React from "react";
import styled from "styled-components";
import Navigation from "../Navigation";

const PageWrapper = styled.div`
  width: 100vw;
  min-height: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const ContentSection = styled.section`
  width: 85%;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CircleProgress = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(
      #ff9500 0% ${props => props.percentage}%,
      #f0f0f0 ${props => props.percentage}% 100%
    );
  }

  &::after {
    content: "";
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    border-radius: 50%;
    background: white;
  }
`;

const CircleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 3rem;
  font-weight: 700;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const MetricTitle = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const LineGraph = styled.div`
  height: 30px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SkillsContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SkillItem = styled.div`
  margin-bottom: 1.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  font-size: 0.875rem;
`;

const SkillValue = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background: #ff9500;
  border-radius: 4px;
`;

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 240px;
  padding: 2rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Bar = styled.div`
  width: 40px;
  height: ${props => props.height}%;
  background: ${props => props.color};
  border-radius: 20px;
  position: relative;

  &::after {
    content: "D${props => props.day}";
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.875rem;
    color: #666;
  }
`;

const Feedback = () => {
  const stats = {
    overallScore: 72,
    metrics: [
      { title: "Starting Knowledge", value: 64 },
      { title: "Current Knowledge", value: 86 },
      { title: "Knowledge Gain", value: 34, prefix: "+" },
    ],
    skills: [
      { name: "Communication Skills", value: 74 },
      { name: "Content", value: 52 },
      { name: "Confidence", value: 36 },
    ],
    dailyProgress: [60, 75, 40, 55, 70, 80, 65],
  };

  return (
    <PageWrapper>
      <Navigation />
      <ContentSection>
        <Header>
          <Title>Thank you for using IntX to practice your interview skills!</Title>
          <Description>Here's a detailed analysis of your today's performance:</Description>
        </Header>

        <MainContent>
          <LeftColumn>
            <CircleProgress percentage={stats.overallScore}>
              <CircleText>{stats.overallScore}%</CircleText>
            </CircleProgress>

            <SkillsContainer>
              {stats.skills.map((skill, index) => (
                <SkillItem key={index}>
                  <SkillHeader>
                    <SkillName>{skill.name}</SkillName>
                    <SkillValue>{skill.value}%</SkillValue>
                  </SkillHeader>
                  <ProgressBar>
                    <Progress value={skill.value} />
                  </ProgressBar>
                </SkillItem>
              ))}
            </SkillsContainer>
          </LeftColumn>

          <RightColumn>
            <MetricsGrid>
              {stats.metrics.map((metric, index) => (
                <MetricCard key={index}>
                  <MetricTitle>{metric.title}</MetricTitle>
                  <MetricValue>
                    {metric.prefix || ""}{metric.value}%
                  </MetricValue>
                  <LineGraph>
                    <svg viewBox="0 0 100 30">
                      <path
                        d="M0,15 Q25,5 50,20 T100,10"
                        fill="none"
                        stroke="#ffcc00"
                        strokeWidth="2"
                      />
                    </svg>
                  </LineGraph>
                </MetricCard>
              ))}
            </MetricsGrid>

            <BarChart>
              {stats.dailyProgress.map((value, index) => (
                <Bar
                  key={index}
                  height={value}
                  day={index + 1}
                  color={index % 2 === 0 ? "#ffcc00" : "#ffe699"}
                />
              ))}
            </BarChart>
          </RightColumn>
        </MainContent>
      </ContentSection>
    </PageWrapper>
  );
};

export default Feedback;