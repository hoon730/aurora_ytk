import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import {
  getMovieDetailInfo,
  getMovieImages,
  getMovieReleaseDates,
  getReviews,
  getVideos,
} from "../api";
import YouTube from "react-youtube";
import { makeImagePath, mapCertificationToAge } from "../utils";

const Container = styled.main`
  width: 100%;
  margin-top: 60px;
  background: ${({ theme }) => theme.black.darker};
  color: ${({ theme }) => theme.white.darker};
`;

const PosterImg = styled.img`
  width: 100%;
  height: 880px;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
`;

const DetailDesc = styled.div`
  width: 100%;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MovieLogo = styled.div`
  display: inline-block;
  width: 200px;
  height: 100px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const MovieTitle = styled.h1`
  font-size: 70px;
  font-weight: 600;
`;

const LikeLine = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
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

const LikeButton = styled.span<{ $isLike: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  background: ${({ $isLike }) => $isLike && "#fff"};
  svg {
    fill: ${({ $isLike }) => ($isLike ? "#000" : "none")};
    stroke: ${({ $isLike }) => ($isLike ? "none" : "#fff")};
  }
`;

const BottomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TabSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 30px;
`;

const TabButton = styled.span<{ $active: boolean }>`
  ${({ $active }) => ($active ? "font-weight:bold; color:#fff;" : "")}
  cursor: pointer;
  transition: all 0.3s;
`;

const DetailInfoSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailInfoLeft = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  }
`;

const ReviewSection = styled.div`
  width: 100%;
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ReviewTitle = styled.span`
  display: inline-block;
  padding: 6px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: #fff;
  font-weight: bold;
  color: ${({ theme }) => theme.black.darker};
`;

interface Genre {
  id: number;
  name: string;
}

interface ReleaseDate {
  iso_3166_1: string;
  release_dates: {
    certification: string;
    release_date: string;
  }[];
}

interface VideoResult {
  key: string;
}

interface MovieDetailData {
  genres: Genre[];
  title: string;
  overview: string;
  release_date: string;
  backdrop_path?: string;
  poster_path?: string;
}

interface MovieImageData {
  logos: { file_path: string }[];
}

