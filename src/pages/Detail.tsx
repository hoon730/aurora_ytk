import { useQuery } from "@tanstack/react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetailInfo, GetMoviesResult, getVideos } from "../api";
import YouTube from "react-youtube";

const Container = styled.main`
  width: 100%;
  margin-top: 60px;
`;

const Detail = () => {
  const navigate = useNavigate();
  const movieMatch: PathMatch<string> | null = useMatch("/detail/:movieId");

  // movieMatch가 없을 때 기본 동작 처리
  const movieId = movieMatch ? Number(movieMatch.params.movieId) : null;

  // 영화 상세 정보 쿼리
  const { data: movieData, isLoading: movieLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["movieDetailData", movieId],
      queryFn: () => getMovieDetailInfo(movieId!),
      enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
    });

  // 비디오 정보 쿼리
  const { data: videoData, isLoading: videoLoading } = useQuery({
    queryKey: ["getVideos", movieId],
    queryFn: () => getVideos(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  const videoIds = videoData?.results.map((video: any) => video.key);

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
              height: "800px",
              playerVars: {
                autoplay: 0,
                modestbranding: 1,
                loop: 0,
                playlist: videoIds[0],
              },
            }}
          />
        ) : (
          "No Available"
        )}
      </div>
    </Container>
  );
};

export default Detail;
