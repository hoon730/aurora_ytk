import React, { useMemo } from "react";
import styled from "styled-components";
import { MovieDetailData, RleaseInfo } from "../api";

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

const Age = styled.span`
  width: 30px;
  height: 30px;
  background: #b5b5b5;
  border-radius: 5px;
  font-weight: bold;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface movieDataType {
  englishData: MovieDetailData;
  koreanData: MovieDetailData;
}

const DetatilInfo = ({
  movieData,
  title,
  releaseInfo,
  isReview,
}: {
  movieData: movieDataType | undefined;
  title: string;
  releaseInfo: RleaseInfo;
  isReview: boolean;
}) => {
  const genres = useMemo(() => {
    return (
      movieData?.koreanData?.genres?.map((genre) => genre.name).join(", ") ||
      "장르 정보 없음"
    );
  }, [movieData]);

  const overview = useMemo(() => {
    return (
      movieData?.koreanData?.overview ||
      movieData?.englishData?.overview ||
      "설명 없음"
    );
  }, [movieData]);

  return (
    <DetailInfoSection $isReview={isReview}>
      <DetailInfoLeft>
        <DetailInfoTitle>{title}</DetailInfoTitle>
        <p>{overview}</p>
      </DetailInfoLeft>

      <DetailInfoRight>
        <li>
          <label>공개일</label>
          <div>{releaseInfo.release_date}</div>
        </li>
        <li>
          <label>장르</label>
          <div>{genres}</div>
        </li>
        <li>
          <label>관람등급</label>
          <div>
            <Age>{releaseInfo.certification}</Age>
          </div>
        </li>
      </DetailInfoRight>
    </DetailInfoSection>
  );
};

export default DetatilInfo;
