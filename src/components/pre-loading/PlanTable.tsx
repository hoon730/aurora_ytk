import React from "react";
import styled from "styled-components";
import { SectionContainer } from "../../Root";
import PLTitle from "./PLTitle";
import PlanColumn from "./PlanColumn";

const Table = styled.div`
  position: relative;
  margin-top: 20px;
  height: fit-content;
  max-width: 992px;
  width: 100%;
`;

const StickyHeader = styled.div`
  position: sticky;
  font-weight: bold;
  background-color: #050714;
  color: #fff;
  width: 100%;
  top: 70px;
  left: 0;
  z-index: 10;
  border-bottom: 2px solid #02e8c5;
`;

const PlanTable = () => {
  return (
    <SectionContainer>
      <PLTitle>원하는 멤버십을 선택하세요.</PLTitle>
      <p>멤버십을 언제든지 변경 또는 취소 할 수 있습니다.</p>
      <Table>
        <StickyHeader>
          <PlanColumn
            title=""
            content1="디즈니+ 스탠다드"
            content2="디즈니+ 프리미엄"
            isFirst
          />
        </StickyHeader>
        <PlanColumn
          title="멤버십 구독료 (최대할인 16%)"
          content1="월 ₩9,900 / 연 ₩99,000"
          content2="월 ₩13,900 / 연 ₩139,000"
        />
        <PlanColumn
          title="영상 화질"
          content1="최대 1080p Full HD"
          content2="최대 4K UHD & HDR"
        />
        <PlanColumn
          title="오디오"
          content1="최대 5.1 사운드"
          content2="최대 Dolby Atmos"
        />
        <PlanColumn title="동시 스트리밍" content1="2" content2="4" />
        <PlanColumn
          title="광고"
          content1="광고 없는 스트리밍"
          content2="광고 없는 스트리밍"
        />
        <PlanColumn title="콘텐츠 저장" content1="O" content2="O" />
      </Table>
    </SectionContainer>
  );
};

export default PlanTable;
