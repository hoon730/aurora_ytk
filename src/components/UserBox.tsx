import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { authenticate } from "../atom";

const Wrapper = styled.div`
  position: relative;
`;

const UserArea = styled.div<{ $position: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: relative;
  z-index: 11;
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
  padding: 5px 0;
  border-radius: 5px;
  text-align: center;
  background: #666;
  position: absolute;
  z-index: 11;
  ${({ $position }) => ($position === "top" ? "bottom:-40px" : "top:-40px")};
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

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: pointer;
  background: transparent;
`;

const UserBox = ({ position }: { position: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setAuthState = useSetRecoilState(authenticate);
  const navigation = useNavigate();

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: {
        email: null,
        password: null,
      },
    });
    navigation("/pre-loading");
  };

  return (
    <Wrapper>
      <UserArea $position={position} onClick={() => setIsOpen((prev) => !prev)}>
        <UserImg src="/img/profile.jpg" />
      </UserArea>
      <UserNav $position={position} $isOpen={isOpen}>
        <Logout onClick={logout}>로그아웃</Logout>
      </UserNav>
      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </Wrapper>
  );
};

export default UserBox;
