import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const SlideButton = styled.button<{ $isActive: boolean }>`
  width: 15px;
  height: 15px;
  margin: 0 5px;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => (props.$isActive ? "#333" : "#ccc")};
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#111" : "#888")};
  }
`;

interface SlideButtonsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const SlideButtons: React.FC<SlideButtonsProps> = ({
  totalSlides,
  currentSlide,
  onSlideChange,
}) => {
  return (
    <ButtonContainer>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <SlideButton
          key={index}
          $isActive={index === currentSlide}
          onMouseEnter={() => onSlideChange(index)}
        />
      ))}
    </ButtonContainer>
  );
};
export default SlideButtons;
