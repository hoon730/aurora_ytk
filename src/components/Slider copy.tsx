import React, { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { GetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import Detail from "../pages/Detail";

const Container = styled.div``;

const CategoryTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 10px;
  padding-left: 40px;
`;

const Box = styled(motion.div)<{ $bgPhoto: string | undefined }>`
  width: auto;
  height: 180px;
  background: url(${(props) => props.$bgPhoto}) center/cover no-repeat;
  font-size: 22px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 16px;
    color: ${(props) => props.theme.red};
  }
`;

const rowVariants = {
  hidden: {
    x: window.innerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 10,
  },
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.2,
    y: -20,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 0.7,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};

const offset = 5;

const Slider = ({
  category,
  data,
  categoryTitle,
}: {
  category: string;
  data: GetMoviesResult;
  categoryTitle: string;
}) => {
  const history = useNavigate();
  const movieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState("");

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClick = (movieId: number) => {
    //history(`/movies/${category}_${movieId}`);

    if (isOpen) {
      setIsOpen(false);
      setMovieId("");
    } else {
      setIsOpen(true);
      setMovieId(`${category}_${movieId}`);
    }
  };

  return (
    <Container>
      <CategoryTitle>{categoryTitle}</CategoryTitle>
      <SliderContainer>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            key={index}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
          >
            {data?.results
              .slice(index * offset, index * offset + offset)
              .map((movie) => (
                <Box
                  onClick={() => onBoxClick(movie.id)}
                  key={movie.id}
                  layoutId={`${category}_${movie.id}`}
                  variants={boxVariants}
                  $bgPhoto={makeImagePath(movie.backdrop_path || "", "w500")}
                  initial="normal"
                  whileHover="hover"
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </SliderContainer>
      <AnimatePresence>
        {isOpen ? (
          <Detail
            data={data}
            movieMatchId={movieId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ) : null}
      </AnimatePresence>
    </Container>
  );
};

export default React.memo(Slider);