interface ReviewContents {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

const Detail: React.FC = React.memo(() => {
  const [isReview, setIsReview] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  const movieMatch: PathMatch<string> | null = useMatch("/detail/:movieId");
  const movieId = movieMatch ? Number(movieMatch.params.movieId) : null;

  // Query 요청
  const { data: movieData } = useQuery<{
    englishData: MovieDetailData;
    koreanData: MovieDetailData;
  }>({
    queryKey: ["movieDetailData", movieId],
    queryFn: () => getMovieDetailInfo(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  const { data: videoData } = useQuery<{ results: VideoResult[] }>({
    queryKey: ["getVideos", movieId],
    queryFn: () => getVideos(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  const { data: movieImages } = useQuery<MovieImageData>({
    queryKey: ["getMovieImages", movieId],
    queryFn: () => getMovieImages(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  const { data: movieReleaseDate } = useQuery<{ results: ReleaseDate[] }>({
    queryKey: ["movieReleaseDates", movieId],
    queryFn: () => getMovieReleaseDates(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  const { data: reviewData, isLoading: reviewLoading } = useQuery({
    queryKey: ["getReviews", movieId],
    queryFn: () => getReviews(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  // 데이터 가공
  const videoIds = useMemo(() => {
    return videoData?.results?.map((video) => video.key) || [];
  }, [videoData]);

  const releaseInfo = useMemo(() => {
    const releaseDate = movieReleaseDate?.results.find(
      (item) => item.iso_3166_1 === "US"
    )?.release_dates?.[0];
    return {
      certification: releaseDate?.certification
        ? mapCertificationToAge(releaseDate.certification)
        : "All",
      releaseDate: releaseDate?.release_date
        ? new Date(releaseDate.release_date).toLocaleDateString()
        : "출시일 정보 없음",
    };
  }, [movieReleaseDate]);

  const genres = useMemo(() => {
    return (
      movieData?.koreanData?.genres?.map((genre) => genre.name).join(", ") ||
      "장르 정보 없음"
    );
  }, [movieData]);

  const title = useMemo(() => {
    return (
      movieData?.koreanData?.title ||
      movieData?.englishData?.title ||
      "제목 없음"
    );
  }, [movieData]);

  const overview = useMemo(() => {
    return (
      movieData?.koreanData?.overview ||
      movieData?.englishData?.overview ||
      "설명 없음"
    );
  }, [movieData]);

  // movieMatch가 없는 경우 리다이렉트 처리
  if (!movieMatch) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <Container>
      {videoIds.length > 0 ? (
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
      ) : (
        <PosterImg
          src={makeImagePath(
            movieData?.englishData?.backdrop_path ||
              movieData?.englishData?.poster_path ||
              ""
          )}
          alt="Movie Poster"
        />
      )}

      <DetailDesc>
        <TopSection>
          {movieImages && movieImages?.logos?.length > 0 ? (
            <MovieLogo
              style={{
                backgroundImage: `url(${makeImagePath(
                  movieImages?.logos?.[0]?.file_path || ""
                )})`,
              }}
            />
          ) : (
            <MovieTitle>{title}</MovieTitle>
          )}

          <LikeLine>
            <p>{releaseInfo.releaseDate}</p>
            <Age>{releaseInfo.certification}</Age>
            <LikeButton
              $isLike={isLike}
              onClick={() => setIsLike((prev) => !prev)}
            >
              <svg width="18" height="19" viewBox="0 0 18 19">
                <path d="M8.48137 2.54999C8.377 2.54999 8.27468 2.57904 8.18587 2.63387C8.09706 2.68871 8.02526 2.76717 7.9785 2.86049L6.1875 6.44249V16.05H13.2626C13.9331 16.05 14.5816 15.8105 15.0911 15.3747C15.6006 14.9388 15.9376 14.3353 16.0414 13.6729L16.7692 9.03336C16.8069 8.79261 16.792 8.54656 16.7256 8.31211C16.6591 8.07767 16.5427 7.8604 16.3842 7.67525C16.2258 7.4901 16.0292 7.34145 15.8078 7.23954C15.5865 7.13762 15.3457 7.08485 15.102 7.08486H11.3861L11.5571 5.71236C11.6067 5.31663 11.5716 4.91488 11.4541 4.53376C11.3366 4.15264 11.1394 3.80087 10.8755 3.5018C10.6116 3.20273 10.2872 2.9632 9.9237 2.7991C9.5602 2.63499 9.16595 2.55008 8.76712 2.54999H8.48137ZM5.0625 16.05V7.08486H2.8125C2.66332 7.08486 2.52024 7.14413 2.41475 7.24962C2.30926 7.3551 2.25 7.49818 2.25 7.64736V15.4875C2.25 15.6367 2.30926 15.7797 2.41475 15.8852C2.52024 15.9907 2.66332 16.05 2.8125 16.05H5.0625Z" />
              </svg>
            </LikeButton>
          </LikeLine>
        </TopSection>

        <BottomeSection>
          <TabSection>
            <TabButton
              $active={!isReview ? true : false}
              onClick={() => setIsReview(false)}
            >
              상세정보
            </TabButton>
            <TabButton
              $active={isReview ? true : false}
              onClick={() => setIsReview(true)}
            >
              리뷰
            </TabButton>
          </TabSection>
          <hr />

          {!isReview ? (
            <DetailInfoSection>
              <DetailInfoLeft>
                <DetailInfoTitle>{title}</DetailInfoTitle>
                <p>{overview}</p>
              </DetailInfoLeft>

              <DetailInfoRight>
                <li>
                  <label>공개일</label>
                  <div>{releaseInfo.releaseDate}</div>
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
          ) : (
            <ReviewSection>
              {reviewLoading ? (
                <div>Loading Reviews...</div>
              ) : (
                <ReviewList>
                  {reviewData?.results ? (
                    reviewData.results.map((review: ReviewContents) => (
                      <li key={review.id}>
                        <ReviewTitle>{review.author}</ReviewTitle>
                        <div>{review.content}</div>
                      </li>
                    ))
                  ) : (
                    <li>등록된 리뷰가 없습니다</li>
                  )}
                </ReviewList>
              )}
            </ReviewSection>
          )}
        </BottomeSection>
      </DetailDesc>
    </Container>
  );
});

export default Detail;
