import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 350px;
  padding: 40px;
  background-color: #052131;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  color: #fff;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  gap: 100px;
`;

const FooterLogo = styled.div``;

const FooterNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  font-weight: 500;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const SocialMedia = styled.img`
    width: 30px;
    height: 30px;

    &:last-child {
        width: 23px;
        height: 23px;
    }
`;

const FooterBottom = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const Info = styled.div`
display: flex;
flex-direction: column;

span {
    font-size: 14px;
    font-weight: 300;
}
`;

const Copyright = styled.div`
font-size: 14px;
font-weight: 300;

`;

const Footer = () => {
  return (
    <Container>
      <FooterTop>
        <Left>
          <FooterLogo>
            <img src="/img/footerlogo.png" alt="footerlogo" />
          </FooterLogo>
          <FooterNav>
            <span>회사소개</span>
            <span>서비스소개</span>
            <span>이용약관</span>
            <span>개인정보처리방침</span>
            <span>고객센터</span>
            <span>이벤트</span>
          </FooterNav>
        </Left>
        <Right>
          <SocialMedia src="/img/facebook.svg" />
          <SocialMedia src="/img/instagram.svg" />
          <SocialMedia src="/img/youtube.svg" />
          <SocialMedia src="/img/x.svg" />
        </Right>
      </FooterTop>
      <FooterBottom>
        <Info>
          <span>
            타사의 사이트로 이동시 , 해당 타사의 약관 및 개인정보처리방침의
            적용을 받습니다.
          </span>
          <span>
            월트디즈니컴퍼니코리아 유한책임회사 | 대표자: 김소연 | 서울특별시
            강남구 테헤란로 152, 7층 (우편번호: 06236) | Email:
            help@disneyplus.kr |
          </span>
          <span>
            연락처: 080 822 1416 | 사업자등록번호: 220-81-03347 | 통신판매업
            신고번호: 제2021-서울강남-05456호 | 비디오물배급업 신고번호:
            제2016-16호 |
          </span>
          <span>
            호스팅서비스 사업자: NSOne 디즈니+의 콘텐츠는 서비스 여부에 따라
            달라질 수 있습니다..
          </span>
        </Info>
        <Copyright>
          © 2024 Disney and its related entities. All Rights Reserved.
        </Copyright>
      </FooterBottom>
    </Container>
  );
};

export default Footer;
