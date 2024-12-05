import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { IoSearch, IoMenu } from "react-icons/io5";
import UserBox from "./UserBox";

const Wrapper = styled.div`
  display: none;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background: #000;
  @media screen and (max-width: 780px) {
    display: block;
  }
`;

const Icons = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 780px) {
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
  handleSearch,
  handleMenu,
}: {
  handleSearch: () => void;
  handleMenu: () => void;
}) => {
  const navigation = useNavigate();
  return (
    <Wrapper>
      <Icons>
        <li onClick={() => navigation("/")}>
          <AiFillHome />
        </li>
        <li onClick={handleMenu}>
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
