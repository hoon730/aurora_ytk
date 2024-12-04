import React, { useState, useEffect } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { getMovieDetailInfo, GetMoviesResult, getMovieImages } from "../api";
import { makeImagePath, runtimeCalc } from "../utils";

import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { MdMoreVert } from "react-icons/md";

const Container = styled.div`
  margin-bottom: 50px;
`;

const CategoryTitle = styled.h3`
  padding-left: 40px;
  padding-bottom: 15px;
  color: ${(props) => props.theme.white.lighter};
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 144px;
  position: relative;

  .button {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 100%;
    transform: translateY(-50%);
    z-index: 5;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: bold;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #000;
      background: rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }

  &.tr {
    height: 420px;
  }
`;

const Row = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  padding: 0 40px;
  transition: padding 0.3s ease;
  & > div {
    flex: 0 0 auto;
    width: 15.98%;
    aspect-ratio: 16 / 9;
  }

  @media (max-width: 768px) {
    & > div {
      width: 33.33%; /* 3개로 조정 */
    }
  }

  &.active {
    /* padding-left: 0; */
  }
`;

const Box = styled(motion.div)<{ $bgPhoto: string | undefined }>`
  /* height: 144px; */
  flex: 0 0 auto;
  aspect-ratio: 16 / 9;
  background: url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  font-size: 22px;
  border-radius: 5px;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }

  &.tr {
    height: 430px;
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
      ),
      url("your-image.jpg");
    background-blend-mode: overlay;
  }
`;

const MovieLogo = styled.img`
  width: 100%;
  height: 40px;
  object-fit: contain;
`;

const Info = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  opacity: 1;
`;

const Additional = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: #292828;
  color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  opacity: 0;
  z-index: 10;
  display: none;

  h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    font-size: 16px;
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const More = styled.div`
  display: flex;
  gap: 10px;
  /* justify-content: space-between;
  align-items: center; */
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
  margin-bottom: 10px;
`;

const PrevBtn = styled.div`
  display: none;
  opacity: 0;
  left: 0;
  &.active {
    display: flex;
    opacity: 1;
  }
`;
const NextBtn = styled.div`
  display: flex;
  right: 0;
`;

const rowVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? window.innerWidth + 50 : -window.innerWidth - 50,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -window.innerWidth - 50 : window.innerWidth + 50,
  }),
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.235,
    y: -20,
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    zIndex: 10,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 0,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const AddtionalVariants = {
  hover: {
    display: "flex",
    opacity: 1,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const offset = 6;

const Slider = ({
  category,
  data,
  categoryTitle,
  genres = [],
}: {
  category: string;
  data: GetMoviesResult;
  categoryTitle: string;
  genres: { id: number; name: string }[];
}) => {
  const navigate = useNavigate();
  const movieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");

  const [index, setIndex] = useState(0);
  const [isClick, setIsClick] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(0);
  // const [movieId, setMovieId] = useState("");

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClick = (movieId: number) => {
    // if (isOpen) {
    //   setIsOpen(false);
    //   setMovieId("");
    // } else {
    //   setIsOpen(true);
    //   setMovieId(`${category}_${movieId}`);
    // }

    if (leaving) return;
    setDirection(0);
  };

  const handlePrevBtn = () => {
    if (leaving) return;
    toggleLeaving();
    setDirection(-1);
    setIndex((prev) =>
      prev === 0 ? Math.ceil(data.results.length / offset) - 1 : prev - 1
    );
  };

  const handleNextBtn = () => {
    setIsClick(true);
    if (leaving) return;
    toggleLeaving();
    setDirection(1);
    setIndex((prev) => (prev + 1) % Math.ceil(data.results.length / offset));
  };

  const genreMap = React.useMemo(() => {
    if (!genres) return new Map<number, string>();
    const map = new Map<number, string>();
    genres.forEach((genre) => map.set(genre.id, genre.name));
    return map;
  }, [genres]);

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .slice(0, 3)
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
  // console.log(getMovieImages(1241982).then((img) => img.logos[0].file_path));

  return (
    <Container>
      <CategoryTitle>{categoryTitle}</CategoryTitle>
      <SliderContainer className={category === "tr" ? "tr" : ""}>
        <AnimatePresence
          custom={direction}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            custom={direction}
            variants={rowVariants}
            key={index}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.7 }}
            className={isClick ? "active" : ""}
          >
            {data?.results
              .slice(index * offset, index * offset + offset)
              .map((movie) => (
                <Box
                  onClick={() => {
                    navigate(`/detail/${movie.id}`);
                    onBoxClick(movie.id);
                  }}
                  key={movie.id}
                  layoutId={`${category}_${movie.id}`}
                  variants={boxVariants}
                  $bgPhoto={
                    category === "tr"
                      ? makeImagePath(movie.poster_path || "", "w500")
                      : makeImagePath(movie.backdrop_path || "", "w500")
                  }
                  className={category === "tr" ? "tr" : ""}
                  initial="normal"
                  whileHover="hover"
                >
                  <Info variants={infoVariants}></Info>
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
                  <Additional variants={AddtionalVariants}>
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
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <PrevBtn
          className={isClick ? "active button" : "button"}
          onClick={handlePrevBtn}
        >
          <BsChevronCompactLeft />
        </PrevBtn>
        <NextBtn className="button" onClick={handleNextBtn}>
          <BsChevronCompactRight />
        </NextBtn>
      </SliderContainer>
    </Container>
  );
};

export default React.memo(Slider);
