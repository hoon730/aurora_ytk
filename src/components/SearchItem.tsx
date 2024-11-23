import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllGeneres,
  getSearchDetail,
  getSearchReleaseDates,
  getImage,
} from "../api";
import { makeImagePath, runtimeCalc } from "../utils";

interface SearchItemProps {
  movieId: number;
  title: string;
  image: string;
  releaseYear: string;
}

interface Detail {
  runtime: number;
}

interface ReleaseDate {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
    }[];
  }[];
}

interface ImageData {
  logos: {
    iso_639_1: string;
    file_path: string;
  }[];
}

const SearchItem = ({
  movieId,
  title,
  image,
  releaseYear,
}: SearchItemProps) => {
  const { data: genereData, isLoading: genereLoading } = useQuery({
    queryKey: ["getGeneres"],
    queryFn: getAllGeneres,
  });

  const { data: detailData, isLoading: detailLoading } = useQuery<Detail>({
    queryKey: ["getDetail"],
    queryFn: () => getSearchDetail(movieId),
  });

  const { data: dateData, isLoading: dateLoading } = useQuery<ReleaseDate>({
    queryKey: ["getDate"],
    queryFn: () => getSearchReleaseDates(movieId),
  });

  const { data: imageData, isLoading: imageLoading } = useQuery<ImageData>({
    queryKey: ["getImage"],
    queryFn: () => getImage(movieId),
  });

  const releaseDate =
    dateData &&
    (dateData.results.find((item) => item.iso_3166_1 === "KR") ||
      dateData.results.find((item) => item.iso_3166_1 === "US"));

  const logoFilter =
    imageData &&
    (imageData.logos.find((item) => item.iso_639_1 === "ko") ||
      imageData.logos.find((item) => item.iso_639_1 === "en") ||
      imageData.logos.find((item) => item.iso_639_1 === null));

  const searchInfo =
    detailData &&
    dateData &&
    imageData &&
    releaseDate !== undefined &&
    logoFilter !== undefined
      ? [
          detailData.runtime,
          releaseDate.release_dates[0].certification,
          logoFilter.file_path,
        ]
      : [];

  return <div>SearchItem</div>;
};

export default SearchItem;
