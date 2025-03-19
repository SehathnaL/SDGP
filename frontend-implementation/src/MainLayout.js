import { Outlet } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import styled from "styled-components"
import { light } from "./styles/Themes"
import GlobalStyles from "./styles/GlobalStyles"

import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./components/sections/Home"
import About from "./components/sections/About"
import Faq from "./components/sections/Faq"
import RoadMap from "./components/sections/Roadmap"

// Styled components for the layout
const MainContainer = styled.main`
  width: 100%;
  min-height: 100vh;
`

const SectionsContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`

const MainLayout = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <MainContainer className="main-layout">
          {/* These sections will be visible on all pages that use this layout */}
          <SectionsContainer className="sections-container">
            <Home />
            <About />
            <RoadMap />
            <Faq />
          </SectionsContainer>
          {/* The Outlet will render the content for each page */}
          <Outlet />
        </MainContainer>
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </>
  )
}

export default MainLayout;

