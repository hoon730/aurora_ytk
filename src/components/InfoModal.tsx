import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { getMovieImages, GetMoviesResult, MovieImages } from "../api";
import { useQuery } from "@tanstack/react-query";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;
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

const MovieCover = styled.div`
  width: 100%;
  height: 500px;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
`;

const MovieLogo = styled.span`
  display: inline-block;
  width: 200px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid #0f0;
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

const InfoModal = ({
  data,
  movieMatchId,
  isOpen,
  setIsOpen,
}: {
  data: GetMoviesResult;
  movieMatchId: string | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [category, movieId] = (movieMatchId ?? "").split("_");

  const onOverlayClick = () => {
    setIsOpen(false);
  };

  const clickedMovie =
    movieId && data?.results.find((movie) => movie.id === +movieId!);

  const { data: movieImages, isLoading: movieImageLoading } =
    useQuery<MovieImages>({
      queryKey: ["movieImages", movieId],
      queryFn: () => getMovieImages(+movieId),
    });

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
      />

      {clickedMovie && (
        <ModalBox layoutId={`${category}_${movieId}`}>
          <MovieCover
            style={{
              backgroundImage: `linear-gradient(to top, #000, transparent), url(${makeImagePath(
                clickedMovie.backdrop_path
                  ? clickedMovie.backdrop_path
                  : clickedMovie.poster_path
              )})`,
            }}
          />
          <MovieLogo
            style={{
              backgroundImage: `url(${makeImagePath(
                movieImages?.logos?.[0].file_path ?? ""
              )})`,
            }}
          ></MovieLogo>
          <MovieTitle>{clickedMovie.title}</MovieTitle>
          <MovieOverView>{clickedMovie.overview}</MovieOverView>
        </ModalBox>
      )}
    </>
  );
};

export default InfoModal;
