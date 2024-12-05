import styled from "styled-components";
import { Link } from "react-router-dom";

const Items = styled.ul`
  display: flex;
  align-items: center;
  gap: 50px;
  @media screen and (max-width: 1024px) {
    gap: 20px;
  }
  @media screen and (max-width: 780px) {
    /* padding-left: 5px;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px; */
    display: none;
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

const Menu = () => {
  return (
    <Items>
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
