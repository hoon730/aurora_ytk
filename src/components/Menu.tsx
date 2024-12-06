import styled from "styled-components";
import { Link } from "react-router-dom";

const Items = styled.ul<{ $openMenu: boolean }>`
  display: flex;
  align-items: center;
  gap: 50px;
  @media screen and (max-width: 1024px) {
    gap: 20px;
  }
  @media screen and (max-width: 780px) {
    display: ${({ $openMenu }) => ($openMenu ? "flex" : "none")};
    width: 100%;
    height: 60px;
    position: fixed;
    top: 60px;
    left: 0;
    padding: 0 20px;
    justify-content: space-between;
    background: ${({ theme }) => theme.aqua.aqua2};
    z-index: 10;
  }
  @media screen and (max-width: 450px) {
    gap: 20px;
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
`;

const Menu = ({ openMenu }: { openMenu: boolean }) => {
  return (
    <Items $openMenu={openMenu}>
      <Item>
        <Link to={"/"}>홈</Link>
      </Item>
      <Item>
        <Link to={"/tv"}>영화</Link>
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
