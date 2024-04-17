import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import { light } from "../styles/Theme";
import {
  Home,
  About,
  Guide,
  Team,
  Faq,
  Footer,
} from "../components/landing/sections";
import { Navigation } from "../components/landing/navbar";
import { ScrollToTop } from "../components/landing/ui";

function App(): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Navigation />
        <Home />
        <About />
        <Guide />
        <Team />
        <Faq />
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </>
  );
}

export default App;
