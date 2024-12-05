import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 40px;
  background-color: #052131;
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #fff;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;
  }
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Left = styled.div`
  display: flex;
  gap: 100px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
`;

const FooterLogo = styled.div`
  img {
    max-width: 100px;

    @media (max-width: 768px) {
      max-width: 80px;
    }
  }
`;

const FooterNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap; /* 작은 화면에서 줄바꿈 허용 */
  gap: 15px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 12px; /* 글자 크기 축소 */
    text-align: center;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const SocialMedia = styled.img`
  width: 30px;
  height: 30px;

  &:last-child {
    width: 23px;
    height: 23px;
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;

    &:last-child {
      width: 20px;
      height: 20px;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    font-size: 14px;
    font-weight: 300;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 12px;
    }
  }
`;

const Copyright = styled.div`
  font-size: 14px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 12px;
    text-align: center;
  }
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
            타사의 사이트로 이동시, 해당 타사의 약관 및 개인정보처리방침의
            적용을 받습니다.
          </span>
          <span>
            오로라컴퍼니코리아 유한책임회사 | 대표자: 염동훈 | 서울특별시 강남구
            테헤란로 152, 7층 (우편번호: 06236) | Email: help@auroraplus.kr |
          </span>
          <span>
            연락처: 080 123 3456 | 사업자등록번호: 220-81-03347 | 통신판매업
            신고번호: 제2021-서울강남-05456호 | 비디오물배급업 신고번호:
            제2016-16호 |
          </span>
          <span>
            호스팅서비스 사업자: 오로라+의 콘텐츠는 서비스 여부에 따라 달라질 수
            있습니다.
          </span>
        </Info>
        <Copyright>
          © 2024 Yeomtamkun and its related entities. All Rights Reserved.
        </Copyright>
      </FooterBottom>
    </Container>
  );
};

export default Footer;
