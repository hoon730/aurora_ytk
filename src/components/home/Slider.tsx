import React, { useState } from "react";
import styled from "styled-components";
import { GetMoviesResult } from "../../api";

import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Box from "./Box";

const Container = styled.div`
  margin-bottom: 50px;

  @media (max-width: 1400px) {
    margin-bottom: 30px;
  }

  .swiper {
    overflow: visible;
    padding: 0 50px;

    @media (max-width: 768px) {
      padding: 0 42px;
    }
  }

  .swiper-slide {
    z-index: auto;
  }
`;

const CategoryTitle = styled.h3`
  padding-left: 50px;
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

  @media (max-width: 480px) {
    &.tr {
      height: 230px;
    }
  }
`;

const PrevBtn = styled.div`
  display: none;
  opacity: 0;
  left: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  &.active {
    display: flex;
    opacity: 1;
  }
`;
const NextBtn = styled.div`
  display: flex;
  right: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

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
  const [isClick, setIsClick] = useState(false);
  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0);

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
                idx={idx}
                category={category}
                data={data}
                genres={genres}
                firstVisibleIndex={firstVisibleIndex}
                lastVisibleIndex={lastVisibleIndex}
                movie={movie}
              />
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
