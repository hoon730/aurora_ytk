import React, { useState } from "react";
import styled from "styled-components";
import SlideButtons from "./SlideButtons";

const BannerContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: fit-content;
  /* border: 1px solid #f00; */
`;

const SlideWrapper = styled.div<{ $currentSlide: number }>`
  display: flex;
  margin-left: 4%;
  height: 500px;
  transition: transform 0.5s ease;
  transform: ${(props) => `translateX(${props.$currentSlide * -93}%)`};
`;

const Slide = styled.div<{ $image: string }>`
  flex: 0 0 90%;
  margin-left: 3%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.$image});
`;

interface SlideBannerProps {
  slides: string[];
}

const MainBanner: React.FC<SlideBannerProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <BannerContainer>
      <SlideWrapper $currentSlide={currentSlide}>
        {slides.map((slide, index) => (
          <Slide key={index} $image={slide} />
        ))}
      </SlideWrapper>
      <SlideButtons
        totalSlides={slides.length}
        currentSlide={currentSlide}
        onSlideChange={handleSlideChange}
      />
    </BannerContainer>
  );
};

export default MainBanner;
