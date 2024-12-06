import React, { useState, useEffect } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getMovieDetailInfo, GetMoviesResult, getMovieImages } from "../api";
import { makeImagePath, runtimeCalc } from "../utils";

import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { MdMoreVert } from "react-icons/md";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Container = styled.div`
  margin-bottom: 50px;

  @media (max-width: 1400px) {
    margin-bottom: 30px;
  }

  .swiper {
    overflow: visible;
    padding: 0 40px;
  }

  .swiper-slide {
    z-index: auto;
  }
`;

const CategoryTitle = styled.h3`
  padding-left: 40px;
  padding-bottom: 15px;
  color: ${(props) => props.theme.white.lighter};
`;

const SliderContainer = styled.div`
  width: 100%;
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
      width: 32px;
    }
  }

  &.tr {
    height: 430px;
  }

  @media (max-width: 1300px) {
    &.tr {
      height: 320px;
    }
  }

  @media (max-width: 768px) {
    &.tr {
      height: 270px;
    }
  }
`;

const Box = styled(motion.div)<{
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
  width: 100%;
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
  align-items: flex-start;
  color: #fff;

  svg {
    font-size: 20px;
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

const bgVariants = {
  hover: {
    display: "block",
    opacity: 1,
    zIndex: 10,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

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

  const [isClick, setIsClick] = useState(false);

  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0);

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

  // console.log(window.innerWidth);

  const obj = {
    320: 2,
    480: 3,
  };

  return (
    <Container>
      <CategoryTitle>{categoryTitle}</CategoryTitle>
      <SliderContainer className={category === "tr" ? "tr" : ""}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          slidesPerGroup={2}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            480: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1400: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
          }}
          onSlideChange={(swiper: SwiperClass) => {
            const activeIndex = swiper.activeIndex;
            const visibleSlides = swiper.params.slidesPerView as number;
            const totalSlides = data.results.length;

            setFirstVisibleIndex(activeIndex % totalSlides);
            setLastVisibleIndex(
              (activeIndex + visibleSlides - 1) % totalSlides
            );
          }}
          className="swiper"
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
        >
          {data?.results.map((movie, idx) => (
            <SwiperSlide key={movie.id}>
              <Box
                key={movie.id}
                layoutId={`${category}_${movie.id}`}
                variants={category === "tr" ? trVariants : boxVariants}
                initial="normal"
                whileHover="hover"
                $bgPhoto={
                  category === "tr"
                    ? makeImagePath(movie.poster_path || "", "w500")
                    : makeImagePath(movie.backdrop_path || "", "w500")
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
              </Box>
            </SwiperSlide>
          ))}
          <PrevBtn
            className={
              isClick ? "active button custom-prev" : "button custom-prev"
            }
          >
            <BsChevronCompactLeft />
          </PrevBtn>
          <NextBtn
            className="button custom-next"
            onClick={() => setIsClick(true)}
          >
            <BsChevronCompactRight />
          </NextBtn>
        </Swiper>
      </SliderContainer>
    </Container>
  );
};

export default React.memo(Slider);
