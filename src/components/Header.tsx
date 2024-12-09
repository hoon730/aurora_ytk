import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import UserBox from "./UserBox";
import MobileHeader from "./MobileHeader";
import HeaderSearch from "./HeaderSearch";

const Nav = styled(motion.nav)<{ $isPre: boolean }>`
  width: 100%;
  height: 60px;
  display: ${({ $isPre }) => ($isPre ? "none" : "flex")};
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  position: fixed;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 768px) {
    padding: 0 32px;
  }
`;

const BackButton = styled.span<{ $isHome: boolean }>`
  width: 32px;
  height: 32px;
  background: url("/img/left_arrow.png") center/cover no-repeat;
  cursor: pointer;
  display: none;
  @media screen and (max-width: 768px) {
    display: ${({ $isHome }) => ($isHome ? "none" : "block")};
  }
`;

const Logo = styled.img<{ $openSearch: boolean }>`
  width: 70px;
  height: 33px;
  z-index: 10;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin: ${({ $openSearch }) => ($openSearch ? "0" : "0 auto")};
  }
`;

const Right = styled(motion.div)`
  width: 90%;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.black.darker};
  @media screen and (max-width: 1024px) {
    width: 85%;
  }
  @media screen and (max-width: 768px) {
    width: fit-content;
  }
`;

const SearchAndProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  @media screen and (max-width: 1024px) {
    gap: 30px;
  }
  @media screen and (max-width: 768px) {
    gap: 0px;
  }
`;

const Header = ({ isPre }: { isPre: boolean }) => {
  const matchHome = useMatch("/");
  const [isHome, setIsHome] = useState(matchHome ? true : false);
  const [openSearch, setOpenSearch] = useState(false);
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const navigation = useNavigate();

  useEffect(() => {
    if (isHome !== (matchHome ? true : false)) {
      setIsHome(matchHome ? true : false);
    }
  }, [matchHome, isHome]);

  const goToMain = () => {
    navigation("/");
  };

  const goBack = () => {
    window.history.back();
  };

  const navVariants = {
    top: { background: "#053747" },
    scroll: { background: "#052131" },
  };

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 60) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY]);

  const handleSearch = () => {
    setOpenSearch((prev) => !prev);
  };

  return (
    <>
      <Nav
        $isPre={isPre}
        variants={navVariants}
        animate={navAnimation}
        initial={"top"}
      >
        <BackButton $isHome={isHome} onClick={goBack}></BackButton>
        <Logo $openSearch={openSearch} src="/img/logo.png" onClick={goToMain} />
        <Right variants={navVariants} animate={navAnimation}>
          <Menu />
          <SearchAndProfile>
            <HeaderSearch openSearch={openSearch} />
            <UserBox position="top" />
          </SearchAndProfile>
        </Right>
      </Nav>
      <MobileHeader isPre={isPre} handleSearch={handleSearch} />
    </>
  );
};

export default React.memo(Header);
