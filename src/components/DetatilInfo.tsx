import React, { useMemo } from "react";
import styled from "styled-components";
import Age from "./Age";

const DetailInfoSection = styled.div<{ $isReview: boolean }>`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  transition: all 0.5s;
  ${({ $isReview }) =>
    $isReview ? "height:0; opacity:0;" : "height:fit-content; opacity:1"};
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const DetailInfoLeft = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const DetailInfoTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const DetailInfoRight = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  li {
    display: flex;
    align-items: center;
    label {
      width: 80px;
    }
    & > div {
      flex: 1;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

interface SearchInfo {
  certification: string | undefined;
  logo: string | undefined;
  title: string | undefined;
  release_date: string | undefined;
  genre:
    | (
        | {
            id: number;
            name: string;
          }
        | undefined
      )[]
    | undefined;
  overview: string | undefined;
  backdrop_path: string | undefined;
  poster_path: string | undefined;
}

const DetatilInfo = ({
  searchInfo,
  runtime,
  isReview,
}: {
  searchInfo: SearchInfo;
  runtime: string | undefined;
  isReview: boolean;
}) => {
  const genres = useMemo(() => {
    return (
      searchInfo.genre?.map((item) => item?.name).join(", ") || "장르 정보 없음"
    );
  }, [searchInfo]);

  const overview = useMemo(() => {
    return searchInfo.overview || "설명 없음";
  }, [searchInfo]);

  return (
    <DetailInfoSection $isReview={isReview}>
      <DetailInfoLeft>
        <DetailInfoTitle>{searchInfo.title}</DetailInfoTitle>
        <p>{overview}</p>
      </DetailInfoLeft>

      <DetailInfoRight>
        <li>
          <label>공개일</label>
          <div>{searchInfo.release_date}</div>
        </li>
        <li>
          <label>장르</label>
          <div>{genres}</div>
        </li>
        <li>
          <label>관람등급</label>
          <div>
            <Age certification={searchInfo.certification} />
          </div>
        </li>
        <li>
          <label>상영시간</label>
          <div>{runtime}</div>
        </li>
      </DetailInfoRight>
    </DetailInfoSection>
  );
};

export default DetatilInfo;
