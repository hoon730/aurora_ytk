const API_KEY = "0bc8bd2db453d7413d1c2844ec617b61";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  adult: boolean;
}

export interface GetMoviesResult {
  dates: {
    maximum: string;
    minimun: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = () => {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-10) };
    });
};

export const getTodaysMovies = () => {
  return fetch(`${BASE_PATH}/trending/movie/day?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-10) };
    });
};

export const getPopular = () => {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-10) };
    });
};

export const getTopRated = () => {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-10) };
    });
};

export const getThrillerMovies = () => {
  return fetch(`${BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=53`)
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-10) };
    });
};

export const getDramaMovies = () => {
  return fetch(`${BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=18`)
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-10) };
    });
};

export const getFantasyMovies = () => {
  return fetch(`${BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=14`)
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-10) };
    });
};

export const searchContents = (keyword: string | null) => {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
};

export const searchGeneres = () => {
  return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getReviews = (movieId: number) => {
  return fetch(`${BASE_PATH}/movie/${movieId}/reviews?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};
export const getVideos = (movieId: number) => {
  return fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};
