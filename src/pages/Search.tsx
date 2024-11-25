import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { GetMoviesResult, searchContents, getAllGeneres, Genres } from "../api";
import SearchItem from "../components/SearchItem";
import { formatDate } from "../utils";

const Container = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 60px 75px 0;
  background: #053747;
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
  align-items: flex-end;
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
  height: fit-content;
  gap: 30px;
`;

const Option = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionReset = styled.div`
  width: 100px;
  height: fit-content;
  color: #d4d4d4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.active {
    background: #9a9a9a;
  }
`;

const OptionText = styled.div`
  width: 100px;
  height: fit-content;
  padding: 0 0 4px;
  color: #d4d4d4;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  cursor: pointer;
  span {
    font-size: 6px;
  }
  &.active {
    background: #9a9a9a;
    color: #fff;
  }
`;

const OptionMenuArea = styled.div`
  width: 100%;
  height: auto;
  background: #818181;
  overflow: hidden;
`;

const OptionMenu = styled.div`
  width: 100px;
  height: inherit;
  max-height: 0;
  background: #818181;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  transition: max-height 0.3s;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  &.active {
    max-height: 128px;
  }
`;

const OptionItem = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  padding: 4px 0;
  border-radius: 5px;
  background: #818181;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background: #9a9a9a;
  }
  &.active {
    background: #9a9a9a;
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
  const [menuOpen, setMenuOpen] = useState({
    recommend: false,
    genre: false,
  });
  const [filters, setFilters] = useState({
    sort: { recommend: true, newest: false, oldest: false },
    genre: {
      clear: true,
      28: false,
      12: false,
      16: false,
      35: false,
      80: false,
      99: false,
      18: false,
      10751: false,
      14: false,
      36: false,
      27: false,
      10402: false,
      9648: false,
      10749: false,
      878: false,
      10770: false,
      53: false,
      10752: false,
      37: false,
    },
  });

  // 데이터 호출 및 가공
  const { data: genereData, isLoading: genereLoading } = useQuery<Genres>({
    queryKey: ["getGeneres"],
    queryFn: getAllGeneres,
  });

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

  const allResultGenres = searchResultData.map((item) => item.genre_ids).flat();

  const genreMenuData =
    allResultGenres &&
    genereData &&
    allResultGenres.map((item) =>
      genereData.genres.find((genre) => genre.id === item)
    );

  const genreMenu = Array.from(new Set(genreMenuData));

  const filterKey: number | undefined = undefined;

  // 정렬/필터 기능
  const applyFilters = (filter?: number[]) => {
    return searchResultData
      .filter((item) => {
        if (
          filters.genre.clear ||
          filterKey === undefined ||
          filter === undefined
        ) {
          return true;
        }
        // if (filter !== undefined) {
        //   return filters.genre[filter]
        //     ? item.genre_ids.includes(filter as number)
        //     : true;
        // }
      })
      .sort((a, b) => {
        if (Object.values(filters.sort).every((value) => value === false))
          return 0;
        return filters.sort.recommend
          ? 0
          : filters.sort.oldest
          ? a.release_date.localeCompare(b.release_date)
          : b.release_date.localeCompare(a.release_date);
      });
  };

  // 버튼 기능
  const menuOpenFun = (btn: string) => {
    switch (btn) {
      case "recommend":
        if (menuOpen.recommend) {
          setMenuOpen((prev) => ({ ...prev, recommend: false }));
        } else {
          setMenuOpen((prev) => ({ ...prev, recommend: true }));
        }
        break;
      case "genre":
        if (menuOpen.genre) {
          setMenuOpen((prev) => ({ ...prev, genre: false }));
        } else {
          setMenuOpen((prev) => ({ ...prev, genre: true }));
        }
        break;
    }
  };

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
                <Option onClick={() => menuOpenFun("recommend")}>
                  <OptionText
                    className={
                      filters.sort.oldest || filters.sort.newest ? "active" : ""
                    }
                  >
                    {filters.sort.recommend
                      ? "추천순"
                      : filters.sort.oldest
                      ? "오래된순"
                      : "최신순"}
                    <span>▼</span>
                  </OptionText>
                  <OptionMenuArea>
                    <OptionMenu className={menuOpen.recommend ? "active" : ""}>
                      <OptionItem
                        onClick={() =>
                          setFilters({
                            ...filters,
                            sort: {
                              recommend: true,
                              newest: false,
                              oldest: false,
                            },
                          })
                        }
                      >
                        추천순
                      </OptionItem>
                      <OptionItem
                        className={filters.sort.newest ? "active" : ""}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            sort: {
                              recommend: false,
                              newest: true,
                              oldest: false,
                            },
                          })
                        }
                      >
                        최신순
                      </OptionItem>
                      <OptionItem
                        className={filters.sort.oldest ? "active" : ""}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            sort: {
                              recommend: false,
                              newest: false,
                              oldest: true,
                            },
                          })
                        }
                      >
                        오래된순
                      </OptionItem>
                    </OptionMenu>
                  </OptionMenuArea>
                </Option>
                <Option onClick={() => menuOpenFun("genre")}>
                  <OptionText>
                    장르<span>▼</span>
                  </OptionText>
                  <OptionMenuArea>
                    <OptionMenu className={menuOpen.genre ? "active" : ""}>
                      {genreMenu.map((genre, idx) => (
                        <OptionItem
                          className={
                            filters.genre.clear === false ? "active" : ""
                          }
                          key={idx}
                        >
                          {genre?.name}
                        </OptionItem>
                      ))}
                    </OptionMenu>
                  </OptionMenuArea>
                </Option>
                <OptionReset>&#x21BA; 리셋하기</OptionReset>
              </OptionArea>
            </Header>
            <MovieItemArea>
              {applyFilters(filterKey).map((data) => (
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
