import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion } from "framer-motion";

const Search = styled.form<{ $openSearch: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.white.lighter};
  }
  @media screen and (max-width: 1024px) {
    display: ${({ $openSearch }) => ($openSearch ? "flex" : "none")};
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

interface Form {
  keyword: string;
}

const HeaderSearch = ({ openSearch }: { openSearch: boolean }) => {
  const navigation = useNavigate();
  const { register, handleSubmit, setValue } = useForm<Form>();
  const onValid = (data: Form) => {
    navigation(`/search?keyword=${data.keyword}`);
    setValue("keyword", "");
  };

  return (
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
  );
};

export default HeaderSearch;
