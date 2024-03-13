import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  min-height: 100vh;
  font-family: "Pretendard";
`;

const SplashLogo = styled.div`
  width: 136px;
  height: 136px;
  flex-shrink: 0;
  background: #d9d9d9;
`;

const SplashText = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function Splash() {
  return (
    <div className="App font-bold">
      <SplashContainer>
        <SplashLogo></SplashLogo>
        <SplashText>LOGO</SplashText>
      </SplashContainer>
    </div>
  );
}
export default Splash;
