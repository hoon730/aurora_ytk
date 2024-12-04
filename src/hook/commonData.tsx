import { useQuery } from "@tanstack/react-query";
import {
  getDetail,
  getSearchReleaseDates,
  getMovieImages,
  MovieDetailData,
  ReleaseDate,
  getAllGeneres,
  Genres,
} from "../api"; // API 호출 함수
import { runtimeCalc } from "../utils";

interface ImageData {
  logos: {
    iso_639_1: string;
    file_path: string;
  }[];
}

export const useMovieReleaseInfo = (movieId: number | undefined) => {
  const { data: genereData } = useQuery<Genres>({
    queryKey: ["getGeneres"],
    queryFn: getAllGeneres,
  });

  const { data: detailData } = useQuery<MovieDetailData>({
    queryKey: ["getDetail", movieId],
    queryFn: () => getDetail(movieId!),
    enabled: !!movieId,
  });

  const { data: dateData } = useQuery<ReleaseDate>({
    queryKey: ["getDate", movieId],
    queryFn: () => getSearchReleaseDates(movieId!),
    enabled: !!movieId,
  });

  const { data: imageData, isLoading: imageLoading } = useQuery<ImageData>({
    queryKey: ["getImage", movieId],
    queryFn: () => getMovieImages(movieId!),
    enabled: !!movieId,
  });

  // 한국(KR) 또는 미국(US) 출시 날짜 찾기
  const releaseDate =
    dateData &&
    (dateData.results.find((item) => item.iso_3166_1 === "KR") ||
      dateData.results.find((item) => item.iso_3166_1 === "US"));

  const logoFilter =
    imageData &&
    (imageData.logos.find((item) => item.iso_639_1 === "ko") ||
      imageData.logos.find((item) => item.iso_639_1 === "en") ||
      imageData.logos.find((item) => item.iso_639_1 === null));

  const genreList = detailData?.genres.map((genre) =>
    genereData?.genres.find((item) => item.id === genre.id)
  );

  // searchInfo 계산
  const searchInfo = {
    certification:
      releaseDate?.release_dates[releaseDate.release_dates.length - 1]
        .certification,
    logo: logoFilter?.file_path,
    title: detailData?.title,
    release_date: detailData?.release_date,
    genre: genreList,
    overview: detailData?.overview,
    backdrop_path: detailData?.backdrop_path,
    poster_path: detailData?.poster_path,
  };

  const runtime = detailData && runtimeCalc(detailData.runtime);

  return { imageLoading, searchInfo, runtime };
};
