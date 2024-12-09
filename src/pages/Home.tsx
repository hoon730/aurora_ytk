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
import Loading from "../components/Loading";
import Slider from "../components/home/Slider";
import MainBanner from "../components/mainBanner/MainBanner";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 60px;
  padding-bottom: 150px;
  background: ${(props) => props.theme.black.darker};
  overflow: hidden;
`;

const Home = () => {
  
  const queries = [
    {
      query: useQuery<GetMoviesResult>({
        queryKey: ["nowPlaying"],
        queryFn: getMovies,
      }),
      category: "np",
      categoryTitle: "오로라 최신작",
    },
    {
      query: useQuery<GetMoviesResult>({
        queryKey: ["todaysMovies"],
        queryFn: getTodaysMovies,
      }),
      category: "tm",
      categoryTitle: "오늘의 추천작",
    },
    {
      query: useQuery<GetMoviesResult>({
        queryKey: ["popular"],
        queryFn: getPopular,
      }),
      category: "pd",
      categoryTitle: "인기작",
    },
    {
      query: useQuery<GetMoviesResult>({
        queryKey: ["topRated"],
        queryFn: getTopRated,
      }),
      category: "tr",
      categoryTitle: "시청자들의 Pick",
    },
    {
      query: useQuery<GetMoviesResult>({
        queryKey: ["thriller"],
        queryFn: getThrillerMovies,
      }),
      category: "td",
      categoryTitle: "스릴러",
    },
    {
      query: useQuery<GetMoviesResult>({
        queryKey: ["comedy"],
        queryFn: getComedyMovies,
      }),
      category: "cd",
      categoryTitle: "코미디",
    },
    {
      query: useQuery<GetMoviesResult>({
        queryKey: ["fantasy"],
        queryFn: getFantasyMovies,
      }),
      category: "fd",
      categoryTitle: "판타지",
    },
  ];

  const { data: genres, isLoading: genresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const isAnyLoading =
    queries.some((item) => item.query.isLoading) || genresLoading;

  if (isAnyLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <MainBanner />
      {queries.map(({ query, category, categoryTitle }) =>
        query.data ? (
          <Slider
            key={category}
            category={category}
            data={query.data}
            categoryTitle={categoryTitle}
            genres={genres || []}
          />
        ) : null
      )}
    </Container>
  );
};

export default Home;
