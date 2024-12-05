// components/Benefits.tsx
import React from "react";
import styled from "styled-components";
import { SectionContainer } from "../../Root";

const GridList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding-left: 0;
  list-style: none;

  @media (max-width: 1025px) {
    flex-direction: row;
    overflow-x: auto;
    gap: 12px;
  }
`;

const GridItem = styled.li`
  flex: 1 1 calc(33.33% - 16px);
  text-align: left;
  padding: 10px;
  min-width: 280px;

  @media (max-width: 1025px) {
    flex: 1 1 auto;
    min-width: 70vw;
  }
`;

const BenefitImage = styled.img`
  width: 60px;
  margin-bottom: 8px;
`;

const BenefitTitle = styled.h4`
  font-size: 22px;
  margin-bottom: 8px;
`;

const BenefitDescription = styled.p`
  font-size: 15px;
  line-height: 25px;
`;

const Benefits: React.FC = () => (
  <SectionContainer>
    <GridList>
      {[
        {
          title: "취향에 따라 골라보는 다양한 콘텐츠",
          description:
            "디즈니, 픽사, 마블, 스타워즈, 내셔널지오그래픽, Star의 콘텐츠를 다함께 즐겨보세요. 인기 영화, 몰아보기 시리즈, 디즈니+와 Star에서독점 공개하는 오리지널까지, 원하는 만큼 볼 수 있습니다. 완결시리즈는 물론 오리지널 신작과 최신 히트작도 언제든지 시청하세요.",
          image: "./assets/icons/benefits/1.png",
        },
        {
          title: "최대 4대 기기 동시 스트리밍",
          description:
            "하나의 스트리밍 서비스로 모두가 각자 취향에 맞는 콘텐츠를 즐길 수있습니다. 원하는 기기에서 원하는 방식으로 시청하세요. 최대 4대의 기기에서 동시 스트리밍하는 그 시간, 모두가 행복해집니다.",
          image: "./assets/icons/benefits/2.png",
        },
        {
          title: "콘텐츠 저장",
          description:
            "최대 10대의 기기에서 원하는 콘텐츠를 자유롭게 저장하세요. 100편이 넘는 작품을 고화질 4K UHD 및 HDR로 시청할 수 있습니다. 강력한 시청 제한 기능으로 온 가족이 안전하게 이용할 수 있으며, 서로 떨어져 있을 때에도 GroupWatch로 함께 스트리밍할 수 있습니다.",
          image: "./assets/icons/benefits/3.svg",
        },
      ].map((benefit, index) => (
        <GridItem key={index}>
          <BenefitImage src={benefit.image} alt={benefit.title} />
          <BenefitTitle>{benefit.title}</BenefitTitle>
          <BenefitDescription>{benefit.description}</BenefitDescription>
        </GridItem>
      ))}
    </GridList>
  </SectionContainer>
);

export default Benefits;
