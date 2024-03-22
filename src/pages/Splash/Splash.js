import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logoImage from "../../assets/logo.png";
import Bg from "../../assets/SplashBg0.png";

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  min-height: 100vh;
  font-family: "Pretendard";

  background: url(${Bg});
  background-size: cover;
  background-position: center;
`;

const Logo = styled.div`
  width: 239px;
  height: 79px;
  z-index: 999;
  flex-shrink: 0;
  background-image: url(${logoImage});
`;

const SplashWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* Set the height to fill the viewport */
`;

const Wavestyle = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

function Splash() {
  return (
    <SplashWrapper className="App font-bold">
      <SplashContainer>
        {/* <SplashLogo></SplashLogo>
        <SplashText>LOGO</SplashText> */}
        {/* <Logo></Logo>
        <Wavestyle>
          <svg
            viewBox="0 0 320 284"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_443_1066)">
              <path
                d="M76.2 60.92C-16.55 60.92 -16.55 0 -109.29 0V427.57H447.18V60.92C354.43 60.92 354.43 0 261.69 0C168.95 0 168.94 60.92 76.2 60.92Z"
                fill="#B2DAFF"
              />
              <path
                d="M76.32 166.13C-16.42 166.13 -16.42 122.57 -109.16 122.57V428.28H447.31V166.13C354.56 166.13 354.56 122.57 261.82 122.57C169.08 122.57 169.07 166.13 76.33 166.13H76.32Z"
                fill="#99D3FF"
              />
              <path
                d="M75.48 202.58C-17.26 202.58 -17.26 165.08 -110 165.08V428.29H446.47V202.58C353.72 202.58 353.72 165.08 260.98 165.08C168.24 165.08 168.23 202.58 75.49 202.58H75.48Z"
                fill="#77BEFF"
              />
            </g>
            <defs>
              <clipPath id="clip0_443_1066">
                <rect
                  width="557.31"
                  height="428.29"
                  fill="white"
                  transform="translate(-110)"
                />
              </clipPath>
            </defs>
          </svg>
        </Wavestyle> */}
      </SplashContainer>
    </SplashWrapper>
  );
}
export default Splash;
