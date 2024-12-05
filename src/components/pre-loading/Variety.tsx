import React from "react";
import styled from "styled-components";
import { SectionContainer } from "../../Root";
import PLTitle from "./PLTitle";

const VarietyContent = styled.div`
  display: flex;
  align-items: center;
  gap: 3vw;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const VarietyImage = styled.img`
  max-width: 50%;
  height: auto;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    max-width: 100%;
  }
`;

const VarietyTextBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Variety = () => (
  <SectionContainer>
    <VarietyContent>
      <VarietyImage src="./assets/images/variety.png" alt="Banner" />
      <VarietyTextBox>
        <PLTitle>취향에 따라 골라보는 다양한 콘텐츠가 모두 한자리에</PLTitle>
        <p>
          오로라+는 디즈니, 픽사, 마블, 스타워즈, 내셔널지오그래픽, Star의 최고
          콘텐츠들을 모두 한곳에 모아 제공합니다.
        </p>
      </VarietyTextBox>
    </VarietyContent>
  </SectionContainer>
);

export default Variety;
