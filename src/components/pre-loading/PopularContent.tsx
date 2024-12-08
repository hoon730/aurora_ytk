import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { SectionContainer } from "../../Root";
import PLTitle from "./PLTitle";

const createScrollAnimation = (width: number) => keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-${width}px);
  }
`;

const ScrollingContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

const GridList = styled.ul<{ scrollWidth: number }>`
  display: flex;
  flex-wrap: nowrap;
  list-style: none;
  gap: 20px;
  padding-left: 0;
  margin: 0;
  ${({ scrollWidth }) =>
    css`
      animation: ${createScrollAnimation(scrollWidth)} 30s linear infinite;
    `}
`;

const GridItem = styled.li`
  flex: 0 0 auto;
  width: 300px;
  @media (max-width: 1024px) {
    width: 250px; 
  }

  @media (max-width: 768px) {
    width: 200px; 
  }
`;

const ContentImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const PopularContent: React.FC = () => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const updateScrollWidth = () => {
    if (listRef.current) {
      const listWidth = listRef.current.scrollWidth / 2;
      setScrollWidth(listWidth);
    }
  }

  useEffect(() => {
    updateScrollWidth();
    const handleResize = () => {
      updateScrollWidth();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = Array.from({ length: 9 }).map((_, index) => (
    <GridItem key={index}>
      <ContentImage
        src={`./assets/images/popular/${index + 1}.png`}
        alt={`Popular content ${index + 1}`}
      />
    </GridItem>
  ));

  return (
    <SectionContainer>
      <PLTitle>인기 콘텐츠</PLTitle>
      <ScrollingContainer>
        <GridList ref={listRef} scrollWidth={scrollWidth}>
          {items}
          {items}
        </GridList>
      </ScrollingContainer>
    </SectionContainer>
  );
};

export default PopularContent;
