import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SlideButtons from "./SlideButtons";
import { useNavigate } from "react-router-dom";
import { fetchBackdropImages, getMovieLogos } from "../../api";

const BannerContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: fit-content;
`;

const SlideWrapper = styled.div<{ $currentSlide: number }>`
  display: flex;
  margin-left: 4%;
  height: 500px;
  min-height: 500px;
  transition: transform 0.5s ease;
  transform: ${(props) => `translateX(${props.$currentSlide * -93}%)`};
  @media (max-width: 768px) {
    height: 80vw;
    margin-left: 0;
    transform: ${(props) => `translateX(${props.$currentSlide * -98}%)`};
  }
`;

const Slide = styled.div<{ $image: string; $isActive: boolean }>`
  flex: 0 0 90%;
  margin-left: 3%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.$image});
  border: ${(props) => (props.$isActive ? "4px solid white" : "none")};
  position: relative;
  transition: border 0.3s ease;
  cursor: pointer;
  @media (max-width: 768px) {
    flex: 0 0 96%;
    margin-left: 2%;
    border-radius: 5px;
    border: ${(props) => (props.$isActive ? "2px solid #f5f5f5" : "none")};
  }

  .logo {
    position: absolute;
    bottom: 30px;
    left: 30px;
    width: 30%;
    height: auto;
    padding: 5px;
    @media (max-width: 768px) {
      left: 50%;
      width: 60%;
      transform: translateX(-50%)
    }
  }
`;

export const movieIds = [671, 919207, 277834, 1022789, 652837, 977871];

const MainBanner = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [logos, setLogos] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSlidesAndLogos = async () => {
      const fetchedSlides = await fetchBackdropImages(movieIds);
      const fetchedLogos = await getMovieLogos(movieIds);
      setSlides(fetchedSlides);
      setLogos(fetchedLogos);
    };

    loadSlidesAndLogos();
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSlideClick = (index: number) => {
    const movieId = movieIds[index];
    navigate(`/detail/${movieId}`);
  };

  return (
    <BannerContainer>
      <SlideWrapper $currentSlide={currentSlide}>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            $image={slide}
            $isActive={index === currentSlide}
            onClick={() => handleSlideClick(index)}
          >
            {logos[index] && (
              <img
                className="logo"
                src={logos[index]}
                alt={`Logo for movie ${index + 1}`}
              />
            )}
          </Slide>
        ))}
      </SlideWrapper>
      {slides.length > 0 && (
        <SlideButtons
          totalSlides={slides.length}
          currentSlide={currentSlide}
          onSlideChange={handleSlideChange}
        />
      )}
    </BannerContainer>
  );
};

export default MainBanner;
