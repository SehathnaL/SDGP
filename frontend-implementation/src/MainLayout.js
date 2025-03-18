import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { light } from "./styles/Themes"; 
import GlobalStyles from "./styles/GlobalStyles";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from './components/sections/Home';
import About from './components/sections/About';
import Faq from './components/sections/Faq';
import RoadMap from './components/sections/Roadmap';
import Showcase from './components/sections/Showcase';
import Team from './components/sections/Team';

const MainLayout = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        
        <main>
          {/* These sections will be visible on all pages that use this layout */}
          <Home />
          <About />
          <Faq />
          <RoadMap />
          <Showcase />
          <Team />
          
          {/* The Outlet will render the content for each page */}
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </>
  );
};

export default MainLayout;