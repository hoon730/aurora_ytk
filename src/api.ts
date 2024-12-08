const API_KEY = "0bc8bd2db453d7413d1c2844ec617b61";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface Genres {
  genres: {
    id: number;
    name: string;
  }[];
}

export interface Movie {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  poster_path: string;
  title: string;
  original_language: string;
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

export interface ReleaseDate {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      release_date: string;
    }[];
  }[];
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
  runtime: number;
}

export const getMovies = async () => {
  return await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  )
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-12) };
    });
};

export const getTodaysMovies = async () => {
  return await fetch(
    `${BASE_PATH}/trending/movie/day?api_key=${API_KEY}&language=ko-KR`
  )
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-12) };
    });
};

export const getPopular = async () => {
  return await fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR`
  )
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-12) };
    });
};

export const getTopRated = async () => {
  return await fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  )
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-12) };
    });
};

export const getThrillerMovies = async () => {
  return await fetch(
    `${BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=53&language=ko-KR`
  )
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-12) };
    });
};

export const getComedyMovies = async () => {
  return await fetch(
    `${BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=35&language=ko-KR`
  )
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-12) };
    });
};

export const getFantasyMovies = async () => {
  return await fetch(
    `${BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=14`
  )
    .then((response) => response.json())
    .then((data) => {
      return { ...data, results: data.results.slice(-12) };
    });
};

export const getGenres = async () => {
  return await fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
  )
    .then((response) => response.json())
    .then((data) => data.genres);
};

export const searchContents = (keyword: string | null) => {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=false&language=ko-KR`
  ).then((response) => response.json());
};

export const getAllGeneres = () => {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
};

// runtime 찾아오는 데이터
export const getDetail = (movieId: number) => {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
};

// 연령등급 찾아오는 데이터
export const getSearchReleaseDates = (movieId: number) => {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/release_dates?api_key=${API_KEY}`
  ).then((response) => response.json());
};

// 로고 찾아오는 데이터
// export const getImage = (movieId: number) => {
//   return fetch(`${BASE_PATH}/movie/${movieId}/images?api_key=${API_KEY}`).then(
//     (response) => response.json()
//   );
// };

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

// export const getMovieReleaseDates = (movieId: number) => {
//   return fetch(
//     `${BASE_PATH}/movie/${movieId}/release_dates?&api_key=${API_KEY}`
//   ).then((response) => response.json());
// };

// 지선인데 어느거 쓸지 몰라서 제가 써야하는 로고 불러오는 거 그냥 추가해서 쓸게요

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const getMovieLogos = async (movieIds: number[]): Promise<string[]> => {
  const logoPromises = movieIds.map(async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_PATH}/movie/${movieId}/images?api_key=${API_KEY}&include_image_language=ko`
      );
      const data: MovieImages = await response.json();
      const logoPath =
        data.logos && data.logos.length > 0 ? data.logos[0].file_path : null;

      return logoPath
        ? `${IMAGE_BASE_URL}/w500${logoPath}`
        : "/default-logo-placeholder.jpg";
    } catch (error) {
      console.error(`Error fetching logo for movie ID ${movieId}:`, error);
      return "/default-logo-placeholder.jpg";
    }
  });

  return Promise.all(logoPromises);
};

export const fetchBackdropImages = async (
  movieIds: number[]
): Promise<string[]> => {
  try {
    const fetchedSlides = await Promise.all(
      movieIds.map(async (id) => {
        const response = await fetch(
          `${BASE_PATH}/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        return `${IMAGE_BASE_URL}/original${data.backdrop_path}`;
      })
    );
    return fetchedSlides;
  } catch (error) {
    console.error("Error fetching backdrop images:", error);
    return [];
  }
};
