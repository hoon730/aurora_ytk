import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const FadeInContainer = styled.div<{ isVisible: boolean }>`
  opacity: 0;
  transform: translateY(70px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  ${({ isVisible }) =>
    isVisible &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`;

interface FadeInSectionProps {
  children: React.ReactNode;
}

const FadeIn: React.FC<FadeInSectionProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <FadeInContainer ref={ref} isVisible={isVisible}>
      {children}
    </FadeInContainer>
  );
};

export default FadeIn;
