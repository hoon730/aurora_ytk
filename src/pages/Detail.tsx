import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { getVideos, VideoResult } from "../api";
import YouTube from "react-youtube";
import { makeImagePath } from "../utils";
import Review from "../components/Review";
import DetatilInfo from "../components/DetatilInfo";
import Age from "../components/Age";
import { useMovieReleaseInfo } from "../hook/commonData";

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
  gap: 10px;
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

const Detail = React.memo(() => {
  const [isReview, setIsReview] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  const movieMatch: PathMatch<string> | null = useMatch("/detail/:movieId");
  const movieId = movieMatch ? Number(movieMatch.params.movieId) : undefined;
  const { searchInfo, runtime } = useMovieReleaseInfo(movieId);

  // Query 요청
  const { data: videoData } = useQuery<{ results: VideoResult[] }>({
    queryKey: ["getVideos", movieId],
    queryFn: () => getVideos(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  // 데이터 가공
  const videoIds = useMemo(() => {
    return videoData?.results?.map((video) => video.key) || [];
  }, [videoData]);

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
            searchInfo?.backdrop_path || searchInfo?.poster_path || ""
          )}
          alt="Movie Poster"
        />
      )}

      <DetailDesc>
        <TopSection>
          {searchInfo?.logo ? (
            <MovieLogo
              style={{
                backgroundImage: `url(${makeImagePath(
                  searchInfo?.logo || ""
                )})`,
              }}
            />
          ) : (
            <MovieTitle>{searchInfo.title}</MovieTitle>
          )}

          <LikeLine>
            <p>{searchInfo.release_date}</p>
            <Age certification={searchInfo.certification} />
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
          {movieId && (
            <div>
              <DetatilInfo
                searchInfo={searchInfo}
                runtime={runtime}
                isReview={isReview}
              />
              <Review movieId={movieId} isReview={isReview} />
            </div>
          )}
        </BottomeSection>
      </DetailDesc>
    </Container>
  );
});

export default Detail;
