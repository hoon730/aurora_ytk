import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobileMenuOpen } from "../atom";
import { useRecoilValue } from "recoil";
import { useMatch } from "react-router-dom";

const BtnContainer = styled.div<{
  $isNavVisible: boolean;
  $openMenu: boolean;
  $isLogin: boolean;
}>`
  display: ${({ $openMenu, $isLogin }) =>
    $openMenu || $isLogin ? "none" : "block"};
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 30;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  @media screen and (max-width: 768px) {
    right: ${(props) => (props.$isNavVisible ? "10px" : "15px")};
    bottom: ${(props) => (props.$isNavVisible ? "70px" : "15px")};
    width: 50px;
    height: 50px;
  }
  &:hover {
    background: #f9f9f9;
  }
`;

const BtnImg = styled.img`
  width: 100%;
  height: 100%;
  transform: rotate(180deg);
  &:hover {
    filter: invert();
  }
`;

const TopBtn = ({ isPre }: { isPre: boolean }) => {
  const matchLogin = useMatch("/login");
  const [isLogin, setIsLogin] = useState(matchLogin ? true : false);
  useEffect(() => {
    setIsLogin(matchLogin ? true : false);
  }, [matchLogin, isLogin]);

  const openMenu = useRecoilValue(mobileMenuOpen);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <BtnContainer
      $isNavVisible={!isPre}
      onClick={scrollToTop}
      $openMenu={openMenu}
      $isLogin={isLogin}
    >
      <BtnImg src="./assets/icons/benefits/3.svg" alt="top button" />
    </BtnContainer>
  );
};

export default TopBtn;
