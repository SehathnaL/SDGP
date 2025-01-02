import { ThemeProvider } from "styled-components";
import GlobalStyles from "./../../styles/GlobalStyles";
import { light } from "./../../styles/Themes";

import Navigation from "../Navigation";
import Home from "./Home";
import About from "./About";
import Roadmap from "./Roadmap";
import Faq from "./Faq";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";

function LandingPage() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Navigation />
        <Home />
        <About />
        <Roadmap />
        <Faq />
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </>
  );
}

export default LandingPage;