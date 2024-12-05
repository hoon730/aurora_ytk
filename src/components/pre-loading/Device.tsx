import React from "react";
import styled from "styled-components";
import { SectionContainer } from "../../Root";
import PLTitle from "./PLTitle";

const GridList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding-left: 0;
  list-style: none;

  @media (min-width: 768px) {
    .four-column {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
  }

  @media (max-width: 768px) {
    .mobile-two-column {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }
`;

const GridItem = styled.li`
  text-align: center;
  .text-medium {
    font-size: 15px;
    line-height: 25px;
    font-weight: 500;
  }
`;

const DeviceImage = styled.img`
  width: 100%;
`;

const DeviceTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Devices = () => (
  <SectionContainer>
    <PLTitle>즐겨 사용하는 기기에서 시청 가능</PLTitle>
    <p className="text-medium">TV, 컴퓨터, 스마트폰 & 태블릿, 게임 콘솔</p>
    <GridList>
      <ul className="grid-list four-column mobile-two-column">
        {[
          {
            title: "TV",
            image: "./assets/icons/device/1.png",
            description: `Amazon Fire TV (로그인 전용)<br />Android TV<br />Apple TV<br />Chromecast<br />LG TV<br />삼성 TV<br />Hisense<br />Panasonic`,
          },
          {
            title: "컴퓨터",
            image: "./assets/icons/device/2.png",
            description: `Chrome OS<br />MacOS<br />Windows PC`,
          },
          {
            title: "스마트폰 & 태블릿",
            image: "./assets/icons/device/3.png",
            description: `Amazon Fire 태블릿 (로그인 전용)<br />Android 스마트폰 & 태블릿<br />iPhone & iPad`,
          },
          {
            title: "게임 콘솔",
            image: "./assets/icons/device/4.png",
            description: `PS4 & PS5<br />Xbox One<br />Xbox 시리즈 X<br />Xbox 시리즈 S`,
          },
        ].map((device, index) => (
          <GridItem key={index}>
            <DeviceImage src={device.image} alt={device.title} />
            <DeviceTitle>{device.title}</DeviceTitle>
            <p
              className="text-medium"
              dangerouslySetInnerHTML={{ __html: device.description }}
            />
          </GridItem>
        ))}
      </ul>
    </GridList>
  </SectionContainer>
);

export default Devices;
