import React from "react";
import styled from "styled-components";

const StyledPLTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #f9f9f9;
  line-height: 1.2;
  margin-bottom: 16px;
  @media (max-width: 1026px) {
    font-size: 32px;
  }
`;

interface PLTitleProps {
  children: React.ReactNode;
}

const PLTitle: React.FC<PLTitleProps> = ({ children }) => {
  return <StyledPLTitle>{children}</StyledPLTitle>;
};

export default PLTitle;
