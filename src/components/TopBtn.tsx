import React from "react";
import styled from "styled-components";

const BtnContainer = styled.div<{ $isNavVisible: boolean }>`
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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <BtnContainer $isNavVisible={!isPre} onClick={scrollToTop}>
      <BtnImg src="./assets/icons/benefits/3.svg" alt="top button" />
    </BtnContainer>
  );
};

export default TopBtn;
