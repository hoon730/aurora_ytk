// components/Header.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HeaderContainer = styled.header<{ isHidden: boolean }>`
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${({ isHidden }) => (isHidden ? "transparent" : "#040714")};
  z-index: 100;
  transition: all 0.2s ease;
`;

const Navigation = styled.nav`
  height: 70px;
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AuroraIcon = styled.img`
  width: 80px;
  padding: 0 14px;
  margin: 5px;
`;

const SignUpButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  height: 32px;
  border: 1px solid #f9f9f9;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 14px;
  height: 34px;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f9f9f9;
    color: #040714;
  }
`;

const PLHeader = () => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsHidden(window.scrollY < 330);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeaderContainer isHidden={isHidden}>
      <Navigation>
        <a href="/">
          {!isHidden && (
            <AuroraIcon src="./assets/images/aurora.png" alt="Aurora Logo" />
          )}
        </a>
        <SignUpButton href="/login">로그인</SignUpButton>
      </Navigation>
    </HeaderContainer>
  );
};

export default PLHeader;
