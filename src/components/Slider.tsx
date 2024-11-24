import React, { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { GetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import Detail from "../pages/Detail";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 컴포넌트
import { Navigation, Pagination } from "swiper/modules";
// Swiper 모듈
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { transform } from "typescript";

const Container = styled.div`
  margin-bottom: 50px;
  padding-left: 40px;
  transition: all 0.3s linear;

  .button {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 100%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
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

    &.custom-prev {
      left: 0;
      opacity: 0;
      &.active {
        opacity: 1;
      }
    }
    &.custom-next {
      right: 0;
    }
  }

  &.active {
    padding-left: 0%;
  }
`;

const CategoryTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 15px;
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

  const [leaving, setLeaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
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

  const handleOnClick = () => {
    setIsClicked(true);
  };

  return (
    <Container className={isClicked ? "active" : ""}>
      <CategoryTitle>{categoryTitle}</CategoryTitle>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        spaceBetween={10}
        slidesPerView={5}
        pagination={{ clickable: true }}
        loop={true}
      >
        {data?.results.map((movie) => (
          <SwiperSlide key={movie.id}>
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
          </SwiperSlide>
        ))}
        <div
          className={
            isClicked ? "active custom-prev button" : "custom-prev button"
          }
        >
          <BsChevronCompactLeft />
        </div>
        <div className="custom-next button" onClick={handleOnClick}>
          <BsChevronCompactRight />
        </div>
      </Swiper>

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
