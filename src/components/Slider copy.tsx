import React, { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { GetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import Detail from "../pages/Detail";

import { BsBorderBottom, BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

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
    z-index: 10;
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
    height: 300px;
  }
`;

const Row = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  /* display: grid;
  grid-template-columns: repeat(5, 1fr); */
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  padding: 0 40px;
  & > div {
    flex: 0 0 auto;
    width: 20%; 
    aspect-ratio: 16 / 9;
  }

  @media (max-width: 1024px) {
    & > div {
      width: 25%; /* 화면 작아질 때 4개 */
    }
  }

  @media (max-width: 768px) {
    & > div {
      width: 33.33%; /* 3개로 조정 */
    }
  }

`;

const Box = styled(motion.div)<{ $bgPhoto: string | undefined }>`
  /* width: 20%; 
  height: 144px; */
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
    height: 300px;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  opacity: 0;
`;

const Additional = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #292828;
  color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  opacity: 0;
  z-index: 10; /* Box보다 앞서도록 설정 */

  h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    font-size: 16px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
`;
const Button = styled.div`
  width: 30%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-radius: 5px;
  background: #4a4949;
  color: #fff;

  &:last-child {
    width: 30px;
    border-radius: 50%;
  }

  svg {
  }
`;

const More = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between;
  align-items: center; */
`;

const Date = styled.div`
  color: #9a9a9a;
  font-size: 12px;
`;

const Genres = styled.div`
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
    scale: 1.2,
    y: -20,
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    zIndex: 10, // Hover 상태에서 z-index 증가
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 0.7,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const AddtionalVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const offset = 5;

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
  const history = useNavigate();
  const movieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");

  const [index, setIndex] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(0);
  const [movieId, setMovieId] = useState("");

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClick = (movieId: number) => {
    if (isOpen) {
      setIsOpen(false);
      setMovieId("");
    } else {
      setIsOpen(true);
      setMovieId(`${category}_${movieId}`);
    }

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
      .map((id) => genreMap.get(id))
      .filter(Boolean)
      .join(" • ");
  };

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
          >
            {data?.results
              .slice(index * offset, index * offset + offset)
              .map((movie) => (
                <Box
                  onClick={() => onBoxClick(movie.id)}
                  key={movie.id}
                  layoutId={`${category}_${movie.id}`}
                  variants={boxVariants}
                  // $bgPhoto={
                  //   category === "tr"
                  //     ? makeImagePath(movie.poster_path)
                  //     : makeImagePath(movie.backdrop_path || "", "w500")
                  // }
                  $bgPhoto={makeImagePath(movie.backdrop_path || "", "w500")}
                  className={category === "tr" ? "tr" : ""}
                  initial="normal"
                  whileHover="hover"
                >
                  <Info variants={infoVariants} />
                  <Additional variants={AddtionalVariants}>
                    {/* <MovieImg>
                        <img src={makeImagePath(movie.backdrop_path|| "", "w500")} alt={movie.title} />
                      </MovieImg> */}
                    <h4>{movie.title}</h4>
                    <More>
                      <Date>{movie.release_date.slice(0, 4)}</Date>
                      <Genres>{getGenreNames(movie.genre_ids)}</Genres>
                    </More>
                    <Buttons>
                      <Button>
                        <FaPlay />
                      </Button>
                      <Button>예고편</Button>
                      <Button>
                        <FaPlus />
                      </Button>
                    </Buttons>
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
