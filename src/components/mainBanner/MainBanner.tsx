import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SlideButtons from "./SlideButtons";
import { useNavigate } from "react-router-dom";
import { fetchBackdropImages, getMovieLogos } from "../../api";

const BannerContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: fit-content;
  padding: 0 50px;
  @media (max-width: 768px) {
    padding: 0 42px;
  }
`;

const SlideWrapper = styled.div<{ $currentSlide: number }>`
  display: flex;
  /* margin-left: 4%; */
  gap: 25px;
  height: 500px;
  min-height: 500px;
  transition: transform 0.5s ease;
  transform: ${(props) =>
    `translateX(calc(${props.$currentSlide * -100}% - ${
      props.$currentSlide * 25
    }px))`};
  @media (max-width: 768px) {
    height: 80vw;
    margin-left: 0;
    transform: ${(props) =>
      `translateX(calc(${props.$currentSlide * -100}% - ${
        props.$currentSlide * 25
      }px))`};
  }
`;

const Slide = styled.div<{ $image: string; $isActive: boolean }>`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 10%;
  background-image: url(${(props) => props.$image});
  border: ${(props) => (props.$isActive ? "4px solid white" : "none")};
  position: relative;
  transition: border 0.3s ease;
  cursor: pointer;
  @media (max-width: 768px) {
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
      transform: translateX(-50%);
    }
  }
`;

export const movieIds = [671, 919207, 277834, 1022789, 652837, 977871];

const MainBanner = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [logos, setLogos] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  const slideCount = slides.length;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const SlideWrapperGap = 25;

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 3000);
  };

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const loadSlidesAndLogos = async () => {
      const fetchedSlides = await fetchBackdropImages(movieIds);
      const fetchedLogos = await getMovieLogos(movieIds);
      setSlides(fetchedSlides);
      setLogos(fetchedLogos);
    };

    loadSlidesAndLogos();
  }, []);

  useEffect(() => {
    if (!isHovered) {
      startInterval();
    }
    return () => stopInterval();
  }, [isHovered, slideCount]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    stopInterval();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    stopInterval();
    startX.current = e.clientX;
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX.current !== null) {
      const deltaX = e.clientX - startX.current;
      if (Math.abs(deltaX) > 10) {
        isDragging.current = true;
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (startX.current !== null) {
      const deltaX = e.clientX - startX.current;

      if (Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
          setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slideCount - 1));
        } else {
          setCurrentSlide((prev) => (prev + 1) % slideCount);
        }
      }
      startX.current = null;
      startInterval();
    }
  };

  const handleClick = (index: number) => {
    if (!isDragging.current) {
      const movieId = movieIds[index];
      navigate(`/detail/${movieId}`);
    }
  };

  return (
    <BannerContainer>
      <SlideWrapper
        $currentSlide={currentSlide}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDragStart={(e) => e.preventDefault()} // Prevent native drag
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            $image={slide}
            $isActive={index === currentSlide}
            onClick={() => handleClick(index)}
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
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SlideButtons
            totalSlides={slides.length}
            currentSlide={currentSlide}
            onSlideChange={(index) => setCurrentSlide(index)}
          />
        </div>
      )}
    </BannerContainer>
  );
};

export default MainBanner;
