import styled from "styled-components";
import { certificationInfo, makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { useMovieReleaseInfo } from "../hook/commonData";
import Loading from "./Loading";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
  @media screen and (max-width: 1560px) {
    padding-bottom: 10px;
  }
  @media screen and (max-width: 685px) {
    padding-bottom: 0px;
  }
`;

const ImageArea = styled.div<{ logo: string | undefined }>`
  width: 100%;
  height: 185px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  ${({ logo }) =>
    logo !== undefined
      ? "&::before { content: ''; width: 100%; height: 100%; position: absolute; background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);}"
      : null}
  @media screen and (max-width: 685px) {
    ${({ logo }) =>
      logo !== undefined
        ? ""
        : "&::before { content: ''; width: 100%; height: 100%; position: absolute; background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);}"}
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LogoArea = styled.div`
  width: calc(100% - 50px);
  height: 30px;
  position: absolute;
  left: 25px;
  bottom: 25px;
  @media screen and (max-width: 685px) {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom;
`;

const InfoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  @media screen and (max-width: 685px) {
    display: none;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
`;

const LogoTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: none;
  @media screen and (max-width: 685px) {
    display: block;
  }
`;

const DescriptionArea = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Certification = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  padding: 0 5px 2px;
  border-radius: 5px;
  background: ${({ color }) => color};
`;

const TextArea = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Text = styled.div`
  font-size: 16px;
  color: #9a9a9a;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface SearchItemProps {
  movieId: number;
  title: string;
  genres: number[];
  image: string;
  releaseYear: string;
}

const SearchItem = ({ movieId, image }: SearchItemProps) => {
  const navigate = useNavigate();

  const { imageLoading, searchInfo, runtime } = useMovieReleaseInfo(movieId);

  return (
    <Container>
      {imageLoading ? (
        <Loading />
      ) : (
        <ImageArea
          logo={searchInfo.logo}
          onClick={() => navigate(`/detail/${movieId}`)}
        >
          <BackgroundImage
            src={makeImagePath(image, "w500")}
            alt={searchInfo.title + " image"}
          />
          <LogoArea>
            {imageLoading ? (
              "Loading..."
            ) : searchInfo.logo !== undefined ? (
              <LogoImage
                src={makeImagePath(searchInfo.logo, "w300")}
                alt={searchInfo.title + " logo"}
              />
            ) : (
              <LogoTitle>{searchInfo.title}</LogoTitle>
            )}
          </LogoArea>
        </ImageArea>
      )}
      <InfoArea>
        <Title onClick={() => navigate(`/detail/${movieId}`)}>
          {searchInfo.title}
        </Title>
        <DescriptionArea>
          <Certification
            color={certificationInfo(searchInfo.certification).color}
          >
            {certificationInfo(searchInfo.certification).age}
          </Certification>
          <TextArea>
            <Text>
              {searchInfo.release_date?.length === 0
                ? "정보 없음"
                : searchInfo.release_date?.slice(0, 4)}
            </Text>
            <Text>·</Text>
            <Text style={{ textOverflow: "ellipsis" }}>
              {searchInfo.genre?.length === 0
                ? "정보 없음"
                : searchInfo.genre
                    ?.splice(0, 2)
                    .map((item) => item?.name)
                    .join(", ")}
            </Text>
            {runtime === undefined || runtime === "" ? null : (
              <>
                <Text>·</Text>
                <Text>{runtime}</Text>
              </>
            )}
          </TextArea>
        </DescriptionArea>
      </InfoArea>
    </Container>
  );
};

export default SearchItem;
