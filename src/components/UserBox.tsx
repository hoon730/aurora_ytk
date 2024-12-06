import styled from "styled-components";

const Wrapper = styled.div<{ $position: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  @media screen and (max-width: 780px) {
    display: ${({ $position }) => ($position === "top" ? "none" : "block")};
  }
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserBox = ({ position }: { position: string }) => {
  return (
    <Wrapper $position={position}>
      <UserImg src="/img/profile.jpg" />
    </Wrapper>
  );
};

export default UserBox;
