import React from "react";
import styled from "styled-components";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  border-bottom: 0.5px solid silver;
  /* padding: 32px; */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    /* padding: 20px 8px; */
  }
`;

const ColumnTitle = styled.p<{ isFirst?: boolean }>`
  font-weight: bold;
  flex: 2;
  min-width: 120px;
  padding: 32px;
  @media (min-width: 769px) {
    text-align: left;
  }
  @media (max-width: 768px) {
    padding: ${({ isFirst }) => (isFirst ? "0" : "20px 8px 0")};
  }
`;

const ColumnContent = styled.div`
  flex: 2;
  display: flex;
  gap: 8px;
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  padding: 32px;
  @media (min-width: 769px) {
    min-width: 181px;
    &:nth-of-type(1) {
      background-color: #c0c0c03b;
    }
  }
  @media (max-width: 768px) {
    padding: 20px 8px;
  }
`;

interface PlanColumnProps {
  title: string;
  content1: string;
  content2: string;
  isFirst?: boolean;
}

const PlanColumn: React.FC<PlanColumnProps> = ({
  title,
  content1,
  content2,
  isFirst,
}) => {
  return (
    <ColumnContainer>
      <ColumnTitle isFirst={isFirst}>{title}</ColumnTitle>
      <ColumnContent>
        <ContentBox>{content1}</ContentBox>
        <ContentBox>{content2}</ContentBox>
      </ColumnContent>
    </ColumnContainer>
  );
};
export default PlanColumn;
