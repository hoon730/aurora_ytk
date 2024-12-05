import React from "react";
import { SectionContainer } from "../../Root";
import styled from "styled-components";
import PLTitle from "./PLTitle";

const GridList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding-left: 0;
  list-style: none;
`;

const GridItem = styled.li`
  flex: 1 1 calc(33.33% - 16px);
  max-width: calc(33.33% - 16px);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: calc(50% - 12px);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const OriginalMovies: React.FC = () => (
  <SectionContainer>
    <PLTitle>오로라+ 오리지널과 블록버스터 영화</PLTitle>
    <p>
      다른 어디에서도 볼 수 없는 디즈니+ 오리지널을 만나보세요. 디즈니, 픽사,
      마블, 스타워즈의 최고 인기 영화도 마음껏 즐길 수 있습니다.
    </p>
    <br />
    <GridList>
      {Array.from({ length: 9 }).map((_, index) => (
        <GridItem key={index}>
          <MovieImage
            src={`./assets/images/original/${index + 1}.png`}
            alt={`Original movie ${index + 1}`}
          />
        </GridItem>
      ))}
    </GridList>
  </SectionContainer>
);

export default OriginalMovies;
