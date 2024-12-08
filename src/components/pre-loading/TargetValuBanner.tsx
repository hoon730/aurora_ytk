import React from "react";
import styled from "styled-components";
import { SectionContainer } from "../../Root";

const GridList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  gap: 24px;
  padding-left: 0;
`;

const GridItem = styled.li`
  flex: 1 1 calc(25% - 18px);
  text-align: left;
  padding: 10px;
  position: relative;
  text-align: center;
  &:not(:first-child)::before {
    content: "";
    position: absolute;
    background-color: #f9f9f9;
  }

  &:not(:first-child)::before {
    width: 1px;
    height: 80px;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    &:not(:first-child)::before {
      width: 150px;
      height: 1px;
      left: 50%;
      top: -12px;
      transform: translateX(-50%);
    }
  }
`;

const Title = styled.p`
  font-size: 28px;
  color: #f9f9f9;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.3;
  @media (max-width: 1025px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  line-height: 25px;
`;

const TargetValueBanner: React.FC = () => (
  <SectionContainer>
    <GridList>
      {[
        {
          title: "1,200편 이상의 영화",
          subtitle: "어워드 수상에 빛나는 블록버스터 및 독점 영화 포함",
        },
        {
          title: "20,000편 이상의 에피소드",
          subtitle: "코미디, 드라마, 범죄 등 모든 연령층을 위한 카테고리",
        },
        {
          title: "신규 및 단독 공개 콘텐츠",
          subtitle: "매주 새로운 영화 및 시리즈 공개",
        },
        {
          title: "다양한 콘텐츠 저장 가능",
          subtitle: "최대 10대의 기기에서 원하는 콘텐츠를 자유롭게 저장",
        },
      ].map((item, index) => (
        <GridItem key={index}>
          <Title>{item.title}</Title>
          <Subtitle>{item.subtitle}</Subtitle>
        </GridItem>
      ))}
    </GridList>
  </SectionContainer>
);

export default TargetValueBanner;
