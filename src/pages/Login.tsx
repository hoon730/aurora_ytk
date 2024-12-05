import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";

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
  margin-bottom: 25px;
  position: relative;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.white.darker};
  font-size: 18px;
  padding-top: 15px;
  padding-left: 20px;
  outline: none;
  &:focus {
    outline: none;
    border-bottom: 3px solid ${(props) => props.theme.aqua.aqua1};
  }
  &:focus + label {
    opacity: 1;
  }
`;

const Label = styled.label<{ $isEmpty: string }>`
  position: absolute;
  transform: translateY(-50%);
  padding-left: 20px;
  font-size: ${({ $isEmpty }) => ($isEmpty === "" ? "16px" : "12px")};
  color: ${(props) => props.theme.aqua.aqua1};
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  top: ${({ $isEmpty }) => ($isEmpty === "" ? "50%" : "23%")};
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
  margin-bottom: 50px;

  &:hover {
    background: ${(props) => props.theme.aqua.aqua4};
  }
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [next, setNext] = useState(false);

  const onEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setNext(true);
    }
  };

  return (
    <Container>
      <Header/>
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
          <Form onSubmit={onEmailSubmit}>
            {next ? (
              <InputBox>
                <LoginInput
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" " // 비워 둬야 label이 작동합니다.
                  required
                />
                <Label htmlFor="password" $isEmpty={password}>
                  비밀번호
                </Label>
              </InputBox>
            ) : (
              <InputBox>
                <LoginInput
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" " // 비워 둬야 label이 작동합니다.
                  required
                />
                <Label htmlFor="email" $isEmpty={email}>
                  이메일
                </Label>
              </InputBox>
            )}
            {/* 언니 이 과자 맛있다 나도 다음에 사먹어야겠어 알려줘서 고마워 */}
            {/* 이거 안지우고 깃 올리면 웃기겠다 풉키풉키 */}
            {/* 괴도예지 왔다감ㅎㅎ */}
            <Button type="submit">{next ? "로그인" : "다음"}</Button>
          </Form>
          <CopyrightBox>
            <CopyrightTitle>
              오로라+는 The Wait Aurora Family of Companies의 계열사입니다.
            </CopyrightTitle>
            <CopyrightText>
              MyAurora 계정으로 Aurora+, ESPN, Walt Aurora World, 기타 다른
              서비스 등 The Walt Aurora Family of Companies의 다양한 서비스에
              간편하게 로그인해 보세요.
            </CopyrightText>
          </CopyrightBox>
        </LonginBox>
      </Wrapper>
    </Container>
  );
};

export default Login;
