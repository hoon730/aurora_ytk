import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import {
  Genres,
  getAllGeneres,
  getSearchDetail,
  getSearchReleaseDates,
  getImage,
} from "../api";
import { makeImagePath, runtimeCalc } from "../utils";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ImageArea = styled.div<{ logo: string }>`
  width: 100%;
  height: 185px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  ${({ logo }) =>
    logo !== undefined
      ? "&::before { content: ''; width: 100%; height: 100%; position: absolute; background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);}"
      : null}
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LogoArea = styled.div`
  width: calc(100% - 50px);
  height: 30px;
  position: absolute;
  left: 25px;
  bottom: 25px;
  overflow: hidden;
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom;
`;

const InfoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const DescriptionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const certificationBgColor = (text: string | undefined) => {
  switch (text) {
    case "ALL":
    case "All":
    case "G":
      return "#48C1A5";
    case "12":
    case "PG":
      return "#7EC627";
    case "15":
    case "15세 이상 관람가":
    case "PG-13":
      return "#E9B239";
    case "19":
    case "18":
    case "R":
    case "청소년 관람불가":
      return "#ED4030";
    default:
      return "#9A9A9A";
  }
};

const Certification = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  padding: 0 5px 2px;
  border-radius: 5px;
  background: ${({ color }) => certificationBgColor(color)};
`;

const TextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Text = styled.div`
  font-size: 16px;
  white-space: nowrap;
  color: #9a9a9a;
`;

interface SearchItemProps {
  movieId: number;
  title: string;
  genres: number[];
  image: string;
  releaseYear: string;
}

interface Detail {
  runtime: number;
}

interface ReleaseDate {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
    }[];
  }[];
}

interface ImageData {
  logos: {
    iso_639_1: string;
    file_path: string;
  }[];
}

const SearchItem = ({
  movieId,
  title,
  genres,
  image,
  releaseYear,
}: SearchItemProps) => {
  const { data: genereData, isLoading: genereLoading } = useQuery<Genres>({
    queryKey: ["getGeneres"],
    queryFn: getAllGeneres,
  });

  const { data: detailData, isLoading: detailLoading } = useQuery<Detail>({
    queryKey: ["getDetail", movieId],
    queryFn: () => getSearchDetail(movieId),
    enabled: !!movieId,
  });

  const { data: dateData, isLoading: dateLoading } = useQuery<ReleaseDate>({
    queryKey: ["getDate", movieId],
    queryFn: () => getSearchReleaseDates(movieId),
    enabled: !!movieId,
  });

  const { data: imageData, isLoading: imageLoading } = useQuery<ImageData>({
    queryKey: ["getImage", movieId],
    queryFn: () => getImage(movieId),
    enabled: !!movieId,
  });

  const releaseDate =
    dateData &&
    (dateData.results.find((item) => item.iso_3166_1 === "KR") ||
      dateData.results.find((item) => item.iso_3166_1 === "US"));

  const logoFilter =
    imageData &&
    (imageData.logos.find((item) => item.iso_639_1 === "ko") ||
      imageData.logos.find((item) => item.iso_639_1 === "en") ||
      imageData.logos.find((item) => item.iso_639_1 === null));

  const searchInfo =
    dateData &&
    imageData &&
    releaseDate !== undefined &&
    logoFilter !== undefined
      ? [
          releaseDate.release_dates[releaseDate.release_dates.length - 1]
            .certification,
          logoFilter.file_path,
        ]
      : [];

  const runtime = detailData && runtimeCalc(detailData.runtime);

  return (
    <Container>
      <ImageArea logo={searchInfo[1]}>
        <BackgroundImage
          src={makeImagePath(image, "w500")}
          alt={title + " image"}
        />
        <LogoArea>
          {imageLoading ? (
            "Loading..."
          ) : searchInfo[1] !== undefined ? (
            <LogoImage
              src={makeImagePath(searchInfo[1], "w300")}
              alt={title + " logo"}
            />
          ) : null}
        </LogoArea>
      </ImageArea>
      <InfoArea>
        <Title>{title}</Title>
        <DescriptionArea>
          <Certification color={searchInfo[0]}>
            {searchInfo[0] !== undefined &&
            searchInfo[0] !== "" &&
            searchInfo[0] !== null
              ? searchInfo[0].replaceAll("관람", "").slice(0, 6)
              : "정보없음"}
          </Certification>
          <TextArea>
            <Text>{releaseYear.slice(0, 4)}</Text>
            <Text>·</Text>
            <Text style={{ textOverflow: "ellipsis" }}>
              {genereLoading
                ? "데이터 불러오는 중"
                : genereData === undefined
                ? "데이터 오류"
                : genres.length === 0
                ? "정보 없음"
                : genres.length === 1
                ? `${
                    genereData.genres.find((genre) => genre.id === genres[0])
                      ?.name
                  }`
                : `${
                    genereData.genres.find((genre) => genre.id === genres[0])
                      ?.name
                  }, ${
                    genereData.genres.find((genre) => genre.id === genres[1])
                      ?.name
                  }`}
            </Text>
            {runtime === undefined || runtime === "" ? null : (
              <>
                <Text>·</Text>
                <Text>{runtime}</Text>
              </>
            )}
          </TextArea>
        </DescriptionArea>
      </InfoArea>
    </Container>
  );
};

export default SearchItem;
