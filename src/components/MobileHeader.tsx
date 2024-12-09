import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { mobileMenuOpen } from "../atom";
import { AiFillHome } from "react-icons/ai";
import { IoSearch, IoMenu } from "react-icons/io5";
import UserBox from "./UserBox";

const Wrapper = styled.div<{ $isPre: boolean }>`
  display: none;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background: #000;
  @media screen and (max-width: 768px) {
    display: ${({ $isPre }) => ($isPre ? "none" : "block")};
  }
`;

const Icons = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 60%;
    margin: 0 auto;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
  }
  li {
    cursor: pointer;
    svg {
      fill: #fff;
      stroke: #fff;
      width: 26px;
      height: 26px;
    }
  }
`;

const MobileHeader = ({
  isPre,
  handleSearch,
}: {
  isPre: boolean;
  handleSearch: () => void;
}) => {
  const setOpenMenu = useSetRecoilState(mobileMenuOpen);
  const navigation = useNavigate();
  return (
    <Wrapper $isPre={isPre}>
      <Icons>
        <li onClick={() => navigation("/")}>
          <AiFillHome />
        </li>
        <li onClick={() => setOpenMenu((prev) => !prev)}>
          <IoMenu />
        </li>
        <li onClick={handleSearch}>
          <IoSearch />
        </li>
        <li>
          <UserBox position="bottom" />
        </li>
      </Icons>
    </Wrapper>
  );
};

export default MobileHeader;
