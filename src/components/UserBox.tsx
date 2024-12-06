import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const UserArea = styled.div<{ $position: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    display: ${({ $position }) => ($position === "top" ? "none" : "block")};
  }
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserNav = styled.ul<{ $position: string; $isOpen: boolean }>`
  width: 100px;
  padding: 10px 0;
  border-radius: 5px;
  text-align: center;
  background: #666;
  position: absolute;
  ${({ $position }) => ($position === "top" ? "bottom:-50px" : "top:-50px")};
  right: -5px;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

const Logout = styled.span`
  color: #fff;
  transition: opacity 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const UserBox = ({ position }: { position: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  return (
    <Wrapper>
      <UserArea $position={position} onClick={() => setIsOpen((prev) => !prev)}>
        <UserImg src="/img/profile.jpg" />
      </UserArea>
      <UserNav $position={position} $isOpen={isOpen}>
        <Logout onClick={() => navigation("/login")}>로그아웃</Logout>
      </UserNav>
    </Wrapper>
  );
};

export default UserBox;
