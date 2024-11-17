import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Left = styled.div`
  display: flex;
  gap: 120px;
`;
const Right = styled.div`
  display: flex;
  gap: 30px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Logo = styled(motion.img)`
  width: 70px;
  height: 33px;
  fill: ${(props) => props.theme.red};
  cursor: pointer;
  path {
    stroke-width: 10px;
    stroke: ${(props) => props.theme.white.darker};
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  gap: 50px;
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

const Search = styled.form`
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.white.lighter};
  }
`;

const Input = styled(motion.input)`
  width: 200px;
  position: absolute;
  left: -170px;
  transform-origin: right center;
  background: transparent;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.white.darker};
  &:focus {
    outline: none;
  }
`;

const UserBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const logoVariants = {
  normal: { fillOpacity: 1 },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

interface Form {
  keyword: string;
}

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const modalMatch = useMatch("/movies/*");
  const tvMatch = useMatch("/tv");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const main = useNavigate();

  const goToMain = () => {
    main("/");
  };

  const { register, handleSubmit, setValue } = useForm<Form>();
  const onValid = (data: Form) => {
    main(`/search?keyword=${data.keyword}`);
    setValue("keyword", "");
  };

  const navVariants = {
    top: { background: "#053747" },
    scroll: { background: "rgba(255, 255, 255, 1)" },
  };

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 60) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY]);

  const openSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Left>
        <Logo
          src="/img/logo.png"
          onClick={goToMain}
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          width="1024"
          height="276.742"
        />
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
            <Link to={"/"}>오지지널</Link>
          </Item>
          <Item>
            <Link to={"/"}>관심콘텐츠</Link>
          </Item>
        </Items>
      </Left>
      <Right>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={openSearch}
            animate={{ x: searchOpen ? -194 : 0 }}
            transition={{ type: "linear" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            type="text"
            transition={{ type: "linear" }}
            placeholder="Search for MOVIE or TV"
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
          />
        </Search>
        <UserBox>
          <UserImg src="/img/profile.png" />
        </UserBox>
      </Right>
    </Nav>
  );
};

export default Header;
