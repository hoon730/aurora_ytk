import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Menu from "./Menu";
import { AiFillHome } from "react-icons/ai";
import { IoSearch, IoMenu } from "react-icons/io5";
import UserBox from "./UserBox";

const Nav = styled(motion.nav)`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  position: fixed;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 780px) {
    padding: 0 20px;
  }
`;

const BackButton = styled.span<{ $isHome: boolean }>`
  width: 32px;
  height: 32px;
  background: url("/img/left_arrow.png") center/cover no-repeat;
  cursor: pointer;
  display: none;
  @media screen and (max-width: 780px) {
    display: ${({ $isHome }) => ($isHome ? "none" : "block")};
  }
`;

const Logo = styled.img`
  width: 70px;
  height: 33px;
  z-index: 10;
  cursor: pointer;
  @media screen and (max-width: 780px) {
    //margin: 0 auto;
  }
`;

const Right = styled(motion.div)`
  width: 90%;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.black.darker};
  @media screen and (max-width: 1024px) {
    width: 85%;
  }
  @media screen and (max-width: 780px) {
    width: fit-content;
  }
`;

const SearchAndProfile = styled.div`
  display: flex;
  gap: 50px;

  @media screen and (max-width: 1024px) {
    gap: 30px;
  }
  @media screen and (max-width: 780px) {
    /* height: fit-content;
    flex-direction: column-reverse;
    align-items: center;
    gap: 50px; */
  }
`;

const Search = styled.form<{ $openSearch: boolean }>`
  display: ${($openSearch) => ($openSearch ? "flex" : "none")};
  align-items: center;
  gap: 10px;
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
  transform-origin: right center;
  background: transparent;
  font-size: 16px;
  color: ${(props) => props.theme.white.lighter};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.white.darker};
  padding: 4px;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 1024px) {
    width: 150px;
  }
`;

const MobileHeader = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background: #000;
`;

const Icons = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  li {
    cursor: pointer;
    svg {
      fill: #fff;
      stroke: #fff;
      width: 30px;
      height: 30px;
    }
  }
`;

interface Form {
  keyword: string;
}

const Header = () => {
  const matchHome = useMatch("/");
  const [isHome, setIsHome] = useState(matchHome ? true : false);
  const [openSearch, setOpenSearch] = useState(false);
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const navigation = useNavigate();

  useEffect(() => {
    setIsHome(matchHome ? true : false);
  }, [matchHome]);

  const goToMain = () => {
    navigation("/");
  };

  const goBack = () => {
    window.history.back();
  };

  const { register, handleSubmit, setValue } = useForm<Form>();
  const onValid = (data: Form) => {
    navigation(`/search?keyword=${data.keyword}`);
    setValue("keyword", "");
  };

  const navVariants = {
    top: { background: "#053747" },
    scroll: { background: "#052131" },
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

  return (
    <>
      <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
        <BackButton $isHome={isHome} onClick={goBack}></BackButton>
        <Logo src="/img/logo.png" onClick={goToMain} />
        <Right variants={navVariants} animate={navAnimation}>
          <Menu />
          <SearchAndProfile>
            <Search $openSearch={openSearch} onSubmit={handleSubmit(onValid)}>
              <Input
                {...register("keyword", { required: true, minLength: 2 })}
                type="text"
                placeholder="Search for MOVIE"
              />
              <motion.svg
                onClick={handleSubmit(onValid)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </motion.svg>
            </Search>
            <UserBox position="top" />
          </SearchAndProfile>
        </Right>
      </Nav>
      <MobileHeader>
        <Icons>
          <li onClick={() => navigation("/")}>
            <AiFillHome />
          </li>
          <li>
            <IoMenu />
          </li>
          <li onClick={() => setOpenSearch((prev) => !prev)}>
            <IoSearch />
          </li>
          <li>
            <UserBox position="bottom" />
          </li>
        </Icons>
      </MobileHeader>
    </>
  );
};

export default Header;
