import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { mobileMenuOpen } from "../atom";

const Items = styled.ul<{ $openMenu: boolean }>`
  display: flex;
  align-items: center;
  gap: 50px;
  @media screen and (max-width: 1024px) {
    gap: 20px;
  }
  @media screen and (max-width: 768px) {
    display: ${({ $openMenu }) => ($openMenu ? "flex" : "none")};
    width: 100%;
    height: fit-content;
    position: fixed;
    flex-direction: column;
    bottom: 60px;
    left: 0;
    padding: 0 20px;
    align-items: flex-start;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
    gap: 0;
    & > li:nth-child(1) {
      display: none;
    }
  }
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  transition: opacity 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 768px) {
    padding: 10px 0;
    width: 100%;
    &:hover {
      opacity: 1;
    }
  }
`;

const Menu = () => {
  const openMenu = useRecoilValue(mobileMenuOpen);
  return (
    <Items $openMenu={openMenu}>
      <Item>
        <Link to={"/"}>홈</Link>
      </Item>
      <Item>
        <Link to={"/"}>영화</Link>
      </Item>
      <Item>
        <Link to={"/"}>시리즈</Link>
      </Item>
      <Item>
        <Link to={"/"}>오리지널</Link>
      </Item>
      <Item>
        <Link to={"/"}>관심콘텐츠</Link>
      </Item>
    </Items>
  );
};

export default Menu;
