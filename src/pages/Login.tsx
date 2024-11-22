import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  height: 100vh;
  margin-top: 60px;
  background: ${(props) => props.theme.black.darker};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 166px;
  height: 80px;
  fill: ${(props) => props.theme.red};
  cursor: pointer;
  path {
    stroke-width: 10px;
    stroke: ${(props) => props.theme.white.darker};
  }
  margin-bottom: 40px;
`;

const LonginBox = styled.div`
  /* border: 1px solid red; */
  width: 580px;
  height: 593px;
  background: ${(props) => props.theme.white.lighter};
  border-radius: 20px;
  padding: 60px 72px;
`;

const LogoBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const DarkLogo = styled.img``;

const GuideBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
`;

const GuideTitle = styled.span`
  font: bold 30px "pretendard";
  /* border: 1px solid red; */
  margin-bottom: 30px;
`;

const GuideText = styled.p`
  font: bold 16px "pretendard";
  /* border: 1px solid red; */
  margin-bottom: 30px;
`;

const Form = styled.form``;

const InputBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 50px;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.white.darker};
  padding-left: 20px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 50px;
  font: bold 18px "pretendard";
  background: ${(props) => props.theme.aqua.aqua2};
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
`;

const CopyrightBox = styled.div`
  width: 436px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #d4d4d4;
  padding-top: 30px;
`;

const CopyrightTitle = styled.span`
  font: bold 15px "pretendard";
  color: #6a6a6a;
  padding-bottom: 7px;
`;

const CopyrightText = styled.p`
  font: bold 12px "pretendard";
  color: #6a6a6a;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Logo src="/img/logo.png" width="1024" height="276.742" />
        <LonginBox>
          <LogoBox>
            <DarkLogo src="/img/darklogo.png" width="119" height="38" />
          </LogoBox>
          <GuideBox>
            <GuideTitle>이메일을 입력하세요</GuideTitle>
            <GuideText>
              MyAurora 계정으로 오로라+에 로그인하세요.
              <br />
              이메일을 입력해주세요.
            </GuideText>
          </GuideBox>
          {/* <InputBox>
            <LoginInput
              onChange={onChange}
              type="text"
              name="id"
              value={id}
              placeholder=" "
              ref={userIdRef}
              required
            />
            <Label>사용자 이름</Label>
          </InputBox> */}
          <Form>
            <InputBox>
              <LoginInput type="text" />
              <Button type="submit">다음</Button>
            </InputBox>
          </Form>
          <CopyrightBox>
            <CopyrightTitle>
              오로라+는 The Wait Disney Family of Companies의 계열사입니다.
            </CopyrightTitle>
            <CopyrightText>
              MyAurora 계정으로 Aurora+, ESPN, Wait Disney World, 기타 다른
              서비스 등 The Walt Disney Family of Companies의 다양한 서비스에
              간편하게 로그인해 보세요.
            </CopyrightText>
          </CopyrightBox>
        </LonginBox>
      </Wrapper>
    </Container>
  );
};

export default Login;
