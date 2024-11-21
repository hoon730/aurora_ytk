import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  getDramaMovies,
  getFantasyMovies,
  getMovies,
  GetMoviesResult,
  getPopular,
  getThrillerMovies,
  getTodaysMovies,
  getTopRated,
} from "../api";
import Slider from "../components/Slider";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 60px;
  background: ${(props) => props.theme.black.darker};
`;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: ${(props) => props.theme.red};
`;

const Home = () => {
  const { data: nowPlayingData, isLoading: nowPlayingLoaing } =
    useQuery<GetMoviesResult>({
      queryKey: ["nowPlaying"],
      queryFn: getMovies,
    });

  const { data: todaysMoviesData, isLoading: todaysMoviesLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["todaysMovies"],
      queryFn: getTodaysMovies,
    });

  const { data: popularData, isLoading: popularLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["popular"],
      queryFn: getPopular,
    });

  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["topRated"],
      queryFn: getTopRated,
    });

  const { data: thrillerData, isLoading: thrillerLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["thriller"],
      queryFn: getThrillerMovies,
    });

  const { data: dramaData, isLoading: dramaLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["drama"],
      queryFn: getDramaMovies,
    });

  const { data: fantasyData, isLoading: fantasyLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["fantasy"],
      queryFn: getFantasyMovies,
    });

  return (
    <Container>
      {nowPlayingLoaing ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {nowPlayingData && (
            <Slider data={nowPlayingData} categoryTitle="오로라 최신작" />
          )}
          {todaysMoviesLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            todaysMoviesData && (
              <Slider data={todaysMoviesData} categoryTitle="오늘의 추천작" />
            )
          )}
          {topRatedLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            topRatedData && (
              <Slider data={topRatedData} categoryTitle="시청자들의 Pick" />
            )
          )}
          {popularLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            popularData && <Slider data={popularData} categoryTitle="인기작" />
          )}
          {thrillerLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            thrillerData && (
              <Slider data={thrillerData} categoryTitle="스릴러" />
            )
          )}
          {dramaLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            dramaData && <Slider data={dramaData} categoryTitle="드라마" />
          )}
          {fantasyLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            fantasyData && <Slider data={fantasyData} categoryTitle="판타지" />
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
