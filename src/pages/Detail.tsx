import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import {
  getMovieDetailInfo,
  getMovieImages,
  getMovieReleaseDates,
  getVideos,
} from "../api";
import YouTube from "react-youtube";
import { makeImagePath, mapCertificationToAge } from "../utils";

const Container = styled.main`
  width: 100%;
  margin-top: 60px;
`;

const PosterImg = styled.img`
  width: 100%;
  height: 880px;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
`;

const MovieLogo = styled.span`
  display: inline-block;
  width: 200px;
  height: 100px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid #0f0;
`;

const MovieTitle = styled.span`
  font-size: 70px;
  font-weight: 600;
`;

interface Obj {
  id: Number;
  name: string;
}

const certificationMapping = {
  G: "전체 관람가",
  "PG-13": "12세 이상 관람가",
  R: "15세 이상 관람가",
  "NC-17": "18세 이상 관람가",
};

const Detail = () => {
  const navigate = useNavigate();
  const movieMatch: PathMatch<string> | null = useMatch("/detail/:movieId");

  // movieMatch가 없을 때 기본 동작 처리
  const movieId = movieMatch ? Number(movieMatch.params.movieId) : null;

  // 영화 상세 정보 쿼리
  const { data: movieData, isLoading: movieLoading } = useQuery({
    queryKey: ["movieDetailData", movieId],
    queryFn: () => getMovieDetailInfo(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });
  const { englishData, koreanData } = movieData || {};

  // 비디오 정보 쿼리
  const { data: videoData, isLoading: videoLoading } = useQuery({
    queryKey: ["getVideos", movieId],
    queryFn: () => getVideos(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  const videoIds = videoData?.results.map((video: any) => video.key);

  // 이미지 정보 쿼리
  const { data: movieImages, isLoading: movieImageLoading } = useQuery({
    queryKey: ["getMovieImages", movieId],
    queryFn: () => getMovieImages(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  const { data: movieReleaseDate, isLoading: loading } = useQuery({
    queryKey: ["movieReleaseDates", movieId],
    queryFn: () => getMovieReleaseDates(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  const releaseDate = movieReleaseDate?.results.find(
    (item: any) => item.iso_3166_1 === "US"
  );

  // movieMatch가 없는 경우 리다이렉트 처리
  if (!movieMatch) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <Container>
      <div>
        {videoIds?.length > 0 ? (
          <YouTube
            videoId={videoIds[0]}
            opts={{
              width: "100%",
              height: "888px",
              playerVars: {
                autoplay: 0,
                modestbranding: 1,
                loop: 0,
                playlist: videoIds[0],
                origin: window.location.origin,
              },
            }}
          />
        ) : englishData ? (
          <PosterImg
            src={makeImagePath(
              englishData.backdrop_path
                ? englishData.backdrop_path
                : englishData.poster_path
            )}
          />
        ) : (
          <div>No available...</div>
        )}

        {movieImages?.logos.length > 0 ? (
          <MovieLogo
            style={{
              backgroundImage: `url(${makeImagePath(
                movieImages?.logos?.[0].file_path ?? ""
              )})`,
            }}
          ></MovieLogo>
        ) : (
          <MovieTitle>
            {koreanData?.title ? koreanData?.title : englishData?.title}
          </MovieTitle>
        )}

        <p>
          {koreanData?.release_date
            ? koreanData?.release_date
            : englishData?.release_date}
        </p>
        <p>{koreanData?.title ? koreanData?.title : englishData?.title}</p>
        <p>
          {koreanData?.overview ? koreanData?.overview : englishData?.overview}
        </p>
        <p>{englishData?.vote_average}/10</p>
        <p>{koreanData?.genres.map((item: Obj) => item?.name).join(", ")}</p>
        <p>
          {releaseDate &&
            mapCertificationToAge(releaseDate?.release_dates[0].certification)}
        </p>
        <p>
          {releaseDate &&
            new Date(
              releaseDate?.release_dates[0].release_date
            ).toLocaleDateString()}
        </p>
      </div>
    </Container>
  );
};

export default Detail;
