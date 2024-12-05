// components/Main.tsx
import React from "react";
import styled from "styled-components";
import PopularContent from "./PopularContent";
import Slide from "./Slide";
import TargetValueBanner from "./TargetValuBanner";
import Benefits from "./Benefits";
import Devices from "./Device";
import Inquiries from "./Inquries";
import OriginalMovies from "./OriginalMovies";
import Variety from "./Variety";
import FadeIn from "./FadeIn";
import PlanTable from "./PlanTable";

const MainContainer = styled.main`
  padding-bottom: 8vw;
  background-color: #050714;
    color: silver;
    font-size: 16px;
    line-height: 26px;
  h1, h2, h3, h4, h5 {
    color: #f9f9f9;
  }
`;

const PLInner = () => (
  <MainContainer>
    <Slide />
    <PopularContent />
    <FadeIn>
      <Devices />
    </FadeIn>
    <PlanTable />
    <FadeIn>
      <TargetValueBanner />
    </FadeIn>
    <FadeIn>
      <Variety />
    </FadeIn>
    <FadeIn>
      <OriginalMovies />
    </FadeIn>
    <FadeIn>
      <Benefits />
    </FadeIn>
    <Inquiries />
  </MainContainer>
);

export default PLInner;
