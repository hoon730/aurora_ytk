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

export interface MovieImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieImages {
  id: number;
  backdrops: MovieImage[];
  logos: MovieImage[];
  posters: MovieImage[];
}

export interface Obj {
  id: number;
  name: string;
}

export interface RleaseInfo {
  certification: string;
  release_date: string;
}

export interface ReleaseDate {
  iso_3166_1: string;
  release_dates: RleaseInfo[];
}

export interface VideoResult {
  key: string;
}

export interface MovieDetailData {
  genres: Obj[];
  title: string;
  overview: string;
  release_date: string;
  backdrop_path?: string;
  poster_path?: string;
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

export const getMovieDetailInfo = async (movieId: number) => {
  const englishData = await fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`
  ).then((response) => response.json());

  const koreanData = await fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());

  return {
    englishData,
    koreanData,
  };
};

export const getMovieImages = (movieId: number) => {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/images?include_image_language=ko%2Cen&api_key=${API_KEY}`
  ).then((response) => response.json());
};

export const getMovieReleaseDates = (movieId: number) => {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/release_dates?&api_key=${API_KEY}`
  ).then((response) => response.json());
};
