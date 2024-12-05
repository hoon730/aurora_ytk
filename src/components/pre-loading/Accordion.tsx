import React, { useState } from "react";
import styled from "styled-components";

const AccordionContainer = styled.div`
  background-color: #13151d;
  margin-top: 16px;
  width: 100%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2a2d38;
  }
`;

const AccordionButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 24px;
  background-color: transparent;
  color: #f9f9f9;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  &:after {
    content: ${({ isOpen }) => (isOpen ? "'–'" : "'+'")};
    font-size: 40px;
    line-height: 0.8;
    position: absolute;
    right: 24px;
    color: #f9f9f9;
  }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "fit-contnent" : "0")};
  overflow: hidden;
  text-align: left;
  transition: height 1s ease, padding 0.4s ease;
  padding: ${({ isOpen }) => (isOpen ? "0 24px 24px" : "0 24px")};
`;

interface AccordionProps {
  title: string;
  content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionContainer onClick={() => setIsOpen(!isOpen)}>
      <AccordionButton isOpen={isOpen}>{title}</AccordionButton>
      <AccordionContent isOpen={isOpen}>{content}</AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;
