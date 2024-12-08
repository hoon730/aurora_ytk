import React from "react";
import Accordion from "./Accordion";
import styled from "styled-components";
import { SectionContainer } from "../../Root";
import PLTitle from "./PLTitle";

const InquiriesContainer = styled.section`
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 0;
`;

const Inquiries = () => {
  return (
    <SectionContainer>
      <InquiriesContainer>
        <PLTitle>자주 묻는 질문</PLTitle>
        <Accordion
          title="오로라+는 무엇인가요?"
          content={
            <p>
              오로라+는 디즈니, 픽사, 마블, 스타워즈의 콘텐츠를 모두 즐길 수
              있는 곳입니다. 최신 공개작부터 시대를 초월한 명작과 독점
              오리지널에 이르기까지 다양하고 풍성한 콘텐츠를 광고 없이
              스트리밍할 수 있습니다.
            </p>
          }
        />
        <Accordion
          title="오로라+에서 어떤 콘텐츠를 시청할 수 있나요?"
          content={
            <div>
              <p>오로라+는 새로운 콘텐츠를 계속해서 추가하고 있습니다.</p>
              <br />
              <ul>
                <li>- 최신 공개작과 시대를 초월한 명작</li>
                <li>- 독점 공개하는 새로운 오리지널 영화와 시리즈</li>
                <li>
                  - 흥미진진한 스페셜과 기간 한정 스트리밍되는 특별 콘텐츠
                </li>
                <li>
                  - 그때 그 시절 추억의 작품과 인기 시리즈의 지난 시즌 에피소드
                </li>
                <li>
                  - 스카이워커 사가 전체와 대부분의 마블 시네마틱 유니버스 작품
                </li>
                <li>- 인기 단편과 실험적인 단편</li>
                <li>- 다큐멘터리, 리얼리티 시리즈 등</li>
              </ul>
            </div>
          }
        />
        <Accordion
          title="오로라+를 어디에서 시청할 수 있나요?"
          content={
            <p>
              오로라+ 앱은 모바일 기기, 웹 브라우저, 게임 콘솔, 셋톱박스, 스마트
              TV에서 이용할 수 있습니다.
            </p>
          }
        />
        <Accordion
          title="오로라+를 얼마에 이용할 수 있나요?"
          content={
            <p>
              오로라+ 스탠다드(부가세 포함): 월 ₩9,900 / 연 ₩99,000
              <br />
              오로라+ 프리미엄(부가세 포함): 월 ₩13,900 / 연 ₩139,000
            </p>
          }
        />
      </InquiriesContainer>
    </SectionContainer>
  );
};

export default Inquiries;
