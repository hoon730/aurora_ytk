import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  getComedyMovies,
  getFantasyMovies,
  getMovies,
  GetMoviesResult,
  getPopular,
  getThrillerMovies,
  getTodaysMovies,
  getTopRated,
  getGenres,
} from "../api";
import Slider from "../components/Slider";
import MainBanner from "../components/mainBanner/MainBanner";


const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 60px;
  padding-bottom: 150px;
  background: ${(props) => props.theme.black.darker};
  overflow: hidden;
`;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: ${(props) => props.theme.white.lighter};
`;

const Home = () => {
  const slides: string[] = [
    "./assets/images/popular/1.png",
    "./assets/images/popular/2.png",
    "./assets/images/popular/3.png",
    "./assets/images/popular/4.png",
    "./assets/images/popular/5.png",
    "./assets/images/popular/6.png",
  ];

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

  const { data: comedyData, isLoading: comedyLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["comedy"],
      queryFn: getComedyMovies,
    });

  const { data: fantasyData, isLoading: fantasyLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["fantasy"],
      queryFn: getFantasyMovies,
    });

  const { data: genres, isLoading: genresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  return (
    <Container>
      <MainBanner/>
      {nowPlayingLoaing ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {nowPlayingData && (
            <Slider
              category={"np"}
              data={nowPlayingData}
              categoryTitle="오로라 최신작"
              genres={genres || []}
            />
          )}
        </>
      )}
      {todaysMoviesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {todaysMoviesData && (
            <Slider
              category={"tm"}
              data={todaysMoviesData}
              categoryTitle="오늘의 추천작"
              genres={genres || []}
            />
          )}
        </>
      )}

      {topRatedLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {topRatedData && (
            <Slider
              category={"tr"}
              data={topRatedData}
              categoryTitle="시청자들의 Pick"
              genres={genres || []}
            />
          )}
        </>
      )}

      {popularLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {popularData && (
            <Slider
              category={"pd"}
              data={popularData}
              categoryTitle="인기작"
              genres={genres || []}
            />
          )}
        </>
      )}

      {thrillerLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {thrillerData && (
            <Slider
              category={"td"}
              data={thrillerData}
              categoryTitle="스릴러"
              genres={genres || []}
            />
          )}
        </>
      )}

      {comedyLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {comedyData && (
            <Slider
              category={"cd"}
              data={comedyData}
              categoryTitle="코미디"
              genres={genres || []}
            />
          )}
        </>
      )}

      {fantasyLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {fantasyData && (
            <Slider
              category={"fd"}
              data={fantasyData}
              categoryTitle="판타지"
              genres={genres || []}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
