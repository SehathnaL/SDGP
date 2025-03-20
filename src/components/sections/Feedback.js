import styled, { keyframes } from "styled-components"
import Navigation from "../Navigation"

// Animation keyframes
const fillCircle = keyframes`
  from { stroke-dashoffset: 251.2; }
  to { stroke-dashoffset: 70.336; } /* 251.2 - (251.2 * 72 / 100) */
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const growWidth = (width) => keyframes`
  from { width: 0; }
  to { width: ${width}%; }
`

const growHeight = (height) => keyframes`
  from { height: 0; }
  to { height: ${height}%; }
`

const PageWrapper = styled.div`
  width: 100vw;
  min-height: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`

const ContentSection = styled.section`
  width: 85%;
  margin: 2rem auto;
  padding: 0 2rem;
`

const Header = styled.div`
  margin-bottom: 3rem;
`

const Title = styled.h2`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Description = styled.p`
  font-size: 1rem;
  color: #666;
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const CircleProgressContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`

const CircleBackground = styled.circle`
  fill: none;
  stroke: #f0f0f0;
  stroke-width: 10;
`

const CircleProgress = styled.circle`
  fill: none;
  stroke: #ff9500;
  stroke-width: 10;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
  stroke-dasharray: 251.2;
  stroke-dashoffset: 70.336; /* 251.2 - (251.2 * 72 / 100) */
  animation: ${fillCircle} 1.5s ease-in-out forwards;
`

const CircleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 700;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  animation-delay: 0.5s;
  opacity: 0;
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`

const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

const MetricTitle = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const LineGraph = styled.div`
  height: 30px;
  svg {
    width: 100%;
    height: 100%;
  }
`

const SkillsContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
`

const SkillItem = styled.div`
  margin-bottom: 1.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const SkillName = styled.span`
  font-size: 0.875rem;
`

const SkillValue = styled.span`
  font-size: 0.875rem;
  color: #666;
`

const ProgressBar = styled.div`
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.value}%;
  background: #ff9500;
  border-radius: 4px;
  animation: ${(props) => growWidth(props.value)} 1s ease-out forwards;
  animation-delay: ${(props) => props.delay}s;
  width: 0;
`

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 240px;
  padding: 2rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
`

const BarContainer = styled.div`
  position: relative;
`

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
`


const BarValue = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.875rem;
  font-weight: 500;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  animation-delay: ${(props) => props.delay + 0.8}s;
  opacity: 0;
`

function Feedback() {
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
  }

  return (
    <PageWrapper>
      <Navigation />
      <ContentSection>
        <Header>
          <Title>
            Thank you for using intX <br />
            to practice your interview skills!
          </Title>
          <Description>Here's a detailed analysis of your today's performance:</Description>
        </Header>

        <MainContent>
          <LeftColumn>
            <CircleProgressContainer>
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <CircleBackground cx="50" cy="50" r="40" />
                <CircleProgress cx="50" cy="50" r="40" />
              </svg>
              <CircleText>{stats.overallScore}%</CircleText>
            </CircleProgressContainer>

            <SkillsContainer>
              {stats.skills.map((skill, index) => (
                <SkillItem key={index}>
                  <SkillHeader>
                    <SkillName>{skill.name}</SkillName>
                    <SkillValue>{skill.value}%</SkillValue>
                  </SkillHeader>
                  <ProgressBar>
                    <Progress value={skill.value} delay={0.2 * index} />
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
                    {metric.prefix || ""}
                    {metric.value}%
                  </MetricValue>
                  <LineGraph>
                    <svg viewBox="0 0 100 30">
                      <path d="M0,15 Q25,5 50,20 T100,10" fill="none" stroke="#ffcc00" strokeWidth="2" />
                    </svg>
                  </LineGraph>
                </MetricCard>
              ))}
            </MetricsGrid>

            <BarChart>
              {stats.dailyProgress.map((value, index) => (
                <BarContainer key={index}>
                  <Bar
                    height={value}
                    day={index + 1}
                    color={index % 2 === 0 ? "#ffcc00" : "#ffe699"}
                    delay={0.15 * index}
                  />
                  <BarValue delay={0.15 * index}>{value}%</BarValue>
                </BarContainer>
              ))}
            </BarChart>
          </RightColumn>
        </MainContent>
      </ContentSection>
    </PageWrapper>
  )
}

export default Feedback;

