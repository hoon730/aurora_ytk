import React from "react";
import styled from "styled-components";

const BtnContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 5;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #F9F9F9;
  }
`;

const BtnImg = styled.img`
  width: 100%;
  height: 100%;
  transform: rotate(180deg);
  &:hover{
    filter: invert();
  }
`;

const TopBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <BtnContainer onClick={scrollToTop}>
      <BtnImg src="./assets/icons/benefits/3.svg" alt="top button" />
    </BtnContainer>
  );
};

export default TopBtn;