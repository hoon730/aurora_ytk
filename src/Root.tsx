import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TopBtn from "./components/TopBtn";
import { useEffect, useState } from "react";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    }
    /* font-family: "Source Sans 3", serif; */
    background: ${(props) => props.theme.black.darker};;
  }
`;

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5.6vw;
  text-align: center;
`;

const App = () => {
  const [isPre, setIsPre] = useState(false);
  // const matchPre = useMatch("/pre-loading");
  // const matchLogin = useMatch("/login");
  useEffect(() => {
    const isPrePath =
      window.location.pathname.includes("pre-loading") ||
      window.location.pathname.includes("login");
    setIsPre(isPrePath);
  }, []);
  // const [isPre, setIsPre] = useState(matchPre || matchLogin ? true : false);
  // useEffect(() => {
  //   const newIsPre = matchPre || matchLogin ? true : false;
  //   if (isPre !== newIsPre) {
  //     setIsPre(newIsPre);
  //   }
  // }, [matchPre, matchLogin, isPre]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header isPre={isPre} />
        <Outlet />
        <Footer />
        <TopBtn isPre={isPre} />
      </ThemeProvider>
    </>
  );
};

export default App;
