import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { GetMoviesResult, searchContents } from "../api";
import SearchItem from "../components/SearchItem";
import { formatDate } from "../utils";

const Container = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 60px 75px 0;
  background: radial-gradient(
    farthest-corner at 40px 200px,
    rgba(48, 49, 60, 1) 0%,
    rgba(30, 32, 41, 1) 100%
  );
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  gap: 50px;
  margin-bottom: 40px;
`;

const Keyword = styled.span`
  font-size: 40px;
  font-weight: 700;
  color: #fff;
`;

const OptionArea = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const Option = styled.div`
  height: fit-content;
  padding: 0 20px 3px;
  color: #d4d4d4;
  display: flex;
  gap: 5px;
  align-items: center;
  border-radius: 30px;
  span {
    font-size: 6px;
  }
`;

const MovieItemArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 30px;
`;

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: movieData, isLoading: movieLoading } =
    useQuery<GetMoviesResult>({
      queryKey: ["searchContents", keyword],
      queryFn: () => searchContents(keyword),
    });

  const searchResultData =
    movieData !== undefined
      ? movieData.results.filter(
          (item) =>
            (item.original_language === "en" ||
              item.original_language === "ko") &&
            item.release_date >= "2000-01-01" &&
            item.release_date <= formatDate(new Date()) &&
            (item.backdrop_path || item.poster_path) &&
            item.vote_count > 0
        )
      : [];

  return (
    <Container>
      <Inner>
        {searchResultData.length === 0 ? (
          <div>{keyword}의 검색결과가 없습니다.</div>
        ) : (
          <>
            <Header>
              <Keyword>{keyword}</Keyword>
              <OptionArea>
                <Option>
                  추천순<span>▼</span>
                </Option>
                <Option>
                  등급<span>▼</span>
                </Option>
                <Option>
                  장르<span>▼</span>
                </Option>
              </OptionArea>
            </Header>
            <MovieItemArea>
              {searchResultData.map((data) => (
                <SearchItem
                  key={data.id}
                  movieId={data.id}
                  title={data.title}
                  genres={data.genre_ids}
                  image={
                    data.backdrop_path ? data.backdrop_path : data.poster_path
                  }
                  releaseYear={data.release_date}
                />
              ))}
            </MovieItemArea>
          </>
        )}
      </Inner>
    </Container>
  );
};

export default Search;
