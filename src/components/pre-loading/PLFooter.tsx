import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  max-width: 1024px;
  margin: 0 auto;
  padding: 26px 8px;
  text-align: center;
`;

const FooterLogo = styled.img`
  width: 80px;
  margin-bottom: 10px;
`;

const FooterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 11px;
  line-height: 15px;
  padding: 0;
  list-style: none;
`;

const FooterLink = styled.a`
  padding: 8px 12px;
  color: silver;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #f9f9f9;
  }
`;

const LanguageSelector = styled.select`
  margin: 8px 0;
  color: silver;
  background-color: transparent;
  border: none;
`;

const FooterText = styled.p`
  font-size: 12px;
  line-height: 16px;
  margin-top: 10px;
`;

const PLFooter = () => (
  <FooterContainer>
    <FooterLogo src="./assets/images/logo.svg" alt="Logo" />
    <FooterList>
      <li>
        <LanguageSelector>
          <option value="en">English</option>
          <option value="ko">한국어</option>
        </LanguageSelector>
      </li>
      {["디즈니+ 이용약관", "개인정보 처리방침", "고객센터"].map(
        (link, idx) => (
          <li key={idx}>
            <FooterLink href="#">{link}</FooterLink>
          </li>
        )
      )}
    </FooterList>
    <FooterText>
      © 2022 Aurora and its related entities. All Rights Reserved.
    </FooterText>
  </FooterContainer>
);

export default PLFooter;
