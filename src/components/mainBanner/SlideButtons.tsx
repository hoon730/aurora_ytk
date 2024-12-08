import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMovieLogos } from "../../api";
import { movieIds } from "./MainBanner";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  @media (max-width: 768px) {
    display: grid;
    width: 96%;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

const SlideButton = styled.button<{ $isActive: boolean }>`
  width: 15%;
  height: 150px;
  margin: 0 5px;
  border: 3px solid ${(props) => (props.$isActive ? "#ccc" : "#041a27")};
  border-radius: 5px;
  background-color: ${(props) => (props.$isActive ? "#111" : "#052131")};
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: #122;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ButtonImage = styled.img`
  width: 70%;
  height: auto;
  border-radius: 5px;
`;

interface SlideButtonsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const SlideButtons: React.FC<SlideButtonsProps> = ({
  totalSlides,
  currentSlide,
  onSlideChange,
  onHoverStart,
  onHoverEnd,
}) => {
  const [logos, setLogos] = useState<string[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      const fetchedLogos = await getMovieLogos(movieIds);
      setLogos(fetchedLogos);
    };

    fetchLogos();
  }, []);

  return (
    <ButtonContainer>
      {logos.map((logo, index) => (
        <SlideButton
          key={index}
          $isActive={index === currentSlide}
          onMouseEnter={() => {
            if (onHoverStart) onHoverStart(); 
            onSlideChange(index); 
          }}
          onMouseLeave={() => {
            if (onHoverEnd) onHoverEnd(); 
          }}
        >
          <ButtonImage src={logo} alt={`Movie ${index + 1} Logo (Korean)`} />
        </SlideButton>
      ))}
    </ButtonContainer>
  );
};

export default SlideButtons;
