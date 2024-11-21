import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { getMovies, GetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

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

const ModalBox = styled(motion.div)`
  width: 768px;
  height: 500px;
  position: fixed;
  top: calc(100vh / 2 - 500px / 2);
  left: calc(100vw / 2 - 768px / 2);
  background: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.darker};
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;
  border: 1px solid #f00;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const MovieCover = styled.div`
  width: 100%;
  height: 500px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const MovieTitle = styled.h3`
  color: ${(props) => props.theme.white.darker};
  font-size: 28px;
  padding: 20px;
  position: relative;
  top: -80px;
`;

const MovieOverView = styled.p`
  padding: 0 20px;
  line-height: 2;
  font-size: 20px;
  position: relative;
  top: -60px;
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
  data,
  categoryTitle,
}: {
  data: GetMoviesResult;
  categoryTitle: string;
}) => {
  const history = useNavigate();
  const movieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  //const { scrollY } = useScroll();

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClick = (movieId: number) => {
    history(`/movies/${movieId}`);
  };

  const onOverlayClick = () => {
    history(`/`);
  };

  const clickedMovie =
    movieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +movieMatch.params.movieId!);

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
                  layoutId={String(movie.id)}
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
        {movieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {clickedMovie && (
              <ModalBox layoutId={`${movieMatch.params.movieId}`}>
                <MovieCover
                  style={{
                    backgroundImage: `linear-gradient(to top, #000, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path
                    )})`,
                  }}
                />
                <MovieTitle>{clickedMovie.title}</MovieTitle>
                <MovieOverView>{clickedMovie.overview}</MovieOverView>
              </ModalBox>
            )}
          </>
        ) : null}
      </AnimatePresence>
    </Container>
  );
};

export default React.memo(Slider);
