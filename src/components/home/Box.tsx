import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath, runtimeCalc } from "../../utils";
import {
  GetMoviesResult,
  getMovieDetailInfo,
  getMovieImages,
  Movie,
} from "../../api";

import { MdMoreVert } from "react-icons/md";

const Container = styled(motion.div)<{
  $bgPhoto: string | undefined;
  $tr: string | undefined;
}>`
  height: ${(props) => (props.$tr ? "430px" : "144px")};
  background: url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  font-size: 22px;
  border-radius: 5px;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  position: relative;
  z-index: 1;

  &.first-slide {
    transform-origin: center left;
  }

  &.last-slide {
    transform-origin: center right;
  }

  @media (max-width: 1300px) {
    height: ${(props) => (props.$tr ? "320px" : "144px")};
  }

  @media (max-width: 768px) {
    height: ${(props) => (props.$tr ? "270px" : "144px")};
  }

  @media (max-width: 480px) {
    height: ${(props) => (props.$tr ? "230px" : "144px")};
  }
`;

const MovieTitle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 18px;
  font-weight: bold;
  color: #fff;

  &.no_logo {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    padding: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      #000 100%
    );
  }
`;

const MovieLogo = styled.img`
  width: 90%;
  height: 40px;
  object-fit: contain;
`;

const Bg = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: -100%;
  z-index: 0;
  display: none;
  opacity: 0;
`;

const Additional = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: #292828;
  color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    font-size: 14px;
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Right = styled.div`
  display: flex;
  gap: 15px;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  svg {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const More = styled.div`
  display: flex;
  gap: 10px;
`;

const Date = styled.div`
  color: #9a9a9a;
  font-size: 12px;
`;

const RunnngTime = styled.div`
  color: #9a9a9a;
  font-size: 12px;
`;

const Genres = styled.div`
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #9a9a9a;
  margin-bottom: 10px;
`;

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.15,
    y: -40,
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    zIndex: 10,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};
const boxClickVariants = {
  normal: { scale: 1 },
  click: {
    scale: 1.15,
    y: -40,
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    zIndex: 10,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const trVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.1,
    y: -45,
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    zIndex: 10,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};
const trClickVariants = {
  normal: { scale: 1 },
  click: {
    scale: 1.1,
    y: -45,
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    zIndex: 10,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const bgVariants = {
  hover: {
    display: "block",
    opacity: 1,
    zIndex: 10,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const Box = ({
  idx,
  data,
  category,
  genres = [],
  firstVisibleIndex,
  lastVisibleIndex,
  movie,
}: {
  idx: Number;
  data: GetMoviesResult;
  category: string;
  genres: { id: number; name: string }[];
  firstVisibleIndex: Number;
  lastVisibleIndex: Number;
  movie: Movie;
}) => {
  const navigate = useNavigate();
  const movieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");
  const [mobileClick, setMobileClick] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleMobileClick = () => {
    if (isMobile) {
      setMobileClick(!mobileClick);
    }
  };

  const genreMap = React.useMemo(() => {
    if (!genres) return new Map<number, string>();
    const map = new Map<number, string>();
    genres.forEach((genre) => map.set(genre.id, genre.name));
    return map;
  }, [genres]);

  const getGenreNames = (genreIds: number[]) => {
    const sliceLength = isMobile ? 2 : 3;
    return genreIds
      .slice(0, sliceLength)
      .map((id) => genreMap.get(id))
      .filter(Boolean)
      .join(" • ");
  };

  const [movieDetails, setMovieDetails] = useState<Record<number, any>>({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details: Record<number, any> = {};
      for (const movie of data.results) {
        const detail = await getMovieDetailInfo(movie.id);
        details[movie.id] = detail.koreanData.runtime;
      }
      setMovieDetails(details);
    };

    fetchMovieDetails();
  }, [data]);

  const getRuntime = (movieId: number) => {
    return runtimeCalc(movieDetails[movieId] || 0);
  };

  const [logos, setLogos] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchLogos = async () => {
      const logoData: Record<number, string> = {};
      for (const movie of data.results) {
        const images = await getMovieImages(movie.id);
        if (images.logos && images.logos.length > 0) {
          logoData[movie.id] = images.logos[0].file_path;
        }
      }
      setLogos(logoData);
    };

    fetchLogos();
  }, [data]);

  const makeLogoUrl = (filePath: string) =>
    `https://image.tmdb.org/t/p/w500${filePath}`;

  return (
    <Container
      key={movie.id}
      layoutId={`${category}_${movie.id}`}
      variants={
        mobileClick
          ? category === "tr"
            ? trClickVariants
            : boxClickVariants
          : category === "tr"
          ? trVariants
          : boxVariants
      }
      initial="normal"
      whileHover="hover"
      $bgPhoto={
        movie.backdrop_path
          ? category === "tr"
            ? makeImagePath(movie.poster_path || "", "w500")
            : makeImagePath(movie.backdrop_path || "", "w500")
          : makeImagePath(movie.poster_path || "", "w500")
      }
      $tr={category === "tr" ? "tr" : ""}
      className={
        idx === firstVisibleIndex
          ? "first-slide"
          : idx === lastVisibleIndex
          ? "last-slide"
          : ""
      }
      onClick={() => {
        navigate(`/detail/${movie.id}`);
        handleMobileClick();
      }}
    >
      {category !== "tr" ? (
        logos[movie.id] ? (
          <MovieTitle>
            <MovieLogo
              src={makeLogoUrl(logos[movie.id])}
              alt={`${movie.title} Logo`}
            />
          </MovieTitle>
        ) : (
          <MovieTitle className="no_logo">{movie.title}</MovieTitle>
        )
      ) : null}
      <Bg variants={bgVariants}>
        <Additional>
          <h4>{movie.title}</h4>
          <Description>
            <Left>
              <More>
                <Date>{movie.release_date.slice(0, 4)}</Date>
                <RunnngTime>{getRuntime(movie.id)}</RunnngTime>
              </More>
              <Genres>{getGenreNames(movie.genre_ids)}</Genres>
            </Left>
            <Right>
              <Button>
                <MdMoreVert />
              </Button>
            </Right>
          </Description>
        </Additional>
      </Bg>
    </Container>
  );
};

export default Box;
